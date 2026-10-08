import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const files=['../etap-7/animation.js','../etap-7/section.js','../etap-10/vortex.js','particles.js','extension.js'];
const c=vm.createContext({});for(const file of files.slice(0,4))vm.runInContext(read(file),c);
const G=c.Vortex,P=c.VortexParticles,near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const html=read('podglad.html');
function preview(width=390){
 const elements=new Map(),documentEvents={},windowEvents={},pending=new Map();let next=0;
 const ctx=new Proxy({measureText:text=>({width:text.length*6})},{get:(target,key)=>target[key]??(()=>{}),set:(target,key,v)=>(target[key]=v,true)});
 for(const tag of html.matchAll(/<(?:input|select|button|output|canvas|p|h2)\b[^>]*\bid="([^"]+)"[^>]*>/g)){
  const attributes=tag[0],id=tag[1],events={};let value=attributes.match(/\bvalue="([^"]+)"/)?.[1]??'';
  if(attributes.startsWith('<select')){const body=html.slice(tag.index+attributes.length,html.indexOf('</select>',tag.index));value=(body.match(/<option value="([^"]+)" selected/)??body.match(/<option value="([^"]+)"/))[1];}
  elements.set(id,{value,checked:/\bchecked\b/.test(attributes),textContent:'',disabled:false,events,click:()=>events.click?.(),addEventListener:(name,fn)=>{const old=events[name];events[name]=old?(e)=>{old(e);fn(e);}:fn;},dispatchEvent:e=>events[e.type]?.(e),setPointerCapture:()=>{},getBoundingClientRect:()=>({width:width-56,height:390}),getContext:()=>ctx});
 }
 const media={matches:false,addEventListener:(_,fn)=>media.change=fn};
 let timer=0;const context=vm.createContext({performance:{now:()=>timer},Event:class{constructor(type){this.type=type;}},document:{getElementById:id=>elements.get(id),hidden:false,addEventListener:(name,fn)=>documentEvents[name]=fn},window:{addEventListener:(name,fn)=>windowEvents[name]=fn},devicePixelRatio:1,matchMedia:()=>media,requestAnimationFrame:fn=>{pending.set(++next,fn);return next;},cancelAnimationFrame:id=>pending.delete(id)});
 for(const file of [...files,'../etap-10/preview.js'])vm.runInContext(read(file),context);
 const get=id=>elements.get(id),event=(id,name='input')=>get(id).events[name](),set=(id,value)=>{get(id).value=String(value);event(id);},advance=now=>{timer=now;const callbacks=[...pending.values()];pending.clear();callbacks.forEach(fn=>fn(now));};
 return{get,event,set,advance,pending,media,documentEvents,windowEvents,c:context,snapshot:()=>vm.runInContext('player.snapshot()',context),scene:()=>context.redraw()};
}

