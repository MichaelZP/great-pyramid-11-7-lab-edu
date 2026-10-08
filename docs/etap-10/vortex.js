/* Artistic stage 10 geometry; this is not a fluid solver. Z is world-up. */
'use strict';
globalThis.Vortex = (() => {
 const TAU=2*Math.PI, R=2.4, r=.65;
 const torus=(id,d)=>({id,center:[0,0,7+(id===1?-1:1)*d/2],R,r,sign:id===1?1:-1});
 function pair(d,{scales=[1,1],signs=[1,-1]}={}){if(!Number.isFinite(d)||d<2||d>8)throw Error('Odległość środków musi wynosić 2–8 u.');return[1,2].map((id,i)=>{const s=scales[i],sign=signs[i];if(!Number.isFinite(s)||s<.25||s>2||![1,-1].includes(sign))throw Error('Niepoprawny rozmiar lub kierunek torusa.');return{...torus(id,d),R:R*s,r:r*s,sign};});}
 function point(t,u,v){const radial=t.R+t.r*Math.cos(v);return[radial*Math.cos(u),radial*Math.sin(u),t.center[2]+t.r*Math.sin(v)];}
 function tangent(t,u,v,du,dv){const radial=t.R+t.r*Math.cos(v);return[-radial*Math.sin(u)*du-t.r*Math.sin(v)*Math.cos(u)*dv,radial*Math.cos(u)*du-t.r*Math.sin(v)*Math.sin(u)*dv,t.r*Math.cos(v)*dv];}
 function loop(fn,n=144){return Array.from({length:n+1},(_,i)=>fn(TAU*i/n));}
 function lane(t,phase,offset=0){return point(t,t.sign*phase,t.sign*2*phase+offset);}
 const clamp=x=>Math.max(0,Math.min(1,x));
 const smooth=x=>{const t=clamp(x);return t*t*(3-2*t);};
 function reveal(p){return{torus:smooth((p-.25)/.4),paths:smooth((p-.45)/.3),motion:smooth((p-.75)/.25)};}
 function source(o,variant,q,{extent='section'}={}){
  const frame=Stage8.pose(o,variant,q,1),lines=[],ranges=[];
  for(const mirrored of [false,true]){
   const id=mirrored?2:1,tr=p=>Stage8.transform(p,o,frame,mirrored);
   // Reuse the finite extent with circular bases from stage 7. Its boundary
   // is a rendering limit, not a finite base of the infinite surface zr=1.
   const full=extent!=='section',infinite=extent==='infinite',low=infinite?Math.min(.008*o.z0,frame.scale/24,.8*o.lo):full?Math.min(.08*o.z0,.8*o.lo):Math.max(o.lo/2,o.lo-2*(o.hi-o.lo)),high=full?Math.max(1.5*o.z0,1.1*o.hi):o.hi+2*(o.hi-o.lo);
   ranges.push({id,low,high});
   const zAt=t=>full?low*(high/low)**t:low+(high-low)*t,rings=full?20:12,meridians=full?16:12,samples=full?80:48;
   for(let i=infinite?1:0;i<=rings;i++){const z=zAt(i/rings);lines.push({id,layer:'surface',points:loop(a=>tr([Math.cos(a)/z,Math.sin(a)/z,z]),full?96:72)});}
   for(let i=0;i<meridians;i++){const a=TAU*i/meridians;lines.push({id,layer:'surface',points:Array.from({length:samples+1},(_,j)=>{const z=zAt(j/samples);return tr([Math.cos(a)/z,Math.sin(a)/z,z]);})});}
   if(full&&!infinite)lines.push({id,layer:'base',center:tr([0,0,low]),points:loop(a=>tr([Math.cos(a)/low,Math.sin(a)/low,low]),96)});
   lines.push({id,layer:'section',points:o.points.map(tr)});
   const x=Math.max(Math.abs((o.lo-o.z0)/o.t),Math.abs((o.hi-o.z0)/o.t))*1.2,y=o.W*.7;
   lines.push({id,layer:'plane',points:[[-x,-y],[x,-y],[x,y],[-x,y],[-x,-y]].map(([x,y])=>tr([x,y,o.z0+o.t*x]))});
  }
  return{lines,frame,ranges,section:o};
 }
 function clock({request,cancel,onFrame,onState,duration=12,revealFrame=reveal}){
  let running=false,handle=null,last=null,progress=0,phase=0,speed=1,seconds=0;
  const snapshot=()=>({running,progress,phase,speed,seconds});
  function pause(){if(handle!==null)cancel(handle);handle=null;last=null;running=false;onState(snapshot());}
  function tick(now){handle=null;if(!running)return;
   if(last!==null){const dt=Math.max(0,Math.min(.1,(now-last)/1000)),before=revealFrame(progress).motion;seconds+=dt;progress=Math.min(1,progress+dt/duration);phase=(phase+TAU/8*speed*dt*(before+revealFrame(progress).motion)/2)%TAU;}
   last=now;onFrame(snapshot());if(running)handle=request(tick);
  }
  function play(){if(running)return;running=true;last=null;onState(snapshot());handle=request(tick);}
  function seek(value){pause();progress=clamp(value);phase=0;seconds=0;onFrame(snapshot());onState(snapshot());}
  return{play,pause,seek,reset(){seek(0);},setSpeed(value){if(!Number.isFinite(value)||value<.25||value>3)throw Error('Prędkość musi wynosić 0,25–3×.');speed=value;onState(snapshot());},snapshot};
 }
 return{TAU,R,r,pair,point,tangent,loop,lane,reveal,source,clock};
})();
