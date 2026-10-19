/* Lesson page UI: SVG drawings and PL/EN copy. All numbers come from PyramidExtensions. */
'use strict';
(()=>{
 const X=globalThis.PyramidExtensions,$=id=>document.getElementById(id),key='pyramid-education-language';
 let language='pl',step=1,q=11/7; // exact 11/7 until the slider is moved (range inputs snap to their step)
 try{if(localStorage.getItem(key)==='en')language='en';}catch{}
 const T=(pl,en)=>language==='en'?en:pl;
 const num=(v,d=9)=>Number.isFinite(v)?v.toLocaleString(language==='en'?'en-GB':'pl-PL',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';
 const pct=v=>num(100*v,4)+'%';
 const geometry=()=>{const B=11,H=11/q;return{q,B,H,A:B/2,t:H/(B/2)};};
 const C={L:'#d7b991',W:'#70dfca',limit:'#8fb6ff',OI:'#ff9a8b',VI:'#70dfca',MT:'#d7b991',VT:'#c3a6ff',line:'#b5c9d2',text:'#e5eef0'};
 const line=(x1,y1,x2,y2,color,w=3,dash='')=>`<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${color}" stroke-width="${w}"${dash?` stroke-dasharray="${dash}"`:''}/>`;
 const label=(x,y,text,color=C.text,anchor='middle')=>`<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" fill="${color}" font-size="13" text-anchor="${anchor}">${text}</text>`;
 const dot=(x,y,name,color=C.text,dx=8,dy=-6)=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3.5" fill="${color}"/>`+label(x+dx,y+dy,name,color,'start');
 function drawEgg(){
  const g=geometry(),z0=Number($('z0').value),e=X.egg(z0,g.t),svg=$('eggSvg');
  $('z0Value').textContent=num(z0,2);
  if(!e){svg.innerHTML=label(0,0,T(`Brak owalu: potrzeba z₀² > 4t, czyli z₀ > ${num(X.z0Min(g.t),6)}`,`No oval: z₀² > 4t is required, i.e. z₀ > ${num(X.z0Min(g.t),6)}`),'#ffbe86');
   $('eggValues').textContent=T('Poza dziedziną: płaszczyzna nie przecina powierzchni w zamkniętym owalu.','Outside the domain: the plane does not cut a closed oval.');return;}
  // True section in its own plane, one uniform scale (u = k·(x − c), v = y); not an ellipse.
  const scale=340/e.L,c=(e.a+e.b)/2,pts=[];
  for(let i=0;i<=360;i++){const th=i/360*2*Math.PI,x=c+(e.b-e.a)/2*Math.cos(th),y=e.y(x)*Math.sign(Math.sin(th)||1);pts.push(`${(scale*e.k*(x-c)).toFixed(2)},${(-scale*y).toFixed(2)}`);}
  const um=scale*e.k*(e.xm-c),hw=scale*e.W/2,aux=scale*e.L/e.limit/2;
  svg.innerHTML=`<polygon points="${pts.join(' ')}" fill="rgba(215,185,145,.08)" stroke="${C.line}" stroke-width="2"/>`+
   line(-scale*e.L/2,0,scale*e.L/2,0,C.L,4)+label(-scale*e.L/2-12,4,'L',C.L)+
   line(um,-hw,um,hw,C.W,4)+label(um-14,-hw+12,'W',C.W)+
   ($('limitLine').checked?line(um+10,-aux,um+10,aux,C.limit,2,'6 5')+label(um+16,-aux-6,'L/(S/A)',C.limit,'start'):'')+
   label(-210,-132,T(`Owal w płaszczyźnie przekroju · skala ×${num(scale,1)}`,`Oval in its section plane · scale ×${num(scale,1)}`),C.line,'start');
  $('eggValues').textContent=`L = ${num(e.L)} · W = ${num(e.W)} · L/W = ${num(e.LW,12)} · S/A = ${num(e.limit,12)} · φ = ${num(X.PHI,12)} · `+
   T(`L/W od φ: ${pct(e.errorPhi)}; granica S/A od φ: ${pct(X.rel(e.limit,X.PHI))}`,`L/W from φ: ${pct(e.errorPhi)}; limit S/A from φ: ${pct(X.rel(e.limit,X.PHI))}`);
 }
 function drawSphere(){
  const g=geometry(),s=X.sphere(g.B,g.H),svg=$('sphereSvg'),k=Math.min(280/g.B,210/g.H),y=v=>220-k*v,x=v=>k*v;
  const M=[-g.A,0],V=[0,g.H],I=[0,s.r],Tp=[-s.T.fromAxis,s.T.height];
  let html=`<polygon points="${x(-g.A)},${y(0)} ${x(g.A)},${y(0)} ${x(0)},${y(g.H)}" fill="rgba(143,172,194,.1)" stroke="${C.line}" stroke-width="2"/>`+
   `<circle cx="${x(0)}" cy="${y(s.r)}" r="${(k*s.r).toFixed(2)}" fill="rgba(140,160,180,.18)" stroke="#9fb4c4" stroke-width="2"/>`;
  if(step===2||step===4)html+=line(x(0),y(0),x(0),y(s.r),C.OI,4)+label(x(0)-12,y(s.r/2),'r',C.OI,'end')+line(x(0),y(s.r),x(0),y(g.H),C.VI,4)+label(x(0)-12,y((s.r+g.H)/2),'h − r',C.VI,'end');
  if(step>=3)html+=line(x(M[0]),y(0),x(Tp[0]),y(Tp[1]),C.MT,4)+line(x(Tp[0]),y(Tp[1]),x(0),y(g.H),C.VT,4)+line(x(M[0]),y(0),x(0),y(0),C.MT,2,'5 4')+line(x(0),y(s.r),x(Tp[0]),y(Tp[1]),'#9fb4c4',2,'4 4')+
   label(x((M[0]+Tp[0])/2)-10,y(Tp[1]/2),'A',C.MT,'end')+label(x(Tp[0]/2)-10,y((Tp[1]+g.H)/2),'S − A',C.VT,'end')+dot(x(Tp[0]),y(Tp[1]),'T',C.text,-18,-4);
  html+=dot(x(0),y(0),'O',C.text,6,14)+dot(x(0),y(g.H),'V')+dot(x(M[0]),y(0),'M',C.text,-6,16)+dot(x(0),y(s.r),'I');
  svg.innerHTML=html;
  for(const b of document.querySelectorAll('[data-step]'))b.setAttribute('aria-pressed',String(Number(b.dataset.step)===step));
  const lines=[T(`r = A·h/(A+S) = ${num(s.r,12)}`,`r = A·h/(A+S) = ${num(s.r,12)}`),`OI = ${num(s.OI)} · VI = ${num(s.VI)} · VI/OI = ${num(s.VIoverOI,12)} (${pct(s.errorVIOI)})`,
   `MT = A = ${num(s.MT)} · VT = S − A = ${num(s.VT)} · MT/VT = ${num(s.MToverVT,12)} (${pct(s.errorMTVT)})`,T('VI/OI = S/A — ta sama rodzina φ, nie nowe potwierdzenie.','VI/OI = S/A — the same φ family, not a new confirmation.')];
  $('sphereValues').textContent=lines.slice(0,step===1?1:step===2?2:step===3?3:4).join(' · ');
 }
 function drawWhy(){
  const g=geometry(),rows=X.table();
  if(!rows.some(r=>Math.abs(r.p/r.q-g.q)<1e-12))rows.push({...X.ratio(g.q,1),ratio:T(`bieżące q = ${num(g.q,3)}`,`current q = ${num(g.q,3)}`),current:true});
  $('ratioRows').innerHTML=rows.map(r=>`<tr class="${r.current?'current':r.ratio==='11:7'?'main':''}"><td>${r.ratio}</td><td>${num(r.twoBoverH,6)}</td><td>${pct(r.errorPi)}</td><td>${num(r.SA,6)}</td><td>${pct(r.errorPhi)}</td></tr>`).join('');
 }
 function shape(){const g=geometry();$('qValue').textContent=num(g.q,3);
  $('shape').textContent=T(`B = 11, h = ${num(g.H,6)}, t = h/A = ${num(g.t,6)}, S/A = ${num(Math.sqrt(1+g.t*g.t),9)}.`,`B = 11, h = ${num(g.H,6)}, t = h/A = ${num(g.t,6)}, S/A = ${num(Math.sqrt(1+g.t*g.t),9)}.`);}
 function all(){shape();drawEgg();drawSphere();drawWhy();}
 function applyLanguage(){for(const node of document.querySelectorAll('[data-lang]'))node.hidden=node.dataset.lang!==language;
  document.documentElement.lang=language;document.title=T('Rozszerzenia geometryczne · Piramida 11:7','Geometric extensions · Pyramid 11:7');$('language').value=language;all();}
 $('language').addEventListener('change',()=>{language=$('language').value==='en'?'en':'pl';try{localStorage.setItem(key,language);}catch{}applyLanguage();});
 $('q').addEventListener('input',()=>{q=Number($('q').value);all();});
 $('z0').addEventListener('input',all);
 $('limitLine').addEventListener('change',drawEgg);
 for(const b of document.querySelectorAll('[data-z0]'))b.addEventListener('click',()=>{$('z0').value=b.dataset.z0;drawEgg();});
 for(const b of document.querySelectorAll('[data-step]'))b.addEventListener('click',()=>{step=Number(b.dataset.step);drawSphere();});
 $('resetAll').addEventListener('click',()=>{q=11/7;$('q').value=String(q);$('z0').value='7.65';$('limitLine').checked=true;step=1;all();});
 applyLanguage();
})();
