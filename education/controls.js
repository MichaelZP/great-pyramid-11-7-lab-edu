/* Controls and geometry adapters for the existing shared renderer and clock. */
'use strict';
globalThis.VortexControls=(()=>{
 const get=id=>document.getElementById(id),TAU=Math.PI*2;
 const phases={cone1:0,cone2:0,torus1:0,torus2:0};let lastPhase=0,lastSeconds=0,eggCache,midplaneCache;
 const direction=(type,id)=>Number(get(type+'Direction'+id).value);
 const multiplier=(type,id)=>direction(type,id)/(type==='torus'&&id===2?-1:1);
 function update(current){
  if(current.seconds===0||current.seconds<lastSeconds){for(const key of Object.keys(phases))phases[key]=0;}
  else {const delta=(current.phase-lastPhase+TAU)%TAU;for(const type of ['cone','torus'])for(const id of [1,2])phases[type+id]=((phases[type+id]+delta*multiplier(type,id))%TAU+TAU)%TAU;}
  lastPhase=current.phase;lastSeconds=current.seconds;
 }
 const phase=(type,id)=>phases[type+id];
 const motionTorus=t=>({...t,sign:t.id===1?1:-1});
 function pair(d){return Vortex.pair(d,{scales:[1,2].map(id=>Number(get('torusScale'+id).value)),signs:[1,2].map(id=>direction('torus',id))});}
 const opacity=(type,id)=>1-Number(get(type+'Transparency'+id).value)/100;
 function midplane(pair){
  const center=pair[0].center.map((v,k)=>(v+pair[1].center[k])/2),radius=1.08*Math.max(...pair.map(t=>t.R+t.r)),key=JSON.stringify([center,radius]);
  if(midplaneCache?.key!==key)midplaneCache={key,center,radius,points:Vortex.loop(a=>[center[0]+radius*Math.cos(a),center[1]+radius*Math.sin(a),center[2]],72)};
  return midplaneCache;
 }
 // GoldenEggConstruct in PyramidCanvas.tsx revolves a half-oval profile
 // about its long axis. Here the profile comes directly from the shared
 // audited section, using its existing basis and current Stage8 frame.
 function eggs(o,source){if(eggCache?.source===source)return eggCache.faces;
  const faces=[],rows=32,segments=24,zmid=(o.lo+o.hi)/2,center=[(zmid-o.z0)/o.t,0,zmid],axis=[Math.cos(o.a),0,Math.sin(o.a)],normal=[-Math.sin(o.a),0,Math.cos(o.a)];
  for(const id of [1,2]){const grid=[];
   for(let i=0;i<=rows;i++){const z=o.lo+(o.hi-o.lo)*i/rows,u=(z-zmid)/Math.sin(o.a),x=(z-o.z0)/o.t,r=i===0||i===rows?0:Math.sqrt(Math.max(0,1/z**2-x*x));
    grid.push(Array.from({length:segments+1},(_,j)=>{const a=TAU*j/segments;return Stage8.transform(center.map((v,k)=>v+u*axis[k]+r*Math.sin(a)*normal[k]+(k===1?r*Math.cos(a):0)),o,source.frame,id===2);}));
   }
   for(let i=0;i<rows;i++)for(let j=0;j<segments;j++){const points=[grid[i][j],grid[i+1][j],grid[i+1][j+1],grid[i][j+1]],shade=.55+.35*Math.sin(TAU*(j+.5)/segments)**2;faces.push({id,points,shade});}
  }eggCache={source,faces};return faces;
 }
 function drawEggs({ctx,project,source,o,fade,records,visible,view}){
  if(![1,2].some(id=>get('egg'+id+'Layer').checked&&visible(id)&&opacity('egg',id)>0))return;
  const selected=eggs(o,source).filter(f=>get('egg'+f.id+'Layer').checked&&visible(f.id)&&opacity('egg',f.id)>0&&(f.id===1?fade.first:fade.second)>0);
  const depth=project.depth??(p=>view==='top'?p[2]:p[1]);
  const sorted=selected.map(face=>({face,depth:face.points.reduce((sum,p)=>sum+depth(p),0)/4})).sort((a,b)=>a.depth-b.depth);
  ctx.save();for(const {face} of sorted){const color=face.id===1?[112,223,202]:[255,190,134];ctx.fillStyle=`rgb(${color.map(v=>Math.round(v*face.shade)).join(',')})`;ctx.globalAlpha=opacity('egg',face.id)*(face.id===1?fade.first:fade.second);ctx.beginPath();face.points.map(project).forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath();ctx.fill();}ctx.restore();
  for(const id of [1,2])if(selected.some(f=>f.id===id))records.push({layer:'egg',system:id,alpha:opacity('egg',id),faces:selected.filter(f=>f.id===id).length});
 }
 function init({player,redraw}){
  const inputs=['coneDirection1','coneDirection2','torusDirection1','torusDirection2','torusScale1','torusScale2','surfaceTransparency1','surfaceTransparency2','eggTransparency1','eggTransparency2','egg1Layer','egg2Layer'];
  function labels(){for(const id of [1,2]){VortexI18n.text('torusScale'+id+'Value',`${Math.round(Number(get('torusScale'+id).value)*100)}%`);for(const type of ['surface','egg'])VortexI18n.text(type+'Transparency'+id+'Value',get(type+'Transparency'+id).value+'%');}const p=pair(Number(get('distance').value));VortexI18n.text('torusSettings',p.map(t=>`T${t.id}: R=${t.R.toFixed(2)}, r=${t.r.toFixed(2)}; θ${t.sign>0?'+':'−'}, ψ${t.sign>0?'+':'−'}`).join(' · '));VortexI18n.text('torusLegend1',`T1: θ${p[0].sign>0?'+ ↺':'− ↻'}, ψ${p[0].sign>0?'+':'−'} · linie ciągłe`);VortexI18n.text('torusLegend2',`T2: θ${p[1].sign>0?'+ ↺':'− ↻'}, ψ${p[1].sign>0?'+':'−'} · linie przerywane`);}
  for(const id of inputs)get(id).addEventListener('input',()=>{player.pause();labels();redraw();});
  get('distance').addEventListener('input',labels);
  get('motionDefaults').addEventListener('click',()=>{player.pause();for(const id of [1,2]){get('coneDirection'+id).value='1';get('torusDirection'+id).value=id===1?'1':'-1';get('torusScale'+id).value='1';}get('distance').value='4';get('distance').dispatchEvent(new Event('input'));labels();redraw();});labels();
 }
 return{update,phase,multiplier,direction,motionTorus,pair,opacity,midplane,eggs,drawEggs,init};
})();
