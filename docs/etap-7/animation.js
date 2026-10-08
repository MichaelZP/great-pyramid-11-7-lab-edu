/* Shared geometry and single cancellable clock for the stage 9 preview. */
'use strict';
globalThis.Stage8 = (() => {
 const V=[0,0,7];
 function pose(o,variant,q,progress){
  const t=Math.max(0,Math.min(1,progress)),e=t*t*(3-2*t);
  // GoldenEggConstruct: BASE=2, zc=-3.05, yOff=1.43.
  // Transfer its placement to B=11, h=7, without replacing the audited oval.
  const start=[3.05*5.5,0,(14/11)*4.05*5.5];
  const initialScale=(start[2]+1.43*5.5)/o.z0;
  const end=[0,0,variant==='A'?7:3.5],endScale=(variant==='A'?7:3.5)/o.L;
  // q retains the stage 7 scaling around V at the destination only.
  // The Golden Egg source pose must not collapse towards V when q is small.
  const destination=end.map((v,i)=>V[i]+q*(v-V[i]));
  const anchor=start.map((v,i)=>v+(destination[i]-v)*e);
  const scale=initialScale+(q*endScale-initialScale)*e;
  return {anchor,scale,rotation:0,e,progress:t};
 }
 function transform(p,o,frame,mirrored=false){const world=p.map((v,i)=>frame.anchor[i]+frame.scale*(v-(i===2?o.z0:0)));return mirrored?reflect(world):world;}
 function inverse(p,o,frame,mirrored=false){const world=mirrored?reflect(p):p;return world.map((v,i)=>(v-frame.anchor[i])/frame.scale+(i===2?o.z0:0));}
 function reflect(p){return[p[0],p[1],14-p[2]];}
 function visibleSystems(mode){if(mode==='first')return[false];if(mode==='second')return[true];if(mode==='both')return[false,true];throw Error('Unknown system view');}
 function playback({request,cancel,onFrame,onState,duration=8000}){
  let id=null,last=null,running=false,progress=0,speed=1;
  function pause(){if(id!==null)cancel(id);id=null;last=null;running=false;onState(false);}
  function seek(value){pause();progress=Math.max(0,Math.min(1,value));onFrame(progress);onState(false);}
  function tick(now){id=null;if(!running)return;if(last!==null)progress=Math.min(1,progress+(now-last)*speed/duration);last=now;onFrame(progress);if(progress===1)pause();else if(running)id=request(tick);}
  function play(){if(running)return;if(progress===1)progress=0;last=null;running=true;onState(true);onFrame(progress);if(running)id=request(tick);}
  return {play,pause,seek,setSpeed(value){if(!(value>0&&Number.isFinite(value)))throw Error('Invalid speed');speed=value;last=null;},get running(){return running;},get progress(){return progress;}};
 }
 return {pose,transform,inverse,reflect,visibleSystems,playback};
})();
