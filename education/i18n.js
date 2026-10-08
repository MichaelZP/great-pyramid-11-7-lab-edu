/* PL/EN presentation copy only: no geometry, clock or renderer state. */
'use strict';
globalThis.VortexI18n=(()=>{
 const key='pyramid-education-language',dictionary=VortexEnglish,callbacks=[],messages=new Map(),cache=new Map();let language='pl';
 try{if(localStorage.getItem(key)==='en')language='en';}catch{/* Storage is optional in embedded/private browsers. */}
 const locale=()=>language==='en'?'en-GB':'pl-PL';
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const pattern=new RegExp(Object.keys(dictionary).sort((a,b)=>b.length-a.length).map(escape).join('|'),'g');
 function t(source){const s=String(source);if(language==='pl')return s;if(dictionary[s]!==undefined)return dictionary[s];if(cache.has(s))return cache.get(s);const value=s.replace(pattern,match=>dictionary[match]);if(cache.size>=256)cache.delete(cache.keys().next().value);cache.set(s,value);return value;}
 function text(id,source){messages.set(id,String(source));const value=t(source),element=document.getElementById(id);if(element.textContent!==value)element.textContent=value;return value;}
 // Capture text nodes once and retain their Polish source. Changing language
 // edits node values, preserving all form controls, listeners and links.
 const nodes=[],attributes=[];
 if(document.createTreeWalker){const walker=document.createTreeWalker(document.body,4);let node;while((node=walker.nextNode())){if(['SCRIPT','STYLE'].includes(node.parentElement?.tagName))continue;if(node.nodeValue.trim())nodes.push({node,source:node.nodeValue});}}
 if(document.querySelectorAll)for(const element of document.querySelectorAll('[aria-label]'))attributes.push({element,source:element.getAttribute('aria-label')});
 function apply(){for(const {node,source} of nodes)node.nodeValue=t(source);for(const {element,source} of attributes)element.setAttribute('aria-label',t(source));document.documentElement.lang=language;document.title=t('Pełny pokaz · konstrukcja i wiry · Piramida 11:7');for(const [id,source] of messages)document.getElementById(id).textContent=t(source);}
 function init({refresh}){const select=document.getElementById('language');select.value=language;apply();select.addEventListener('change',()=>{language=select.value==='en'?'en':'pl';try{localStorage.setItem(key,language);}catch{}apply();callbacks.forEach(fn=>fn());refresh();});}
 return{t,text,locale,init,onChange:fn=>callbacks.push(fn),language:()=>language};
})();
