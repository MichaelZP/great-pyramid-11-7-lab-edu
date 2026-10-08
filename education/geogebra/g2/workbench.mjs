import {commands,configure,relations,scripts} from './construction.mjs';
let api,report;
const status=message=>document.querySelector('#status').textContent=message;
const run=command=>{
  const labels=api.evalCommandGetLabels(command);
  if(labels===null&&!/^(Set|ZoomIn|RunClickScript)/.test(command))throw new Error(`GeoGebra: ${command}`);
};
const bytesFrom64=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
const base64FromBytes=bytes=>{let str='';for(const byte of bytes)str+=String.fromCharCode(byte);return btoa(str);};
const save=async(name,content,type)=>{
  if(location.port==='8093'){
    const response=await fetch(`/save/g2/${name}`,{method:'POST',headers:{'Content-Type':type},body:content});
    if(!response.ok)throw new Error(`Zapis lokalny: ${response.status}`);
    status(`Zapisano education/geogebra/g2/${name}.`);return;
  }
  const url=URL.createObjectURL(new Blob([content],{type})),link=document.createElement('a');
  link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
function snapshot(){
  const names=['q','s','lesson','B','h','A','D','S','E',...relations.flatMap(r=>['r'+r.suffix,'err'+r.suffix,'ok'+r.suffix])];
  return Object.fromEntries(names.map(n=>[n,api.getValue(n)]));
}
function build(){
  api.newConstruction();api.setErrorDialogsActive(false);
  for(const command of commands)run(command);
  configure(api);report=undefined;document.querySelector('#checks').textContent='';
  status(`G2 zbudowany: ${relations.length} pozycji; GeoGebra ${api.getVersion()}; ${api.getObjectNumber()} obiektów.`);
}
async function checks(){
  const data=await(await fetch('./engine-cases.json')).json(),assertions=[];
  const check=(name,pass,details)=>assertions.push({name,pass,details});
  const close=(name,actual,expected)=>{
    const delta=Math.abs(actual-expected);
    check(name,Number.isFinite(actual)&&delta<=2e-12*Math.max(1,Math.abs(expected)),{actual,expected,delta});
  };
  check('q independent',api.isIndependent('q'));check('s independent',api.isIndependent('s'));
  for(const name of ['base','b1','hSeg','sSeg','dSeg'])check(`${name} absent from control panel`,!api.getVisible(name,1));
  for(const prefix of ['n','d'])for(const i of [1,2,3])for(const view of [1,2]){
    const name=`${prefix}Name${i}`;check(`${name} hidden from view ${view}`,!api.getVisible(name,view));
  }
  for(const c of data.cases){
    api.setValue('q',c.q);api.setValue('s',c.s);
    const actual=snapshot();
    for(const [key,expected] of Object.entries(c.expected))close(`${c.name}: ${key}`,actual[key],expected);
    close(`${c.name}: apex height`,api.getZcoord('V'),c.expected.h);
    for(const name of ['s2Seg','s3Seg','s4Seg'])close(`${c.name}: ${name}`,api.getValue(name),c.expected.S);
    close(`${c.name}: gamma reciprocal`,actual.rGamma*actual.rSqrt3,1);
    close(`${c.name}: sqrt6 dependency`,actual.rSqrt6,Math.SQRT2*actual.rSqrt3);
    close(`${c.name}: sqrt5 dependency`,actual.rSqrt5,1+2/actual.rPhi);
    close(`${c.name}: brun dependency`,actual.rBrun**2,actual.rPhi**2+1);
    close(`${c.name}: invPhi dependency`,actual.rInvPhi,actual.rPhi/(actual.rPhi+1));
    for(let index=0;index<relations.length;index++){
      const relation=relations[index];api.setValue('lesson',index+1);
      const physical=part=>part==='h'?c.expected.h:c.expected[part];
      const num=relation.parts[0].reduce((sum,p)=>sum+physical(p),0);
      const den=relation.parts[1].reduce((sum,p)=>sum+physical(p),0);
      close(`${c.name}, #${index+1}: copy numerator`,api.getValue('copyNumerator'),num);
      close(`${c.name}, #${index+1}: copy denominator`,api.getValue('copyDenominator'),den);
      close(`${c.name}, #${index+1}: copy ratio`,api.getValue('copyRatio'),c.expected['r'+relation.suffix]);
      close(`${c.name}, #${index+1}: panel result`,api.getValue('result'),c.expected['r'+relation.suffix]);
      close(`${c.name}, #${index+1}: panel error`,api.getValue('error'),c.expected['err'+relation.suffix]);
      check(`${c.name}, #${index+1}: panel tolerance`,Number(api.getValue('within'))===c.expected['ok'+relation.suffix]);
      for(const [side,prefix] of [[0,'n'],[1,'d']])for(const i of [1,2,3]){
        const name=`${prefix}Copy${i}`,part=relation.parts[side][i-1];
        check(`${c.name}, #${index+1}: ${name} visibility`,api.getVisible(name)===Boolean(part));
        if(part)close(`${c.name}, #${index+1}: ${name} matches source /s`,api.getValue(name)*c.s,physical(part));
      }
    }
  }
  api.setValue('q',11/7);api.setValue('s',1);api.setValue('showBody',0);
  for(let lesson=1;lesson<=10;lesson++){
    api.setValue('lesson',lesson);
    const expected={hSeg:lesson<=4||lesson===10,aSeg:lesson>=7,dSeg:(lesson>=2&&lesson<=5)||lesson===7,
      sSeg:[6,7,9,10].includes(lesson),b2:[1,2,3].includes(lesson),edge1:false,eSeg:lesson===8};
    for(const [name,visible] of Object.entries(expected))check(`#${lesson}: source ${name}`,api.getVisible(name)===visible);
  }
  api.setValue('showGuides',1);
  for(const lesson of [1,2,6,10]){
    api.setValue('lesson',lesson);
    for(const name of ['s2Seg','s3Seg','s4Seg'])check(`#${lesson}: ${name} isolation`,api.getVisible(name)===(lesson===10));
  }
  for(const [button,value] of [['piButton',1],['phiButton',10],['sqrtButton',5]]){
    run(`RunClickScript(${button})`);check(`native ${button}`,api.getValue('lesson')===value);
  }
  api.setValue('lesson',1);run('RunClickScript(previousButton)');check('previous clamped at 1',api.getValue('lesson')===1);
  api.setValue('lesson',10);run('RunClickScript(nextButton)');check('next clamped at 10',api.getValue('lesson')===10);
  api.setValue('lesson',2);run('RunClickScript(nextButton)');check('next moves to 3',api.getValue('lesson')===3);
  run('RunClickScript(previousButton)');check('previous moves to 2',api.getValue('lesson')===2);
  api.setValue('q',3);api.setValue('s',2);run('RunClickScript(resetButton)');
  check('native reset q / s / lesson',api.getValue('q')===11/7&&api.getValue('s')===1&&api.getValue('lesson')===2);
  const saved=await new Promise(resolve=>api.getBase64(resolve));api.newConstruction();
  await new Promise(resolve=>api.setBase64(saved,resolve));
  close('export/reload B',api.getValue('B'),11);close('export/reload h',api.getValue('h'),7);
  api.setValue('q',2);api.setValue('s',1.5);run('RunClickScript(resetButton)');
  check('export/reload native reset',api.getValue('q')===11/7&&api.getValue('s')===1&&api.getValue('lesson')===2);
  run('RunClickScript(viewCopiesButton)');
  check('export/reload copies script',api.getXML().includes(scripts.viewCopiesButton.replaceAll('"','&quot;')));
  run('RunClickScript(view3dButton)');
  report={date:'2026-10-08',geogebraVersion:api.getVersion(),engine:data.engine,configurationCount:data.cases.length,
    relationIds:relations.map(r=>r.id),total:assertions.length,passed:assertions.filter(a=>a.pass).length,
    initial:snapshot(),assertions};
  document.querySelector('#checks').textContent=JSON.stringify({total:report.total,passed:report.passed,configurations:report.configurationCount,
    initial:report.initial,failures:assertions.filter(a=>!a.pass)},null,2);
  status(`G2: ${report.passed}/${report.total} PASS, ${report.configurationCount} konfiguracje. Przywrócono 11:7.`);
}
function bind(id,handler){document.querySelector('#'+id).onclick=async()=>{
  for(const button of document.querySelectorAll('button'))button.disabled=true;
  try{await handler();}catch(error){status(`Błąd: ${error.message}`);console.error(error);
    document.querySelector('#checks').textContent=JSON.stringify({names:api.getAllObjectNames(),objects:Object.fromEntries(
      ['CopyN0','CopyN1','nLen1','s','lesson'].map(name=>[name,{type:api.getObjectType(name),definition:api.getDefinitionString(name),value:api.getValue(name)}]))},null,2);
  }
  finally{for(const button of document.querySelectorAll('button'))button.disabled=false;}
};}
bind('build',build);bind('test',checks);
bind('reset',()=>{run('RunClickScript(resetButton)');status('Przywrócono q=11/7, s=1, pozycję #2 i widok 3D.');});
bind('copies',()=>run('RunClickScript(viewCopiesButton)'));bind('view3d',()=>run('RunClickScript(view3dButton)'));
bind('selectLesson',()=>{api.setValue('lesson',Number(document.querySelector('#lessonValue').value));});
bind('export',async()=>save('piramida-11-7-G2.ggb',bytesFrom64(await new Promise(resolve=>api.getBase64(resolve))),'application/vnd.geogebra.file'));
bind('report',async()=>{if(!report)throw new Error('Najpierw uruchom kontrolę.');await save('geogebra-checks.json',JSON.stringify(report,null,2),'application/json');});
bind('image',async()=>{const value=await new Promise(resolve=>api.getScreenshotBase64(resolve));await save('model.png',bytesFrom64(value.includes(',')?value.split(',')[1]:value),'image/png');});
bind('loadSaved',async()=>{
  const response=await fetch('./piramida-11-7-G2.ggb');if(!response.ok)throw new Error(`Odczyt G2: ${response.status}`);
  const value=base64FromBytes(new Uint8Array(await response.arrayBuffer()));
  await new Promise(resolve=>api.setBase64(value,resolve));
  report=undefined;document.querySelector('#checks').textContent='';status('Wczytano zapisany G2 z dysku.');
});
// Local disk file import; no account upload.
document.querySelector('#file').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  const value=base64FromBytes(new Uint8Array(await file.arrayBuffer()));
  await new Promise(resolve=>api.setBase64(value,resolve));report=undefined;status('Wczytano lokalny plik .ggb.');
};
if(typeof GGBApplet==='undefined')status('Nie załadowano GeoGebra; warsztat wymaga sieci.');
else new GGBApplet({appName:'classic',width:Math.max(860,Math.min(1440,innerWidth-40)),height:900,language:'en',perspective:'GT',
  showMenuBar:true,showToolBar:false,showAlgebraInput:false,enableRightClick:true,
  appletOnLoad:loaded=>{api=loaded;for(const node of document.querySelectorAll('button,input,select'))node.disabled=false;
    status(`GeoGebra ${api.getVersion()} gotowa. Zbuduj G2 lub otwórz zapisany plik.`);}
},true).inject('ggb');
