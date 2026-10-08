import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const files=['../docs/etap-7/animation.js','../docs/etap-7/section.js','../docs/etap-10/vortex.js','../docs/etap-11/particles.js','en.js','i18n.js','controls.js','stereo.js','show.js','../docs/etap-11/extension.js','../docs/etap-10/preview.js'];
function preview(width=390,{storage=new Map(),storageBlocked=false}={}){
 const elements=new Map(),documentEvents={},windowEvents={},pending=new Map();let next=0,timer=0;
 const ctx=new Proxy({measureText:text=>({width:text.length*6})},{get:(target,key)=>target[key]??(()=>{}),set:(target,key,v)=>(target[key]=v,true)});
 const eventTarget=()=>({events:{},addEventListener(name,fn){(this.events[name]??=[]).push(fn);},dispatchEvent(event){for(const fn of this.events[event.type]??[])fn(event);}});
 const html=read('index.html');
 for(const tag of html.matchAll(/<(?:input|select|button|output|canvas|p|h2|a|span|section)\b[^>]*\bid="([^"]+)"[^>]*>/g)){
  const attributes=tag[0],id=tag[1];let value=attributes.match(/\bvalue="([^"]+)"/)?.[1]??'';
  if(attributes.startsWith('<select')){const body=html.slice(tag.index+attributes.length,html.indexOf('</select>',tag.index));value=(body.match(/<option value="([^"]+)" selected/)??body.match(/<option value="([^"]+)"/))[1];}
  elements.set(id,{...eventTarget(),click(){this.dispatchEvent({type:'click'});},setAttribute(name,value){this[name]=value;},getAttribute(name){return this[name]??null;},'aria-label':attributes.match(/aria-label="([^"]+)"/)?.[1],value,checked:/\bchecked\b/.test(attributes),textContent:'',disabled:false,hidden:/\bhidden\b/.test(attributes),setPointerCapture(){},getBoundingClientRect:()=>({width:width-40,height:430}),getContext:()=>ctx});
 }
 const media={matches:false,addEventListener:(_,fn)=>media.change=fn},classes=new Set();
 const staticNodes=[...html.matchAll(/<([a-z]+)\b([^>]*)>([^<>]+)(?=<)/g)].map(match=>{let value=match[3];const owner=elements.get(match[2].match(/\bid="([^"]+)"/)?.[1]),node={parentElement:{tagName:match[1].toUpperCase()}};Object.defineProperty(node,'nodeValue',{get:()=>value,set:v=>{value=v;if(owner)owner.textContent=v;}});return node;});
 const context=vm.createContext({localStorage:{getItem:k=>{if(storageBlocked)throw Error('Storage denied');return storage.get(k)??null;},setItem:(k,v)=>{if(storageBlocked)throw Error('Storage denied');storage.set(k,v);}},document:{documentElement:{lang:'pl'},title:'',createTreeWalker:()=>{let i=0;return{nextNode:()=>staticNodes[i++]??null};},querySelectorAll:()=>[...elements.values()].filter(e=>e['aria-label']),getElementById:id=>elements.get(id),hidden:false,body:{classList:{toggle:(k,v)=>v?classes.add(k):classes.delete(k),add:k=>classes.add(k),remove:k=>classes.delete(k)}},addEventListener:(name,fn)=>(documentEvents[name]??=[]).push(fn)},window:{addEventListener:(name,fn)=>(windowEvents[name]??=[]).push(fn)},navigator:{hardwareConcurrency:4},innerWidth:width,performance:{now:()=>timer},devicePixelRatio:1,matchMedia:()=>media,Event:class{constructor(type){this.type=type;}},KeyboardEvent:class{constructor(type,init){Object.assign(this,{type,preventDefault(){}},init);}},requestAnimationFrame:fn=>{pending.set(++next,fn);return next;},cancelAnimationFrame:id=>pending.delete(id)});
 for(const file of files)vm.runInContext(read(file),context);
 const get=id=>elements.get(id),event=(id,name='input',init={})=>get(id).dispatchEvent({type:name,...init}),set=(id,value)=>{get(id).value=String(value);event(id);},advance=now=>{timer=now;const callbacks=[...pending.values()];pending.clear();callbacks.forEach(fn=>fn(now));};
 return{get,event,set,advance,pending,media,documentEvents,windowEvents,c:context,ctx,classes,storage,staticNodes,snapshot:()=>vm.runInContext('player.snapshot()',context),scene:()=>context.redraw(),stats:()=>context.VortexPreviewExtension.stats()};
}
test('five cumulative stages retain exact shared source, reflected geometry and approved torus directions',()=>{
 for(const width of [320,390,844,1280]){
  const p=preview(width);p.set('extent','full');p.set('scaleFactor',.4);const o=p.c.section(Number(p.get('alpha').value),7.65),source=p.c.Vortex.source(o,'A',.4,{extent:'full'});
  for(const [progress,ids,torus,particles] of [[0,[],false,false],[36,[1],false,false],[56,[1,2],false,false],[80,[1,2],true,false],[100,[1,2],true,true]]){
   p.set('progress',progress);const records=p.scene();assert.equal(p.get('error').textContent,'');
   assert.deepEqual([...new Set(records.filter(r=>r.layer==='section').map(r=>r.system))],ids);
   for(const r of records.filter(r=>['surface','base','section','plane'].includes(r.layer)))assert.ok(source.lines.some(s=>s.id===r.system&&s.layer===r.layer&&JSON.stringify(s.points)===JSON.stringify(r.points)));
   assert.equal(records.some(r=>r.layer==='torus'),torus);assert.equal(records.some(r=>r.layer==='particles'),particles);
   if(progress===100){for(const layer of ['pyramid','guides','surface','base','section','plane','torus','trajectory','particles'])assert.ok(records.some(r=>r.layer===layer),layer);for(const id of [1,2]){const a=records.find(r=>r.layer==='thetaArrow'&&r.system===id),b=records.find(r=>r.layer==='psiArrow'&&r.system===id),sign=id===1?1:-1;assert.ok((a.from[0]*a.to[1]-a.from[1]*a.to[0])*sign>0);assert.ok((b.to[2]-b.from[2])*sign>0);}}
  }
  for(const [toggle,layer] of [['pyramid','pyramid'],['guides','guides'],['surface','surface'],['surface','base'],['plane','plane'],['section','section'],['torus','torus'],['trajectory','trajectory'],['particles','particles']]){p.get(toggle+'Layer').checked=false;p.event(toggle+'Layer');assert.ok(!p.scene().some(r=>r.layer===layer));p.get(toggle+'Layer').checked=true;p.event(toggle+'Layer');}
 }
});
test('one 20-second clock freezes particles and camera, resets and supports reduced motion',()=>{
 const p=preview();p.event('fullShow','click');p.event('play','click');assert.equal(p.pending.size,1);p.advance(0);for(let i=1;i<=200;i++)p.advance(i*100);assert.ok(Math.abs(p.snapshot().progress-1)<1e-12);assert.ok(p.snapshot().phase>0);
 p.get('camera').checked=true;p.event('camera','change');p.advance(20100);const before=p.stats();p.event('pause','click');const frozen=p.snapshot();p.advance(21000);p.scene();assert.equal(p.pending.size,0);assert.equal(p.snapshot().phase,frozen.phase);assert.equal(p.stats().camera.yaw,before.camera.yaw);
 p.event('play','click');p.event('zoomIn','click');assert.equal(p.get('camera').checked,false);assert.ok(p.stats().camera.zoom>1);
 p.event('reset','click');assert.equal(p.snapshot().progress,0);assert.equal(p.snapshot().phase,0);assert.equal(p.stats().camera.zoom,1);
 p.get('reduced').checked=true;p.event('reduced','change');p.event('fullShow','click');assert.equal(p.pending.size,0);p.set('progress',100);assert.ok(p.scene().some(r=>r.layer==='particles'));
 p.get('camera').checked=true;p.event('camera','change');assert.equal(p.get('camera').checked,false);p.get('reduced').checked=false;p.event('reduced','change');p.event('fullShow','click');p.c.document.hidden=true;for(const fn of p.documentEvents.visibilitychange)fn();assert.equal(p.pending.size,0);
});
test('recording preset keeps construction visible; clean view restores controls; quality has fixed buffers',()=>{
 const p=preview();p.get('mode').value='cinema';p.event('mode','change');p.event('circulate','click');
 for(const layer of ['surface','plane','section','pyramid','guides'])assert.equal(p.get(layer+'Layer').checked,true);
 assert.equal(p.stats().values.deformation,0);p.event('recordView','click');assert.ok(p.classes.has('recording-view'));p.event('exitRecord','click');assert.ok(!p.classes.has('recording-view'));
 for(const quality of ['0','1','2']){p.get('quality').value=quality;p.event('quality','change');assert.ok(p.stats().drawn<=4*p.c.VortexParticles.levels[quality].count);assert.equal(p.stats().bufferBytes,7680);}
 assert.equal(p.get('recordDemo').disabled,true);assert.match(p.get('recordStatus').textContent,/nie obsługuje/);
});
test('scale control uses a uniform similarity about V for both mirrored cuts and pauses the shared clock',()=>{
 const p=preview();p.set('extent','full');p.set('scaleFactor',.4);p.event('circulate','click');p.event('play','click');p.advance(0);p.advance(100);
 const baseline=p.scene(),source=baseline.filter(r=>['surface','base','plane','section'].includes(r.layer)),fixed=JSON.stringify(baseline.filter(r=>['pyramid','torus','trajectory','particles','marker'].includes(r.layer))),phase=p.snapshot().phase;
 for(const q of [.005,.08,.4,1,2]){
  p.set('scaleFactor',q);const records=p.scene(),scaled=records.filter(r=>['surface','base','plane','section'].includes(r.layer));
  assert.equal(p.get('error').textContent,'');assert.equal(p.pending.size,0);assert.equal(p.snapshot().progress,1);assert.equal(p.snapshot().phase,phase);
  assert.equal(scaled.length,source.length);
  for(let i=0;i<source.length;i++)for(let j=0;j<source[i].points.length;j++)for(let k=0;k<3;k++){const center=k===2?7:0,expected=center+(source[i].points[j][k]-center)*q/.4;assert.ok(Math.abs(scaled[i].points[j][k]-expected)<1e-8);}
  assert.equal(JSON.stringify(records.filter(r=>['pyramid','torus','trajectory','particles','marker'].includes(r.layer))),fixed);
  assert.match(p.get('sourceNumbers').textContent,/L\/W=1\.619742961/);
 }
 assert.equal(p.get('scaleValue').textContent,'200%');p.event('fullShow','click');assert.equal(p.get('scaleFactor').value,'2');p.event('scaleReset','click');assert.equal(p.get('scaleFactor').value,'.055');assert.equal(p.get('scaleValue').textContent,'5,5%');assert.equal(p.pending.size,0);
});

test('complete finite surfaces and circular bases fit all scale values, views and rotated cameras',()=>{
 for(const width of [320,390,844,1280]){
  const p=preview(width),o=p.c.section(Number(p.get('alpha').value),7.65);p.set('cameraFrame','fit');p.set('extent','full');p.event('circulate','click');
  for(const q of [.005,.08,.4,1,2]){
   p.set('scaleFactor',q);const source=p.c.Vortex.source(o,'A',q,{extent:'full'}),bounds=p.c.VortexPresentation.framing(source);
   for(const id of [1,2]){
    const base=source.lines.find(r=>r.layer==='base'&&r.id===id),local=p.c.Stage8.inverse(base.points[0],o,source.frame,id===2);
    assert.ok(Math.abs(local[2]-Math.min(.08*o.z0,.8*o.lo))<1e-10);
    const radius=Math.hypot(base.points[0][0]-base.center[0],base.points[0][1]-base.center[1]);
    for(const point of base.points){assert.ok(Math.abs(Math.hypot(point[0]-base.center[0],point[1]-base.center[1])-radius)<1e-9);assert.equal(point[2],base.center[2]);}
    for(const r of source.lines.filter(r=>r.id===id&&['surface','base','section'].includes(r.layer)))for(const point of r.points){const v=p.c.Stage8.inverse(point,o,source.frame,id===2);assert.ok(Math.abs(v[2]*Math.hypot(v[0],v[1])-1)<1e-9);}
   }
   for(const view of ['perspective','side','top'])for(const rotation of [0,250,-400]){
    p.set('view',view);p.event('scene','pointerdown',{pointerId:1,clientX:0,clientY:0});p.event('scene','pointermove',{pointerId:1,clientX:rotation,clientY:rotation});p.event('scene','pointerup');
    const project=p.c.projection(view,width-40,430,bounds);
    for(const r of p.scene())for(const point of r.points??(r.point?[r.point]:[])){const [x,y]=project(point);assert.ok(Number.isFinite(x)&&Number.isFinite(y));assert.ok(x>=31.9&&x<=width-40-31.9,`${q} ${view}: X ${x}`);assert.ok(y>=27.9&&y<=430-75-27.9,`${q} ${view}: Y ${y}`);}
   }
  }
  p.set('view','perspective');p.event('zoomIn','click');const zoom=p.stats().camera.zoom;assert.ok(zoom>1);p.set('scaleFactor',.1);assert.equal(p.stats().camera.zoom,zoom);
 }
});

test('cone scaling and extent changes preserve pyramid pixels and camera in the fixed construction frame',()=>{
 for(const width of [320,390,844,1280]){
  const p=preview(width);p.event('circulate','click');p.event('zoomIn','click');
  for(const view of ['perspective','side','top']){
   p.set('view',view);
   const pixels=()=>{const o=p.c.section(Number(p.get('alpha').value),7.65),source=p.c.Vortex.source(o,'A',Number(p.get('scaleFactor').value),p.c.VortexPresentation.sourceOptions()),project=p.c.projection(view,width-40,430,p.c.VortexPresentation.framing(source));return JSON.stringify(p.scene().filter(r=>['pyramid','torus'].includes(r.layer)).map(r=>r.points.map(project)));};
   const baseline=pixels(),camera=JSON.stringify(p.stats().camera);
   for(const extent of ['full','infinite','section'])for(const q of [.005,.055,.08,.4,1,2]){p.set('extent',extent);p.set('scaleFactor',q);assert.equal(pixels(),baseline);assert.equal(JSON.stringify(p.stats().camera),camera);}
  }
  p.event('referenceView','click');assert.equal(p.get('scaleFactor').value,'.055');assert.equal(p.get('cameraFrame').value,'fixed');assert.equal(p.get('extent').value,'infinite');assert.equal(p.snapshot().progress,1);assert.equal(p.snapshot().running,false);
  assert.ok(p.scene().some(r=>r.layer==='asymptote'));assert.ok(!p.scene().some(r=>r.layer==='base'));
 }
});

test('spiral particles lie on zr=1 and mirror both positions and velocity using the shared clock and buffer',()=>{
 const p=preview(),o=p.c.section(Number(p.get('alpha').value),7.65),P=p.c.VortexParticles;
 for(const extent of ['full','infinite','section'])for(const q of [.005,.055,.4,2]){
  const source=p.c.Vortex.source(o,'A',q,{extent}),range=source.ranges[0];
  for(const phase of [.27,2.1,5.9])for(const i of [0,1,13,47,119,239]){
   const first=P.surfacePoint(o,source.frame,range,phase,i),second=P.surfacePoint(o,source.frame,range,phase,i,true),local=p.c.Stage8.inverse(first,o,source.frame);
   assert.ok(Math.abs(Math.hypot(local[0],local[1])*local[2]-1)<1e-9);
   assert.deepEqual(Array.from(second),Array.from(p.c.Stage8.reflect(first)));
   const epsilon=1e-6,next=P.surfacePoint(o,source.frame,range,phase+epsilon,i),nextMirror=P.surfacePoint(o,source.frame,range,phase+epsilon,i,true);
   assert.ok(first[0]*next[1]-first[1]*next[0]>0);assert.ok(next[2]<first[2]);assert.ok(nextMirror[2]>second[2]);
   for(let k=0;k<3;k++)assert.ok(Math.abs((next[k]-first[k])-(k===2?-1:1)*(nextMirror[k]-second[k]))<1e-10);
   const wrapped=P.surfacePoint(o,source.frame,range,phase+p.c.Vortex.TAU,i);for(let k=0;k<3;k++)assert.ok(Math.abs(first[k]-wrapped[k])<1e-9);
  }
  assert.equal(P.updateSurface(o,source.frame,range,.27,240),P.positions);assert.throws(()=>P.updateSurface(o,source.frame,range,.27,241));
 }
 p.event('circulate','click');const initial=p.scene().filter(r=>r.layer==='coneParticles');assert.equal(initial.length,2);assert.deepEqual(Array.from(initial[1].point),Array.from(p.c.Stage8.reflect(initial[0].point)));
 p.event('play','click');p.advance(0);p.advance(100);const moving=p.scene().filter(r=>r.layer==='coneParticles');assert.notDeepEqual(moving[0].point,initial[0].point);assert.equal(p.pending.size,1);
 p.event('pause','click');const frozen=JSON.stringify(p.scene().filter(r=>r.layer==='coneParticles'));p.advance(300);assert.equal(JSON.stringify(p.scene().filter(r=>r.layer==='coneParticles')),frozen);
 p.get('coneParticlesLayer').checked=false;p.event('coneParticlesLayer');assert.ok(!p.scene().some(r=>r.layer==='coneParticles'));assert.ok(p.scene().some(r=>r.layer==='particles'));
 p.get('coneParticlesLayer').checked=true;p.event('coneParticlesLayer');p.get('particlesLayer').checked=false;p.event('particlesLayer');assert.ok(p.scene().some(r=>r.layer==='coneParticles'));assert.ok(!p.scene().some(r=>r.layer==='particles'));
 p.get('reduced').checked=true;p.event('reduced','change');p.event('fullShow','click');assert.equal(p.pending.size,0);p.set('progress',100);assert.equal(p.scene().filter(r=>r.layer==='coneParticles').length,2);
});

test('each direction reverses only its own particles and marker without a position jump; pause and reset share one clock',()=>{
 for(const type of ['cone','torus'])for(const id of [1,2]){
  const p=preview();p.event('circulate','click');p.event('play','click');p.advance(0);p.advance(100);
  const C=p.c.VortexControls,phases=()=>['cone','torus'].flatMap(t=>[1,2].map(i=>C.phase(t,i))),before=phases(),records=p.scene(),positions=records.filter(r=>['particles','coneParticles','marker'].includes(r.layer)).map(r=>Array.from(r.point));
  p.set(type+'Direction'+id,-Number(p.get(type+'Direction'+id).value));
  assert.equal(p.snapshot().running,false);assert.equal(p.pending.size,0);assert.deepEqual(phases(),before);
  assert.deepEqual(p.scene().filter(r=>['particles','coneParticles','marker'].includes(r.layer)).map(r=>Array.from(r.point)),positions);
  p.advance(200);assert.deepEqual(phases(),before);p.event('play','click');p.advance(200);p.advance(300);
  const after=phases(),TAU=p.c.Vortex.TAU,delta=(p.snapshot().phase-records.find(r=>r.layer==='coneParticles'&&r.system===1).phase+TAU)%TAU;
  assert.ok(delta>0);for(let i=0;i<4;i++){const reversed=i===(type==='cone'?id-1:id+1),expected=(before[i]+(reversed?-delta:delta)+TAU)%TAU;assert.ok(Math.abs(after[i]-expected)<1e-10);}
  for(const r of p.scene().filter(r=>['particles','coneParticles'].includes(r.layer))){const t=r.layer==='particles'?'torus':'cone';assert.equal(r.phase,C.phase(t,r.system));assert.equal(r.direction,C.multiplier(t,r.system));}
  if(type==='torus'){const arrows=p.scene().filter(r=>r.layer==='thetaArrow'&&r.system===id),sign=Number(p.get('torusDirection'+id).value);assert.ok(arrows.every(a=>(a.from[0]*a.to[1]-a.from[1]*a.to[0])*sign>0));assert.match(p.get('torusLegend'+id).textContent,sign>0?/θ\+/:/θ−/);}
  p.event('reset','click');assert.deepEqual(phases(),[0,0,0,0]);assert.equal(p.pending.size,0);
 }
});

test('torus size and separation affect only toruses, preserve ring proportions and feed particles and fit framing',()=>{
 const p=preview();p.event('circulate','click');const fixed=()=>JSON.stringify(p.scene().filter(r=>['pyramid','section','plane','surface'].includes(r.layer))),original=fixed();
 for(const [a,b,d] of [[.25,2,2],[2,.25,8],[1.5,.8,5.2]]){
  p.set('torusScale1',a);p.set('torusScale2',b);p.set('distance',d);const pair=p.c.currentPair(d);assert.equal(fixed(),original);
  assert.equal(pair[0].center[2],7-d/2);assert.equal(pair[1].center[2],7+d/2);assert.equal(p.stats().values.distance,d);
  for(const t of pair){assert.equal(t.R,2.4*(t.id===1?a:b));assert.equal(t.r,.65*(t.id===1?a:b));assert.ok(Math.abs(t.R/t.r-2.4/.65)<1e-12);
   for(const r of p.scene().filter(r=>r.system===t.id&&['torus','trajectory','marker','particles'].includes(r.layer)))for(const x of r.points??[r.point])assert.ok(Math.abs(Math.hypot(Math.hypot(x[0],x[1])-t.R,x[2]-t.center[2])-t.r)<2e-6);
  }
  p.set('cameraFrame','fit');const o=p.c.section(Number(p.get('alpha').value),7.65),source=p.c.Vortex.source(o,'A',.055,{extent:'infinite'}),bounds=p.c.VortexPresentation.framing(source);assert.ok(bounds.radial>=Math.max(...pair.map(t=>t.R+t.r)));assert.ok(bounds.vertical>=Math.max(...pair.map(t=>Math.abs(t.center[2]-7)+t.r)));p.set('cameraFrame','fixed');
 }
 p.set('coneDirection1',-1);p.set('torusDirection2',1);p.event('motionDefaults','click');assert.equal(p.get('distance').value,'4');assert.equal(p.stats().values.distance,4);for(const id of [1,2]){assert.equal(p.get('torusScale'+id).value,'1');assert.equal(p.get('coneDirection'+id).value,'1');assert.equal(p.get('torusDirection'+id).value,id===1?'1':'-1');}assert.equal(p.snapshot().progress,1);assert.equal(p.get('scaleFactor').value,'.055');
});

test('Golden Egg lathe meshes close at the tips, retain exact oval meridians and mirror with uniform cone scale',()=>{
 const p=preview(),o=p.c.section(Number(p.get('alpha').value),7.65),C=p.c.VortexControls;let baseline;
 for(const q of [.055,.4,1]){const source=p.c.Vortex.source(o,'A',q,{extent:'full'}),faces=C.eggs(o,source);assert.equal(faces.length,1536);assert.equal(C.eggs(o,source),faces);
  const first=faces.filter(f=>f.id===1),second=faces.filter(f=>f.id===2);assert.equal(first.length,768);
  for(let i=0;i<first.length;i++)for(let j=0;j<4;j++){assert.deepEqual(Array.from(second[i].points[j]),Array.from(p.c.Stage8.reflect(first[i].points[j])));if(baseline)for(let k=0;k<3;k++){const center=k===2?7:0;assert.ok(Math.abs(first[i].points[j][k]-(center+(baseline[i].points[j][k]-center)*q/.055))<1e-9);}}
  for(const j of [0,12])for(let i=0;i<32;i++)for(const index of [0,1]){const v=p.c.Stage8.inverse(first[i*24+j].points[index],o,source.frame);assert.ok(Math.abs(v[2]-o.t*v[0]-o.z0)<1e-9);assert.ok(Math.abs(v[2]*Math.hypot(v[0],v[1])-1)<1e-9);}
  for(const tip of [first[0].points[0],first[31*24].points[1]]){const v=p.c.Stage8.inverse(tip,o,source.frame);assert.equal(v[1],0);}
  for(let j=1;j<24;j++){assert.deepEqual(Array.from(first[j].points[0]),Array.from(first[0].points[0]));assert.deepEqual(Array.from(first[31*24+j].points[1]),Array.from(first[31*24].points[1]));}
  if(!baseline)baseline=first;
 }
});

test('egg layers and individual transparency work independently of the exact sections and pause the common presentation',()=>{
 const p=preview();p.event('circulate','click');const sections=()=>JSON.stringify(p.scene().filter(r=>r.layer==='section')),baseline=sections();assert.ok(!p.scene().some(r=>r.layer==='egg'));
 for(const id of [1,2]){p.get('egg'+id+'Layer').checked=true;p.event('egg'+id+'Layer');}assert.equal(p.scene().filter(r=>r.layer==='egg').length,2);
 for(const id of [1,2]){p.event('play','click');p.set('eggTransparency'+id,0);assert.equal(p.snapshot().running,false);assert.equal(p.scene().find(r=>r.layer==='egg'&&r.system===id).alpha,1);p.set('eggTransparency'+id,100);assert.ok(!p.scene().some(r=>r.layer==='egg'&&r.system===id));p.set('eggTransparency'+id,65);assert.equal(p.scene().find(r=>r.layer==='egg'&&r.system===id).alpha,.35);
  p.set('surfaceTransparency'+id,100);assert.ok(!p.scene().some(r=>r.layer==='surface'&&r.system===id));assert.ok(p.scene().some(r=>r.layer==='surface'&&r.system!==id));assert.equal(sections(),baseline);p.set('surfaceTransparency'+id,50);assert.ok(Math.abs(p.scene().find(r=>r.layer==='surface'&&r.system===id).alpha-.19)<1e-12);p.set('surfaceTransparency'+id,0);
 }
 p.set('progress',36);assert.equal(p.scene().filter(r=>r.layer==='egg').length,1);p.set('progress',56);assert.equal(p.scene().filter(r=>r.layer==='egg').length,2);
});

test('cross-eye renders both eyes from identical geometry, egg meshes and particle phases with one clock and one caption',()=>{
 const p=preview(1280);p.set('extent','section');p.set('scaleFactor',.4);p.event('circulate','click');for(const id of [1,2]){p.get('egg'+id+'Layer').checked=true;p.event('egg'+id+'Layer');}
 const mono=JSON.stringify(p.scene()),count=p.stats().drawn,phases=JSON.stringify(p.snapshot());p.event('crossEye','click');assert.equal(p.get('crossEye')['aria-pressed'],'true');assert.equal(p.get('reverseDepth').disabled,false);assert.equal(p.snapshot().running,false);assert.equal(p.pending.size,0);
 const texts=[];p.ctx.fillText=t=>texts.push(t);const stereo=p.scene(),strip=r=>{const {pane,eye,...record}=r;return record;};
 for(const index of [0,1])assert.equal(JSON.stringify(stereo.filter(r=>r.pane===index).map(strip)),mono);
 assert.equal(stereo[0].eye,1);assert.equal(stereo.find(r=>r.pane===1).eye,-1);assert.equal(p.stats().drawn,count*2);assert.equal(p.stats().bufferBytes,7680);assert.equal(JSON.stringify(p.snapshot()),phases);
 assert.equal(texts.filter(t=>t.startsWith('Wizualizacja artystyczna')).length,1);assert.equal(texts.filter(t=>t.startsWith('Koncepcja:')).length,1);
 p.event('play','click');assert.equal(p.pending.size,1);p.advance(0);p.advance(100);let records=p.scene();for(const layer of ['coneParticles','particles','marker'])for(const id of [1,2]){const a=records.find(r=>r.pane===0&&r.layer===layer&&r.system===id),b=records.find(r=>r.pane===1&&r.layer===layer&&r.system===id);assert.equal(JSON.stringify(a.point),JSON.stringify(b.point));assert.equal(a.phase,b.phase);}
 p.event('pause','click');const frozen=JSON.stringify(p.scene());p.advance(400);assert.equal(JSON.stringify(p.scene()),frozen);p.event('reverseDepth','click');assert.equal(p.c.VortexStereo.panes(1240,430)[0].eye,-1);assert.equal(p.pending.size,0);
 p.event('crossEye','click');assert.equal(p.get('reverseDepth').disabled,true);assert.ok(!p.scene().some(r=>'eye' in r));p.event('reset','click');assert.equal(p.snapshot().phase,0);
});

test('stereo cameras have depth-dependent disparity, equal vertical coordinates, eye reversal and bounded fit at phone sizes',()=>{
 for(const width of [320,390,844,1280]){const p=preview(width),S=p.c.VortexStereo;p.event('crossEye','click');p.set('extent','full');p.set('scaleFactor',.055);p.set('cameraFrame','fit');p.event('circulate','click');
  const source=p.c.Vortex.source(p.c.section(Number(p.get('alpha').value),7.65),'A',.055,{extent:'full'}),frame=p.c.VortexPresentation.framing(source),camera=p.stats().camera,w=(width-40)/2,h=430;
  for(const view of ['perspective','side','top'])for(const strength of [0,1,2]){p.set('stereoDepth',strength);const right=S.project(view,w,h,frame,camera,1),left=S.project(view,w,h,frame,camera,-1);
   assert.equal(JSON.stringify(right([0,0,7])),JSON.stringify(left([0,0,7])));
   for(const point of [[1,2,3],[-3,4,10],[5,1,2]]){assert.equal(right(point)[1],left(point)[1]);if(strength===0)assert.equal(JSON.stringify(right(point)),JSON.stringify(left(point)));}
   for(const r of p.scene())for(const point of r.points??(r.point?[r.point]:[])){const a=right(point);assert.ok(a[0]>=15.9&&a[0]<=w-15.9);assert.ok(a[1]>=27.9&&a[1]<=h-75-27.9);}
   const yaw=camera.yaw,ce=Math.cos(camera.elevation),se=Math.sin(camera.elevation),near=view==='top'?[0,0,9]:view==='side'?[0,2,7]:[2*ce*Math.sin(yaw),2*ce*Math.cos(yaw),7+2*se],far=near.map((v,k)=>2*(k===2?7:0)-v);
   const disparity=point=>right(point)[0]-left(point)[0];if(strength>0){assert.ok(disparity(near)<0);assert.ok(disparity(far)>0);}else assert.equal(disparity(near),0);
  }
 }
});

test('full-screen fallback exits with Escape and reduced motion retains stereo snapshots without animation',()=>{
 const p=preview(320);p.event('crossEye','click');p.event('stereoFullscreen','click');assert.ok(p.classes.has('scene-fullscreen'));assert.equal(p.get('stereoFullscreen').textContent,'Wyjdź z pełnego ekranu');p.event('stereoTransport','click');assert.equal(p.snapshot().running,true);assert.equal(p.pending.size,1);assert.equal(p.get('stereoTransport').textContent,'Pauza sceny');p.event('stereoTransport','click');assert.equal(p.snapshot().running,false);assert.equal(p.pending.size,0);for(const fn of p.documentEvents.keydown)fn({key:'Escape'});assert.ok(!p.classes.has('scene-fullscreen'));
 p.event('stereoFullscreen','click');p.event('stereoFullscreen','click');assert.ok(!p.classes.has('scene-fullscreen'));p.get('reduced').checked=true;p.event('reduced','change');p.event('fullShow','click');assert.equal(p.pending.size,0);p.set('progress',100);assert.ok(p.scene().some(r=>r.pane===1&&r.layer==='coneParticles'));p.event('recordView','click');assert.ok(p.classes.has('recording-view'));assert.equal(p.c.VortexStereo.enabled(),true);p.event('exitRecord','click');assert.equal(p.c.VortexStereo.enabled(),true);
});

test('reference plane stays midway between tori, follows their radii and preserves source geometry, stereo and one clock',()=>{
 const p=preview(390);p.set('progress',56);assert.ok(!p.scene().some(r=>r.layer==='midplane'));p.set('progress',100);
 const keep=records=>JSON.stringify(records.filter(r=>r.layer!=='midplane')),before=keep(p.scene());
 const disk=p.scene().find(r=>r.layer==='midplane');assert.equal(disk.points.length,73);
 for(const point of disk.points){assert.equal(point[2],7);assert.ok(Math.abs(Math.hypot(point[0],point[1])-1.08*3.05)<1e-10);}
 p.get('midplaneLayer').checked=false;p.event('midplaneLayer');assert.ok(!p.scene().some(r=>r.layer==='midplane'));assert.equal(keep(p.scene()),before);
 p.get('midplaneLayer').checked=true;p.event('midplaneLayer');p.set('midplaneTransparency',100);assert.ok(!p.scene().some(r=>r.layer==='midplane'));assert.equal(keep(p.scene()),before);
 p.set('midplaneTransparency',0);assert.equal(p.scene().find(r=>r.layer==='midplane').alpha,1);p.set('midplaneTransparency',85);
 const original=JSON.stringify(p.scene().find(r=>r.layer==='midplane').points);p.set('distance',8);assert.equal(JSON.stringify(p.scene().find(r=>r.layer==='midplane').points),original);
 p.set('scaleFactor',1);assert.equal(JSON.stringify(p.scene().find(r=>r.layer==='midplane').points),original);p.set('torusScale2',2);
 const enlarged=p.scene().find(r=>r.layer==='midplane');for(const point of enlarged.points){assert.equal(point[2],7);assert.ok(Math.abs(Math.hypot(point[0],point[1])-1.08*6.1)<1e-10);}
 const shifted=p.c.VortexControls.midplane([{center:[2,-3,5],R:2,r:.5},{center:[2,-3,13],R:3,r:.7}]);assert.deepEqual(Array.from(shifted.center),[2,-3,9]);assert.ok(shifted.points.every(point=>point[2]===9));
 p.event('crossEye','click');const eyes=p.scene().filter(r=>r.layer==='midplane');assert.equal(eyes.length,2);assert.equal(JSON.stringify(eyes[0].points),JSON.stringify(eyes[1].points));assert.notEqual(eyes[0].eye,eyes[1].eye);
 p.event('play','click');p.advance(0);p.advance(100);assert.equal(p.pending.size,1);const phase=p.snapshot().phase,buffer=p.c.VortexParticles.positions;
 p.set('midplaneTransparency',60);assert.equal(p.pending.size,0);assert.equal(p.snapshot().phase,phase);assert.equal(p.c.VortexParticles.positions,buffer);
 p.get('midplaneLayer').checked=false;p.event('midplaneLayer');p.event('fullShow','click');assert.equal(p.get('midplaneLayer').checked,true);p.event('pause','click');p.set('progress',100);
 p.get('language').value='en';p.event('language','change');assert.equal(p.get('midplaneTransparencyValue').textContent,'60%');const labels=[];p.ctx.fillText=text=>labels.push(text);p.scene();assert.ok(labels.includes('Z=7.0'));
});

test('PL/EN switches text and Canvas captions without changing geometry, clock, stereo or live camera state',()=>{
 const p=preview(1280);p.set('extent','section');p.set('scaleFactor',.4);p.event('circulate','click');p.event('crossEye','click');p.get('egg1Layer').checked=true;p.event('egg1Layer');p.set('torusScale2',1.5);p.set('coneDirection1',-1);p.get('camera').checked=true;p.event('camera','change');p.event('play','click');p.advance(0);p.advance(100);
 const scene=JSON.stringify(p.scene()),snapshot=JSON.stringify(p.snapshot()),camera=JSON.stringify(p.stats().camera),buffer=p.c.VortexParticles.positions;
 const language=code=>{p.get('language').value=code;p.event('language','change');};language('en');assert.equal(p.c.document.documentElement.lang,'en');assert.match(p.c.document.title,/Full show/);assert.equal(p.pending.size,1);assert.equal(JSON.stringify(p.snapshot()),snapshot);assert.equal(JSON.stringify(p.stats().camera),camera);assert.equal(JSON.stringify(p.scene()),scene);assert.equal(p.c.VortexParticles.positions,buffer);
 assert.equal(p.get('fullShow').textContent,'Full show');assert.match(p.get('stage').textContent,/Full shared scene/);assert.match(p.get('motionStatus').textContent,/Particles circulating/);assert.match(p.get('cameraStatus').textContent,/Automatic camera enabled/);assert.match(p.get('sourceNumbers').textContent,/section is an oval, not an ellipse/);assert.match(p.get('qualityStatus').textContent,/Effective quality/);assert.match(p.get('stereoInfo').textContent,/cross your eyes/);assert.equal(p.get('scaleValue').textContent,'40%');assert.equal(p.get('zoomIn').getAttribute('aria-label'),'Zoom in');
 const texts=[];p.ctx.fillText=t=>texts.push(t);p.scene();assert.ok(texts.includes('Right eye'));assert.ok(texts.includes('Left eye'));assert.ok(texts.includes('Artistic visualization of counter-rotating toroidal vortices'));assert.ok(texts.includes('Concept: Michał Przybylski — prylski.dev'));
 language('pl');assert.equal(p.get('fullShow').textContent,'Pełny pokaz');assert.equal(p.get('zoomIn').getAttribute('aria-label'),'Przybliż kamerę');assert.equal(JSON.stringify(p.scene()),scene);assert.equal(p.pending.size,1);p.event('pause','click');language('en');assert.equal(p.pending.size,0);assert.match(p.get('motionStatus').textContent,/Paused/);p.event('recordView','click');assert.ok(p.classes.has('recording-view'));assert.match(p.get('recordStatus').textContent,/does not support Canvas recording/);
});

test('language preference survives reload, works without storage and translates new messages rather than freezing the old state',()=>{
 const p=preview();p.get('language').value='en';p.event('language','change');assert.equal(p.storage.get('pyramid-education-language'),'en');const reloaded=preview(390,{storage:p.storage});assert.equal(reloaded.get('language').value,'en');assert.equal(reloaded.c.document.documentElement.lang,'en');assert.equal(reloaded.get('fullShow').textContent,'Full show');assert.equal(reloaded.get('scaleValue').textContent,'5.5%');
 reloaded.event('fullShow','click');assert.match(reloaded.get('motionStatus').textContent,/Show playing/);reloaded.event('pause','click');assert.match(reloaded.get('motionStatus').textContent,/Paused/);reloaded.set('scaleFactor',0);assert.equal(reloaded.get('error').textContent,'Scale q must be 0.005–2.');reloaded.get('language').value='pl';reloaded.event('language','change');assert.equal(reloaded.get('error').textContent,'Skala q musi wynosić 0,005–2.');
 const blocked=preview(320,{storageBlocked:true});blocked.get('language').value='en';blocked.event('language','change');assert.equal(blocked.get('fullShow').textContent,'Full show');assert.equal(blocked.c.document.documentElement.lang,'en');assert.equal(blocked.get('scaleValue').textContent,'5.5%');const invalid=preview(320,{storage:new Map([['pyramid-education-language','xx']])});assert.equal(invalid.get('language').value,'pl');
});

test('English copy covers Polish static page text and all source errors while preserving mathematical and artistic caveats',()=>{
 const p=preview(),I=p.c.VortexI18n;p.get('language').value='en';p.event('language','change');
 for(const text of read('index.html').matchAll(/>([^<>]+)</g)){const source=text[1].trim();if(!/[ąćęłńóśźż]/i.test(source)||source.includes('Język / Language')||source.includes('PL — Polski'))continue;assert.notEqual(I.t(source),source,source);}
 for(const file of ['../docs/etap-7/section.js','../docs/etap-10/vortex.js','../docs/etap-11/particles.js'])for(const error of read(file).matchAll(/Error\('([^']+)'\)/g))assert.notEqual(I.t(error[1]),error[1],error[1]);
 assert.equal(I.t('θ+, ψ+ · ↺'),'θ+, ψ+ · ↺');assert.equal(I.t('α=51.842773413°; q=0.055'),'α=51.842773413°; q=0.055');assert.match(I.t('Przekrój jest owalem, nie elipsą.'),/oval, not an ellipse/);assert.match(I.t('Wizualizacja artystyczna przeciwbieżnych wirów toroidalnych'),/^Artistic visualization/);
});
