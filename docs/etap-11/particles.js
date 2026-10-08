/* Artistic markers on stage 10 lanes. No fluid field or solver. */
'use strict';
globalThis.VortexParticles=(()=>{
 const levels=[{name:'niska',count:48,fps:30,dpr:1,segments:4},{name:'średnia',count:120,fps:45,dpr:1.5,segments:8},{name:'wysoka',count:240,fps:60,dpr:2,segments:12}];
 const capacity=240, positions=new Float64Array(capacity*3),seeds=new Float64Array(capacity);
 for(let i=0;i<capacity;i++)seeds[i]=Vortex.TAU*((i*.6180339887498949)%1);
 function count(level,density){if(!levels[level]||!Number.isFinite(density)||density<0||density>1)throw Error('Niepoprawna jakość lub gęstość cząstek.');return Math.round(levels[level].count*density);}
 function point(t,phase,i,deformation=0,out=[0,0,0]){const a=phase+seeds[i],offset=Vortex.TAU*(i%3)/3,u=t.sign*(a+deformation*.18*Math.sin(3*a+offset)),v=t.sign*(2*a+deformation*.3*Math.sin(2*a+offset))+offset,radial=t.R+t.r*Math.cos(v);out[0]=radial*Math.cos(u);out[1]=radial*Math.sin(u);out[2]=t.center[2]+t.r*Math.sin(v);return out;}
 function update(t,phase,n,deformation=0){if(!Number.isFinite(phase)||!Number.isInteger(n)||n<0||n>capacity||!Number.isFinite(deformation)||deformation<0||deformation>1)throw Error('Niepoprawna faza, deformacja lub liczba cząstek.');
  const p=[0,0,0];for(let i=0;i<n;i++){point(t,phase,i,deformation,p);const j=i*3;positions[j]=p[0];positions[j+1]=p[1];positions[j+2]=p[2];}return positions;
 }
 // Artistic four-turn paths on zr=1. Reflect the evaluated first path:
 // positions and velocities mirror in Sigma without reversing time.
 const surfaceProgress=(phase,i)=>((phase/Vortex.TAU+seeds[i]/Vortex.TAU)%1+1)%1;
 function surfacePointAt(o,frame,range,unit,i,mirrored=false,out=[0,0,0]){
  const z=range.high*(range.low/range.high)**unit,angle=4*Vortex.TAU*unit+seeds[i];
  const p=Stage8.transform([Math.cos(angle)/z,Math.sin(angle)/z,z],o,frame,mirrored);
  for(let k=0;k<3;k++)out[k]=p[k];return out;
 }
 function surfacePoint(o,frame,range,phase,i,mirrored=false,out=[0,0,0]){return surfacePointAt(o,frame,range,surfaceProgress(phase,i),i,mirrored,out);}
 function updateSurface(o,frame,range,phase,n,mirrored=false){if(!Number.isFinite(phase)||!Number.isInteger(n)||n<0||n>capacity||!(range.low>0&&range.high>range.low))throw Error('Niepoprawne parametry spirali powierzchni.');const p=[0,0,0];for(let i=0;i<n;i++){surfacePoint(o,frame,range,phase,i,mirrored,p);positions.set(p,i*3);}return positions;}
 // Bounded timing ring; lowering is one-way until the user chooses quality again.
 function budget(level){let effective=level,index=0,size=0,slow=0;const samples=new Float64Array(120);
  return{add(ms){if(!Number.isFinite(ms)||ms<0)return;samples[index]=ms;index=(index+1)%samples.length;size=Math.min(size+1,samples.length);slow=ms>1000/levels[effective].fps*.75?slow+1:Math.max(0,slow-1);if(slow>=30&&effective>0){effective--;slow=0;}},stats(){const values=Array.from(samples.subarray(0,size)).sort((a,b)=>a-b);return{effective,samples:size,p50:values[Math.floor(size*.5)]??0,p95:values[Math.min(size-1,Math.floor(size*.95))]??0};},get level(){return effective;}};
 }
 return{levels,capacity,positions,seeds,count,point,update,surfaceProgress,surfacePointAt,surfacePoint,updateSurface,budget};
})();
