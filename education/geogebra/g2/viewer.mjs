// Public viewer: all geometry and calculations live in the verified .ggb file.
let api;
const status=message=>document.querySelector('#status').textContent=message;
for(const [id,script] of [['reset','resetButton'],['view3d','view3dButton'],['copies','viewCopiesButton']]){
  document.querySelector('#'+id).onclick=()=>{
    if(!api)return;
    api.evalCommand(`RunClickScript(${script})`);
    if(id==='reset')status('Przywrócono q = 11/7, s = 1 i pozycję #2 γ.');
  };
}
if(typeof GGBApplet==='undefined')status('Silnik GeoGebra jest niedostępny. Pobierz plik .ggb i skorzystaj z instrukcji.');
else new GGBApplet({appName:'classic',filename:'./piramida-11-7-G2.ggb',
  width:Math.max(860,Math.min(1440,innerWidth-32)),height:900,language:'en',perspective:'GT',
  showMenuBar:true,showToolBar:false,showAlgebraInput:false,enableRightClick:true,
  appletOnLoad:loaded=>{
    api=loaded;api.showToolBar(false);
    for(const button of document.querySelectorAll('button'))button.disabled=false;
    status('Model G2 gotowy. Zmieniaj q i s oraz wybierz jedną pozycję #1–10.');
  }
},true).inject('ggb');