test('particles: regular lanes, phase wrap, continuous tangents and preserved theta/psi directions under deformation',()=>{
 for(const t of G.pair(4))for(const deformation of [0,.25,1])for(let i=0;i<12;i++)for(let j=0;j<=96;j++){
  const phase=G.TAU*j/96,point=P.point(t,phase,i,deformation),wrapped=P.point(t,phase+G.TAU,i,deformation);point.forEach((x,k)=>near(x,wrapped[k]));
  near((Math.hypot(point[0],point[1])-t.R)**2+(point[2]-t.center[2])**2,t.r**2);
  if(deformation===0){const base=G.lane(t,phase+P.seeds[i],G.TAU*(i%3)/3);point.forEach((x,k)=>near(x,base[k]));}
  const eps=1e-5,a=P.point(t,phase-eps,i,deformation),b=P.point(t,phase+eps,i,deformation),velocity=b.map((x,k)=>(x-a[k])/(2*eps));
  assert.ok((point[0]*velocity[1]-point[1]*velocity[0])*t.sign>0);
  const radial=Math.hypot(point[0],point[1])-t.R,dr=(Math.hypot(b[0],b[1])-Math.hypot(a[0],a[1]))/(2*eps),z=point[2]-t.center[2];assert.ok((radial*velocity[2]-z*dr)*t.sign>0);
  const seamA=P.point(t,-eps,i,deformation),seamB=P.point(t,G.TAU-eps,i,deformation);seamA.forEach((x,k)=>near(x,seamB[k]));
 }
});
test('fixed capacity, stable identities when density changes and bounded adaptive quality',()=>{
 const buffer=P.positions;for(let j=0;j<2000;j++){const t=G.pair(4)[j%2],phase=j*.01;assert.equal(P.update(t,phase,j%241,j%2),buffer);assert.equal(buffer.length,720);}
 for(const level of [0,1,2]){assert.equal(P.count(level,0),0);assert.equal(P.count(level,1),P.levels[level].count);}
 assert.throws(()=>P.count(2,2));assert.throws(()=>P.update(G.pair(4)[0],0,241));
 const m=P.budget(2);for(let i=0;i<300;i++)m.add(50);assert.equal(m.stats().samples,120);assert.equal(m.level,0);for(let i=0;i<200;i++)m.add(1);assert.equal(m.level,0);
});
test('real DOM: mode presets, continuous parameters, pause, reset, layers and camera ownership',()=>{
 const p=preview(),stats=()=>p.c.VortexPreviewExtension.stats();p.event('circulate','click');p.event('play','click');p.advance(0);p.advance(100);
 p.set('deformation',1);p.set('trail',2);p.set('glow',1);p.set('distance',8);assert.equal(p.pending.size,1);assert.equal(stats().values.distance,4);
 p.advance(200);assert.ok(stats().values.distance>4&&stats().values.distance<8);assert.ok(stats().values.deformation>0&&stats().values.deformation<1);
 p.get('camera').checked=true;p.event('camera','change');const yaw=stats().camera.yaw;p.advance(300);assert.ok(stats().camera.yaw>yaw);
 p.event('pause','click');const frozen=stats(),phase=p.snapshot().phase;p.advance(1000);near(stats().camera.yaw,frozen.camera.yaw);p.scene();near(stats().values.distance,frozen.values.distance);near(stats().values.deformation,frozen.values.deformation);near(p.snapshot().phase,phase);assert.equal(p.pending.size,0);
 p.get('scene').events.keydown({key:'ArrowRight',preventDefault(){}});assert.equal(p.get('camera').checked,false);assert.ok(stats().camera.yaw>frozen.camera.yaw);
 p.event('play','click');p.advance(1100);p.advance(1200);assert.equal(p.get('camera').checked,false);
 p.get('scene').events.pointerdown({button:0,clientX:20,clientY:20,pointerId:1});p.get('scene').events.pointermove({clientX:40,clientY:25,pointerId:1});p.get('scene').events.pointerup({});assert.equal(p.get('camera').checked,false);
 p.get('camera').checked=true;p.event('camera','change');p.get('scene').events.wheel({deltaY:100,preventDefault(){}});assert.equal(p.get('camera').checked,false);
 p.get('mode').value='cinema';p.event('mode','change');assert.equal(p.get('surfaceLayer').checked,false);assert.equal(p.get('trail').value,'0.7');assert.equal(p.get('camera').checked,false);
 p.get('mode').value='education';p.event('mode','change');assert.equal(p.get('surfaceLayer').checked,true);assert.equal(p.get('trail').value,'0');near(p.snapshot().speed,.5);
 p.event('pause','click');p.get('particlesLayer').checked=false;p.event('particlesLayer');assert.ok(!p.scene().some(r=>r.layer==='particles'));assert.equal(p.scene().filter(r=>r.layer==='marker').length,6);
 p.get('labelsLayer').checked=false;p.event('labelsLayer');assert.ok(!p.scene().some(r=>r.layer.endsWith('Arrow')));
 p.get('camera').checked=true;p.get('reduced').checked=true;p.event('reduced','change');assert.equal(p.pending.size,0);assert.equal(p.get('play').disabled,true);assert.equal(p.get('camera').checked,false);
 p.event('reset','click');near(p.snapshot().phase,0);near(p.snapshot().seconds,0);near(p.snapshot().progress,0);near(stats().camera.yaw,Math.PI/6);
});
test('rendering and parameter source cache stay correct across quality, view, presets and invalid source',()=>{
 const p=preview();p.event('circulate','click');
 for(const mode of ['education','cinema']){p.get('mode').value=mode;p.event('mode','change');for(const quality of ['0','1','2']){p.get('quality').value=quality;p.event('quality','change');for(const view of ['side','top','perspective']){p.set('view',view);assert.equal(p.get('error').textContent,'');assert.equal(p.scene().filter(r=>r.layer==='particles').length,2);}}}
 for(const preset of ['pyramid','golden','lange','huntley']){p.get('preset').value=preset;p.event('preset','change');assert.equal(p.get('error').textContent,'');}
 p.set('scaleFactor',.1);p.set('variant','B');assert.equal(p.get('error').textContent,'');
 p.set('alpha',89);p.set('z0',2);assert.ok(p.get('error').textContent);assert.equal(p.scene().length,0);
 p.get('preset').value='pyramid';p.event('preset','change');assert.equal(p.get('error').textContent,'');
});

test('benchmark is bounded, pauses the shared clock and records 30 draws',()=>{const p=preview();p.event('circulate','click');p.event('play','click');p.event('benchmark','click');assert.equal(p.pending.size,0);assert.equal(p.c.VortexPreviewExtension.stats().frames,30);assert.equal(p.c.VortexPreviewExtension.stats().samples,30);});
