(()=>{"use strict";var e,t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var o=t.g.document;if(!e&&o&&(o.currentScript&&(e=o.currentScript.src),!e)){var n=o.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),function(e){e.Indexed2Bit="2-bit (4 color) Indexed",e.Indexed4Bit="4-bit (16 color) Indexed",e.Mono="Monochrome",e.RGB="RGB",e.RGBI="4-bit (16 color) RGBI",e.Auto="Optimized (Auto)",e.Other="Other",e.Generated="AUTOGENERATED PALETTE"}(e||(e={}));const o=e;var n;!function(e){e[e.Indexed=0]="Indexed",e[e.Mono=1]="Mono",e[e.RGB=2]="RGB",e[e.Auto=3]="Auto"}(n||(n={}));const r=n,a={name:"CGA Mode 4 Palette 0 (low)",type:r.Indexed,group:o.Indexed2Bit,data:[0,0,0,0,170,0,170,0,0,170,85,0]},s={name:"CGA Mode 4 Palette 0 (high)",type:r.Indexed,group:o.Indexed2Bit,data:[0,0,0,85,255,85,255,85,85,255,255,85]},i={name:"CGA Mode 4 Palette 1 (low)",type:r.Indexed,group:o.Indexed2Bit,data:[0,0,0,0,170,170,170,0,170,170,170,170]},d={name:"CGA Mode 4 Palette 1 (high)",type:r.Indexed,group:o.Indexed2Bit,data:[0,0,0,85,255,255,255,85,255,255,255,255]},l={name:"CGA Mode 5 (low)",type:r.Indexed,group:o.Indexed2Bit,data:[0,0,0,0,170,170,170,0,0,170,170,170]},c={name:"CGA Mode 5 (high)",type:r.Indexed,group:o.Indexed2Bit,data:[0,0,0,85,255,255,255,85,85,255,255,255]},h={name:"CGA 4-bit RGBI (IBM)",type:r.Indexed,group:o.RGBI,data:[0,0,0,0,0,170,0,170,0,0,170,170,170,0,0,170,0,170,170,85,0,170,170,170,85,85,85,85,85,255,85,255,85,85,255,255,255,85,85,255,85,255,255,255,85,255,255,255]},u={name:"Commodore 64",type:r.Indexed,group:o.Indexed4Bit,data:[0,0,0,98,98,82,137,137,137,173,173,173,255,255,255,159,78,68,203,126,117,109,84,18,161,104,60,201,212,135,154,226,155,92,171,94,106,191,198,136,126,203,80,69,155,160,87,163]},g={name:"Windows 4-bit RGBI",type:r.Indexed,group:o.RGBI,data:[0,0,0,0,0,128,0,128,0,0,128,128,128,0,0,128,0,128,128,128,0,192,192,192,128,128,128,0,0,255,0,255,0,0,255,255,255,0,0,255,0,255,255,255,0,255,255,255]},p={name:"Windows 20-color Extended RGBI",type:r.Indexed,group:o.Indexed4Bit,data:[0,0,0,0,0,128,0,128,0,0,128,128,128,0,0,128,0,128,128,128,0,192,192,192,192,220,192,166,202,240,255,251,240,160,160,164,128,128,128,0,0,255,0,255,0,0,255,255,255,0,0,255,0,255,255,255,0,255,255,255]},m={name:"ZX Spectrum 4-bit RGBI",type:r.Indexed,group:o.RGBI,data:[0,0,0,0,0,215,0,215,0,0,215,215,215,0,0,215,0,215,215,215,0,215,215,215,0,0,255,0,255,0,0,255,255,255,0,0,255,0,255,255,255,0,255,255,255]},f={name:"Game Boy (2-bit MC)",type:r.Indexed,group:o.Mono,data:[15,56,15,48,98,48,139,172,15,155,188,15]},y={name:"8-color RGB (3-bit, 1bpc)",type:r.RGB,group:o.RGB,data:[2,2,2]},w={name:"64-color RGB (6-bit, 2bpc)",type:r.RGB,group:o.RGB,data:[4,4,4]},v={name:"256-color RGB (8-bit, 3-3-2)",type:r.RGB,group:o.RGB,data:[8,8,4]},x={name:"Macintosh II (1987)",type:r.Indexed,group:o.Indexed4Bit,data:[255,255,255,255,255,0,255,102,0,221,0,0,255,0,153,51,0,153,0,0,204,0,153,255,0,170,0,0,102,0,102,51,0,153,102,51,187,187,187,136,136,136,68,68,68,0,0,0]},I={name:"Auto 16-color (4-bit indexed)",type:r.Auto,group:o.Auto,data:[16,-1,4,1]},E={name:"Auto 64-color (6-bit indexed)",type:r.Auto,group:o.Auto,data:[64,1,5,1]},C={name:"Auto 256-color (8-bit indexed)",type:r.Auto,group:o.Auto,data:[256,2,5,1]},B=class{static getSize(e){switch(e.type){case r.Indexed:return e.data.length/3;case r.Mono:return e.data[0];case r.RGB:return e.data[0]*e.data[1]*e.data[2];case r.Auto:default:return 0}}static getColor(e,t){if(t<0||t>=this.getSize(e))throw new Error(`Color index ${t} out of bounds`);switch(e.type){case r.Indexed:return e.data.slice(3*t,3*t+3);case r.Mono:return e.data.slice(1,4).map((o=>{const n=o*e.data[4];return n+t*~~((o-n)/(e.data[0]-1))}));case r.RGB:{const o=t%e.data[2],n=~~(t/e.data[2])%e.data[1];return[~~(t/(e.data[2]*e.data[1])),n,o].map(((t,o)=>t*~~(255/(e.data[o]-1))))}case r.Auto:default:throw new Error("Invalid or Auto palette type")}}static getColors(e){return Array.from({length:this.getSize(e)},((t,o)=>this.getColor(e,o)))}static transform(e,t){const n=this.getColors(e).map((e=>t(e)));return{name:`${e.name} :: ${t.name}`,type:r.Indexed,group:o.Generated,data:n.reduce(((e,t)=>e.concat(t)))}}};function b(e,t,o){let n=[],r=Number.POSITIVE_INFINITY;for(let a=0;a<B.getSize(t);a++){const s=B.getColor(t,a),i=o(e,s);i<=r&&(n=s,r=i)}return n}const A={id:"ProcBasic",name:"Basic (no dithering)",procFn:(e,t,o,n,r)=>{const a=4*e.width,s=e.width*e.height*4;for(let n=0;n<s;n+=4){const i=b(Array.from(e.data.slice(n,n+4)),t,o);for(let t=0;t<3;t++)e.data[n+t]=i[t];n%(8*a)==0&&r&&r(n,s,e)}return e},maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!1},complexity:e=>e};function M(e,t=2.2){return e.map((e=>{let o=e/255;return o=o>.04045?Math.pow((o+.055)/1.055,t):o/12.92,100*o}))}function k(e,t=2.2){return e.map((e=>{let o=e/100;return o=o>.0031308?1.055*Math.pow(o,1/t)-.055:12.92*o,~~(255*o)}))}function G(e,t){return n=t,((o=e)[0]-n[0])*(o[0]-n[0])+(o[1]-n[1])*(o[1]-n[1])+(o[2]-n[2])*(o[2]-n[2]);var o,n}function L(e,t){return G(k(e),k(t))}const R={id:"ProcFloydSteinberg",name:"Floyd–Steinberg",procFn:(e,t,o,n,r)=>{const a=e.width*e.height*4,s=4*e.width;if(n.gamma){for(let t=0;t<a;t+=4){const o=M(Array.from(e.data.slice(t,t+3)));for(let n=0;n<3;n++)e.data[t+n]=o[n];t%(4*s)==0&&r&&r(t,a,e)}t=B.transform(t,M)}for(let o=0;o<a;o+=4){const i=Array.from(e.data.slice(o,o+3)),d=b(i,t,n.gamma?L:G);for(let t=0;t<3;t++)e.data[o+t]=(n.gamma?k(d):d)[t];const l=i.map(((e,t)=>e-d[t]));for(let t=0;t<3;t++)e.data[o+4+t]+=7*l[t]/16,e.data[o+s-4+t]+=3*l[t]/16,e.data[o+s+t]+=5*l[t]/16,e.data[o+s+4+t]+=1*l[t]/16;o%(4*s)==0&&r&&r(o,a,e)}return e},maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!0},complexity:e=>e},T=[0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21].map((e=>e/64));function P(e,t,o,n,r){return r(e,t)+o*((n<0?-n:n)+.5)}function S(e=!0){return(t,o,n,r,a)=>{const s=t.width*t.height*4,i=4*t.width,d=B.getColors(o),l={};for(let e=0;e<d.length;e++)for(let t=e;t<d.length;t++)l[e*d.length+t]=.1*n(d[e],d[t]);const c=[0,0,0];let h,u,g,p;for(let o=0;o<s;o+=4){h=Array.from(t.data.slice(o,o+4));const r=T[o%i/4%8+~~(o/i)%8*8];p={color1:[0,0,0],color2:h,ratio:.33};let m=Number.MAX_VALUE;for(let t=0;t<d.length;t++)for(let o=t;o<d.length;o++)if(u=d[t],g=d[o],e){let e=32;t!==o&&(e=((u[0]!==g[0]?19136*(h[0]-u[0])/(g[0]-u[0]):0)+(u[1]!==g[1]?37568*(h[1]-u[1])/(g[1]-u[1]):0)+(u[2]!==g[2]?7296*(h[2]-u[2])/(g[2]-u[2]):0))/((u[0]!==g[0]?299:0)+(u[1]!==g[1]?587:0)+(u[2]!==g[2]?114:0)),e<0?e=0:e>63&&(e=63),e=~~e);const r=e/64;for(let e=0;e<3;e++)c[e]=u[e]+r*(g[e]-u[e]);const a=P(h,c,l[t*d.length+o],r-.5,n);a<m&&(m=a,p.color1=u,p.color2=g,p.ratio=r)}else for(let e=0;e<64&&!(t===o&&e>0);e++){const r=e/64;for(let e=0;e<3;e++)c[e]=u[e]+r*(g[e]-u[e]);const a=P(h,c,l[t*d.length+o],r-.5,n);a<m&&(m=a,p.color1=u,p.color2=g,p.ratio=r)}for(let e=0;e<3;e++)t.data[o+e]=r<p.ratio?p.color2[e]:p.color1[e];o%(4*i)==0&&a&&a(o,s,t)}return t}}const $={id:"ProcBayerLikeFast",name:"Ordered (Bayer-like) – Fast",procFn:S(),maxAllowedPaletteSize:192,supports:{threads:!0,gamma:!1},complexity:e=>e*e/2},z={id:"ProcBayerLikeThorough",name:"Ordered (Bayer-like) – High Quality",procFn:S(!1),maxAllowedPaletteSize:24,supports:{threads:!0,gamma:!1},complexity:e=>e*e*32};function O(e,t=2.2,o=!1){const n=[0,0,0];for(let r=0;r<3;r++)if(o){const o=e[r]<0?-1:1;n[r]=o*Math.pow(e[r]*o/255,t)}else n[r]=Math.pow(e[r]/255,t);return n}function N(e,t=2.2,o=!1){const n=1/t;if(o){const t=e<0?-1:1;return t*Math.pow(e*t,n)*255}return 255*Math.pow(e,n)}const D=[0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21].map((e=>e/64)),F={id:"ProcWeightedColorMap",name:"Ordered (Weighted Color Map)",procFn:(e,t,o,n,r)=>{const a=e.width*e.height*4,s=4*e.width,i=[];let d,l,c,h;const u=[0,0,0],g=B.getColors(t).map((e=>299*e[0]+587*e[1]+114*e[2])),p=B.getColors(n.gamma?B.transform(t,O):t);for(let m=0;m<a;m+=4){d=Array.from(e.data.slice(m,m+4));const f=m%s/4,y=~~(m/s);for(i.splice(0),c=[0,0,0];i.length<16;){let e=0,t=1,r=Number.MAX_VALUE;const a=i.length||1;for(let s=0;s<p.length;s++){l=[...p[s]],h=[...c];for(let g=1;g<=a;g*=2){const a=i.length+g;for(let e=0;e<3;e++)h[e]=c[e]+l[e]*g,u[e]=h[e]/a,n.gamma&&(u[e]=N(u[e]));const p=o(u,d);p<r&&(t=g,e=s,r=p)}}for(let o=0;o<t;o++)i.push(e);for(let o=0;o<3;o++)c[o]+=p[e][o]*t}i.sort(((e,t)=>g[e]-g[t]));const w=~~(D[f%8+y%8*8]*i.length);for(let o=0;o<3;o++)e.data[m+o]=B.getColor(t,i[w])[o];m%(4*s)==0&&r&&r(m,a,e)}return e},maxAllowedPaletteSize:256,supports:{threads:!0,gamma:!0},complexity:e=>384*e};function U(){return new Worker(t.p+"main.worker.js")}var W;!function(e){e[e.Progress=0]="Progress",e[e.Done=1]="Done",e[e.Error=2]="Error"}(W||(W={}));const j=class{constructor(){this.busy=!1,this.x=0,this.y=0,this.worker=new U,this.worker.onmessage=e=>{const t=e.data;switch(t.msg){case W.Progress:this.onprogress&&this.onprogress(Object.assign(Object.assign({},t.params),{partial:t.params.partial?{data:t.params.partial,x:this.x,y:this.y}:void 0}));break;case W.Done:this.onfinish&&this.onfinish({data:t.params.result,x:this.x,y:this.y}),this.busy=!1;break;case W.Error:this.onerror&&this.onerror(t.params.error),this.busy=!1}}}get ready(){return!this.busy}start(e,t,o,n,r){return!this.busy&&(this.busy=!0,this.worker.postMessage({dataIn:e.data,palette:t,procId:o,distFnId:n,features:r}),!0)}terminate(){this.worker.terminate()}};class _{constructor(e){var t;this.generated=!1,this.levels=e.levels,this.tree=(t=e.levels,Array.from({length:Math.pow(8,t)},(()=>new class{constructor(){this.colors=[],this.pixels=0}get pixelCount(){return this.pixels}get avgColor(){const e=[0,0,0];for(let t=0;t<this.colors.length;t++)for(let o=0;o<3;o++)e[o]+=this.colors[t][o];return e.map((e=>e/this.colors.length))}addColor(e){this.colors.includes(e)||this.colors.push(e),this.pixels++}}))),this.ctes=[],this.reservedLevel=e.reservedLevel,this.nColors=e.size,this.k=e.thresholdCoeff||1}addColor(e){if(this.generated)throw new Error("Attempting to modify a generated palette");const t=this.index(e);return this.tree[t].addColor(e),t}getPalette(){this.generated||this.generate();const e=[];return this.ctes.forEach((t=>{const o=t.index,n=[0,0,0];for(let e=0;e<t.level;e++)for(let r=2;r>=0;r--){const a=3*(t.level-1-e)+r,s=1<<3*t.level-1>>3*e+(2-r);n[2-r]=n[2-r]<<1|(o&s)>>a}for(let e=t.level;e<8;e++)for(let o=0;o<3;o++)n[o]=n[o]<<1|(e===t.level?1:0);e.push(n)})),console.log(`Built palette with ${e.length} colors`),e}index(e){let t=0;for(let o=0;o<this.levels;o++){const n=7-o;let r=0;for(let t=0;t<3;t++){const a=128>>o;r=r<<1|(e[t]&a)>>n}t=t<<3|r}return t}getNode(e,t){if(t===this.levels)return this.tree[e];const o=[];for(let n=0;n<8;n++)this.isCTE(8*e+n,t+1)||o.push(this.getNode(8*e+n,t+1));return o.filter((e=>e.pixelCount>0)).reduce(((e,t)=>({pixelCount:e.pixelCount+t.pixelCount})),{pixelCount:0})}isCTE(e,t){return this.ctes.some((o=>o.index===e&&o.level===t))}markCTE(e,t,o){this.ctes.push({index:e,level:t,node:o})}testNode(e,t,o,n){const r=e-t-this.ctes.length,a=(o-this.ctes.map((e=>e.node.pixelCount)).reduce(((e,t)=>e+t),0))/r*this.k;return n.pixelCount>a}get nonReservedCTEs(){return this.ctes.filter((e=>e.level!==this.reservedLevel)).length}generate(){if(this.generated)throw new Error("This palette has already been generated");this.generated=!0;const e=this.reservedLevel<0?0:Math.pow(8,this.reservedLevel),t=this.getNode(0,0).pixelCount;let o,n=0,r=0;for(;this.nColors-e-this.nonReservedCTEs>0;){for(o=this.levels;o>this.reservedLevel&&o>0;){const n=Math.pow(8,o);for(let r=0;r<n;r++){const n=this.getNode(r,o);if(!this.isCTE(r,o)&&this.testNode(this.nColors,e,t,n)&&this.markCTE(r,o,n),r%8==7){let e=0;for(let t=r-7;t<=r;t++)this.isCTE(t,o)&&e++;if(e>0&&e<8){const e=r>>3;this.isCTE(e,o-1)||this.markCTE(e,o-1,this.getNode(e,o-1))}}if(this.nColors-e-this.nonReservedCTEs<=0)break}if(this.nColors-e-this.nonReservedCTEs<=0)break;o--}if(this.ctes.length===n&&(this.k=this.k/2,r++,r>=5))break;n=this.ctes.length}if(this.reservedLevel>=0){o=this.reservedLevel;const e=Math.pow(8,o);for(let t=0;t<e;t++){const e=this.getNode(t,o);this.isCTE(t,o)||this.markCTE(t,o,e)}}}}const V=[];const H=navigator.hardwareConcurrency,X=Math.max(~~(H/2),1),Q=[];function Y(e,t,n,a,s,i){return new Promise(((d,l)=>{t.width=e.width,t.height=e.height;const c=e.getContext("2d");if(!c)throw new Error("Unable to get input context");const h=t.getContext("2d");if(!h)throw new Error("Unable to get output context");let u=(new Date).getTime();const g=c.getImageData(0,0,e.width,e.height);let p;if(n=function(e,t,n){return e.type===r.Auto?function(e,t){const n=`AUTO_${e.size}L${e.levels}R${e.reservedLevel}`,a=V.find((e=>e.key===n));if(a)return a.palette;{const a=function(e,t){const n=new _(e),a=t.width*t.height*4;for(let e=0;e<a;e+=4){const o=~~(e/4/t.width);if(~~(e/4%t.width)%2==0&&o%2==0){const o=Array.from(t.data.slice(e,e+4));n.addColor(o)}}const s=n.getPalette();return{name:`AUTO_${e.size}L${e.levels}R${e.reservedLevel}`,type:r.Indexed,group:o.Generated,data:s.reduce(((e,t)=>e.concat(t)))}}(e,t);return V.push({key:n,palette:a}),a}}({size:e.data[0],reservedLevel:e.data[1],levels:e.data[2],thresholdCoeff:e.data[3]},n):e}(n,0,g),console.log(`Palette processing done in ${(new Date).getTime()-u}ms`),a.supports.threads)if("auto"===i.threads){const t=((e,t)=>e.complexity(B.getSize(t)))(a,n),o=e.width*e.height,r=1+~~(o/5e4*t/2048);p=r>X?X:r,console.log(`Want ${r} threads for ${o}px @CR${t}, got ${p} (max ${X})`)}else p=i.threads;else p=1;let m=0;const f=8*~~(e.width/p/8),y=e.width-f*p;u=(new Date).getTime();for(let t=0;t<p;t++){const o=~~(y/8),r=t*f+8*(o<t?o:t),g=f+(t===p-1?y%8:o>t?8:0),w=c.getImageData(r,0,g,e.height);w||l("Unable to get image data from context");const v={data:w,x:r,y:0},x=new j;x.onprogress=e=>{e.partial&&h.putImageData(e.partial.data,r,0),h.fillStyle="#ff00ff",h.fillRect(r,e.current/(4*g),g,2)},x.onfinish=e=>{h.putImageData(e.data,r,0),m--,Q.splice(Q.indexOf(x),1);const o=(new Date).getTime();console.log(`Worker thread ${t+1} done in ${o-u}ms`),0===m&&(console.log(`${p} worker threads done in ${o-u}ms`),d())},x.onerror=e=>l(`Error in worker thread: ${e}`),console.log(`Starting worker thread ${t+1}/${p} w=${g}`),x.start(v,n,a.id,s,i),m++,Q.push(x)}}))}const Z={name:"Black/White (1-bit MC)",type:r.Mono,group:o.Mono,data:[2,255,255,255,0]},q={name:"Black/Green (1-bit MC)",type:r.Mono,group:o.Mono,data:[2,0,255,0,0]},J={name:"Black/Amber (1-bit MC)",type:r.Mono,group:o.Mono,data:[2,255,200,15,0]},K={name:"4-tone Greyscale (2-bit MC)",type:r.Mono,group:o.Mono,data:[4,255,255,255,0]},ee=document.getElementById("canvasOriginal"),te=document.getElementById("canvasOutput"),oe=document.getElementById("fileInput"),ne=document.getElementById("resizeInput"),re=document.getElementById("paletteSelect"),ae=document.getElementById("processSelect"),se=document.getElementById("advancedOptions"),ie=document.getElementById("featGamma"),de=document.getElementById("allowSlow"),le=document.getElementById("featThreads"),ce=document.getElementById("threadModeAuto"),he=document.getElementById("threadModeManual"),ue=document.getElementById("threadCount"),ge=document.getElementById("toggleAdvanced"),pe=document.getElementById("toggleOriginal"),me=document.getElementById("abort"),fe=document.getElementById("slowWarning"),ye=ee.getContext("2d");de.addEventListener("change",(function(){de.checked?fe.style.removeProperty("display"):fe.style.setProperty("display","none"),Be(),be()}));const we=[a,s,i,d,l,c,u,x,g,p,h,m,Z,q,J,K,f,y,w,v,I,E,C];let ve=g;we.forEach((e=>{const t=document.createElement("option");let o;t.setAttribute("value",e.name),t.text=e.name;const n=re.getElementsByTagName("optgroup");for(let t=0;t<n.length;t++)n[t].label===e.group&&(o=n[t]);o||(o=document.createElement("optgroup"),o.label=e.group,re.appendChild(o)),o.appendChild(t)})),re.value=ve.name;const xe=[A,R,$,z,F];let Ie=A;function Ee(){ce.disabled=!le.checked,he.disabled=!le.checked,ue.disabled=!le.checked||!he.checked}function Ce(){te.classList.remove("flash-anim");const e=le.checked?ce.checked?"auto":parseInt(ue.value,10):1;me.disabled=!1,Y(ee,te,ve,Ie,"cdRGB",{gamma:ie.checked,threads:e}).then((()=>{te.classList.add("flash-anim"),me.disabled=!0}))}function Be(){const e=ae.children;for(let t=0;t<e.length;t++){const o=e[t],n=xe.find((e=>e.name===o.value));n&&(o.disabled=!de.checked&&n.maxAllowedPaletteSize<B.getSize(ve))}}function be(){const e=re.getElementsByTagName("option");for(let t=0;t<e.length;t++){const o=e[t],n=we.find((e=>e.name===o.value));n&&(o.disabled=!de.checked&&Ie.maxAllowedPaletteSize<B.getSize(n))}}xe.forEach((e=>{const t=document.createElement("option");t.setAttribute("value",e.name),t.text=e.name,ae.appendChild(t)})),re.addEventListener("change",(function(e){ve=we.find((t=>t.name===e.target.value))||ve,Be(),Ce()})),ae.addEventListener("change",(function(e){Ie=xe.find((t=>t.name===e.target.value))||Ie,be(),Ce()})),oe.addEventListener("change",(function(e){var t;(t=e,new Promise(((e,o)=>{const n=t.target;if(null==n?void 0:n.files){const t=n.files[0],o=new Image;o.onload=()=>e(o),o.src=URL.createObjectURL(t)}else o()}))).then((e=>function(e){let t=e.width,o=e.height;const n=parseInt(ne.value,10);t>=o&&t>n&&(o=n*(o/t),t=n),o>t&&o>n&&(t=n*(t/o),o=n),ee.width=t,ee.height=o,null==ye||ye.drawImage(e,0,0,t,o),V.splice(0),Ce()}(e)))})),pe.addEventListener("click",(function(){te.classList.contains("clip")?te.classList.remove("clip"):te.classList.add("clip")})),ge.addEventListener("click",(function(){const e="none"!==getComputedStyle(se).getPropertyValue("display");e?se.style.setProperty("display","none"):se.style.removeProperty("display"),ge.innerHTML=(e?"Show":"Hide")+" advanced options"})),ue.value="2",ue.min="1",ue.max=H.toString(),le.addEventListener("change",Ee),ce.addEventListener("change",Ee),he.addEventListener("change",Ee),ue.addEventListener("change",Ee),me.addEventListener("click",(()=>{Q.forEach((e=>e.terminate())),Q.splice(0),me.disabled=!0}))})();