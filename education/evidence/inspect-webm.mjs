// Reproducible structural check for the single-video-track Canvas recordings.
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const file=process.argv[2],destination=process.argv[3],data=readFileSync(file);
const master=new Set([0x18538067,0x1549a966,0x1654ae6b,0xae,0xe0,0x1f43b675,0xa0]);
let frames=0,min=Infinity,max=0,width=0,height=0,timeScale=1000000;
const codecs=[];
function vint(offset,size=false){let length=1,mask=128;while(!(data[offset]&mask)&&length<=8){length++;mask>>=1;}if(length>8||offset+length>data.length)throw Error('Invalid EBML integer');let value=BigInt(size?data[offset]&(mask-1):data[offset]);for(let i=1;i<length;i++)value=(value<<8n)|BigInt(data[offset+i]);return{length,value,unknown:size&&value===(1n<<BigInt(7*length))-1n};}
function uint(start,end){let n=0;for(let i=start;i<end;i++)n=n*256+data[i];return n;}
function parse(start,end,clusterTime=0){for(let offset=start;offset<end;){const id=vint(offset),size=vint(offset+id.length,true),content=offset+id.length+size.length,next=size.unknown?end:content+Number(size.value);if(next>end||content>next)throw Error('Truncated EBML element');const type=Number(id.value);
 if(type===0xe7)clusterTime=uint(content,next);
 if(type===0x2ad7b1)timeScale=uint(content,next);
 if(type===0xb0)width=uint(content,next);
 if(type===0xba)height=uint(content,next);
 if(type===0x86)codecs.push(data.toString('utf8',content,next));
 if(type===0xa3||type===0xa1){const track=vint(content,true),pos=content+track.length;if(pos+3>next)throw Error('Truncated video block');if(data[pos+2]&6)throw Error('Unsupported block lacing');const t=(clusterTime+data.readInt16BE(pos))*timeScale/1000000;frames++;min=Math.min(min,t);max=Math.max(max,t);}
 if(master.has(type))parse(content,next,type===0x1f43b675?0:clusterTime);
 offset=next;
}}
parse(0,data.length);
if(!frames||!width||!height||!codecs.length)throw Error('Missing video metadata');
const result={file,bytes:data.length,frames,minTimeMs:min,maxTimeMs:max,codecs,width,height,averageEncodedFramesPerSecond:Number((frames*1000/max).toFixed(2)),sha256:createHash('sha256').update(data).digest('hex'),ebmlComplete:true};
if(destination)writeFileSync(destination,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
