/* Stage 14 is presentation of existing stages 9–11, with no second renderer/clock. */
'use strict';
globalThis.VortexPresentation=(()=>{
 const get=id=>document.getElementById(id),clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{const t=clamp(x);return t*t*(3-2*t);};
 function reveal(p){return{first:smooth((p-.16)/.2),second:smooth((p-.36)/.2),torus:smooth((p-.56)/.24),paths:smooth((p-.64)/.16),particles:smooth((p-.8)/.2),motion:smooth((p-.8)/.2)};}
 const stages=['1 / Piramida 11:7 i linie konstrukcyjne.','2 / Pierwsza powierzchnia, płaszczyzna i rzeczywisty przekrój.','3 / Lustrzany układ · szeroka część ku górze.','4 / Dwa torusy i wybrane kierunki θ oraz ψ.','5 / Pełna wspólna scena · wirujące cząstki.'];
 const stage=p=>stages[p<.16?0:p<.36?1:p<.56?2:p<.8?3:4];
 const sourceOpacity=(record,fade)=>(record.id===1?fade.first:fade.second)*(['surface','base'].includes(record.layer)?VortexControls.opacity('surface',record.id):1);
 let boundsCache;
 function framing(source){if(get('cameraFrame').value==='fixed')return{radial:9,vertical:12};const pair=VortexControls.pair(Number(get('distance').value)),key=JSON.stringify(pair);if(boundsCache?.source!==source||boundsCache?.key!==key){let radial=Math.max(Math.hypot(5.5,5.5),...pair.map(t=>t.R+t.r)),vertical=Math.max(7.5,...pair.map(t=>Math.abs(t.center[2]-7)+t.r));for(const record of source.lines)for(const p of record.points){radial=Math.max(radial,Math.hypot(p[0],p[1]));vertical=Math.max(vertical,Math.abs(p[2]-7));}for(const face of VortexControls.eggs(source.section,source))for(const p of face.points){radial=Math.max(radial,Math.hypot(p[0],p[1]));vertical=Math.max(vertical,Math.abs(p[2]-7));}boundsCache={source,key,radial,vertical};}return boundsCache;}

 const sourceOptions=()=>({extent:get('extent').value});
 function drawMidplane({ctx,project,pair,fade,line,label}){
  const opacity=1-Number(get('midplaneTransparency').value)/100;
  if(!get('midplaneLayer').checked||fade.torus<=0||opacity<=0)return;
  const plane=VortexControls.midplane(pair),color='#e8c76b';
  ctx.save();ctx.fillStyle=color;ctx.globalAlpha=fade.torus*opacity;ctx.beginPath();plane.points.map(project).forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fill();ctx.restore();
  line(plane.points,color,1.5,'midplane',0,fade.torus*Math.sqrt(opacity));
  label(`Płaszczyzna między torusami · Z=${plane.center[2].toFixed(1)}`,[plane.center[0]+plane.radius,plane.center[1],plane.center[2]],color,8,18);
 }
 function sourceGuides({line,label,source,o,fade}){if(!get('guidesLayer').checked||get('extent').value!=='infinite')return;const span=8*o.z0/7;for(const id of [1,2]){const opacity=id===1?fade.first:fade.second;if(opacity<=0)continue;const tr=p=>Stage8.transform(p,o,source.frame,id===2),color=id===1?'#70dfca':'#ffbe86';line([[-span,-span,0],[span,-span,0],[span,span,0],[-span,span,0],[-span,-span,0]].map(tr),color,.8,'asymptote',id,opacity*.25,[3,5]);line([[0,0,0],[0,0,o.z0]].map(tr),color,1,'coneAxis',id,opacity*.5,[3,4]);label(id===1?'0H · z = 0':'0H′ · z′ = 0',tr([0,0,0]),color,id===1?-80:8,id===1?20:-12);}}
 function drawParticles({ctx,project,visible,fade,current,records,colors,source,o,quality,density,trail}){
  if(!get('coneParticlesLayer').checked||fade.particles<=0)return 0;
  const level=VortexParticles.levels[quality],n=VortexParticles.count(quality,clamp(density/100)),p=[0,0,0];let drawn=0;
  const envelope=u=>smooth(u/.07)*smooth((1-u)/.07),lag=.045*trail*current.speed;
  ctx.save();
  for(const range of source.ranges){const id=range.id;if(!visible(id))continue;const phase=VortexControls.phase('cone',id),direction=VortexControls.multiplier('cone',id),opacity=fade.particles*(id===1?fade.first:fade.second),mirror=id===2,color=colors[id],points=VortexParticles.updateSurface(o,source.frame,range,phase,n,mirror);
   ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=1.4;ctx.setLineDash(mirror?[3,3]:[]);
   // Truncate trails at the reset boundary; never join the base to the tip.
   // Birth/death fades recycle markers on this open artistic trajectory.
   if(trail>0)for(let i=0;i<n;i++){const u=VortexParticles.surfaceProgress(phase,i);ctx.globalAlpha=opacity*.65*envelope(u);ctx.beginPath();for(let j=0;j<=level.segments;j++){const past=u-direction*lag*j/level.segments;if(past<0||past>1)break;const a=project(VortexParticles.surfacePointAt(o,source.frame,range,past,i,mirror,p));j?ctx.lineTo(...a):ctx.moveTo(...a);}ctx.stroke();}
   ctx.setLineDash([]);
   for(let i=0;i<n;i++){const j=i*3,u=VortexParticles.surfaceProgress(phase,i);p[0]=points[j];p[1]=points[j+1];p[2]=points[j+2];const a=project(p);ctx.globalAlpha=opacity*.95*envelope(u);ctx.beginPath();if(id===1)ctx.arc(...a,2.3,0,Vortex.TAU);else ctx.rect(a[0]-2.3,a[1]-2.3,4.6,4.6);ctx.fill();}
   records.push({layer:'coneParticles',system:id,count:n,point:Array.from(points.subarray(0,3)),phase,mirrored:mirror,direction});drawn+=n;
  }ctx.restore();return drawn;
 }
 function pyramid({ctx,project,corners,V}){ctx.save();ctx.fillStyle='#a9c8da';ctx.globalAlpha=.055;for(let i=0;i<4;i++){ctx.beginPath();[corners[i],corners[(i+1)%4],V].map(project).forEach((p,j)=>j?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fill();}ctx.restore();}
 function guides({line,label}){if(!get('guidesLayer').checked)return;line([[-5.5,0,0],[0,0,7],[5.5,0,0]],'#e8d79c',1.7,'guides');line([[-5.5,-5.5,7],[5.5,-5.5,7],[5.5,5.5,7],[-5.5,5.5,7],[-5.5,-5.5,7]],'#b7a0ca',.8,'guides',0,.3,[4,5]);label('Σ: Z = 7',[5.5,-5.5,7],'#b7a0ca',-65,-8);}
 function caption({ctx,w,h}){ctx.save();ctx.fillStyle='#0e202bf2';ctx.fillRect(0,h-75,w,75);ctx.textAlign='center';ctx.fillStyle='#e5eef0';const lines=(w<550?['Wizualizacja artystyczna','przeciwbieżnych wirów toroidalnych']:['Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych']).map(VortexI18n.t);let size=16;ctx.font=`${size}px system-ui`;while(lines.some(t=>ctx.measureText(t).width>w-20)&&size>11){size--;ctx.font=`${size}px system-ui`;}lines.forEach((t,i)=>ctx.fillText(t,w/2,h-(lines.length-i)*21-17));ctx.fillStyle='#b5c9d2';ctx.font=`${w<360?11:12}px system-ui`;ctx.fillText(VortexI18n.t('Koncepcja: Michał Przybylski — prylski.dev'),w/2,h-12);ctx.restore();}
 function preset(cinema){for(const key of ['pyramid','guides','surface','plane','section','torus','midplane','trajectory','particles','coneParticles','labels'])get(key+'Layer').checked=true;for(const [key,value] of Object.entries({density:cinema?45:35,trail:cinema?.6:.5,glow:cinema?.15:.1,deformation:0}))get(key).value=String(value);get('linksLayer').checked=false;}
 function init({redraw,player,state}){
  VortexControls.init({redraw,player});
  VortexStereo.init({redraw});
  const midplaneText=()=>VortexI18n.text('midplaneTransparencyValue',get('midplaneTransparency').value+'%');
  get('midplaneTransparency').addEventListener('input',()=>{player.pause();midplaneText();redraw();});midplaneText();
  let recorder=null,stream=null,timer=null;const chunks=[];
  const setRecordView=value=>{document.body.classList.toggle('recording-view',value);get('exitRecord').hidden=!value;redraw();};
  function fullShow(){const automatic=get('camera').checked;player.reset();get('cameraReset').click();get('camera').checked=automatic&&!get('reduced').checked;preset(get('mode').value==='cinema');get('view').value='perspective';get('systems').value='both';redraw();if(!get('reduced').checked&&!get('error').textContent)player.play();}
  get('fullShow').addEventListener('click',fullShow);
  const scaleText=()=>VortexI18n.text('scaleValue',`${(Number(get('scaleFactor').value)*100).toLocaleString(VortexI18n.locale(),{maximumFractionDigits:1})}%`);
  VortexI18n.onChange(scaleText);
  get('scaleFactor').addEventListener('input',scaleText);
  get('scaleReset').addEventListener('click',()=>{get('scaleFactor').value='.055';get('scaleFactor').dispatchEvent(new Event('input'));});scaleText();
  get('referenceView').addEventListener('click',()=>{player.pause();get('extent').value='infinite';get('cameraFrame').value='fixed';get('view').value='perspective';get('scaleFactor').value='.055';get('scaleFactor').dispatchEvent(new Event('input'));get('cameraReset').click();for(const key of ['pyramid','guides','surface','plane','section','labels'])get(key+'Layer').checked=true;player.seek(1);redraw();});
  get('recordView').addEventListener('click',()=>setRecordView(true));get('exitRecord').addEventListener('click',()=>setRecordView(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(recorder?.state==='recording')stop();setRecordView(false);}});
  for(const [id,key] of [['zoomIn','+'],['zoomOut','-']])get(id).addEventListener('click',()=>get('scene').dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true})));
  function stop(){if(timer!==null)clearTimeout(timer);timer=null;if(recorder?.state==='recording')recorder.stop();player.pause();document.body.classList.remove('capturing');get('stopRecording').disabled=true;}
  get('stopRecording').addEventListener('click',stop);
  const supported=typeof MediaRecorder!=='undefined'&&typeof get('scene').captureStream==='function';
  get('recordDemo').disabled=!supported;VortexI18n.text('recordStatus',supported?'Nagranie zapisuje wyłącznie scenę z podpisem do pliku WebM, bez dźwięku. Nie wysyła pliku.':'Ta przeglądarka nie obsługuje nagrywania Canvas. Skorzystaj z instrukcji w education/README.md.');
  get('recordDemo').addEventListener('click',()=>{
   if(get('reduced').checked){VortexI18n.text('recordStatus','Ograniczony ruch jest włączony. Wyłącz go świadomie, aby nagrać animację.');return;}
   if(recorder?.state==='recording')return;
   try{
    const mime=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(t=>MediaRecorder.isTypeSupported(t));if(!mime)throw Error('Brak kodera WebM.');
    get('mode').value='cinema';fullShow();setRecordView(true);document.body.classList.add('capturing');chunks.length=0;
    stream=get('scene').captureStream(30);recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:4000000});
    recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recorder.onstop=()=>{stream.getTracks().forEach(t=>t.stop());const blob=new Blob(chunks,{type:mime}),reader=new FileReader(),complete=player.snapshot().progress>=.999;
     // A portable data link also works when an embedded host cannot export blob URLs.
     reader.onload=()=>{get('downloadVideo').href=reader.result;get('downloadVideo').hidden=false;VortexI18n.text('recordStatus',`${complete?'Gotowy plik WebM':'Nagranie częściowe · pokaz nie dotarł do finału'}: ${(blob.size/1024/1024).toFixed(2)} MB. Pobierz go poniżej.`);};
     reader.onerror=()=>VortexI18n.text('recordStatus','Nie udało się przygotować pliku do pobrania. Powtórz nagranie w widocznej karcie.');reader.readAsDataURL(blob);setRecordView(false);get('recordDemo').disabled=false;};
    recorder.start(1000);get('recordDemo').disabled=true;get('stopRecording').disabled=false;get('downloadVideo').hidden=true;VortexI18n.text('recordStatus','Nagrywanie 26 s: pięć odsłon i 6 s finału. Esc kończy wcześniej.');timer=setTimeout(stop,26000);
   }catch(e){stream?.getTracks().forEach(t=>t.stop());player.pause();document.body.classList.remove('capturing');setRecordView(false);get('recordDemo').disabled=false;VortexI18n.text('recordStatus',`Nagranie nie powstało: ${e.message}. Użyj instrukcji ręcznej.`);}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&recorder?.state==='recording')stop();});
  window.addEventListener('pagehide',()=>{if(recorder?.state==='recording')stop();});
  VortexI18n.init({refresh:()=>{redraw();state(player.snapshot());}});
 }
 return{duration:20,captionHeight:75,i18n:VortexI18n,stereo:VortexStereo,update:VortexControls.update,pair:VortexControls.pair,motionTorus:VortexControls.motionTorus,motionPhase:t=>VortexControls.phase('torus',t.id),motionMultiplier:t=>VortexControls.multiplier('torus',t.id),drawEggs:VortexControls.drawEggs,drawMidplane,sourceOptions,framing,drawParticles,sourceGuides,trail:.5,glow:.1,density:35,surfaceOpacity:.38,reveal,stage,sourceOpacity,pyramid,guides,caption,preset,init};
})();
