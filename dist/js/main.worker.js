(()=>{"use strict";function e(e){return function(e){let t=[95.047*e[0],100*e[1],108.883*e[2]];return t=t.map((e=>e>.008856?Math.pow(e,1/3):7.787*e+16/116)),[116*t[1]-16,500*(t[0]-t[1]),200*(t[1]-t[2])]}(function(e){const t=e.map((e=>{let t=e/255;return t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,100*t}));return[.4124*t[0]+.3576*t[1]+.1805*t[2],.2126*t[0]+.7152*t[1]+.0722*t[2],.0193*t[0]+.1192*t[1]+.9505*t[2]]}(e))}var t,r;(r=t||(t={})).P2BitIndexed="2-bit (4 color) Indexed",r.P4BitRGBI="4-bit (16 color) RGBI",r.P4BitIndexed="4-bit (16 color) Indexed",r.PMono="Monochrome",r.PRGB="RGB",r.PAuto="Optimized (Auto)",r.POther="Other";const o=t,s=(e,t)=>(e[0]-t[0])*(e[0]-t[0])+(e[1]-t[1])*(e[1]-t[1])+(e[2]-t[2])*(e[2]-t[2]);function l(e,t){return s(e,t)}const n={};function a(t,r){const o=t[0]+(t[1]<<8)+(t[2]<<16),l=r[0]+(r[1]<<8)+(r[2]<<16);let a=n[o];a||(a=e(t),n[o]=a);let i=n[l];return i||(i=e(r),n[l]=i),s(a,i)}class i{constructor(e){var t;this.generated=!1,this.levels=e.levels,this.tree=(t=e.levels,Array.from({length:Math.pow(8,t)},(()=>new class{constructor(){this.colors=[],this.pixels=0}get pixelCount(){return this.pixels}get avgColor(){const e=[0,0,0];for(let t=0;t<this.colors.length;t++)for(let r=0;r<3;r++)e[r]+=this.colors[t][r];return e.map((e=>e/this.colors.length))}addColor(e){this.colors.includes(e)||this.colors.push(e),this.pixels++}}))),this.ctes=[],this.reservedLevel=e.reservedLevel,this.nColors=e.numColors,this.k=e.inclThresholdCoeff||1}addColor(e){if(this.generated)throw new Error("Attempting to modify a generated palette");const t=this.index(e);return this.tree[t].addColor(e),t}getPalette(){this.generated||this.generate();const e=[];return this.ctes.forEach((t=>{const r=t.index,o=[0,0,0];for(let e=0;e<t.level;e++)for(let s=2;s>=0;s--){const l=3*(t.level-1-e)+s,n=1<<3*t.level-1>>3*e+(2-s);o[2-s]=o[2-s]<<1|(r&n)>>l}for(let e=t.level;e<8;e++)for(let r=0;r<3;r++)o[r]=o[r]<<1|(e===t.level?1:0);e.push(o)})),console.log(`Built palette with ${e.length} colors`),e}index(e){let t=0;for(let r=0;r<this.levels;r++){const o=7-r;let s=0;for(let t=0;t<3;t++){const l=128>>r;s=s<<1|(e[t]&l)>>o}t=t<<3|s}return t}getNode(e,t){if(t===this.levels)return this.tree[e];const r=[];for(let o=0;o<8;o++)this.isCTE(8*e+o,t+1)||r.push(this.getNode(8*e+o,t+1));return r.filter((e=>e.pixelCount>0)).reduce(((e,t)=>({pixelCount:e.pixelCount+t.pixelCount})),{pixelCount:0})}isCTE(e,t){return this.ctes.some((r=>r.index===e&&r.level===t))}markCTE(e,t,r){this.ctes.push({index:e,level:t,node:r})}testNode(e,t,r,o){const s=e-t-this.ctes.length,l=(r-this.ctes.map((e=>e.node.pixelCount)).reduce(((e,t)=>e+t),0))/s*this.k;return o.pixelCount>l}get nonReservedCTEs(){return this.ctes.filter((e=>e.level!==this.reservedLevel)).length}generate(){if(this.generated)throw new Error("This palette has already been generated");this.generated=!0;const e=this.reservedLevel<0?0:Math.pow(8,this.reservedLevel),t=this.getNode(0,0).pixelCount;let r,o=0,s=0;for(;this.nColors-e-this.nonReservedCTEs>0;){for(r=this.levels;r>this.reservedLevel&&r>0;){const o=Math.pow(8,r);for(let s=0;s<o;s++){const o=this.getNode(s,r);if(!this.isCTE(s,r)&&this.testNode(this.nColors,e,t,o)&&this.markCTE(s,r,o),s%8==7){let e=0;for(let t=s-7;t<=s;t++)this.isCTE(t,r)&&e++;if(e>0&&e<8){const e=s>>3;this.isCTE(e,r-1)||this.markCTE(e,r-1,this.getNode(e,r-1))}}if(this.nColors-e-this.nonReservedCTEs<=0)break}if(this.nColors-e-this.nonReservedCTEs<=0)break;r--}if(this.ctes.length===o&&(this.k=this.k/2,s++,s>=5))break;o=this.ctes.length}if(this.reservedLevel>=0){r=this.reservedLevel;const e=Math.pow(8,r);for(let t=0;t<e;t++){const e=this.getNode(t,r);this.isCTE(t,r)||this.markCTE(t,r,e)}}}}const d=[];function h(e,t,r){switch(t.type){case o.PRGB:return function(e,t){const r=t.data[0].map((e=>Math.pow(2,e))),o=[...e];for(let t=0;t<3;t++){const s=~~(e[t]/(256/r[t]));o[t]=s*(255/(r[t]-1))}return o}(e,t);default:return function(e,t,r){let o=[],s=Number.POSITIVE_INFINITY;return t.data.forEach((t=>{const l=r(e,t);l<=s&&(o=t,s=l)})),o}(e,t,r)}}const c={id:"ProcBasic",name:"Basic (no dithering)",procFn:(e,t,r,o)=>{const s=4*e.width,l=e.width*e.height*4;for(let n=0;n<l;n+=4){const a=h(Array.from(e.data.slice(n,n+4)),t,r);for(let t=0;t<3;t++)e.data[n+t]=a[t];n%(8*s)==0&&o&&o(n,l,e)}return e},maxAllowedPaletteSize:65536,supportsMultipleThreads:!1,complexity:e=>e},u=[0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21].map((e=>e/64));function p(e,t,r,o,s){return s(e,t)+r*((o<0?-o:o)+.5)}function f(e=!0){return(t,r,s,l)=>{r.type===o.PRGB&&(r=(e=>{if(e.type!==o.PRGB)throw new Error("Not an RGB palette");const t=e.data[0].map((e=>Math.pow(2,e))),r={name:"EXPANDED_RGB",type:o.POther,useAlpha:!1,data:[]};for(let e=0;e<t[0];e++)for(let o=0;o<t[1];o++)for(let s=0;s<t[2];s++){const l=[e,o,s],n=[e,o,s];for(let e=0;e<3;e++)n[e]=l[e]*(255/(t[e]-1));r.data.push(n)}return r})(r));const n=t.width*t.height*4,a=4*t.width,i={};for(let e=0;e<r.data.length;e++)for(let t=e;t<r.data.length;t++)i[e*r.data.length+t]=.1*s(r.data[e],r.data[t]);const d=[0,0,0];let h,c,f,g;for(let o=0;o<n;o+=4){h=Array.from(t.data.slice(o,o+4));const m=u[o%a/4%8+~~(o/a)%8*8];g={color1:[0,0,0],color2:h,ratio:.33};let v=Number.MAX_VALUE;for(let t=0;t<r.data.length;t++)for(let o=t;o<r.data.length;o++)if(c=r.data[t],f=r.data[o],e){let e=32;t!==o&&(e=((c[0]!==f[0]?19136*(h[0]-c[0])/(f[0]-c[0]):0)+(c[1]!==f[1]?37568*(h[1]-c[1])/(f[1]-c[1]):0)+(c[2]!==f[2]?7296*(h[2]-c[2])/(f[2]-c[2]):0))/((c[0]!==f[0]?299:0)+(c[1]!==f[1]?587:0)+(c[2]!==f[2]?114:0)),e<0?e=0:e>63&&(e=63),e=~~e);const l=e/64;for(let e=0;e<3;e++)d[e]=c[e]+l*(f[e]-c[e]);const n=p(h,d,i[t*r.data.length+o],l-.5,s);n<v&&(v=n,g.color1=c,g.color2=f,g.ratio=l)}else for(let e=0;e<64&&!(t===o&&e>0);e++){const l=e/64;for(let e=0;e<3;e++)d[e]=c[e]+l*(f[e]-c[e]);const n=p(h,d,i[t*r.data.length+o],l-.5,s);n<v&&(v=n,g.color1=c,g.color2=f,g.ratio=l)}for(let e=0;e<3;e++)t.data[o+e]=m<g.ratio?g.color2[e]:g.color1[e];o%(4*a)==0&&l&&l(o,n,t)}return t}}const g={id:"ProcBayerLikeFast",name:"Ordered (Bayer-like) – Fast",procFn:f(),maxAllowedPaletteSize:192,supportsMultipleThreads:!0,complexity:e=>e*e/2},m={id:"ProcBayerLikeThorough",name:"Ordered (Bayer-like) – High Quality",procFn:f(!1),maxAllowedPaletteSize:24,supportsMultipleThreads:!0,complexity:e=>e*e*32},v={id:"ProcFloydSteinberg",name:"Floyd–Steinberg",procFn:(e,t,r,o)=>{const s=e.width*e.height*4,l=4*e.width;for(let n=0;n<s;n+=4){const a=Array.from(e.data.slice(n,n+4)),i=h(a,t,r);for(let t=0;t<3;t++)e.data[n+t]=i[t];const d=a.map(((e,t)=>e-i[t]));for(let t=0;t<3;t++)e.data[n+4+t]+=7*d[t]/16,e.data[n+l-4+t]+=3*d[t]/16,e.data[n+l+t]+=5*d[t]/16,e.data[n+l+4+t]+=1*d[t]/16;n%(4*l)==0&&o&&o(n,s,e)}return e},maxAllowedPaletteSize:65536,supportsMultipleThreads:!1,complexity:e=>e},C=self;var w;!function(e){e[e.Progress=0]="Progress",e[e.Done=1]="Done",e[e.Error=2]="Error"}(w||(w={}));const E=(e,t,r)=>{C.postMessage({msg:w.Progress,params:{current:e,total:t,partial:r}})};C.addEventListener("message",(e=>{const t=e.data,r=t.palette.type===o.PAuto?function(e,t){const r=`AUTO_${e.data[0][0]}_${e.data[1][2]}`,s=d.find((e=>e.key===r));if(s)return s.palette;{const s=function(e,t){const r=new i(e),s=t.width*t.height*4;for(let e=0;e<s;e+=4){const o=~~(e/4/t.width);if(~~(e/4%t.width)%2==0&&o%2==0){const o=Array.from(t.data.slice(e,e+4));r.addColor(o)}}const l=r.getPalette();return{name:"__GENERATED__",type:o.POther,useAlpha:!1,data:l}}({numColors:e.data[0][0],reservedLevel:e.data[0][1],levels:e.data[0][2],inclThresholdCoeff:e.data[1][0]},t);return d.push({key:r,palette:s}),s}}(t.palette,t.dataIn):t.palette,s=(e=>{switch(e){case c.id:return c;case v.id:return v;case g.id:return g;case m.id:return m;default:return null}})(t.procId);if(s){const e=(e=>{switch(e){case"cdLab":return a;case"cdRGB":default:return l}})(t.distFnId);s.procFn(t.dataIn,r,e,E),C.postMessage({msg:w.Done,params:{result:t.dataIn}}),self.close()}else C.postMessage({msg:w.Error,params:{error:"bad procId"}}),self.close()}))})();