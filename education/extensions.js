/* Geometric extensions: pure math (no DOM). Same formulas as the lab app
   (src/lib/pyramid/geometric-extensions.ts); values checked against
   geogebra/g6/reference-values.json in extensions.test.mjs. */
'use strict';
globalThis.PyramidExtensions=(()=>{
 const PHI=(1+Math.sqrt(5))/2,TOL=.001;
 const rel=(value,target)=>Math.abs(value-target)/Math.abs(target);
 // Section of z·√(x²+y²)=1 by the plane z=z0+t·x; returns null outside the domain z0²>4t.
 function egg(z0,t){
  if(!(t>0&&z0>0&&z0*z0>4*t))return null;
  const a=(-z0+Math.sqrt(z0*z0-4*t))/(2*t),b=(-z0+Math.sqrt(z0*z0+4*t))/(2*t),g=x=>x*(z0+t*x)**3+t;
  let lo=a,hi=0;for(let i=0;i<200&&hi-lo>0;i++){const m=(lo+hi)/2;if(g(lo)*g(m)<=0)hi=m;else lo=m;}
  const xm=(lo+hi)/2,y2=x=>Math.max(0,1/(z0+t*x)**2-x*x),k=Math.sqrt(1+t*t),L=(b-a)*k,W=2*Math.sqrt(y2(xm)),LW=L/W;
  return{a,b,xm,L,W,LW,limit:k,errorPhi:rel(LW,PHI),y:x=>Math.sqrt(y2(x)),k};
 }
 const z0Min=t=>2*Math.sqrt(t);
 function sphere(B,H){
  const A=B/2,S=Math.hypot(A,H),r=A*H/(A+S),MT=A,VT=S-A;
  return{A,S,r,OI:r,VI:H-r,VIoverOI:(H-r)/r,MT,VT,MToverVT:MT/VT,errorVIOI:rel((H-r)/r,PHI),errorMTVT:rel(MT/VT,PHI),
   T:{fromAxis:A-A*A/S,height:A*H/S},VIoverVO:(H-r)/H};
 }
 const RATIOS=[[3,2],[8,5],[11,7],[14,9],[19,12],[25,16]];
 const ratio=(p,q)=>{const pi=2*p/q,sa=Math.sqrt(1+4/(p/q)**2);return{ratio:`${p}:${q}`,p,q,twoBoverH:pi,errorPi:rel(pi,Math.PI),SA:sa,errorPhi:rel(sa,PHI)};};
 const table=()=>RATIOS.map(([p,q])=>ratio(p,q));
 function continuedFraction(x,n=6){const out=[];for(let i=0;i<n;i++){const a=Math.floor(x);out.push(a);x=1/(x-a);}return out;}
 const intervals=()=>({pi:[Math.PI/2*(1-TOL),Math.PI/2*(1+TOL)],phi:[2/Math.sqrt((PHI*(1+TOL))**2-1),2/Math.sqrt((PHI*(1-TOL))**2-1)]});
 function fractionsIn([lo,hi],maxDen=20){const out=[];for(let q=1;q<=maxDen;q++)for(let p=Math.ceil(lo*q);p<=hi*q;p++){if(gcd(p,q)===1)out.push(`${p}/${q}`);}return out;}
 const gcd=(a,b)=>b?gcd(b,a%b):a;
 return{PHI,TOL,rel,egg,z0Min,sphere,table,ratio,continuedFraction,intervals,fractionsIn};
})();
