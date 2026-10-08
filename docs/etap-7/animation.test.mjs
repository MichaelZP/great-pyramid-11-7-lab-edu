import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const context=vm.createContext({});
vm.runInContext(readFileSync(new URL('./animation.js',import.meta.url),'utf8'),context);
const html=readFileSync(new URL('./podglad.html',import.meta.url),'utf8');
vm.runInContext(readFileSync(new URL('./section.js',import.meta.url),'utf8'),context);
const G=context.Stage8, section=context.section;
const near=(a,b,tolerance=1e-9)=>assert.ok(Math.abs(a-b)<=tolerance*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);
const distance=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));
test('preview and geometry scripts have valid JavaScript syntax',()=>{
 new vm.Script(html.slice(html.lastIndexOf('<script>')+8,html.lastIndexOf('</script>')));
});

test('Golden Egg placement, exact stage 7 endpoint, and section invariants through the transition',()=>{
 for(const alpha of [Math.atan(14/11)*180/Math.PI,51.795319255897588,51.84,Math.acos(2/(1+Math.sqrt(5)))*180/Math.PI])
 for(const z0 of [5,7.65,10])for(const variant of ['A','B'])for(const q of [.005,.08,.16,2]){
  const o=section(alpha,z0),start=G.pose(o,variant,q,0),end=G.pose(o,variant,q,1);
  near(start.anchor[0],16.775);near(start.anchor[2],28.35);
  near(start.anchor[2]-start.scale*z0,-7.865);
  // Explicit regression: changing destination q must never move or shrink start.
  const otherStart=G.pose(o,variant,q===2?.005:2,0);
  start.anchor.forEach((value,i)=>near(value,otherStart.anchor[i]));near(start.scale,otherStart.scale);
  for(const t of [0,.25,.5,.75,1]){
   const frame=G.pose(o,variant,q,t);
   const axis=G.transform([0,0,z0+1],o,frame).map((v,i)=>v-frame.anchor[i]);
   const u=G.transform([Math.cos(o.a),0,z0+Math.sin(o.a)],o,frame).map((v,i)=>v-frame.anchor[i]),v=G.transform([0,1,z0],o,frame).map((v,i)=>v-frame.anchor[i]);
   const cross=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],normal=cross.map(value=>value/Math.hypot(...cross));
   near(Math.acos(normal.reduce((sum,value,i)=>sum+value*axis[i],0)/Math.hypot(...axis)),o.a);
   for(const p of o.points){
    const w=G.transform(p,o,frame),local=G.inverse(w,o,frame);
    near(local[2]*Math.hypot(local[0],local[1]),1);
    near(local[2]-z0-Math.tan(o.a)*local[0],0);
    near(normal.reduce((sum,v,i)=>sum+v*(w[i]-frame.anchor[i]),0),0);
    if(t===1){const target=variant==='A'?7:3.5,s=q*target/o.L;near(w[0],s*p[0]);near(w[1],s*p[1]);near(w[2],7+q*(target-7)+s*(p[2]-z0));}
   }
   const ends=[[ (o.lo-z0)/o.t,0,o.lo],[(o.hi-z0)/o.t,0,o.hi]],x=(o.zm-z0)/o.t;
   const L=distance(...ends.map(p=>G.transform(p,o,frame))),W=distance(G.transform([x,-o.W/2,o.zm],o,frame),G.transform([x,o.W/2,o.zm],o,frame));
   near(L/W,o.ratio);near(L,frame.scale*o.L);near(W,frame.scale*o.W);
   // Surface expressed relative to the moving zero gives k'=scale², once.
   const p=o.points[57],w=G.transform(p,o,frame),zero=G.transform([0,0,0],o,frame);
   near((w[2]-zero[2])*Math.hypot(w[0]-zero[0],w[1]-zero[1]),frame.scale**2);
   // Both systems share the current pose, including inverse surface/plane checks.
   for(const point of o.points){
    const first=G.transform(point,o,frame),second=G.transform(point,o,frame,true);
    near(second[0],first[0]);near(second[1],first[1]);near(second[2]+first[2],14);
    const local=G.inverse(second,o,frame,true);
    near(local[2]*Math.hypot(local[0],local[1]),1);
    near(local[2]-z0-o.t*local[0],0);
    near(second[2]-(14-frame.anchor[2])+o.t*(second[0]-frame.anchor[0]),0);
   }
   const L2=distance(...ends.map(p=>G.transform(p,o,frame,true))),W2=distance(G.transform([x,-o.W/2,o.zm],o,frame,true),G.transform([x,o.W/2,o.zm],o,frame,true));
   near(L2,L);near(W2,W);near(L2/W2,o.ratio);
   const secondZero=G.transform([0,0,0],o,frame,true),second=G.transform(p,o,frame,true);
   near((secondZero[2]-second[2])*Math.hypot(second[0]-secondZero[0],second[1]-secondZero[1]),frame.scale**2);
   const reflectedAxis=G.transform([0,0,z0+1],o,frame,true).map((v,i)=>v-G.reflect(frame.anchor)[i]);
   near(reflectedAxis[2],-frame.scale);near(reflectedAxis[0],0);near(reflectedAxis[1],0);
  }
 }
});

