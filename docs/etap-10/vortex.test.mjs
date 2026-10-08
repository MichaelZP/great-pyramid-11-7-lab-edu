import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const files=['../etap-7/animation.js','../etap-7/section.js','vortex.js'];
const c=vm.createContext({});for(const file of files)vm.runInContext(read(file),c);
const G=c.Vortex,near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`),vec=(a,b)=>a.forEach((v,i)=>near(v,b[i]));
test('closed torus trajectories, continuous tangents, directions and separation',()=>{
 for(const d of [2,4,8])for(const t of G.pair(d)){
  near(t.center[2],7+(t.id===1?-1:1)*d/2);assert.ok(t.R>t.r);assert.ok(d>2*t.r);
  for(const offset of [0,G.TAU/3,2*G.TAU/3]){
   vec(G.lane(t,0,offset),G.lane(t,G.TAU,offset));
   vec(G.tangent(t,0,offset,t.sign,2*t.sign),G.tangent(t,t.sign*G.TAU,t.sign*2*G.TAU+offset,t.sign,2*t.sign));
   for(let i=0;i<144;i++){
    const phase=G.TAU*i/144,p=G.lane(t,phase,offset);
    // Independent implicit torus equation, not a copy of its parameterization.
    near((Math.hypot(p[0],p[1])-t.R)**2+(p[2]-t.center[2])**2,t.r**2);
    const eps=1e-5,a=G.lane(t,phase-eps,offset),b=G.lane(t,phase+eps,offset),velocity=b.map((v,j)=>(v-a[j])/(2*eps));
    assert.ok((p[0]*velocity[1]-p[1]*velocity[0])*t.sign>0);
    const analytic=G.tangent(t,t.sign*phase,t.sign*2*phase+offset,t.sign,2*t.sign);velocity.forEach((v,j)=>assert.ok(Math.abs(v-analytic[j])<1e-7));
   }
  }
  const a=G.point(t,0,-t.sign*.1),b=G.point(t,0,t.sign*.1);assert.ok((b[2]-a[2])*t.sign>0);
 }
 for(const value of [NaN,1.9,8.1])assert.throws(()=>G.pair(value));
});
test('source retains the surface equation, exact cut and mirror; reveal does not change it',()=>{
 for(const alpha of [Math.atan(14/11)*180/Math.PI,51.795319255897588,51.84,Math.acos(2/(1+Math.sqrt(5)))*180/Math.PI])for(const variant of ['A','B'])for(const q of [.005,.4,2]){
  const o=c.section(alpha,7.65),s=G.source(o,variant,q),first=s.lines.filter(l=>l.id===1),second=s.lines.filter(l=>l.id===2);
  for(let i=0;i<first.length;i++)for(let j=0;j<first[i].points.length;j++){
   const p=first[i].points[j],mirror=second[i].points[j];vec(mirror,[p[0],p[1],14-p[2]]);
   const local=c.Stage8.inverse(p,o,s.frame);
   if(first[i].layer!=='plane')near(local[2]*Math.hypot(local[0],local[1]),1);
   if(first[i].layer!=='surface')near(local[2]-o.z0-o.t*local[0],0);
  }
  const serialized=JSON.stringify(s);for(const p of [0,.25,.45,.65,.75,1]){G.reveal(p);assert.equal(JSON.stringify(G.source(o,variant,q)),serialized);}
 }
 near(G.reveal(0).torus,0);near(G.reveal(.25).torus,0);near(G.reveal(.65).torus,1);near(G.reveal(.75).paths,1);near(G.reveal(.75).motion,0);near(G.reveal(1).motion,1);
});
const html=read('podglad.html');
function preview(width=390){
 const elements=new Map(),documentEvents={},windowEvents={},pending=new Map();let next=0;
 const ctx=new Proxy({measureText:text=>({width:text.length*6})},{get:(target,key)=>target[key]??(()=>{}),set:(target,key,v)=>(target[key]=v,true)});
 for(const tag of html.matchAll(/<(?:input|select|button|output|canvas|p|h2)\b[^>]*\bid="([^"]+)"[^>]*>/g)){
  const attributes=tag[0],id=tag[1],events={};let value=attributes.match(/\bvalue="([^"]+)"/)?.[1]??'';
  if(attributes.startsWith('<select')){const body=html.slice(tag.index+attributes.length,html.indexOf('</select>',tag.index));value=(body.match(/<option value="([^"]+)" selected/)??body.match(/<option value="([^"]+)"/))[1];}
  elements.set(id,{value,checked:/\bchecked\b/.test(attributes),textContent:'',disabled:false,events,addEventListener:(name,fn)=>events[name]=fn,getBoundingClientRect:()=>({width:width-56,height:390}),getContext:()=>ctx});
 }
 const media={matches:false,addEventListener:(_,fn)=>media.change=fn};
 const context=vm.createContext({document:{getElementById:id=>elements.get(id),hidden:false,addEventListener:(name,fn)=>documentEvents[name]=fn},window:{addEventListener:(name,fn)=>windowEvents[name]=fn},devicePixelRatio:1,matchMedia:()=>media,requestAnimationFrame:fn=>{pending.set(++next,fn);return next;},cancelAnimationFrame:id=>pending.delete(id)});
 for(const file of [...files,'preview.js'])vm.runInContext(read(file),context);
 const get=id=>elements.get(id),event=(id,name='input')=>get(id).events[name](),set=(id,value)=>{get(id).value=String(value);event(id);},advance=now=>{const callbacks=[...pending.values()];pending.clear();callbacks.forEach(fn=>fn(now));};
 return{get,event,set,advance,pending,media,documentEvents,windowEvents,c:context,snapshot:()=>vm.runInContext('player.snapshot()',context),scene:()=>context.redraw()};
}
test('real renderer: fixed pyramid/source, layer toggles, arrows, selectors and parameters',()=>{
 for(const width of [320,390,844]){
  const p=preview(width);let pyramid,source;
  for(const progress of [0,25,50,65,75,100])for(const view of ['side','top','perspective']){
   p.set('progress',progress);p.set('view',view);const records=p.scene();assert.equal(p.get('error').textContent,'');
   const a=JSON.stringify(records.filter(l=>l.layer==='pyramid').map(l=>l.points)),b=JSON.stringify(records.filter(l=>l.layer==='section').map(l=>l.points));pyramid??=a;source??=b;assert.equal(a,pyramid);assert.equal(b,source);
   assert.equal(records.filter(l=>l.layer==='marker').length,progress<=45?0:6);
   if(progress>45)for(const id of [1,2]){
    const theta=records.find(l=>l.layer==='thetaArrow'&&l.system===id),psi=records.find(l=>l.layer==='psiArrow'&&l.system===id),sign=id===1?1:-1;
    assert.ok((theta.from[0]*theta.to[1]-theta.from[1]*theta.to[0])*sign>0);assert.ok((psi.to[2]-psi.from[2])*sign>0);
   }
  }
  for(const [toggle,layer] of [['pyramidLayer','pyramid'],['surfaceLayer','surface'],['planeLayer','plane'],['sectionLayer','section'],['torusLayer','torus'],['trajectoryLayer','trajectory'],['linksLayer','link']]){
   p.get(toggle).checked=false;p.event(toggle);const records=p.scene();assert.ok(!records.some(l=>l.layer===layer));if(toggle==='trajectoryLayer')assert.ok(!records.some(l=>l.layer==='marker'||l.layer.endsWith('Arrow')));p.get(toggle).checked=true;p.event(toggle);
  }
  for(const mode of ['first','second','both']){p.set('systems',mode);const records=p.scene();for(const id of [1,2])assert.equal(records.some(l=>l.system===id),mode==='both'||mode===(id===1?'first':'second'));}
  p.set('systems','both');p.set('distance',8);assert.match(p.get('parameters').textContent,/3\.00.*11\.00/);p.set('distance',2);assert.match(p.get('parameters').textContent,/6\.00.*8\.00/);
  for(const preset of ['pyramid','golden','lange','huntley']){p.get('preset').value=preset;p.event('preset','change');assert.equal(p.get('error').textContent,'');}
  p.set('variant','B');p.set('scaleFactor',.08);assert.equal(p.get('error').textContent,'');
 }
});
test('DOM lifecycle: single clock, pause/reset/seek, speed, reduced motion and invalid input',()=>{
 const p=preview();p.event('play','click');p.event('play','click');assert.equal(p.pending.size,1);p.advance(0);
 for(let i=1;i<=90;i++)p.advance(i*100);near(p.snapshot().progress,.75);near(p.snapshot().phase,0);
 for(let i=91;i<=120;i++)p.advance(i*100);near(p.snapshot().progress,1);assert.ok(p.snapshot().phase>0);assert.equal(p.pending.size,1);
 // Allow the next rendered frame to cross a floating-point value just below 1.
 p.advance(12100);assert.equal(p.snapshot().progress,1);assert.match(p.get('motionStatus').textContent,/Przeciwbieżny obieg/);
 p.set('speed',2);let phase=p.snapshot().phase;p.advance(12200);near(p.snapshot().phase-phase,G.TAU/8*2*.1);
 p.event('pause','click');assert.equal(p.pending.size,0);const paused=p.snapshot();p.advance(13000);near(p.snapshot().phase,paused.phase);
 p.event('play','click');p.set('view','top');p.get('surfaceLayer').checked=false;p.event('surfaceLayer');assert.equal(p.pending.size,1);p.set('distance',6);assert.equal(p.pending.size,0);near(p.snapshot().phase,paused.phase);
 p.event('reset','click');near(p.snapshot().progress,0);near(p.snapshot().phase,0);p.set('progress',50);near(p.snapshot().progress,.5);near(p.snapshot().phase,0);
 p.event('circulate','click');p.event('play','click');p.get('reduced').checked=true;p.event('reduced','change');assert.equal(p.pending.size,0);assert.equal(p.get('play').disabled,true);p.event('play','click');assert.equal(p.pending.size,0);p.set('progress',100);
 p.get('reduced').checked=false;p.event('reduced','change');p.event('play','click');p.media.change({matches:true});assert.equal(p.pending.size,0);
 p.get('reduced').checked=false;p.event('reduced','change');p.event('play','click');p.c.document.hidden=true;p.documentEvents.visibilitychange();assert.equal(p.pending.size,0);p.c.document.hidden=false;p.event('play','click');p.windowEvents.pagehide();assert.equal(p.pending.size,0);
 p.set('alpha',89);p.set('z0',2);assert.ok(p.get('error').textContent);assert.equal(p.get('play').disabled,true);assert.equal(p.scene().length,0);
 p.get('preset').value='pyramid';p.event('preset','change');assert.equal(p.get('error').textContent,'');assert.equal(p.get('play').disabled,false);
});
