(()=>{"use strict";var e;!function(e){e.P2BitIndexed="2-bit (4 color) Indexed",e.P4BitRGBI="4-bit (16 color) RGBI",e.P4BitIndexed="4-bit (16 color) Indexed",e.PMono="Monochrome",e.PRGB="RGB",e.PAuto="Other",e.POther="Other"}(e||(e={}));const t=e,o={name:"CGA Mode 4 Palette 0 (low)",type:t.P2BitIndexed,useAlpha:!1,data:[[0,0,0],[0,170,0],[170,0,0],[170,85,0]]},n={name:"CGA Mode 4 Palette 0 (high)",type:t.P2BitIndexed,useAlpha:!1,data:[[0,0,0],[85,255,85],[255,85,85],[255,255,85]]},a={name:"CGA Mode 4 Palette 1 (low)",type:t.P2BitIndexed,useAlpha:!1,data:[[0,0,0],[0,170,170],[170,0,170],[170,170,170]]},s={name:"CGA Mode 4 Palette 1 (high)",type:t.P2BitIndexed,useAlpha:!1,data:[[0,0,0],[85,255,255],[255,85,255],[255,255,255]]},l={name:"CGA Mode 5 (low)",type:t.P2BitIndexed,useAlpha:!1,data:[[0,0,0],[0,170,170],[170,0,0],[170,170,170]]},i={name:"CGA Mode 5 (high)",type:t.P2BitIndexed,useAlpha:!1,data:[[0,0,0],[85,255,255],[255,85,85],[255,255,255]]},r={name:"CGA 4-bit RGBI (IBM)",type:t.P4BitRGBI,useAlpha:!1,data:[[0,0,0],[0,0,170],[0,170,0],[0,170,170],[170,0,0],[170,0,170],[170,85,0],[170,170,170],[85,85,85],[85,85,255],[85,255,85],[85,255,255],[255,85,85],[255,85,255],[255,255,85],[255,255,255]]},d={name:"Commodore 64",type:t.P4BitIndexed,useAlpha:!1,data:[[0,0,0],[98,98,82],[137,137,137],[173,173,173],[255,255,255],[159,78,68],[203,126,117],[109,84,18],[161,104,60],[201,212,135],[154,226,155],[92,171,94],[106,191,198],[136,126,203],[80,69,155],[160,87,163]]},h={name:"Windows 4-bit RGBI",type:t.P4BitRGBI,useAlpha:!1,data:[[0,0,0],[0,0,128],[0,128,0],[0,128,128],[128,0,0],[128,0,128],[128,128,0],[192,192,192],[128,128,128],[0,0,255],[0,255,0],[0,255,255],[255,0,0],[255,0,255],[255,255,0],[255,255,255]]},c={name:"Windows 20-color Extended RGBI",type:t.P4BitIndexed,useAlpha:!1,data:[[0,0,0],[0,0,128],[0,128,0],[0,128,128],[128,0,0],[128,0,128],[128,128,0],[192,192,192],[192,220,192],[166,202,240],[255,251,240],[160,160,164],[128,128,128],[0,0,255],[0,255,0],[0,255,255],[255,0,0],[255,0,255],[255,255,0],[255,255,255]]},u={name:"ZX Spectrum 4-bit RGBI",type:t.P4BitRGBI,useAlpha:!1,data:[[0,0,0],[0,0,215],[0,215,0],[0,215,215],[215,0,0],[215,0,215],[215,215,0],[215,215,215],[0,0,255],[0,255,0],[0,255,255],[255,0,0],[255,0,255],[255,255,0],[255,255,255]]},p={name:"Game Boy Green (2-bit MC)",type:t.PMono,useAlpha:!1,data:[[15,56,15],[48,98,48],[139,172,15],[155,188,15]]},m={name:"Game Boy White (2-bit MC)",type:t.PMono,useAlpha:!1,data:[[0,0,0],[85,85,85],[170,170,170],[255,255,255]]},g={name:"8-color RGB (3-bit, 1bpc)",type:t.PRGB,useAlpha:!1,data:[[1,1,1]]},f={name:"64-color RGB (6-bit, 2bpc)",type:t.PRGB,useAlpha:!1,data:[[2,2,2]]},v={name:"256-color RGB (8-bit, 3-3-2)",type:t.PRGB,useAlpha:!1,data:[[3,3,2]]},C={name:"Macintosh II (1987)",type:t.P4BitIndexed,useAlpha:!1,data:[[255,255,255],[255,255,0],[255,102,0],[221,0,0],[255,0,153],[51,0,153],[0,0,204],[0,153,255],[0,170,0],[0,102,0],[102,51,0],[153,102,51],[187,187,187],[136,136,136],[68,68,68],[0,0,0]]},A={name:"Auto 16-color (4-bit indexed)",type:t.PAuto,useAlpha:!1,data:[[16,-1,4],[1,0,0]]},B={name:"Auto 64-color (6-bit indexed)",type:t.PAuto,useAlpha:!1,data:[[64,1,5],[1,0,0]]},y={name:"Auto 256-color (8-bit indexed)",type:t.PAuto,useAlpha:!1,data:[[256,2,5],[1,0,0]]},E={name:"Black/White (1-bit MC)",type:t.PMono,useAlpha:!1,data:[[0,0,0],[255,255,255]]},I={name:"Black/Green (1-bit MC)",type:t.PMono,useAlpha:!1,data:[[0,0,0],[0,255,0]]},x={name:"Black/Amber (1-bit MC)",type:t.PMono,useAlpha:!1,data:[[0,0,0],[255,200,15]]};class P{constructor(e){var t;this.generated=!1,this.levels=e.levels,this.tree=(t=e.levels,Array.from({length:Math.pow(8,t)},(()=>new class{constructor(){this.colors=[],this.pixels=0}get pixelCount(){return this.pixels}get avgColor(){const e=[0,0,0];for(let t=0;t<this.colors.length;t++)for(let o=0;o<3;o++)e[o]+=this.colors[t][o];return e.map((e=>e/this.colors.length))}addColor(e){this.colors.includes(e)||this.colors.push(e),this.pixels++}}))),this.ctes=[],this.reservedLevel=e.reservedLevel,this.nColors=e.numColors,this.k=e.inclThresholdCoeff||1}addColor(e){if(this.generated)throw new Error("Attempting to modify a generated palette");const t=this.index(e);return this.tree[t].addColor(e),t}getPalette(){this.generated||this.generate();const e=[];return this.ctes.forEach((t=>{const o=t.index,n=[0,0,0];for(let e=0;e<t.level;e++)for(let a=2;a>=0;a--){const s=3*(t.level-1-e)+a,l=1<<3*t.level-1>>3*e+(2-a);n[2-a]=n[2-a]<<1|(o&l)>>s}for(let e=t.level;e<8;e++)for(let o=0;o<3;o++)n[o]=n[o]<<1|(e===t.level?1:0);e.push(n)})),console.log(`Built palette with ${e.length} colors`),e}index(e){let t=0;for(let o=0;o<this.levels;o++){const n=7-o;let a=0;for(let t=0;t<3;t++){const s=128>>o;a=a<<1|(e[t]&s)>>n}t=t<<3|a}return t}getNode(e,t){if(t===this.levels)return this.tree[e];const o=[];for(let n=0;n<8;n++)this.isCTE(8*e+n,t+1)||o.push(this.getNode(8*e+n,t+1));return o.filter((e=>e.pixelCount>0)).reduce(((e,t)=>({pixelCount:e.pixelCount+t.pixelCount})),{pixelCount:0})}isCTE(e,t){return this.ctes.some((o=>o.index===e&&o.level===t))}markCTE(e,t,o){this.ctes.push({index:e,level:t,node:o})}testNode(e,t,o,n){const a=e-t-this.ctes.length,s=(o-this.ctes.map((e=>e.node.pixelCount)).reduce(((e,t)=>e+t),0))/a*this.k;return n.pixelCount>s}get nonReservedCTEs(){return this.ctes.filter((e=>e.level!==this.reservedLevel)).length}generate(){if(this.generated)throw new Error("This palette has already been generated");this.generated=!0;const e=this.reservedLevel<0?0:Math.pow(8,this.reservedLevel),t=this.getNode(0,0).pixelCount;let o,n=0,a=0;for(;this.nColors-e-this.nonReservedCTEs>0;){for(o=this.levels;o>this.reservedLevel&&o>0;){const n=Math.pow(8,o);for(let a=0;a<n;a++){const n=this.getNode(a,o);if(!this.isCTE(a,o)&&this.testNode(this.nColors,e,t,n)&&this.markCTE(a,o,n),a%8==7){let e=0;for(let t=a-7;t<=a;t++)this.isCTE(t,o)&&e++;if(e>0&&e<8){const e=a>>3;this.isCTE(e,o-1)||this.markCTE(e,o-1,this.getNode(e,o-1))}}if(this.nColors-e-this.nonReservedCTEs<=0){console.warn(`Ran out of colors! At node ${a}, level ${o}`);break}}if(this.nColors-e-this.nonReservedCTEs<=0){console.warn(`Ran out of colors! At level ${o}`);break}o--}if(console.log(`${this.ctes.length} CTEs, ${this.ctes.length-this.nonReservedCTEs} reserved`),this.ctes.length===n&&(this.k=this.k/2,a++,a>=5))break;n=this.ctes.length}if(this.reservedLevel>=0){o=this.reservedLevel;const e=Math.pow(8,o);for(let t=0;t<e;t++){const e=this.getNode(t,o);this.isCTE(t,o)||this.markCTE(t,o,e)}}}}function w(e,o,n,a){o.width=e.width,o.height=e.height;const s=e.getContext("2d");if(!s)throw new Error("Unable to get input context");const l=o.getContext("2d");if(!l)throw new Error("Unable to get output context");const i=s.getImageData(0,0,e.width,e.height);if(!i)throw new Error("Unable to get image data from context");n.type===t.PAuto&&(n=function(e,o){const n=new P(e),a=o.width*o.height*4;for(let e=0;e<a;e+=4){const t=Math.floor(e/4/o.width);if(Math.floor(e/4%o.width)%2==0&&t%2==0){const t=Array.from(o.data.slice(e,e+4));n.addColor(t)}}const s=n.getPalette();return{name:"__GENERATED__",type:t.POther,useAlpha:!1,data:s}}({numColors:n.data[0][0],reservedLevel:n.data[0][1],levels:n.data[0][2],inclThresholdCoeff:n.data[1][0]},i));const r=a.function(i,n);null==l||l.putImageData(r,0,0)}function b(e,o){switch(o.type){case t.PRGB:return function(e,t){const o=t.data[0].map((e=>Math.pow(2,e))),n=[...e];for(let t=0;t<3;t++){const a=Math.floor(e[t]/(256/o[t]));n[t]=a*(255/(o[t]-1))}return n}(e,o);default:return function(e,t){let o=[],n=Number.POSITIVE_INFINITY;return t.data.forEach((t=>{const a=function(e,t){let o=0;for(let n=0;n<3;n++)o+=(e[n]-t[n])*(e[n]-t[n]);return o}(e,t);a<=n&&(o=t,n=a)})),o}(e,o)}}const G={name:"Basic (no dithering)",function:(e,t)=>{const o=e.width*e.height*4;for(let n=0;n<o;n+=4){const o=b(Array.from(e.data.slice(n,n+4)),t);for(let t=0;t<3;t++)e.data[n+t]=o[t]}return e}},M={name:"Floyd–Steinberg",function:(e,t)=>{const o=e.width*e.height*4,n=4*e.width;for(let a=0;a<o;a+=4){const o=Array.from(e.data.slice(a,a+4)),s=b(o,t);for(let t=0;t<3;t++)e.data[a+t]=s[t];const l=o.map(((e,t)=>e-s[t]));for(let t=0;t<3;t++)e.data[a+4+t]+=7*l[t]/16,e.data[a+n-4+t]+=3*l[t]/16,e.data[a+n+t]+=5*l[t]/16,e.data[a+n+4+t]+=1*l[t]/16}return e}},R=document.getElementById("canvasOriginal"),T=R.getContext("2d"),L=document.getElementById("canvasOutput"),k=[o,n,a,s,l,i,d,C,h,c,r,u,E,x,I,p,m,g,f,v,A,B,y];let N=h;const O=document.getElementById("paletteSelect");k.forEach((e=>{const t=document.createElement("option");let o;t.setAttribute("value",e.name),t.text=e.name;const n=O.getElementsByTagName("optgroup");for(let t=0;t<n.length;t++)n[t].label===e.type&&(o=n[t]);o||(o=document.createElement("optgroup"),o.label=e.type,O.appendChild(o)),o.appendChild(t)})),O.value=N.name;const $=[G,M];let S=G;const U=document.getElementById("processSelect");$.forEach((e=>{const t=document.createElement("option");t.setAttribute("value",e.name),t.text=e.name,U.appendChild(t)})),O.addEventListener("change",(function(e){N=k.find((t=>t.name===e.target.value))||N,w(R,L,N,S)})),U.addEventListener("change",(function(e){S=$.find((t=>t.name===e.target.value))||S,w(R,L,N,S)}));const _=document.getElementById("resizeInput");document.getElementById("fileInput").addEventListener("change",(function(e){var t;(t=e,new Promise(((e,o)=>{const n=t.target;if(null==n?void 0:n.files){const t=n.files[0],o=new Image;o.onload=()=>e(o),o.src=URL.createObjectURL(t)}else o()}))).then((e=>function(e){let t=e.width,o=e.height;const n=parseInt(_.value,10);t>=o&&t>n&&(o=n*(o/t),t=n),o>t&&o>n&&(t=n*(t/o),o=n),R.width=t,R.height=o,null==T||T.drawImage(e,0,0,t,o),w(R,L,N,S)}(e)))})),document.getElementById("toggleOriginal").addEventListener("click",(function(){L.classList.contains("clip")?L.classList.remove("clip"):L.classList.add("clip")}))})();