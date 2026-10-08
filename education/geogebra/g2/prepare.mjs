import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {geoFromBH,evaluateRelations} from '../../../src/lib/pyramid/engine.ts';
import {commands,relations,visibility,RESET_SCRIPT} from './construction.mjs';
const shapeCases=[['11:7',11/7],['q=1',1],['q=2',2],['q=3',3],['exact pi',Math.PI/2],['exact phi',2/Math.sqrt((1+Math.sqrt(5))/2)],['q min',.5],['q max',4]];
for(const sign of [-1,1])for(const factor of [.999,1.001]){
  shapeCases.push([`pi tolerance ${sign} ${factor}`,Math.PI/2*(1+sign*.001*factor)]);
  shapeCases.push([`gamma tolerance ${sign} ${factor}`,1/(2/(.5772156649015329*(1+sign*.001*factor))-2*Math.SQRT2)]);
}
const cases=[];
for(const [name,q] of shapeCases)for(const s of [.25,1,1.5,2]){
  const geo=geoFromBH(q,11*s), expected={B:geo.B,h:geo.H,A:geo.A,D:geo.D,S:geo.S,E:geo.E};
  const rows=evaluateRelations(geo);
  for(const relation of relations){
    const row=rows.find(r=>r.id===relation.id);
    expected['r'+relation.suffix]=row.value;expected['err'+relation.suffix]=row.error;expected['ok'+relation.suffix]=Number(row.within);
  }
  cases.push({name:`${name}, s=${s}`,q,s,expected});
}
const enginePath=fileURLToPath(new URL('../../../src/lib/pyramid/engine.ts',import.meta.url));
const engine={head:execFileSync('git',['rev-parse','HEAD'],{cwd:fileURLToPath(new URL('../../..',import.meta.url)),encoding:'utf8'}).trim(),
  path:'src/lib/pyramid/engine.ts',sha256:createHash('sha256').update(readFileSync(enginePath)).digest('hex')};
writeFileSync(new URL('engine-cases.json',import.meta.url),JSON.stringify({engine,relations,cases},null,2)+'\n');
writeFileSync(new URL('commands.txt',import.meta.url),commands.concat(Object.entries(visibility).map(([name,condition])=>`SetConditionToShowObject(${name}, ${condition})`)).join('\n')+'\n');
writeFileSync(new URL('reset-script.txt',import.meta.url),RESET_SCRIPT+'\n');
console.log(`G2: ${cases.length} configurations; ${relations.length} relations; engine ${engine.sha256}`);
