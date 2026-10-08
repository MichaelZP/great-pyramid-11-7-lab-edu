import {commands, configure} from './construction.mjs';
let api;
let report;
const status = message => document.querySelector('#status').textContent = message;
const run = command => {
  const labels=api.evalCommandGetLabels(command);
  if (labels===null && !/^(Set|ZoomIn|RunClickScript)/.test(command)) throw new Error(`GeoGebra: ${command}`);
};
const enable = () => {for (const node of document.querySelectorAll('button,input')) node.disabled=false;};
const save = async (name, content, type) => {
  if(location.port==='8093') {
    const response=await fetch(`/save/${name}`,{method:'POST',headers:{'Content-Type':type},body:content});
    if(!response.ok) throw new Error(`Zapis lokalny: ${response.status}`);
    status(`Zapisano education/geogebra/${name}.`);return;
  }
  const url=URL.createObjectURL(new Blob([content],{type}));
  const a=document.createElement('a'); a.href=url; a.download=name; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
};
function build() {
  api.newConstruction(); api.setErrorDialogsActive(false);
  for (const command of commands) run(command);
  configure(api); status(`Model zbudowany. GeoGebra ${api.getVersion()}; ${api.getObjectNumber()} obiektów.`);
  document.querySelector('#checks').textContent=''; report=undefined;
}
function snapshot() {
  const names=['q','s','B','h','A','D','S','E','rPi','rPhi','rSqrt2','errPi','errPhi','errSqrt2','okPi','okPhi','okSqrt2'];
  return Object.fromEntries(names.map(name=>[name,api.getValue(name)]));
}
async function checks() {
  const cases = await (await fetch('./engine-cases.json')).json();
  const assertions=[];
  function check(name, pass, details) {assertions.push({name,pass,details});}
  check('q independent',api.isIndependent('q'));
  check('s independent',api.isIndependent('s'));
  for(const name of ['base','b1','b2','hSeg','sSeg','dSeg']) check(`geometry absent from 2D: ${name}`,!api.getVisible(name,1));
  for (const c of cases.cases) {
    api.setValue('q',c.q); api.setValue('s',c.s);
    const actual=snapshot();
    for (const [key,expected] of Object.entries(c.expected)) {
      const delta=Math.abs(actual[key]-expected);
      check(`${c.name}: ${key}`,Number.isFinite(actual[key]) && delta<=2e-12*Math.max(1,Math.abs(expected)),{actual:actual[key],expected,delta});
    }
    for(const name of ['hSeg','aSeg','dSeg','sSeg','s2Seg','s3Seg','s4Seg']) check(`${c.name}: ${name} defined`,api.isDefined(name));
    check(`${c.name}: apex height`,Math.abs(api.getZcoord('V')-c.expected.h)<1e-12);
    check(`${c.name}: base square`,Math.abs(api.getValue('b1')-api.getValue('b2'))<1e-12);
    for(const name of ['s2Seg','s3Seg','s4Seg']) check(`${c.name}: ${name} = S`,Math.abs(api.getValue(name)-c.expected.S)<1e-12);
  }
  for (const lesson of [1,2,3]) {
    api.setValue('lesson',lesson);
    const xml=new DOMParser().parseFromString(api.getXML(),'application/xml');
    // GeoGebra's serialized show.object includes the evaluated condition.
    for(const [name,expected] of Object.entries({hSeg:lesson!==3,aSeg:lesson===2,sSeg:lesson===2,dSeg:lesson===3,b2:lesson===1})) {
      const element=xml.querySelector(`element[label="${name}"]`);
      check(`lesson ${lesson}: ${name} condition`, element.querySelector('condition')!==null);
      check(`lesson ${lesson}: ${name} visibility`,api.getVisible(name)===expected,{visible:api.getVisible(name),expected});
    }
  }
  api.setValue('lesson',2);
  for (const guides of [0,1]) {
    api.setValue('showGuides',guides);
    for (const name of ['s2Seg','s3Seg','s4Seg']) check(`guides ${guides}: ${name}`,api.getVisible(name)===Boolean(guides));
  }
  api.setValue('lesson',1);
  check('guides hidden outside phi',!api.getVisible('s2Seg')&&!api.getVisible('s3Seg')&&!api.getVisible('s4Seg'));
  for(const body of [0,1]) {
    api.setValue('showBody',body);
    for(const name of ['base','face1','face2','face3','face4','edge1','edge2','edge3','edge4']) check(`body ${body}: ${name}`,api.getVisible(name)===Boolean(body));
  }
  api.setValue('q',3);api.setValue('s',2);run('RunClickScript(resetButton)');
  check('native reset q',api.getValue('q')===11/7);
  check('native reset s',api.getValue('s')===1);
  check('native reset lesson',api.getValue('lesson')===1);
  for (const [button,lesson] of [['phiButton',2],['sqrtButton',3],['piButton',1]]) {
    run(`RunClickScript(${button})`);check(`native ${button}`,api.getValue('lesson')===lesson);
  }
  const saved=await new Promise(resolve=>api.getBase64(resolve));
  api.newConstruction();
  await new Promise(resolve=>api.setBase64(saved,resolve));
  check('export/reload B',api.getValue('B')===11);
  check('export/reload h',api.getValue('h')===7);
  api.setValue('q',2);api.setValue('s',1.5);run('RunClickScript(resetButton)');
  check('export/reload native reset',api.getValue('q')===11/7 && api.getValue('s')===1);
  report={date:'2026-10-08',geogebraVersion:api.getVersion(),engine:cases.engine,assertions,
    total:assertions.length,passed:assertions.filter(a=>a.pass).length,initial:snapshot()};
  document.querySelector('#checks').textContent=JSON.stringify({total:report.total,passed:report.passed,initial:report.initial,failures:assertions.filter(a=>!a.pass)},null,2);
  status(`Kontrole GeoGebra: ${report.passed}/${report.total} PASS. Stan przywrócony do 11:7.`);
}
function bind(id,handler) {document.querySelector(`#${id}`).onclick=async()=>{try{await handler();}catch(error){status(`Błąd: ${error.message}`);document.querySelector('#checks').textContent=JSON.stringify({snapshot:snapshot(),names:api.getAllObjectNames(),definition:api.getDefinitionString('result')},null,2);console.error(error);}};}
bind('build',build);
bind('reset',()=>{run('RunClickScript(resetButton)');status('Przywrócono q = 11/7, s = 1 i pozycję pi.');});
bind('apply',()=>{
  const q=Number(document.querySelector('#qvalue').value),s=Number(document.querySelector('#svalue').value);
  if (!(q>=0.5&&q<=4&&s>=0.25&&s<=2)) throw new Error('q: 0.5–4; s: 0.25–2.');
  api.setValue('q',q);api.setValue('s',s);status(`q = ${q}; s = ${s}.`);
});
bind('test',checks);
bind('export',async()=>{
  const value=await new Promise(resolve=>api.getBase64(resolve));
  await save('piramida-11-7-G1.ggb',Uint8Array.from(atob(value),c=>c.charCodeAt(0)),'application/vnd.geogebra.file');
});
bind('report',async()=>{if(!report)throw new Error('Najpierw uruchom kontrolę.');await save('geogebra-checks.json',JSON.stringify(report,null,2),'application/json');});
bind('image',async()=>{
  const value=await new Promise(resolve=>api.getScreenshotBase64(resolve));
  const base64=value.includes(',')?value.split(',')[1]:value;
  await save('model.png',Uint8Array.from(atob(base64),c=>c.charCodeAt(0)),'image/png');
});
bind('loadSaved',async()=>{
  const response=await fetch('./piramida-11-7-G1.ggb');
  if(!response.ok)throw new Error(`Odczyt pliku G1: ${response.status}`);
  const bytes=new Uint8Array(await response.arrayBuffer());
  let str='';for(const byte of bytes)str+=String.fromCharCode(byte);
  await new Promise(resolve=>api.setBase64(btoa(str),resolve));
  report=undefined;document.querySelector('#checks').textContent='';
  status('Wczytano zapisany plik piramida-11-7-G1.ggb z katalogu lokalnego.');
});
document.querySelector('#file').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  const bytes=new Uint8Array(await file.arrayBuffer());
  let str='';for(const byte of bytes)str+=String.fromCharCode(byte);
  api.setBase64(btoa(str),()=>status('Wczytano lokalny plik .ggb.'));report=undefined;
};
if (typeof GGBApplet==='undefined') status('Nie załadowano silnika GeoGebra. Sprawdź dostęp do sieci; instrukcja ręczna: README.md.');
else new GGBApplet({appName:'classic',width:Math.max(860, Math.min(1440,innerWidth-40)),height:900,language:'en',perspective:'GT',
  showMenuBar:true,showToolBar:false,showAlgebraInput:false,enableRightClick:true,
  appletOnLoad: loaded => {api=loaded;enable();status(`GeoGebra ${api.getVersion()} gotowa. Kliknij „Zbuduj model”.`);}
},true).inject('ggb');
