// Local-only authoring server. Saves only the explicitly named G1/G2 artifacts.
import {createServer} from 'node:http';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,sep,extname} from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const allowed=new Set(['piramida-11-7-G1.ggb','geogebra-checks.json','model.png',
  'g2/piramida-11-7-G2.ggb','g2/geogebra-checks.json','g2/model.png']);
const types={'.html':'text/html','.mjs':'text/javascript','.json':'application/json','.md':'text/plain','.txt':'text/plain','.png':'image/png','.ggb':'application/vnd.geogebra.file'};
createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://127.0.0.1:8093');
    if(req.method==='POST'&&url.pathname.startsWith('/save/')) {
      // Same-origin request only. No network exposure or arbitrary output path.
      if(req.headers.origin!=='http://127.0.0.1:8093') {res.writeHead(403);res.end();return;}
      const name=url.pathname.slice(6);
      if(!allowed.has(name)) {res.writeHead(403);res.end();return;}
      const chunks=[];let length=0;
      for await(const chunk of req){length+=chunk.length;if(length>8_000_000)throw new Error('Too large');chunks.push(chunk);}
      await writeFile(resolve(root,name),Buffer.concat(chunks));
      res.setHeader('Content-Type','application/json');res.end(JSON.stringify({saved:name}));return;
    }
    if(req.method!=='GET') {res.writeHead(405);res.end();return;}
    const pathname=url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname;
    const target=resolve(root,'.'+decodeURIComponent(pathname));
    if(!target.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403);res.end();return;}
    res.setHeader('Content-Type',types[extname(target)]||'application/octet-stream');
    res.setHeader('Cache-Control','no-store');res.end(await readFile(target));
  }catch(error){res.writeHead(500);res.end(error.message);}
}).listen(8093,'127.0.0.1',()=>console.log('GeoGebra G1: http://127.0.0.1:8093/ (local only)'));
