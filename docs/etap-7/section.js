/* Audited zr=1 section shared by stages 9 and 10; no visual rescaling. */
'use strict';
function section(alpha,z0){
 const a=alpha*Math.PI/180,t=Math.tan(a);
 if(!(alpha>0&&alpha<90&&z0*z0>4*t&&z0>0))throw Error('Brak odrębnego zamkniętego owalu: wymagane 0 < α < 90° oraz z₀² > 4k tan α (k = 1).');
 const lo=(z0+Math.sqrt(z0*z0-4*t))/2,hi=(z0+Math.sqrt(z0*z0+4*t))/2;
 let l=lo,h=z0;for(let i=0;i<80;i++){const z=(l+h)/2;if(z**3*(z0-z)>t*t)l=z;else h=z}
 const zm=(l+h)/2, f=z=>1/z**2-((z-z0)/t)**2,W=2*Math.sqrt(f(zm)),L=(hi-lo)/Math.sin(a);
 const points=Array.from({length:361},(_,i)=>{const q=2*Math.PI*i/360,z=(hi+lo)/2+(hi-lo)/2*Math.cos(q);return [(z-z0)/t,i%180===0?0:Math.sign(Math.sin(q))*Math.sqrt(Math.max(0,f(z))),z]});
 return{alpha,z0,a,t,lo,hi,zm,L,W,ratio:L/W,points};
}