// Execute the real preview and its DOM handlers; canvas records are returned by
// drawScene before projection so the renderer, not only helpers, is audited.
function preview(width=390){
 const elements=new Map(),documentEvents={},windowEvents={},pending=new Map();let next=0;
 const canvas=new Proxy({measureText:text=>({width:text.length*6})},{get:(target,key)=>target[key]??(()=>{})});
 for(const tag of html.matchAll(/<(?:input|select|button|output|canvas|p|tbody)\b[^>]*\bid="([^"]+)"[^>]*>/g)){
  const attributes=tag[0],id=tag[1],events={};
  let value=attributes.match(/\bvalue="([^"]+)"/)?.[1]??'';
  if(attributes.startsWith('<select')){const body=html.slice(tag.index+attributes.length,html.indexOf('</select>',tag.index));value=(body.match(/<option value="([^"]+)" selected/)??body.match(/<option value="([^"]+)"/))[1];}
  elements.set(id,{value,checked:/\bchecked\b/.test(attributes),textContent:'',innerHTML:'',disabled:false,addEventListener:(name,fn)=>events[name]=fn,events,getBoundingClientRect:()=>({width:width-60,height:390}),getContext:()=>canvas});
 }
 const media={matches:false,addEventListener:(name,fn)=>media.change=fn};
 const c=vm.createContext({document:{getElementById:id=>elements.get(id),hidden:false,addEventListener:(name,fn)=>documentEvents[name]=fn},window:{addEventListener:(name,fn)=>windowEvents[name]=fn},devicePixelRatio:1,matchMedia:()=>media,requestAnimationFrame:cb=>{pending.set(++next,cb);return next;},cancelAnimationFrame:id=>pending.delete(id)});
 vm.runInContext(readFileSync(new URL('./animation.js',import.meta.url),'utf8'),c);
 vm.runInContext(readFileSync(new URL('./section.js',import.meta.url),'utf8'),c);
 vm.runInContext(html.slice(html.lastIndexOf('<script>')+8,html.lastIndexOf('</script>')),c);
 const get=id=>elements.get(id),event=(id,name='input')=>get(id).events[name](),set=(id,value,name='input')=>{get(id).value=String(value);event(id,name);};
 const scene=()=>c.drawScene(c.section(Number(get('alpha').value),Number(get('z0').value)));
 const advance=now=>{const callbacks=[...pending.values()];pending.clear();for(const cb of callbacks)cb(now);};
 return {c,get,set,event,scene,pending,advance,documentEvents,windowEvents,media};
}
function mirrorPoint(first,second){near(first[0],second[0]);near(first[1],second[1]);near(first[2]+second[2],14);}

test('renderer reflects all current geometry, guides, arrows and labels at 0/25/50/75/100%',()=>{
 const p=preview();let referencePyramid;
 for(const variant of ['A','B'])for(const preset of ['pyramid','golden','lange','huntley'])for(const q of [.005,.08,.16,2])for(const extent of ['infinite','full','section'])for(const t of [0,25,50,75,100]){
  p.set('variant',variant);p.set('preset',preset,'change');p.set('scaleFactor',q);p.set('extent',extent);p.set('progress',t);
  const scene=p.scene(),first=scene.lines.filter(l=>l.system==='first'),second=scene.lines.filter(l=>l.system==='second');
  assert.equal(first.length,second.length);assert.ok(first.length>0);
  first.forEach((line,i)=>{assert.equal(line.points.length,second[i].points.length);line.points.forEach((point,j)=>mirrorPoint(point,second[i].points[j]));});
  const a=scene.arrows.filter(l=>l.system==='first'),b=scene.arrows.filter(l=>l.system==='second');assert.equal(a.length,b.length);a.forEach((arrow,i)=>{mirrorPoint(arrow.from,b[i].from);mirrorPoint(arrow.to,b[i].to);});
  const labels1=scene.labels.filter(l=>l[5]==='first'),labels2=scene.labels.filter(l=>l[5]==='second');assert.equal(labels1.length,labels2.length);labels1.forEach((label,i)=>mirrorPoint(label[1],labels2[i][1]));
  for(const name of ['L′(t)','W′(t)','Q′(t)','Π′(t)',...(extent==='infinite'?['0H′ · z′ = 0','x′','y′','z′']:[])])assert.ok(labels2.some(l=>l[0]===name),name);
  const pyramid=JSON.stringify(scene.lines.slice(0,5));referencePyramid??=pyramid;assert.equal(pyramid,referencePyramid);
  if(preset==='pyramid')assert.match(p.get('numbers').innerHTML,/0\.105620<\/td><td class="fail">NIE/);
 }
 // The second section must move with time, not only pass reflection at the end.
 p.set('extent','section');p.set('progress',0);const start=p.scene().lines.find(l=>l.system==='second'&&l.width===3).points;
 p.set('progress',50);assert.notEqual(JSON.stringify(p.scene().lines.find(l=>l.system==='second'&&l.width===3).points),JSON.stringify(start));
});

