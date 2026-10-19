// Public viewer: all geometry and calculations live in the verified .ggb file.
let api;
const status=message=>document.querySelector('#status').textContent=message;
for(const [id,script] of [['reset','resetButton'],['egg','eggButton'],['sphere','sphereButton'],['why','whyButton']]){
  document.querySelector('#'+id).onclick=()=>{if(api)api.evalCommand(`RunClickScript(${script})`);};
}
document.querySelector('#english').onchange=event=>{if(api)api.setValue('langEN',event.target.checked);};
if(typeof GGBApplet==='undefined')status('Silnik GeoGebra jest niedostępny. Pobierz plik .ggb. / GeoGebra is unavailable; download the .ggb file.');
else new GGBApplet({appName:'classic',filename:'./piramida-11-7-G6.ggb',
  width:Math.max(860,Math.min(1440,innerWidth-32)),height:900,language:'en',perspective:'GD',
  showMenuBar:true,showToolBar:false,showAlgebraInput:false,enableRightClick:true,
  appletOnLoad:loaded=>{
    api=loaded;api.showToolBar(false);
    for(const node of document.querySelectorAll('button,input'))node.disabled=false;
    status('Model G6 gotowy / ready: L/W = '+api.getValue('LW').toFixed(9)+' · r = '+api.getValue('r').toFixed(9)+' · 2B/h = '+api.getValue('rPi').toFixed(9));
  }
},true).inject('ggb');
