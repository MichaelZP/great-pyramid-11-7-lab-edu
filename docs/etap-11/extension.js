// Stage 11 artistic presentation; all motion uses the shared stage 10 clock.
'use strict';
globalThis.VortexPreviewExtension=(()=>{
 const get=id=>document.getElementById(id),now=()=>performance.now();
 const presentation=globalThis.VortexPresentation;
 const uiText=(id,text)=>{if(presentation?.i18n)return presentation.i18n.text(id,text);document.getElementById(id).textContent=text;return text;};
 let quality=0,monitor,last=-Infinity,redraw,snapshot,lastSeconds=0,frames=0,drawn=0;
 if(typeof navigator!=='undefined'&&navigator.hardwareConcurrency>4&&typeof innerWidth!=='undefined'&&innerWidth>700)quality=1;
 monitor=VortexParticles.budget(quality);
 const values={distance:4,deformation:0,trail:presentation?.trail??0,glow:presentation?.glow??0,density:presentation?.density??25};
 const targets={...values};
 const camera={yaw:presentation?25*Math.PI/180:Math.PI/6,elevation:presentation ? .28 : Math.PI/6,zoom:1},initial={...camera};
 const cameraText=()=>{uiText('cameraStatus',get('camera').checked?'Kamera filmowa włączona · działa podczas odtwarzania w widoku 3D.':'Kamera filmowa zatrzymana · ponowne uruchomienie wymaga włączenia.');};
 function update(current){const dt=Math.max(0,Math.min(.1,current.seconds-lastSeconds));lastSeconds=current.seconds;
  presentation?.update?.(current);
  for(const key of Object.keys(values)){const target=Number(get(key).value);if(!Number.isFinite(target))throw Error('Parametry efektów muszą być skończone.');if(current.running)values[key]+=(target-values[key])*(1-Math.exp(-dt*4));else if(target!==targets[key])values[key]=target;targets[key]=target;if(Math.abs(values[key]-target)<.0001)values[key]=target;}
  if(current.running&&!get('reduced').checked&&get('camera').checked&&get('view').value==='perspective')camera.yaw=(camera.yaw+dt*.06)%(Math.PI*2);
  cameraText();
 }
 function projection(view,w,h,framing){if(view!=='perspective')return null;if(presentation)h-=presentation.captionHeight;const cs=Math.cos(camera.yaw),sn=Math.sin(camera.yaw),ce=Math.cos(camera.elevation),se=Math.sin(camera.elevation);
  if(presentation&&framing){const scale=Math.min((w-64)/(2*framing.radial),(h-56)/(2*(Math.abs(ce)*framing.vertical+Math.abs(se)*framing.radial)))*camera.zoom;const project=p=>{const x=cs*p[0]-sn*p[1],radial=sn*p[0]+cs*p[1],y=ce*(p[2]-7)-se*radial;return[w/2+x*scale,h/2-y*scale];};project.depth=p=>ce*(sn*p[0]+cs*p[1])+se*(p[2]-7);return project;}
  // Fit the complete finite surfaces, bases and construction about V, once
  // per scale. Keep the legacy camera for the original stage 11 preview.
  const distance=framing?4*Math.hypot(framing.radial,framing.vertical):35;
  const magnification=framing?distance/(distance-Math.abs(ce)*framing.radial-Math.abs(se)*framing.vertical):1;
  const scale=(framing?Math.min((w-64)/(2*framing.radial*magnification),(h-56)/(2*(Math.abs(ce)*framing.vertical+Math.abs(se)*framing.radial)*magnification)):Math.min((w-40)/(presentation?18:16),(h-50)/(presentation?20:17)))*camera.zoom;
  return p=>{const x=cs*p[0]-sn*p[1],radial=sn*p[0]+cs*p[1],z=p[2]-7,y=ce*z-se*radial,depth=ce*radial+se*z,k=distance/(distance-depth);return[w/2+x*scale*k,h/2-y*scale*k];};
 }
 function draw({id,ctx,project,pair,visible,fade,current,records,colors,source,o,accumulate=false}){
  if(id!=='scene')return;drawn=(accumulate?drawn:0)+(presentation?.drawParticles?.({ctx,project,visible,fade,current,records,colors,source,o,quality:monitor.level,density:values.density,trail:values.trail})??0);const opacity=fade.particles??fade.paths;if(!get('particlesLayer').checked||opacity<=0)return;
  const level=VortexParticles.levels[monitor.level],n=VortexParticles.count(monitor.level,Math.max(0,Math.min(1,values.density/100))),p=[0,0,0];
  ctx.save();
  for(const t of pair){if(!visible(t.id))continue;const motion=presentation?.motionTorus?.(t)??t,phase=presentation?.motionPhase?.(t)??current.phase,direction=presentation?.motionMultiplier?.(t)??1,points=VortexParticles.update(motion,phase,n,values.deformation);ctx.fillStyle=colors[t.id];ctx.strokeStyle=colors[t.id];
   // Analytic samples, no accumulating history; endpoints are continuous at phase wrap.
   if(values.trail>.005){ctx.lineWidth=1;ctx.setLineDash(t.id===2?[2,3]:[]);const lag=Vortex.TAU/8*current.speed*values.trail;
    for(let segment=0;segment<level.segments;segment++){ctx.beginPath();ctx.globalAlpha=opacity*.32*(1-segment/level.segments);
     for(let i=0;i<n;i++){const a=project(VortexParticles.point(motion,phase-direction*lag*segment/level.segments,i,values.deformation,p));const b=project(VortexParticles.point(motion,phase-direction*lag*(segment+1)/level.segments,i,values.deformation,p));ctx.moveTo(...a);ctx.lineTo(...b);}ctx.stroke();
    }ctx.setLineDash([]);
   }
   // Cheap, capped halo. Never a full-canvas blur or post-processing pass.
   if(values.glow>.005){ctx.globalAlpha=opacity*values.glow*.07;ctx.beginPath();for(let i=0;i<n;i++){const j=i*3;p[0]=points[j];p[1]=points[j+1];p[2]=points[j+2];const a=project(p);ctx.moveTo(a[0]+4.5,a[1]);ctx.arc(...a,4.5,0,Vortex.TAU);}ctx.fill();}
   ctx.globalAlpha=opacity*.85;ctx.beginPath();
   for(let i=0;i<n;i++){const j=i*3;p[0]=points[j];p[1]=points[j+1];p[2]=points[j+2];const a=project(p);if(t.id===1){ctx.moveTo(a[0]+1.8,a[1]);ctx.arc(...a,1.8,0,Vortex.TAU);}else ctx.rect(a[0]-1.8,a[1]-1.8,3.6,3.6);}
   ctx.fill();drawn+=n;records.push({layer:'particles',system:t.id,count:n,shape:t.id===1?'circle':'square',deformation:values.deformation,trail:values.trail,glow:values.glow,...(presentation?{point:Array.from(points.subarray(0,3)),phase,direction}:{})});
  }ctx.restore();
 }
 function measured(ms){monitor.add(ms);frames++;const s=monitor.stats();uiText('qualityStatus',`Efektywna jakość: ${VortexParticles.levels[s.effective].name}; ${drawn} cząstek łącznie (limit ${VortexParticles.levels[s.effective].count} / ${presentation?'obiekt':'torus'}). Rysowanie ${presentation?'sceny':'3 widoków'}: mediana ${s.p50.toFixed(2)} ms, p95 ${s.p95.toFixed(2)} ms (${s.samples}/120 próbek). To czas CPU rysowania, nie pełny czas klatki.`);
  for(const key of ['density','trail','deformation','glow'])uiText(key+'Value',get(key).value+(key==='density'?'%':''));
  uiText('diagnostics',JSON.stringify({timeMs:now(),frames,selected:quality,effective:s.effective,p50:s.p50,p95:s.p95,samples:s.samples,particles:drawn,bufferBytes:VortexParticles.positions.byteLength+VortexParticles.seeds.byteLength,heapBytes:performance.memory?.usedJSHeapSize??null,camera:{...camera},values:{...values}}));
 }
 function manual(){get('camera').checked=false;cameraText();}
 function resetCamera(){Object.assign(camera,initial);manual();redraw();}
 function init(api){redraw=api.redraw;snapshot=api.snapshot;get('quality').value=String(quality);
  for(const id of ['density','trail','deformation','glow','particlesLayer','labelsLayer'])get(id).addEventListener('input',redraw);
  get('quality').addEventListener('change',()=>{quality=Number(get('quality').value);monitor=VortexParticles.budget(quality);last=-Infinity;redraw();});
  get('measure').addEventListener('click',()=>{monitor=VortexParticles.budget(quality);frames=0;redraw();});
  get('benchmark').addEventListener('click',()=>{document.getElementById('pause').click();monitor=VortexParticles.budget(quality);frames=0;for(let i=0;i<30;i++)redraw();});
  get('camera').addEventListener('change',()=>{if(get('reduced').checked)get('camera').checked=false;cameraText();});
  get('view').addEventListener('input',manual);
  get('cameraFrame')?.addEventListener('input',manual);
  get('reduced').addEventListener('change',()=>{if(get('reduced').checked)manual();});
  get('reset').addEventListener('click',()=>{for(const key of Object.keys(values))values[key]=targets[key]=Number(get(key).value);resetCamera();});
  get('cameraReset').addEventListener('click',resetCamera);
  get('mode').addEventListener('change',()=>{const cinema=get('mode').value==='cinema';manual();
   if(presentation){presentation.preset(cinema);redraw();return;}
   if(cinema)get('view').value='perspective';
   for(const [key,value] of Object.entries({density:cinema?70:25,trail:cinema?.7:0,glow:cinema?.25:0,deformation:0}))get(key).value=String(value);
   for(const key of ['surfaceLayer','planeLayer','linksLayer'])get(key).checked=!cinema;
   for(const key of ['pyramidLayer','sectionLayer','torusLayer','trajectoryLayer','labelsLayer','particlesLayer'])get(key).checked=true;
   get('speed').value=cinema?'1':'.5';get('speed').dispatchEvent(new Event('input'));redraw();
  });
  const scene=get('scene');let drag=null;
  scene.addEventListener('pointerdown',e=>{if(get('view').value!=='perspective'||(e.button!==undefined&&e.button!==0))return;manual();drag={x:e.clientX,y:e.clientY,id:e.pointerId};scene.setPointerCapture(e.pointerId);});
  scene.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;camera.yaw+=(e.clientX-drag.x)*.006;camera.elevation=Math.max(-1.1,Math.min(1.1,camera.elevation+(e.clientY-drag.y)*.004));drag.x=e.clientX;drag.y=e.clientY;redraw();});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])scene.addEventListener(event,()=>drag=null);
  scene.addEventListener('wheel',e=>{if(!presentation&&get('view').value!=='perspective')return;e.preventDefault();manual();camera.zoom=Math.max(.6,Math.min(1.7,camera.zoom*Math.exp(-e.deltaY*.001)));redraw();},{passive:false});
  scene.addEventListener('keydown',e=>{if((get('view').value!=='perspective'&&(!presentation||!['+','-','='].includes(e.key)))||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','='].includes(e.key))return;e.preventDefault();manual();if(e.key==='ArrowLeft')camera.yaw-=.08;if(e.key==='ArrowRight')camera.yaw+=.08;if(e.key==='ArrowUp')camera.elevation=Math.min(1.1,camera.elevation+.05);if(e.key==='ArrowDown')camera.elevation=Math.max(-1.1,camera.elevation-.05);if(e.key==='+'||e.key==='=')camera.zoom=Math.min(1.7,camera.zoom*1.05);if(e.key==='-')camera.zoom=Math.max(.6,camera.zoom/1.05);redraw();});
  get('speed').value=presentation?'1':'.5';get('speed').dispatchEvent(new Event('input'));cameraText();
 }
 return{init,draw,now,measured,update,projection,accepted:true,smoothDistance:true,distance:()=>values.distance,labels:()=>get('labelsLayer').checked,pixelRatio:()=>VortexParticles.levels[monitor.level].dpr,shouldRender(){const t=now();if(t-last<1000/VortexParticles.levels[monitor.level].fps-1)return false;last=t;return true;},stats:()=>({...monitor.stats(),frames,capacity:VortexParticles.capacity,bufferBytes:VortexParticles.positions.byteLength+VortexParticles.seeds.byteLength,drawn,values:{...values},camera:{...camera},running:snapshot?.().running})};
})();
