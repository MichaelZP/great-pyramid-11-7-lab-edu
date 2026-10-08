// Run with Node >=22.18; reads the actual current TS engine, writes G1 materials only.
import {writeFileSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {geoFromBH, evaluateRelations} from '../../src/lib/pyramid/engine.ts';
import {commands, visibility, RESET_SCRIPT} from './construction.mjs';
const enginePath=fileURLToPath(new URL('../../src/lib/pyramid/engine.ts',import.meta.url));
const selected={pi:'Pi',phi:'Phi',sqrt2:'Sqrt2'};
const cases=[];
for (const [name,q] of [['11:7',11/7],['q=1',1],['q=2',2],['q=3',3],['exact pi',Math.PI/2],['exact phi',2/Math.sqrt((1+Math.sqrt(5))/2)],['q min',0.5],['q max',4]]) {
  for (const s of [0.25,1,1.5,2]) {
    const geo=geoFromBH(q,11*s);
    const expected={B:geo.B,h:geo.H,A:geo.A,D:geo.D,S:geo.S,E:geo.E};
    for(const relation of evaluateRelations(geo).filter(r=>r.id in selected)) {
      const suffix=selected[relation.id];expected[`r${suffix}`]=relation.value;
      expected[`err${suffix}`]=relation.error;expected[`ok${suffix}`]=Number(relation.within);
    }
    cases.push({name:`${name}, s=${s}`,q,s,expected});
  }
}
const metadata={head:execFileSync('git',['rev-parse','HEAD'],{cwd:fileURLToPath(new URL('../..',import.meta.url)),encoding:'utf8'}).trim(),
  path:'src/lib/pyramid/engine.ts',sha256:createHash('sha256').update(readFileSync(enginePath)).digest('hex')};
writeFileSync(new URL('engine-cases.json',import.meta.url),JSON.stringify({engine:metadata,cases},null,2)+'\n');
const conditionCommands=Object.entries(visibility).flatMap(([name,condition])=>[
  `SetVisibleInView(${name}, 1, false)`,`SetVisibleInView(${name}, -1, true)`,
  `SetConditionToShowObject(${name}, ${condition})`]);
writeFileSync(new URL('commands.txt',import.meta.url),commands.concat(conditionCommands).join('\n')+'\n');
writeFileSync(new URL('reset-script.txt',import.meta.url),RESET_SCRIPT+'\n');
console.log(`Prepared ${cases.length} engine cases, commands.txt and reset-script.txt; engine ${metadata.sha256}`);
