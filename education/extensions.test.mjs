import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const context=vm.createContext({});vm.runInContext(read('extensions.js'),context);
const X=context.PyramidExtensions,ref=JSON.parse(read('geogebra/g6/reference-values.json'));
const close=(a,b,tol=1e-12)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} vs ${b}`);
test('egg sections match the mpmath reference and decrease toward S/A',()=>{
 const t=ref.model.t;close(X.z0Min(t),ref.eggLimit.z0Min);
 for(const s of ref.eggLimit.sections){const e=X.egg(s.z0,t);
  for(const k of ['a','b','L','W','LW'])close(e[k],s[k],1e-11);close(e.xm,s.xWmax,1e-9);close(100*e.errorPhi,s.errorPhiPct,1e-8);
  close(e.limit,ref.eggLimit.limitSA);assert.ok(e.LW>e.limit&&e.limit>X.PHI);}
 let prev=Infinity;for(const z of [2.26,3,5,7.65,15.3,30.6,40]){const lw=X.egg(z,t).LW;assert.ok(lw<prev&&lw>X.egg(z,t).limit);prev=lw;}
 for(const z of [1,2,2.25])assert.equal(X.egg(z,t),null);
});
test('inscribed sphere matches the reference',()=>{
 const s=X.sphere(11,7),r=ref.inSphere;
 for(const k of ['r','OI','VI','VIoverOI','MT','VT','MToverVT','VIoverVO'])close(s[k],r[k]);
 close(100*s.errorVIOI,r.errorVIOIPhiPct,1e-9);close(100*s.errorMTVT,r.errorMTVTPhiPct,1e-9);
 close(s.T.fromAxis,r.T.alongBase);close(s.T.height,r.T.height);close(X.sphere(2,14/11).r,r.rSceneBase2);
});
test('why 11:7 matches the reference',()=>{
 const w=ref.why117,row=X.table().find(x=>x.ratio==='11:7');
 close(row.twoBoverH,w.twoBoverH);close(100*row.errorPi,w.errorPiPct,1e-9);close(row.SA,w.SA);close(100*row.errorPhi,w.errorPhiPct,1e-9);
 assert.deepEqual([...X.continuedFraction(Math.sqrt(X.PHI))],w.cfSqrtPhi);assert.deepEqual([...X.continuedFraction(4/Math.PI)],w.cfFourOverPi);
 const i=X.intervals();for(let k=0;k<2;k++){close(i.pi[k],w.intervalPi[k]);close(i.phi[k],w.intervalPhi[k]);}
 assert.deepEqual([...X.fractionsIn(i.pi)],['11/7']);assert.deepEqual([...X.fractionsIn(i.phi)],['11/7']);
 const expected={'3:2':[4.507,3.006],'8:5':[1.859,1.066],'14:9':[0.970,0.667],'19:12':[0.798,0.430],'25:16':[0.528,0.388]};
 for(const r of X.table())if(expected[r.ratio]){assert.equal((100*r.errorPi).toFixed(3),expected[r.ratio][0].toFixed(3));assert.equal((100*r.errorPhi).toFixed(3),expected[r.ratio][1].toFixed(3));}
});
test('lesson page keeps authorship, links and both languages',()=>{
 const html=read('rozszerzenia.html');
 assert.match(html,/Koncepcja projektu: Michał Przybylski — <a href="https:\/\/prylski\.dev\/">prylski\.dev<\/a>/);
 assert.match(html,/https:\/\/github\.com\/MichaelZP\//);assert.match(html,/geogebra\/g6\//);
 for(const id of ['egg','sphere','why'])assert.equal((html.match(new RegExp(`data-lesson="${id}"`,'g'))||[]).length,1);
 const pl=(html.match(/data-lang="pl"/g)||[]).length,en=(html.match(/data-lang="en"/g)||[]).length;assert.ok(pl>0&&pl===en,`${pl} PL vs ${en} EN`);
 assert.ok((html.match(/<details/g)||[]).length>=3);
});
