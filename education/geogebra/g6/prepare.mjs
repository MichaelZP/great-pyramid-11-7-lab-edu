// Writes the G6 command list, reset script and engine cases. Node >= 18; no TypeScript import.
// Reference values come from the lab app: docs/geometric-extensions/reference-values.json (mpmath, 40 digits).
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {commands,view3d,view2,RESET_SCRIPT,sliders} from './construction.mjs';
const raw=readFileSync(new URL('reference-values.json',import.meta.url));
const reference=JSON.parse(raw);
const phi=(1+Math.sqrt(5))/2,ratios=[[3,2],[8,5],[11,7],[14,9],[19,12],[25,16]];
// Comparison table for the fixed list of small B:H ratios, same formulas as the app (|R − c| / |c|).
const table=ratios.map(([p,q])=>{const pi=2*p/q,sa=Math.sqrt(1+4/(p/q)**2);
  return{ratio:`${p}:${q}`,p,q,twoBoverH:pi,errorPi:Math.abs(pi-Math.PI)/Math.PI,SA:sa,errorPhi:Math.abs(sa-phi)/phi};});
const shapes=[['11:7',11/7],['q=1',1],['q=pi/2',Math.PI/2],['q=2',2],['q=3',3],['q=0.5',.5],['q=4',4]];
const cases=shapes.flatMap(([name,q])=>[.25,1,1.5,2].map(s=>({name:`${name}, s=${s}`,q,s})));
const out={source:{app:'MichaelZP/great-pyramid-11-7-lab',commit:'644dc99a62aba0c106a10818fee6a4c6ac8d1e79',
  path:'docs/geometric-extensions/reference-values.json',sha256:createHash('sha256').update(raw).digest('hex')},
  sliders,table,cases,eggSweep:[2.26,3,5,7.65,10,15.3,20,30.6,40],domainCases:[1,2,2.25]};
writeFileSync(new URL('engine-cases.json',import.meta.url),JSON.stringify(out,null,2)+'\n');
const conditions=Object.entries({...view3d,...view2}).map(([name,condition])=>`SetConditionToShowObject(${name}, ${condition})`);
writeFileSync(new URL('commands.txt',import.meta.url),commands.concat(conditions).join('\n')+'\n');
writeFileSync(new URL('reset-script.txt',import.meta.url),RESET_SCRIPT+'\n');
console.log(`G6: ${commands.length} commands; ${cases.length} shape/scale cases; reference ${out.source.sha256}; L/W(7.65) ref ${reference.eggLimit.sections[0].LW}`);
