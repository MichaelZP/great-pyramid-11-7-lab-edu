/* Orthographic stereo adapter for the existing Canvas renderer and camera. */
'use strict';
globalThis.VortexStereo=(()=>{
 const get=id=>document.getElementById(id);let active=false,reversed=false,immersive=false;
 const enabled=()=>active;
 function state(snapshot){VortexI18n.text('stereoTransport',snapshot.running?'Pauza sceny':'Odtwórz scenę');get('stereoTransport').disabled=get('reduced').checked||Boolean(get('error').textContent);}
 function panes(w,h){if(!active)return null;const sign=reversed?-1:1;return[{x:0,w:w/2,h,eye:sign},{x:w/2,w:w/2,h,eye:-sign}];}
 function project(view,w,h,frame,camera,eye){
  const yaw=camera?.yaw??25*Math.PI/180,elevation=camera?.elevation??.28,cs=Math.cos(yaw),sn=Math.sin(yaw),ce=Math.cos(elevation),se=Math.sin(elevation);
  const angle=eye*Number(get('stereoDepth').value)*Math.PI/60,c=Math.cos(angle),s=Math.sin(angle),R=frame.radial,V=frame.vertical;
  const vertical=view==='top'?R:view==='side'?V:Math.abs(ce)*V+Math.abs(se)*R;
  const depth=view==='top'?V:view==='side'?R:Math.abs(ce)*R+Math.abs(se)*V;
  const horizontal=Math.abs(c)*R+Math.abs(s)*depth;
  const scale=Math.min((w-32)/(2*horizontal),(h-75-56)/(2*vertical))*(camera?.zoom??1);
  const basis=p=>view==='top'?[p[0],p[1],p[2]-7]:view==='side'?[p[0],p[2]-7,p[1]]:[cs*p[0]-sn*p[1],ce*(p[2]-7)-se*(sn*p[0]+cs*p[1]),ce*(sn*p[0]+cs*p[1])+se*(p[2]-7)];
  // Rotate the horizontal/depth basis about the shared vertical axis.
  // Both eye cameras converge on V; vertical coordinates stay identical.
  const projection=p=>{const [x,y,z]=basis(p);return[w/2+(c*x-s*z)*scale,(h-75)/2-y*scale];};
  projection.depth=p=>{const [x,,z]=basis(p);return s*x+c*z;};return projection;
 }
 function overlay({ctx,w,h,panes}){if(!panes)return;ctx.save();ctx.strokeStyle='#536f80';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(w/2,0);ctx.lineTo(w/2,h-75);ctx.stroke();ctx.textAlign='center';ctx.font='11px system-ui';ctx.fillStyle='#b5c9d2';for(const p of panes){ctx.fillText(VortexI18n.t(p.eye>0?'Prawe oko':'Lewe oko'),p.x+p.w/2,16);ctx.beginPath();ctx.arc(p.x+p.w/2,27,2,0,Math.PI*2);ctx.fill();}ctx.restore();}
 function init({redraw}){
  const labels=()=>{get('crossEye').setAttribute('aria-pressed',String(active));get('reverseDepth').setAttribute('aria-pressed',String(reversed));get('reverseDepth').disabled=!active;get('stereoDepth').disabled=!active;VortexI18n.text('stereoDepthValue',Number(get('stereoDepth').value).toLocaleString(VortexI18n.locale())+'×');get('stereoInfo').hidden=!active;VortexI18n.text('stereoInfo','Cross-eye: skrzyżuj wzrok, aby połączyć dwa punkty w środkowy obraz. Lewy kadr jest dla prawego oka, prawy dla lewego. '+(reversed?'Odwrócona głębia · kolejność oczu zamieniona. ':'')+'Na telefonie wygodniej w poziomie; zmniejsz siłę głębi, jeśli trudno połączyć obrazy.');VortexI18n.text('stereoFullscreen',immersive?'Wyjdź z pełnego ekranu':'Pełny ekran');};
  VortexI18n.onChange(labels);
  get('crossEye').addEventListener('click',()=>{active=!active;labels();redraw();});
  get('reverseDepth').addEventListener('click',()=>{if(!active)return;reversed=!reversed;labels();redraw();});
  get('stereoDepth').addEventListener('input',()=>{labels();redraw();});
  get('stereoTransport').addEventListener('click',()=>get(get('pause').disabled?'play':'pause').click());
  const fullscreen=value=>{immersive=value;document.body.classList.toggle('scene-fullscreen',value);labels();redraw();};
  get('stereoFullscreen').addEventListener('click',async()=>{
   if(immersive){fullscreen(false);if(document.fullscreenElement&&document.exitFullscreen)await document.exitFullscreen().catch(()=>{});return;}
   fullscreen(true);if(get('scenePanel').requestFullscreen)try{await get('scenePanel').requestFullscreen();}catch{/* Embedded browsers retain the immersive layout. */}
  });
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&immersive)fullscreen(false);else redraw();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&immersive){fullscreen(false);if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});}});labels();
 }
 return{enabled,state,panes,project,overlay,init};
})();
