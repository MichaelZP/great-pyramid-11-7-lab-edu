import {commands,configure,scripts,view3d,view2} from './construction.mjs';
let api,report;
const status=message=>document.querySelector('#status').textContent=message;
const run=command=>{
  const labels=api.evalCommandGetLabels(command);
  if((labels===null||labels==='')&&!/^(Set|ZoomIn|RunClickScript|Delete)/.test(command))throw new Error(`GeoGebra: ${command}`);
};
const bytesFrom64=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
const base64FromBytes=bytes=>{let str='';for(const byte of bytes)str+=String.fromCharCode(byte);return btoa(str);};
const save=async(name,content,type)=>{
  if(location.port==='8093'){
    const response=await fetch(`/save/g6/${name}`,{method:'POST',headers:{'Content-Type':type},body:content});
    if(!response.ok)throw new Error(`Zapis lokalny: ${response.status}`);
    status(`Zapisano education/geogebra/g6/${name}.`);return;
  }
  const url=URL.createObjectURL(new Blob([content],{type})),link=document.createElement('a');
  link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
const SNAP=['q','s','z0','lesson','B','h','A','S','t','limitSA','a','b','xm','L','W','LW','errLW','errLimit','auxLen','LWmeasured','auxMeasured',
  'r','OI','VI','VIoverOI','MT','VT','MToverVT','MO','IT','dF1','dF2','dF3','dF4','dBase','errVIOI','errMTVT','rPi','rPhi','errPi','errPhi'];
// Effective visibility: object flag/condition and, for Graphics 2 objects, the view-2 setting.
const vis=n=>api.getVisible(n)&&(!(n in view2)||api.getVisible(n,2));
const snapshot=()=>Object.fromEntries(SNAP.map(n=>[n,api.getValue(n)]));
// Independent double-precision egg solver (bisection), used for shapes other than the mpmath reference.
function egg(z0,t){
  if(!(z0*z0>4*t))return null;
  const a=(-z0+Math.sqrt(z0*z0-4*t))/(2*t),b=(-z0+Math.sqrt(z0*z0+4*t))/(2*t),g=x=>x*(z0+t*x)**3+t;
  let lo=a,hi=0;for(let i=0;i<200;i++){const m=(lo+hi)/2;if(g(lo)*g(m)<=0)hi=m;else lo=m;}
  const x=(lo+hi)/2,L=(b-a)*Math.sqrt(1+t*t),W=2*Math.sqrt(1/(z0+t*x)**2-x*x);return{a,b,xm:x,L,W,LW:L/W};
}
function build(){
  api.newConstruction();api.setErrorDialogsActive(false);
  for(const command of commands)run(command);
  configure(api);report=undefined;document.querySelector('#checks').textContent='';
  status(`G6 zbudowany; GeoGebra ${api.getVersion()}; ${api.getObjectNumber()} obiektów.`);
}
async function checks(){
  const data=await(await fetch('./engine-cases.json')).json(),ref=await(await fetch('./reference-values.json')).json(),assertions=[];
  const check=(name,pass,details)=>assertions.push({name,pass:Boolean(pass),details});
  const close=(name,actual,expected,tol=2e-12)=>{
    const delta=Math.abs(actual-expected);
    check(name,Number.isFinite(actual)&&delta<=tol*Math.max(1,Math.abs(expected)),{actual,expected,delta,tolerance:tol});
  };
  const element=(list,i)=>{run(`tmpE = Element(${list}, ${i})`);const v=api.getValue('tmpE');api.deleteObject('tmpE');return v;};
  for(const n of ['q','s','z0','lesson','sphereStep','pick'])check(`${n} independent slider`,api.isIndependent(n)&&api.getObjectType(n)==='numeric');
  check('oval is a curve, not a conic/ellipse',api.getObjectType('oval')==='curvecartesian',api.getObjectType('oval'));
  check('egg section uses the true formula',api.getDefinitionString('fy').includes('z0'),api.getDefinitionString('fy'));
  // Reference: q = 11/7, s = 1 (mpmath values from the lab app)
  run('RunClickScript(resetButton)');
  const m=ref.model,e=ref.eggLimit,sp=ref.inSphere,w=ref.why117;
  for(const [k,v] of [['B',m.B],['h',m.H],['A',m.A],['S',m.S],['t',m.t]])close(`ref model ${k}`,api.getValue(k),v);
  close('ref egg S/A limit',api.getValue('limitSA'),e.limitSA);close('ref egg φ',api.getValue('phi'),e.phi);
  close('ref egg limit error %',100*api.getValue('errLimit'),e.errorLimitPhiPct,1e-9);
  for(const sec of e.sections){
    api.setValue('z0',sec.z0);const x=snapshot();
    check(`z0=${sec.z0}: domain ok`,api.getValue('eggOK')===1);
    for(const k of ['a','b','L','W','LW'])close(`ref z0=${sec.z0}: ${k}`,x[k],sec[k],1e-11);
    close(`ref z0=${sec.z0}: xWmax`,x.xm,sec.xWmax,1e-9);
    close(`ref z0=${sec.z0}: error %`,100*x.errLW,sec.errorPhiPct,1e-8);
    close(`z0=${sec.z0}: L/W measured from drawn segments`,x.LWmeasured,sec.LW,1e-11);
    close(`z0=${sec.z0}: dashed line L/(S/A) measured`,x.auxMeasured,e.limitSA,1e-11);
    check(`z0=${sec.z0}: L/W > S/A > φ`,x.LW>x.limitSA&&x.limitSA>e.phi);
    check(`z0=${sec.z0}: oval / limit line visible`,vis('oval')&&vis('auxSeg'));
  }
  let prev=Infinity;
  for(const z of data.eggSweep){api.setValue('z0',z);const lw=api.getValue('LW');
    check(`sweep z0=${z}: L/W decreasing toward S/A`,lw<prev&&lw>api.getValue('limitSA'),{lw});prev=lw;
    const j=egg(z,api.getValue('t'));close(`sweep z0=${z}: L/W vs independent solver`,lw,j.LW,1e-10);}
  close('z0Min = 2√t',2*Math.sqrt(api.getValue('t')),e.z0Min);
  for(const z of data.domainCases){api.setValue('z0',z);
    check(`domain guard z0=${z}: eggOK false`,api.getValue('eggOK')===0);
    check(`domain guard z0=${z}: L/W undefined`,!api.isDefined('LW'));
    check(`domain guard z0=${z}: oval hidden`,!vis('oval'));
    check(`domain guard z0=${z}: message shown`,/z0² > 4t/.test(api.getValueString('v1Text')),api.getValueString('v1Text'));}
  api.setValue('z0',7.65);
  // Inscribed sphere
  api.setValue('lesson',2);const x=snapshot();
  for(const k of ['r','OI','VI','VIoverOI','MT','VT','MToverVT'])close(`ref sphere ${k}`,x[k],sp[k]);
  close('ref sphere VI/OI error %',100*x.errVIOI,sp.errorVIOIPhiPct,1e-9);close('ref sphere MT/VT error %',100*x.errMTVT,sp.errorMTVTPhiPct,1e-9);
  close('ref sphere VI/VO',x.VI/(x.VI+x.OI),sp.VIoverVO);
  close('ref T along base',-api.getYcoord('T'),sp.T.alongBase);close('ref T height',api.getZcoord('T'),sp.T.height);close('T x',api.getXcoord('T'),0);
  close('I = (0,0,r)',api.getZcoord('I'),sp.r);
  for(const k of ['dF1','dF2','dF3','dF4','dBase','IT'])close(`tangency ${k} = r`,x[k],sp.r);
  close('MT = MO = A',x.MO,x.MT);
  close('scene base 2 (r · 2/11)',x.r*2/11,sp.rSceneBase2);
  // Why 11:7
  close('ref 2B/h',api.getValue('rPi'),w.twoBoverH);close('ref 2B/h error %',100*api.getValue('errPi'),w.errorPiPct,1e-9);
  close('ref S/A',api.getValue('rPhi'),w.SA);close('ref S/A error %',100*api.getValue('errPhi'),w.errorPhiPct,1e-9);
  check('11/7 inside π interval',11/7>w.intervalPi[0]&&11/7<w.intervalPi[1]);check('11/7 inside φ interval',11/7>w.intervalPhi[0]&&11/7<w.intervalPhi[1]);
  for(const [i,row] of data.table.entries()){
    close(`table ${row.ratio}: π error`,element('errPiList',i+1),row.errorPi);close(`table ${row.ratio}: φ error`,element('errPhiList',i+1),row.errorPhi);
    api.setValue('pick',i+1);close(`pick ${row.ratio}: 2B/h`,api.getValue('pickPi'),row.twoBoverH);close(`pick ${row.ratio}: S/A`,api.getValue('pickPhi'),row.SA);
  }
  // Shape / scale cases: relations measured in the engine
  const base={};
  for(const c of data.cases){
    api.setValue('q',c.q);api.setValue('s',c.s);api.setValue('z0',7.65);const y=snapshot();
    close(`${c.name}: B`,y.B,11*c.s);close(`${c.name}: h`,y.h,11*c.s/c.q);
    for(const k of ['dF1','dF2','dF3','dF4','dBase','IT'])close(`${c.name}: tangency ${k}`,y[k],y.r);
    close(`${c.name}: VI/OI = S/A`,y.VIoverOI,y.limitSA);close(`${c.name}: MT = MO`,y.MT,y.MO);
    close(`${c.name}: 2B/h = 2q`,y.rPi,2*c.q);
    const j=egg(7.65,2/c.q);
    if(j){close(`${c.name}: L/W independent`,y.LW,j.LW,1e-10);check(`${c.name}: L/W > S/A`,y.LW>y.limitSA);}
    else check(`${c.name}: domain guard`,!api.isDefined('LW'));
    if(!base[c.q])base[c.q]=y;else{const b0=base[c.q];
      close(`${c.name}: r scales with s`,y.r/c.s,b0.r/b0.s);for(const k of ['VIoverOI','MToverVT','rPhi'])close(`${c.name}: ${k} scale invariant`,y[k],b0[k]);
      if(j)close(`${c.name}: L/W scale invariant`,y.LW,b0.LW,1e-12);}
  }
  // Visibility per lesson / toggles / step
  run('RunClickScript(resetButton)');
  
  for(const lesson of [1,2,3]){api.setValue('lesson',lesson);
    check(`lesson ${lesson}: oval`,vis('oval')===(lesson===1));check(`lesson ${lesson}: ball`,vis('ball')===(lesson===2));
    check(`lesson ${lesson}: bars`,vis('barsPi')===(lesson===3));check(`lesson ${lesson}: credit visible`,api.getVisible('creditText',1));}
  api.setValue('lesson',1);api.setValue('showLimit',false);check('toggle limit line off',!vis('auxSeg'));api.setValue('showLimit',true);check('toggle limit line on',vis('auxSeg'));
  api.setValue('lesson',2);api.setValue('showSphere',false);check('toggle sphere off',!vis('ball')&&vis('secCircle'));api.setValue('showSphere',true);
  api.setValue('showBody',false);check('toggle body off',!vis('face1'));api.setValue('showBody',true);check('toggle body on',vis('face1'));
  for(const step of [1,2,3,4]){api.setValue('sphereStep',step);
    check(`sphere step ${step}: T`,vis('T')===(step>=3));check(`sphere step ${step}: OI`,vis('oiSeg')===(step===2||step===4));}
  api.setValue('sphereStep',4);run('RunClickScript(nextStepButton)');check('step + wraps 4 → 1',api.getValue('sphereStep')===1);
  run('RunClickScript(nextStepButton)');check('step + 1 → 2',api.getValue('sphereStep')===2);
  for(const [button,value] of [['eggButton',1],['sphereButton',2],['whyButton',3]]){run(`RunClickScript(${button})`);check(`native ${button}`,api.getValue('lesson')===value);}
  api.setValue('langEN',true);check('EN title',/geometric extensions/.test(api.getValueString('titleText')));api.setValue('langEN',false);
  check('PL title',/rozszerzenia geometryczne/.test(api.getValueString('titleText')));
  api.setValue('q',3);api.setValue('s',2);api.setValue('z0',20);api.setValue('lesson',3);api.setValue('showLimit',false);run('RunClickScript(resetButton)');
  const resetOK=()=>api.getValue('q')===11/7&&api.getValue('s')===1&&api.getValue('z0')===7.65&&api.getValue('lesson')===1&&api.getValue('showLimit')===1&&api.getValue('pick')===3;
  check('native reset',resetOK());
  const saved=await new Promise(resolve=>api.getBase64(resolve));api.newConstruction();
  await new Promise(resolve=>api.setBase64(saved,resolve));
  close('export/reload L/W',api.getValue('LW'),e.sections[0].LW,1e-11);close('export/reload r',api.getValue('r'),sp.r);
  api.setValue('q',2);api.setValue('z0',30);run('RunClickScript(resetButton)');check('export/reload native reset',resetOK());
  for(const [name,script] of Object.entries(scripts))check(`export/reload script ${name}`,script.split('\n').every(line=>api.getXML().includes(line.replaceAll('"','&quot;'))));
  run('RunClickScript(resetButton)');
  report={date:'2026-10-19',geogebraVersion:api.getVersion(),reference:data.source,configurationCount:data.cases.length,
    total:assertions.length,passed:assertions.filter(a=>a.pass).length,initial:snapshot(),assertions};
  document.querySelector('#checks').textContent=JSON.stringify({total:report.total,passed:report.passed,initial:report.initial,
    failures:assertions.filter(a=>!a.pass)},null,2);
  status(`G6: ${report.passed}/${report.total} PASS. Przywrócono 11:7.`);
}
function bind(id,handler){document.querySelector('#'+id).onclick=async()=>{
  for(const button of document.querySelectorAll('button'))button.disabled=true;
  try{await handler();}catch(error){status(`Błąd: ${error.message}`);console.error(error);}
  finally{for(const button of document.querySelectorAll('button'))button.disabled=false;}
};}
bind('build',build);bind('test',checks);
bind('reset',()=>run('RunClickScript(resetButton)'));
for(const id of ['eggButton','sphereButton','whyButton'])bind(id,()=>run(`RunClickScript(${id})`));
bind('export',async()=>save('piramida-11-7-G6.ggb',bytesFrom64(await new Promise(resolve=>api.getBase64(resolve))),'application/vnd.geogebra.file'));
bind('report',async()=>{if(!report)throw new Error('Najpierw uruchom kontrolę.');await save('geogebra-checks.json',JSON.stringify(report,null,2),'application/json');});
bind('image',async()=>{const value=await new Promise(resolve=>api.getScreenshotBase64(resolve));await save('model.png',bytesFrom64(value.includes(',')?value.split(',')[1]:value),'image/png');});
bind('loadSaved',async()=>{
  const response=await fetch('./piramida-11-7-G6.ggb');if(!response.ok)throw new Error(`Odczyt G6: ${response.status}`);
  const value=base64FromBytes(new Uint8Array(await response.arrayBuffer()));
  await new Promise(resolve=>api.setBase64(value,resolve));
  report=undefined;document.querySelector('#checks').textContent='';status('Wczytano zapisany G6 z dysku.');
});
window.g6={build,checks,get api(){return api;},get report(){return report;}};
if(typeof GGBApplet==='undefined')status('Nie załadowano GeoGebra; warsztat wymaga sieci.');
else new GGBApplet({appName:'classic',width:Math.max(860,Math.min(1440,innerWidth-40)),height:900,language:'en',perspective:'GD',
  showMenuBar:true,showToolBar:false,showAlgebraInput:false,enableRightClick:true,
  appletOnLoad:loaded=>{api=loaded;for(const node of document.querySelectorAll('button,input,select'))node.disabled=false;
    status(`GeoGebra ${api.getVersion()} gotowa. Zbuduj G6 lub otwórz zapisany plik.`);}
},true).inject('ggb');