test('three system views and each layer preserve pose and one clock at every milestone',()=>{
 for(const width of [320,390]){
  const p=preview(width);
  for(const t of [0,25,50,75,100])for(const view of ['first','second','both']){
   p.set('progress',t);p.set('systems',view);const scene=p.scene();
   for(const system of ['first','second'])assert.equal(scene.lines.some(l=>l.system===system),view==='both'||view===system);
   assert.equal(p.get('progress').value,String(t));assert.equal(p.pending.size,0);
   for(const layer of ['surfaceLayer','planeLayer','sectionLayer','guidesLayer','labelsLayer']){
    const before=JSON.stringify(scene.frame);p.get(layer).checked=false;p.event(layer);const hidden=p.scene();assert.equal(JSON.stringify(hidden.frame),before);
    if(layer==='labelsLayer')assert.equal(hidden.labels.length,0);
    else{assert.ok(hidden.lines.length<scene.lines.length);if(layer==='sectionLayer')assert.ok(!hidden.lines.some(l=>l.system!=='pyramid'&&l.width===3));if(layer==='guidesLayer')assert.equal(hidden.arrows.length,0);}
    p.get(layer).checked=true;p.event(layer);
   }
  }
  p.set('progress',0);p.event('play','click');p.advance(0);p.advance(2000);near(Number(p.get('progress').value),25);assert.equal(p.pending.size,1);
  p.set('systems','second');assert.equal(p.pending.size,1);p.advance(4000);near(Number(p.get('progress').value),50);
  p.event('play','click');assert.equal(p.pending.size,0);near(Number(p.get('progress').value),50);
  p.event('reset','click');near(Number(p.get('progress').value),0);p.event('finish','click');near(Number(p.get('progress').value),100);
  p.event('play','click');near(Number(p.get('progress').value),0);assert.equal(p.pending.size,1);
  p.get('reduced').checked=true;p.event('reduced','change');assert.equal(p.pending.size,0);assert.equal(p.get('play').disabled,true);p.event('play','click');assert.equal(p.pending.size,0);
  p.set('progress',75);near(p.scene().frame.progress,.75);
  p.get('reduced').checked=false;p.event('reduced','change');p.event('play','click');p.c.document.hidden=true;p.documentEvents.visibilitychange();assert.equal(p.pending.size,0);
  p.c.document.hidden=false;p.event('play','click');p.windowEvents.pagehide();assert.equal(p.pending.size,0);
  p.event('play','click');p.media.change({matches:true});assert.equal(p.pending.size,0);
  p.get('reduced').checked=false;p.event('reduced','change');p.event('play','click');p.set('alpha',89);assert.equal(p.pending.size,0);assert.ok(p.get('error').textContent);
 }
});

test('pause, seek, repeated play, speed change and completion use one cancellable frame',()=>{
 let next=0;const pending=new Map(),values=[];
 const player=G.playback({request:cb=>{pending.set(++next,cb);return next;},cancel:id=>pending.delete(id),onFrame:t=>values.push(t),onState:()=>{}});
 const advance=now=>{const callbacks=[...pending.values()];pending.clear();for(const cb of callbacks)cb(now);};
 player.play();player.play();assert.equal(pending.size,1);advance(0);advance(2000);near(player.progress,.25);
 player.pause();assert.equal(pending.size,0);near(player.progress,.25);
 player.play();advance(10000);advance(12000);near(player.progress,.5);
 player.seek(.75);assert.equal(player.running,false);assert.equal(pending.size,0);
 player.play();player.setSpeed(2);advance(20000);advance(21000);near(player.progress,1);assert.equal(pending.size,0);
 for(let i=0;i<3;i++){player.play();near(player.progress,0);advance(30000+i*10000);advance(34000+i*10000);near(player.progress,1);assert.equal(pending.size,0);}
 player.seek(0);player.play();player.seek(1);assert.equal(pending.size,0);assert.equal(values.at(-1),1);
});
