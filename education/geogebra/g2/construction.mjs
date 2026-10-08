import {commands as baseCommands, configure as configureBase, visibility as baseVisibility} from '../construction.mjs';

export const relations = [
  {id:'pi',suffix:'Pi',title:'#1 π: połowa obwodu / wysokość',formula:'(B+B)/h',parts:[['B','B'],['h']],target:'pi',note:'Przybliżenie π; brak dowodu intencji.'},
  {id:'gamma',suffix:'Gamma',title:'#2 γ: dwa boki / (h+2D)',formula:'(B+B)/(h+D+D)',parts:[['B','B'],['h','D','D']],target:'0.5772156649015329',note:'Porównanie z γ; nie jest definicją γ.'},
  {id:'sqrt3',suffix:'Sqrt3',title:'#3 √3: (h+2D) / dwa boki',formula:'(h+D+D)/(B+B)',parts:[['h','D','D'],['B','B']],target:'sqrt(3)',note:'R = 1/Rγ; cele nie są odwrotne.'},
  {id:'sqrt6',suffix:'Sqrt6',title:'#4 √6: (h+2D) / D',formula:'(h+D+D)/D',parts:[['h','D','D'],['D']],target:'sqrt(6)',note:'R = sqrt(2) * Rsqrt3; wynik zależny.'},
  {id:'sqrt2',suffix:'Sqrt2',title:'#5 √2: przekątna / bok',formula:'D/B',parts:[['D'],['B']],target:'sqrt(2)',note:'Tożsamość każdego kwadratu; dowolne q i s.'},
  {id:'sqrt5',suffix:'Sqrt5',title:'#6 √5: (S+B) / S',formula:'(S+B)/S',parts:[['S','B'],['S']],target:'sqrt(5)',note:'R = 1+2/Rφ; wynik zależny.'},
  {id:'tribonacci',suffix:'Tribonacci',title:'#7 T: (A+2D) / (S+B)',formula:'(A+D+D)/(S+B)',parts:[['A','D','D'],['S','B']],target:'1.8392867552141612',note:'Cel T; wynik zależy od S/A.'},
  {id:'brun',suffix:'Brun',title:'#8 B₂: krawędź boczna / półbok',formula:'E/A',parts:[['E'],['A']],target:'1.902160583104',note:'Cel Bruna: oszacowanie; błąd celu nieustalony.'},
  {id:'invPhi',suffix:'InvPhi',title:'#9 1/φ: S / (S+A)',formula:'S/(S+A)',parts:[['S'],['S','A']],target:'1/((1+sqrt(5))/2)',note:'R = Rφ/(Rφ+1); ogólnie nie 1/Rφ.'},
  {id:'phi',suffix:'Phi',title:'#10 φ: apotema / półbok',formula:'S/A',parts:[['S'],['A']],target:'(1+sqrt(5))/2',note:'Przybliżenie φ; brak dowodu intencji.'},
];
export const sourceSegments = {B:'b1',h:'hSeg',A:'aSeg',D:'dSeg',S:'sSeg',E:'eSeg'};
const length = name => `Length(${sourceSegments[name]})`;
const sum = names => names.map(length).join('+');
const choose = values => values.slice(0,-1).reduceRight((tail,value,index)=>`If(lesson == ${index+1}, ${value}, ${tail})`,values.at(-1));
const quoted = text => JSON.stringify(text);
const replacements={
  titleText:'Text("Piramida 11:7 | ETAP G2 · 10 pozycji", (0.7, 28.4))',
  lessonText:`Text(${choose(relations.map(r=>quoted(r.title)))}, (0.7, 14))`,
  formulaText:`Text(${choose(relations.map(r=>quoted('R = '+r.formula)))}, (0.7, 12.8))`,
  noteText:`Text(${choose(relations.map(r=>quoted(r.note)))}, (0.7, 4))`,
};
// Results and selected output must be created after the ten ratio definitions.
const delayed=new Set(['result','target','error','within','lessonText','formulaText','resultText','targetText','errorText','toleranceText','noteText']);
const adjusted=baseCommands.map(c=>{
  if(c.startsWith('lesson = Slider'))return c.replace('Slider(1, 3,','Slider(1, 10,');
  if(c==='SetValue(lesson, 1)')return 'SetValue(lesson, 2)';
  const name=c.split(' = ')[0];
  if(name in replacements)return `${name} = ${replacements[name]}`;
  const positions={resultText:['12','11.4'],targetText:['10.5','9.9'],errorText:['9','8.4'],
    toleranceText:['7.5','6.9'],dimensionsText:['6','5.4'],scaleText:['3','2.8']};
  return name in positions?c.replace(`(0.7, ${positions[name][0]})`,`(0.7, ${positions[name][1]})`):c;
});
const outputCommands=[
  `result = ${choose(relations.map(r=>'r'+r.suffix))}`,
  `target = ${choose(relations.map(r=>'c'+r.suffix))}`,
  `error = ${choose(relations.map(r=>'err'+r.suffix))}`,
  'within = error <= tol',
  ...adjusted.filter(c=>delayed.has(c.split(' = ')[0])&&!['result','target','error','within'].includes(c.split(' = ')[0])),
];
export const commands=[
  ...adjusted.filter(c=>!delayed.has(c.split(' = ')[0])),
  'eSeg = Segment(P1, V)',
  ...relations.flatMap(r=>[
    `r${r.suffix} = (${sum(r.parts[0])})/(${sum(r.parts[1])})`,
    `c${r.suffix} = ${r.target}`,
    `err${r.suffix} = abs(r${r.suffix}-c${r.suffix})/abs(c${r.suffix})`,
    `ok${r.suffix} = err${r.suffix} <= tol`,
  ]),
  ...outputCommands,
  ...[0,1].flatMap(side=>[0,1,2].flatMap(index=>{
    const prefix=side===0?'n':'d';
    return [
      `${prefix}Len${index+1} = ${choose(relations.map(r=>r.parts[side][index]?length(r.parts[side][index]):'0'))}`,
      `${prefix}Name${index+1} = ${choose(relations.map(r=>quoted(r.parts[side][index]||'')))}`,
    ];
  })),
  'CopyN0 = (0, 6)', 'CopyD0 = (0, -6)',
  ...['n','d'].flatMap(prefix=>[1,2,3].flatMap(index=>[
    `Copy${prefix.toUpperCase()}${index} = (${[1,2,3].slice(0,index).map(i=>`${prefix}Len${i}/s`).join('+')}, ${prefix==='n'?6:-6})`,
    `${prefix}Copy${index} = Segment(Copy${prefix.toUpperCase()}${index-1}, Copy${prefix.toUpperCase()}${index})`,
    `${prefix}Label${index} = Text(${prefix}Name${index} + "/s", Midpoint(Copy${prefix.toUpperCase()}${index-1}, Copy${prefix.toUpperCase()}${index}) + (0, 1.5))`,
  ])),
  'copyNumerator = Distance(CopyN0,CopyN3)*s', 'copyDenominator = Distance(CopyD0,CopyD3)*s',
  'copyRatio = Distance(CopyN0,CopyN3)/Distance(CopyD0,CopyD3)',
  'copyTitle = Text("Kopie odcinków: wspólna skala 1/s", (0, 17))',
  'copyNumeratorText = Text("Licznik = " + round(copyNumerator, 6), (0, 11))',
  'copyDenominatorText = Text("Mianownik = " + round(copyDenominator, 6), (0, -1))',
  'copyResultText = Text("Iloraz długości kopii = " + round(copyRatio, 12), (0, -12))',
  'copyNote = Text("Kopie /s; sumy w jednostkach bryły.", (0, -15))',
  'previousButton = Button("Poprzednia")', 'nextButton = Button("Następna")',
  'view3dButton = Button("3D")', 'viewCopiesButton = Button("Kopie")',
  'SetCoords(previousButton, 25, 380)', 'SetCoords(nextButton, 130, 380)',
  'SetCoords(view3dButton, 235, 380)', 'SetCoords(viewCopiesButton, 300, 380)',
];
export const RESET_SCRIPT='SetValue(q, 11/7)\nSetValue(s, 1)\nSetValue(lesson, 2)\nSetValue(showBody, true)\nSetValue(showGuides, false)\nSetPerspective("GT")';
export const scripts={
  resetButton:RESET_SCRIPT,piButton:'SetValue(lesson, 1)',phiButton:'SetValue(lesson, 10)',sqrtButton:'SetValue(lesson, 5)',
  previousButton:'SetValue(lesson, Max(1, lesson-1))',nextButton:'SetValue(lesson, Min(10, lesson+1))',
  view3dButton:'SetPerspective("GT")',viewCopiesButton:'SetPerspective("GD")',
};
export const visibility={...baseVisibility,
  b2:'lesson == 1 || lesson == 2 || lesson == 3',
  hSeg:'lesson <= 4 || lesson == 10',
  aSeg:'lesson >= 7',dSeg:'(lesson >= 2 && lesson <= 5) || lesson == 7',
  sSeg:'lesson == 6 || lesson == 7 || lesson == 9 || lesson == 10',
  edge1:'showBody && lesson != 8',eSeg:'lesson == 8',
  P3:'lesson <= 5 || lesson == 7',O:'lesson != 5 && lesson != 6',
  V:'lesson != 5',M1:'lesson >= 6',
  M2:'lesson == 10 && showGuides',M3:'lesson == 10 && showGuides',M4:'lesson == 10 && showGuides',
  s2Seg:'lesson == 10 && showGuides',s3Seg:'lesson == 10 && showGuides',s4Seg:'lesson == 10 && showGuides',
};
export function configure(api){
  configureBase(api);
  const exec=command=>api.evalCommand(command);
  for(const [name,condition] of Object.entries(visibility)){
    exec(`SetVisibleInView(${name}, 1, false)`);exec(`SetVisibleInView(${name}, -1, true)`);
    exec(`SetConditionToShowObject(${name}, ${condition})`);
  }
  api.setCaption('lesson','Pozycja #1–10 = %v');
  // String-valued helper objects are GeoGebra texts; keep their values but hide them.
  for(const prefix of ['n','d'])for(const i of [1,2,3]){
    const name=`${prefix}Name${i}`;
    for(const view of [1,2,-1])exec(`SetVisibleInView(${name}, ${view}, false)`);
    exec(`SetConditionToShowObject(${name}, false)`);api.setAuxiliary(name,true);
  }
  const colors={B:[24,99,190],A:[24,99,190],h:[199,49,58],D:[126,67,178],S:[202,126,15],E:[41,128,86]};
  api.setColor('eSeg',41,128,86);api.setCaption('eSeg','E');api.setLineThickness('eSeg',6);
  api.setLabelStyle('eSeg',3);api.setLabelVisible('eSeg',true);
  // Piece colors are dynamic by source: persistent SetDynamicColor expressions.
  for(const prefix of ['n','d'])for(const i of [1,2,3]){
    const name=`${prefix}Copy${i}`,label=`${prefix}Label${i}`;
    for(const object of [name,label]){
      exec(`SetVisibleInView(${object}, 1, false)`);exec(`SetVisibleInView(${object}, -1, false)`);
      exec(`SetVisibleInView(${object}, 2, true)`);exec(`SetConditionToShowObject(${object}, ${prefix}Len${i} > 0)`);
    }
    const rgb=[0,1,2].map(component=>choose(relations.map(r=>String((colors[r.parts[prefix==='n'?0:1][i-1]]||[0,0,0])[component]/255))));
    exec(`SetDynamicColor(${name}, ${rgb.join(', ')})`);
    api.setLineThickness(name,7);
  }
  for(const name of ['copyTitle','copyNumeratorText','copyDenominatorText','copyResultText','copyNote']){
    exec(`SetVisibleInView(${name}, 1, false)`);exec(`SetVisibleInView(${name}, -1, false)`);exec(`SetVisibleInView(${name}, 2, true)`);
  }
  for(const name of ['CopyN0','CopyN1','CopyN2','CopyN3','CopyD0','CopyD1','CopyD2','CopyD3'])api.setFixed(name,true,false);
  for(const name of Object.keys(scripts)){
    exec(`SetVisibleInView(${name}, 1, true)`);exec(`SetVisibleInView(${name}, -1, false)`);
    api.setLabelVisible(name,true);api.setColor(name,30,45,60);
  }
  api.setPerspective('GD');exec('SetActiveView(2)');exec('ZoomIn(-3, -18, 59, 20)');
  exec('SetVisibleInView(xAxis, 2, false)');exec('SetVisibleInView(yAxis, 2, false)');
  api.setGridVisible(false);exec('SetActiveView(1)');api.setPerspective('GT');
  const document=new DOMParser().parseFromString(api.getXML(),'application/xml');
  for(const [name,script] of Object.entries(scripts)){
    const element=document.querySelector(`element[label="${name}"]`);
    let node=element.querySelector('ggbscript');
    if(!node){node=document.createElement('ggbscript');element.appendChild(node);}
    node.setAttribute('val',script);
  }
  api.setXML(new XMLSerializer().serializeToString(document));api.setPerspective('GT');api.showToolBar(false);
}
