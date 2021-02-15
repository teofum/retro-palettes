(()=>{"use strict";var e,t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var o=n.getElementsByTagName("script");o.length&&(e=o[o.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),function(e){e.CGA2Bit="IBM CGA 2-bit modes",e.RetroPC="Retro PCs",e.RetroVC="Retro Consoles",e.Mono="Monochrome",e.Duo="Dual Tone",e.RGB="RGB",e.CMYK="CMYK",e.Auto="Optimized (Auto)",e.Other="Other",e.Generated="AUTOGENERATED PALETTE",e.Hidden="HIDDEN PALETTE"}(e||(e={}));const n=e;var o;!function(e){e[e.Indexed=0]="Indexed",e[e.Mono=1]="Mono",e[e.RGB=2]="RGB",e[e.Mixer=3]="Mixer",e[e.Auto=4]="Auto"}(o||(o={}));const a=o,s={name:"CGA Mode 4 Palette 0 (low)",type:a.Indexed,group:n.CGA2Bit,data:[0,0,0,0,170,0,170,0,0,170,85,0]},r={name:"CGA Mode 4 Palette 0 (high)",type:a.Indexed,group:n.CGA2Bit,data:[0,0,0,85,255,85,255,85,85,255,255,85]},i={name:"CGA Mode 4 Palette 1 (low)",type:a.Indexed,group:n.CGA2Bit,data:[0,0,0,0,170,170,170,0,170,170,170,170]},l={name:"CGA Mode 4 Palette 1 (high)",type:a.Indexed,group:n.CGA2Bit,data:[0,0,0,85,255,255,255,85,255,255,255,255]},d={name:"CGA Mode 5 (low)",type:a.Indexed,group:n.CGA2Bit,data:[0,0,0,0,170,170,170,0,0,170,170,170]},c={name:"CGA Mode 5 (high)",type:a.Indexed,group:n.CGA2Bit,data:[0,0,0,85,255,255,255,85,85,255,255,255]},u={name:"Apple II (16-color) (*)",type:a.Indexed,group:n.RetroPC,data:[0,0,0,156,156,156,255,255,255,96,78,189,208,195,255,255,68,253,227,30,96,255,160,208,255,106,60,96,114,3,208,221,141,20,245,60,0,163,96,114,255,208,20,207,253]},h={name:"Apple II High-res (6-color) (*)",type:a.Indexed,group:n.RetroPC,data:[0,0,0,255,255,255,255,68,253,255,106,60,20,245,60,20,207,253]},m={name:"Apple IIGS (Master Color Values)",type:a.Indexed,group:n.RetroPC,data:[0,0,0,221,0,51,0,0,153,221,34,221,0,119,34,85,85,85,34,34,255,102,170,255,136,85,0,255,102,0,170,170,170,255,153,136,17,221,0,255,255,0,68,255,153,255,255,255]},p={name:"IBM CGA 4-bit RGBI",type:a.Indexed,group:n.RetroPC,data:[0,0,0,0,0,170,0,170,0,0,170,170,170,0,0,170,0,170,170,85,0,170,170,170,85,85,85,85,85,255,85,255,85,85,255,255,255,85,85,255,85,255,255,255,85,255,255,255]},g={name:"Commodore 64 (*)",type:a.Indexed,group:n.RetroPC,data:[0,0,0,98,98,82,137,137,137,173,173,173,255,255,255,159,78,68,203,126,117,109,84,18,161,104,60,201,212,135,154,226,155,92,171,94,106,191,198,136,126,203,80,69,155,160,87,163]},f={name:"Macintosh II (1987)",type:a.Indexed,group:n.RetroPC,data:[255,255,255,255,255,0,255,102,0,221,0,0,255,0,153,51,0,153,0,0,204,0,153,255,0,170,0,0,102,0,102,51,0,153,102,51,187,187,187,136,136,136,68,68,68,0,0,0]},v={name:"Windows 4-bit RGBI",type:a.Indexed,group:n.RetroPC,data:[0,0,0,0,0,128,0,128,0,0,128,128,128,0,0,128,0,128,128,128,0,192,192,192,128,128,128,0,0,255,0,255,0,0,255,255,255,0,0,255,0,255,255,255,0,255,255,255]},w={name:"Windows 20-color Extended RGBI",type:a.Indexed,group:n.RetroPC,data:[0,0,0,0,0,128,0,128,0,0,128,128,128,0,0,128,0,128,128,128,0,192,192,192,192,220,192,166,202,240,255,251,240,160,160,164,128,128,128,0,0,255,0,255,0,0,255,255,255,0,0,255,0,255,255,255,0,255,255,255]},C={name:"ZX Spectrum 4-bit RGBI",type:a.Indexed,group:n.RetroPC,data:[0,0,0,0,0,215,0,215,0,0,215,215,215,0,0,215,0,215,215,215,0,215,215,215,0,0,255,0,255,0,0,255,255,255,0,0,255,0,255,255,255,0,255,255,255]},y={name:"Game Boy (2-bit MC)",type:a.Indexed,group:n.RetroVC,data:[15,56,15,48,98,48,139,172,15,155,188,15]},b={name:"NES (All colors) (*)",type:a.Indexed,group:n.RetroVC,data:[0,0,0,40,40,40,168,168,168,0,24,32,0,96,112,0,192,208,144,224,232,0,30,0,0,104,16,0,200,112,144,232,200,0,104,0,40,192,32,168,232,160,0,24,0,8,88,0,112,176,0,200,224,144,16,0,0,96,64,0,192,152,0,232,216,136,64,0,0,160,32,0,248,128,24,248,200,160,88,0,0,208,16,0,248,112,104,248,192,192,88,0,16,208,0,88,248,112,176,248,192,224,56,0,80,160,8,168,248,104,248,248,192,248,0,8,112,88,24,216,152,104,248,208,184,248,0,8,120,8,48,224,80,120,248,176,192,248,0,8,88,0,72,184,32,160,248,168,216,248,72,72,72,160,160,160,248,248,248]},x={name:"8-color RGB (3-bit, 1bpc)",type:a.RGB,group:n.RGB,data:[2,2,2]},E={name:"16-color RGB (4-bit, 1-2-1)",type:a.RGB,group:n.RGB,data:[2,4,2]},L={name:"64-color RGB (6-bit, 2bpc)",type:a.RGB,group:n.RGB,data:[4,4,4]},I={name:"256-color RGB (8-bit, 3-3-2)",type:a.RGB,group:n.RGB,data:[8,8,4]},M={name:"Black/White (1-bit MC)",type:a.Mono,group:n.Mono,data:[2,0,255,255,255]},k={name:"Black/Green (1-bit MC)",type:a.Mono,group:n.Mono,data:[2,0,0,255,0]},A={name:"Black/Amber (1-bit MC)",type:a.Mono,group:n.Mono,data:[2,0,255,200,15]},B={name:"4-tone Greyscale (2-bit MC)",type:a.Mono,group:n.Mono,data:[4,0,255,255,255]},R={name:"4-tone Amber (2-bit MC)",type:a.Mono,group:n.Mono,data:[4,.04,255,200,15]},G={name:"16-tone Greyscale (4-bit MC)",type:a.Mono,group:n.Mono,data:[16,0,255,255,255]},P=(a.Mono,n.Mono,{name:"Green/Magenta (2-bit, 1bpc)",type:a.Mixer,group:n.Duo,data:[2,0,0,0,2,0,0,255,0,2,0,255,0,255]}),T={name:"Red/Cyan (4-bit, 2bpc)",type:a.Mixer,group:n.Duo,data:[2,0,0,0,4,0,255,0,0,4,0,0,255,255]},N={name:"Green/Magenta (4-bit, 2bpc)",type:a.Mixer,group:n.Duo,data:[2,0,0,0,4,0,0,255,0,4,0,255,0,255]},S={name:"Blue/Yellow (4-bit, 2bpc)",type:a.Mixer,group:n.Duo,data:[2,0,0,0,4,0,0,0,255,4,0,255,255,0]},$={name:"White/Amber (4-bit, 2bpc)",type:a.Mixer,group:n.Duo,data:[2,0,0,0,4,0,255,255,255,4,0,255,200,15]},D={name:"Orange/Dark Green (4-bit, 2bpc)",type:a.Mixer,group:n.Duo,data:[2,0,0,0,4,0,240,110,50,4,0,20,75,65]},z={name:"Orange/Blue (4-bit, 2bpc)",type:a.Mixer,group:n.Duo,data:[2,0,0,0,4,0,240,110,50,4,0,15,45,135]},O={name:"CMYK (Unmixed, 1 level)",type:a.Indexed,group:n.CMYK,data:[255,255,255,0,174,239,236,0,140,255,242,0,16,16,16]},Y={name:"CMYK (Unmixed, 2 levels)",type:a.Indexed,group:n.CMYK,data:[255,255,255,128,214,247,0,174,239,246,128,198,236,0,140,255,249,128,255,242,0,136,136,136,16,16,16]},U={name:"CMYK (Unmixed, 4 levels)",type:a.Indexed,group:n.CMYK,data:[255,255,255,192,235,251,128,214,247,64,194,243,0,174,239,251,192,227,246,128,198,241,64,169,236,0,140,255,252,192,255,249,128,255,245,64,255,242,0,196,196,196,136,136,136,76,76,76,16,16,16]},K={name:"16-color CMYK (4-bit, 1bpc)",type:a.Mixer,group:n.CMYK,data:[4,1,0,0,2,0,0,174,239,2,0,236,0,140,2,0,255,242,0,2,0,128,128,128]},F={name:"64-color CMYK (6-bit, 1-1-1-3)",type:a.Mixer,group:n.CMYK,data:[4,1,0,0,2,0,0,174,239,2,0,236,0,140,2,0,255,242,0,4,0,96,96,96]},V={name:"256-color CMYK (8-bit, 2bpc)",type:a.Mixer,group:n.CMYK,data:[4,1,0,0,4,0,0,174,239,4,0,236,0,140,4,0,255,242,0,4,0,64,64,64]},W={name:"Auto 16-color (4-bit indexed)",type:a.Auto,group:n.Auto,data:[16,-1,5,1]},j={name:"Auto 64-color (6-bit indexed)",type:a.Auto,group:n.Auto,data:[64,1,5,1]},H={name:"Auto 256-color (8-bit indexed)",type:a.Auto,group:n.Auto,data:[256,2,5,1]};function _(e,t,n){let o=[],a=Number.POSITIVE_INFINITY;for(let s=0;s<t.length;s++){const r=n(e,t[s]);r<=a&&(o=t[s],a=r)}return o}const X=class{static getSize(e){switch(e.type){case a.Indexed:return e.data.length/3;case a.Mono:return e.data[0];case a.RGB:return e.data[0]*e.data[1]*e.data[2];case a.Mixer:{const t=(e.data.length-4)/5;let n=1;for(let o=0;o<t;o++)n*=e.data[4+5*o];return n}case a.Auto:return e.data[0];default:return 0}}static getColor(e,t){if(t<0||t>=this.getSize(e))throw new Error(`Color index ${t} out of bounds`);switch(e.type){case a.Indexed:return e.data.slice(3*t,3*t+3);case a.Mono:return e.data.slice(2,5).map((n=>{const o=~~(n*e.data[1]);return o+t*~~((n-o)/(e.data[0]-1))}));case a.Mixer:return this.getMixerColor(e,t);case a.RGB:{const n=t%e.data[2],o=~~(t/e.data[2])%e.data[1];return[~~(t/(e.data[2]*e.data[1])),o,n].map(((t,n)=>t*~~(255/(e.data[n]-1))))}case a.Auto:default:throw new Error("Invalid or Auto palette type")}}static getColors(e){return Array.from({length:this.getSize(e)},((t,n)=>this.getColor(e,n)))}static transform(e,t){const o=this.getColors(e).map((e=>t(e)));return{name:`${e.name} :: ${t.name}`,type:a.Indexed,group:n.Generated,data:o.reduce(((e,t)=>e.concat(t)))}}static getMixerColor(e,t){const n=1===e.data.slice(0,4)[1],o=(e.data.length-4)/5,a=n?[255,255,255]:[0,0,0],s=t=>e.data[4+5*t],r=t=>e.data[5+5*t],i=t=>e.data.slice(6+5*t,9+5*t),l=e=>{let n=t;for(let t=0;t<e;t++)n=~~(n/s(t));return n%s(e)};for(let e=0;e<o;e++)i(e).forEach(((t,o)=>{n&&(t=255-t);const i=~~(t*r(e)),d=t-i,c=i+l(e)*~~(d/(s(e)-1));a[o]+=n?-c:c,a[o]<0&&(a[o]=0)}));return a}},Z={id:"ProcBasic",name:"Basic (no dithering)",procFn:(e,t,n,o,a)=>{const s=4*e.width,r=e.width*e.height*4,i=X.getColors(t);for(let t=0;t<r;t+=4){const o=_(Array.from(e.data.slice(t,t+4)),i,n);for(let n=0;n<3;n++)e.data[t+n]=o[n];t%(8*s)==0&&a&&a(t,r,e)}return e},maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!1},complexity:e=>e};function J(e,t=2.2){return e.map((e=>{let n=e/255;return n=n>.04045?Math.pow((n+.055)/1.055,t):n/12.92,100*n}))}function Q(e,t=2.2){return e.map((e=>{let n=e/100;return n=n>.0031308?1.055*Math.pow(n,1/t)-.055:12.92*n,~~(255*n)}))}function q(e,t){return o=t,((n=e)[0]-o[0])*(n[0]-o[0])+(n[1]-o[1])*(n[1]-o[1])+(n[2]-o[2])*(n[2]-o[2]);var n,o}function ee(e,t){return q(Q(e),Q(t))}function te(e){return(t,n,o,a,s)=>{const r=t.width*t.height*4,i=4*t.width,l=X.getColors(n);if(a.gamma){for(let e=0;e<r;e+=4){const n=J(Array.from(t.data.slice(e,e+3)));for(let o=0;o<3;o++)t.data[e+o]=n[o];e%(4*i)==0&&s&&s(e,r,t)}for(let e=0;e<l.length;e++)l[e]=J(l[e])}for(let n=0;n<r;n+=4){const o=Array.from(t.data.slice(n,n+3)),d=_(o,l,a.gamma?ee:q),c=n%i/4;for(let e=0;e<3;e++)t.data[n+e]=(a.gamma?Q(d):d)[e];const u=o.map(((e,t)=>e-d[t]));for(let o=0;o<e.length;o++){const a=n+4*e[o].x+e[o].y*i;if(c+e[o].x>=0&&c+e[o].x<t.width)for(let n=0;n<3;n++)t.data[a+n]+=u[n]*e[o].w}n%(4*i)==0&&s&&s(n,r,t)}return t}}const ne={id:"ProcFloydSteinberg",name:"Floyd-Steinberg",procFn:te([{x:1,y:0,w:7/16},{x:-1,y:1,w:3/16},{x:0,y:1,w:5/16},{x:1,y:1,w:1/16}]),maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!0},complexity:e=>2*e},oe={id:"ProcMinAverageError",name:"Minimum Average Error (JJ&N)",procFn:te([{x:1,y:0,w:7/48},{x:2,y:0,w:5/48},{x:-2,y:1,w:3/48},{x:-1,y:1,w:5/48},{x:0,y:1,w:7/48},{x:1,y:1,w:5/48},{x:2,y:1,w:3/48},{x:-2,y:2,w:1/48},{x:-1,y:2,w:3/48},{x:0,y:2,w:5/48},{x:1,y:2,w:3/48},{x:2,y:2,w:1/48}]),maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!0},complexity:e=>6*e},ae=Array.from({length:100001});function se(e){const t=[0,0,0];for(let n=0;n<3;n++)t[n]=Math.pow(e[n]/255,2.2);return t}function re(e){const t=[0,0,0];for(let n=0;n<3;n++)0===e[n]?t[n]=0:e[n]<0?t[n]=-1*ae[~~(1e5*-e[n])]:t[n]=ae[~~(1e5*e[n])];return t}const ie=[0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21].map((e=>e/64));function le(e,t,n,o,a){return a(e,t)+n*((o<0?-o:o)+.5)}function de(e=!0){return(t,n,o,a,s)=>{const r=t.width*t.height*4,i=4*t.width,l=X.getColors(n),d={};for(let e=0;e<l.length;e++)for(let t=e;t<l.length;t++)d[e*l.length+t]=.1*o(l[e],l[t]);const c=a.gamma?X.getColors(X.transform(n,se)):[],u=[0,0,0];let h,m,p,g,f=[],v=[];for(let n=0;n<r;n+=4){h=Array.from(t.data.slice(n,n+3));const w=ie[n%i/4%8+~~(n/i)%8*8];g={color1:[0,0,0],color2:h,ratio:.33};let C=Number.MAX_VALUE;for(let t=0;t<l.length;t++)for(let n=t;n<l.length;n++)if(m=l[t],p=l[n],a.gamma&&(f=c[t],v=c[n]),e){let e=32;t!==n&&(e=((m[0]!==p[0]?19136*(h[0]-m[0])/(p[0]-m[0]):0)+(m[1]!==p[1]?37568*(h[1]-m[1])/(p[1]-m[1]):0)+(m[2]!==p[2]?7296*(h[2]-m[2])/(p[2]-m[2]):0))/((m[0]!==p[0]?299:0)+(m[1]!==p[1]?587:0)+(m[2]!==p[2]?114:0)),e<0?e=0:e>63&&(e=63),e=~~e);const s=e/64;if(a.gamma)for(let e=0;e<3;e++)u[e]=f[e]+s*(v[e]-f[e]);else for(let e=0;e<3;e++)u[e]=m[e]+s*(p[e]-m[e]);const r=d[t*l.length+n],i=le(h,a.gamma?re(u):u,r,s-.5,o);i<C&&(C=i,g.color1=m,g.color2=p,g.ratio=s)}else for(let e=0;e<64&&!(t===n&&e>0);e++){const s=e/64;if(a.gamma)for(let e=0;e<3;e++)u[e]=f[e]+s*(v[e]-f[e]);else for(let e=0;e<3;e++)u[e]=m[e]+s*(p[e]-m[e]);const r=d[t*l.length+n],i=le(h,a.gamma?re(u):u,r,s-.5,o);i<C&&(C=i,g.color1=m,g.color2=p,g.ratio=s)}for(let e=0;e<3;e++)t.data[n+e]=w<g.ratio?g.color2[e]:g.color1[e];n%(4*i)==0&&s&&s(n,r,t)}return t}}const ce={id:"ProcBayerLikeFast",name:"Bayer-like - Fast",procFn:de(),maxAllowedPaletteSize:192,supports:{threads:!0,gamma:!1},complexity:e=>e*e/2},ue={id:"ProcBayerLikeThorough",name:"Bayer-like - High Quality",procFn:de(!1),maxAllowedPaletteSize:24,supports:{threads:!0,gamma:!1},complexity:e=>e*e*32},he=[0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21].map((e=>e/64)),me={id:"ProcColorThresholdMatrix",name:"Color Threshold Matrix",procFn:(e,t,n,o,a)=>{const s=e.width*e.height*4,r=4*e.width,i=[];let l,d,c,u;const h=[0,0,0],m=X.getColors(t).map((e=>299*e[0]+587*e[1]+114*e[2])),p=X.getColors(t),g=X.getColors(o.gamma?X.transform(t,se):t);for(let t=0;t<s;t+=4){l=Array.from(e.data.slice(t,t+4));const v=t%r/4,w=~~(t/r);for(i.splice(0),c=[0,0,0];i.length<16;){let e=0,t=1,a=Number.MAX_VALUE;const s=i.length||1;for(let r=0;r<g.length;r++){d=[...g[r]],u=[...c];for(let m=1;m<=s;m*=2){const s=i.length+m;for(let e=0;e<3;e++)u[e]=c[e]+d[e]*m,h[e]=u[e]/s,o.gamma&&(h[e]=0===(f=h[e])?0:f<0?-1*ae[~~(1e5*-f)]:ae[~~(1e5*f)]);const p=n(h,l);p<a&&(t=m,e=r,a=p)}}for(let n=0;n<t;n++)i.push(e);for(let n=0;n<3;n++)c[n]+=g[e][n]*t}i.sort(((e,t)=>m[e]-m[t]));const C=~~(he[v%8+w%8*8]*i.length);for(let n=0;n<3;n++)e.data[t+n]=p[i[C]][n];t%(4*r)==0&&a&&a(t,s,e)}var f;return e},maxAllowedPaletteSize:64,supports:{threads:!0,gamma:!0},complexity:e=>384*e};class pe{constructor(e){var t;this.generated=!1,this.levels=e.levels,this.tree=(t=e.levels,Array.from({length:Math.pow(8,t)},(()=>new class{constructor(){this.colors=[],this.pixels=0}get pixelCount(){return this.pixels}get avgColor(){const e=[0,0,0];for(let t=0;t<this.colors.length;t++)for(let n=0;n<3;n++)e[n]+=this.colors[t][n];return e.map((e=>e/this.colors.length))}addColor(e){this.colors.includes(e)||this.colors.push(e),this.pixels++}}))),this.ctes=[],this.reservedLevel=e.reservedLevel,this.nColors=e.size,this.k=e.thresholdCoeff||1}addColor(e){if(this.generated)throw new Error("Attempting to modify a generated palette");const t=this.index(e);return this.tree[t].addColor(e),t}getPalette(){this.generated||this.generate();const e=[];return this.ctes.forEach((t=>{const n=t.index,o=[0,0,0];for(let e=0;e<t.level;e++)for(let a=2;a>=0;a--){const s=3*(t.level-1-e)+a,r=1<<3*t.level-1>>3*e+(2-a);o[2-a]=o[2-a]<<1|(n&r)>>s}for(let e=t.level;e<8;e++)for(let n=0;n<3;n++)o[n]=o[n]<<1|(e===t.level?1:0);e.push(o)})),console.log(`Built palette with ${e.length} colors`),e}index(e){let t=0;for(let n=0;n<this.levels;n++){const o=7-n;let a=0;for(let t=0;t<3;t++){const s=128>>n;a=a<<1|(e[t]&s)>>o}t=t<<3|a}return t}getNode(e,t){if(t===this.levels)return this.tree[e];const n=[];for(let o=0;o<8;o++)this.isCTE(8*e+o,t+1)||n.push(this.getNode(8*e+o,t+1));return n.filter((e=>e.pixelCount>0)).reduce(((e,t)=>({pixelCount:e.pixelCount+t.pixelCount})),{pixelCount:0})}isCTE(e,t){return this.ctes.some((n=>n.index===e&&n.level===t))}markCTE(e,t,n){this.ctes.push({index:e,level:t,node:n})}testNode(e,t,n,o){const a=e-t-this.ctes.length,s=(n-this.ctes.map((e=>e.node.pixelCount)).reduce(((e,t)=>e+t),0))/a*this.k;return o.pixelCount>s}get nonReservedCTEs(){return this.ctes.filter((e=>e.level!==this.reservedLevel)).length}generate(){if(this.generated)throw new Error("This palette has already been generated");this.generated=!0;const e=this.reservedLevel<0?0:Math.pow(8,this.reservedLevel),t=this.getNode(0,0).pixelCount;let n,o=0,a=0;for(;this.nColors-e-this.nonReservedCTEs>0;){for(n=this.levels;n>this.reservedLevel&&n>0;){const o=Math.pow(8,n);for(let a=0;a<o;a++){const o=this.getNode(a,n);if(!this.isCTE(a,n)&&this.testNode(this.nColors,e,t,o)&&this.markCTE(a,n,o),a%8==7){let e=0;for(let t=a-7;t<=a;t++)this.isCTE(t,n)&&e++;if(e>0&&e<8){const e=a>>3;this.isCTE(e,n-1)||this.markCTE(e,n-1,this.getNode(e,n-1))}}if(this.nColors-e-this.nonReservedCTEs<=0)break}if(this.nColors-e-this.nonReservedCTEs<=0)break;n--}if(this.ctes.length===o&&(this.k=this.k/2,a++,a>=5))break;o=this.ctes.length}if(this.reservedLevel>=0){n=this.reservedLevel;const e=Math.pow(8,n);for(let t=0;t<e;t++){const e=this.getNode(t,n);this.isCTE(t,n)||this.markCTE(t,n,e)}}}}const ge=[];function fe(){return new Worker(t.p+"main.worker.js")}var ve;!function(e){e[e.Progress=0]="Progress",e[e.Done=1]="Done",e[e.Error=2]="Error"}(ve||(ve={}));const we=class{constructor(){this.busy=!1,this.x=0,this.y=0,this.worker=new fe,this.worker.onmessage=e=>{const t=e.data;switch(t.msg){case ve.Progress:this.onprogress&&this.onprogress(Object.assign(Object.assign({},t.params),{partial:t.params.partial?{data:t.params.partial,x:this.x,y:this.y}:void 0}));break;case ve.Done:this.onfinish&&this.onfinish({data:t.params.result,x:this.x,y:this.y}),this.busy=!1;break;case ve.Error:this.onerror&&this.onerror(t.params.error),this.busy=!1}}}get ready(){return!this.busy}start(e,t,n,o,a){return!this.busy&&(this.busy=!0,this.worker.postMessage({dataIn:e.data,palette:t,procId:n,distFnId:o,features:a}),!0)}terminate(){this.worker.terminate()}},Ce=navigator.hardwareConcurrency,ye=Math.max(~~(Ce/2),1),be=[];class xe{constructor(e,t){let n;this.focus=()=>{const e=xe.windowList.indexOf(this);e!==xe.windowList.length-1&&(xe.windowList.splice(e,1),xe.windowList.push(this)),xe.recalculateZIndices(),xe.windowList.forEach((e=>e.setActive(e.id===this.id)))},this.destroy=()=>{const e=xe.windowList.indexOf(this);xe.windowList.splice(e,1),this.frame.remove();const t=xe.windowList[xe.windowList.length-1];t&&t.focus()},this.startDrag=e=>{if(0!==e.button)return;const t=e=>{const t=this.frame.getBoundingClientRect();this.frame.style.left=`${t.left+e.movementX}px`,this.frame.style.top=`${t.top+e.movementY}px`},n=e=>{0===e.button&&(window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",n))};window.addEventListener("mousemove",t),window.addEventListener("mouseup",n)},this.mouseDownHandler=e=>{if(0!==e.button)return;const t=e=>{this.startDrag(e),window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",n)},n=()=>{window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",n)};window.addEventListener("mousemove",t),window.addEventListener("mouseup",n)},this.uuid=xe.lastId++,t&&(n=document.createElement("img"),n.src=t,n.className="window-icon");const o=document.createElement("b");o.innerText=e,o.className="window-title",this.titleRef=o;const a=document.createElement("img");a.src="./public/img/close.png";const s=document.createElement("button");s.className="win-bevel",s.appendChild(a);const r=document.createElement("div");r.className="titlebar-buttons",r.appendChild(s);const i=document.createElement("div");i.className="titlebar",i.appendChild(o),i.appendChild(r),n&&i.appendChild(n);const l=document.createElement("div");l.className="window-content win-bevel",this.contentRef=l;const d=document.createElement("div");d.className="window win-bevel",d.appendChild(i),d.appendChild(l),this.frameRef=d,d.addEventListener("mousedown",this.focus),i.addEventListener("mousedown",this.mouseDownHandler),s.addEventListener("click",this.destroy),document.body.appendChild(d),xe.windowList.push(this),this.focus()}static recalculateZIndices(){this.windowList.forEach(((e,t)=>e.frame.style.zIndex=(100*t).toString()))}get id(){return this.uuid}get content(){return this.contentRef}get frame(){return this.frameRef}get title(){return this.titleRef.innerText}set title(e){this.titleRef.innerText=e}setActive(e){e?this.frame.classList.add("active-window"):this.frame.classList.remove("active-window")}}xe.windowList=[],xe.lastId=0;const Ee=xe,Le=class extends Ee{constructor(e,t){super(e,"./public/img/result.png"),this.save=()=>{const e=this.outputCanvas.toDataURL("image/png").replace("image/png","image/octet-stream"),t=document.createElement("a");t.setAttribute("download","result.png"),t.setAttribute("href",e),t.click()},this.toggleViewOriginal=()=>{this.outputCanvas.classList.contains("clip")?(this.outputCanvas.classList.remove("clip"),this.originalButton.classList.remove("inset"),this.originalButton.classList.remove("checkered"),this.originalButton.classList.add("hover")):(this.outputCanvas.classList.add("clip"),this.originalButton.classList.add("inset"),this.originalButton.classList.add("checkered"),this.originalButton.classList.remove("hover"))},this.inputCanvasRef=document.createElement("canvas"),this.inputCanvasRef.width=t.w,this.inputCanvasRef.height=t.h,this.outputCanvasRef=document.createElement("canvas"),this.outputCanvasRef.classList.add("output-canvas"),this.flash=document.createElement("div"),this.flash.classList.add("flash");const o=document.createElement("div");o.classList.add("canvas-container"),o.appendChild(this.inputCanvasRef),o.appendChild(this.outputCanvasRef),o.appendChild(this.flash),this.content.appendChild(o);const s=document.createElement("img");s.src="./public/img/save.png";const r=document.createElement("button");r.className="win-bevel hover light icon-button",r.title="Save",r.addEventListener("click",this.save),r.appendChild(s);const i=document.createElement("img");i.src="./public/img/original.png",this.originalButton=document.createElement("button"),this.originalButton.className="win-bevel hover light icon-button",this.originalButton.title="View original image",this.originalButton.addEventListener("click",this.toggleViewOriginal),this.originalButton.appendChild(i);const l=document.createElement("div");l.className="menubar",l.appendChild(r),l.appendChild(this.originalButton),this.frame.appendChild(l),this.renderer=new class{constructor(e,t){this.inputCanvasRef=e,this.outputCanvasRef=t}get inputCanvas(){return this.inputCanvasRef}get outputCanvas(){return this.outputCanvasRef}render(e,t){return new Promise(((o,s)=>{this.outputCanvas.width=this.inputCanvas.width,this.outputCanvas.height=this.inputCanvas.height;const r=this.inputCanvas.getContext("2d");if(!r)throw new Error("Unable to get input context");const i=this.outputCanvas.getContext("2d");if(!i)throw new Error("Unable to get output context");r.drawImage(e,0,0,this.inputCanvas.width,this.inputCanvas.height);let l=(new Date).getTime();const d=r.getImageData(0,0,this.inputCanvas.width,this.inputCanvas.height),c=function(e,t,o){return e.type===a.Auto?function(e,t){const o=`AUTO_${e.size}L${e.levels}R${e.reservedLevel}`,s=ge.find((e=>e.key===o));if(s)return s.palette;{const s=function(e,t){const o=new pe(e),s=t.width*t.height*4;for(let e=0;e<s;e+=4){const n=~~(e/4/t.width);if(~~(e/4%t.width)%2==0&&n%2==0){const n=Array.from(t.data.slice(e,e+4));o.addColor(n)}}const r=o.getPalette();return{name:`AUTO_${e.size}L${e.levels}R${e.reservedLevel}`,type:a.Indexed,group:n.Generated,data:r.reduce(((e,t)=>e.concat(t)))}}(e,t);return ge.push({key:o,palette:s}),s}}({size:e.data[0],reservedLevel:e.data[1],levels:e.data[2],thresholdCoeff:e.data[3]},o):e}(t.palette,t.process,d);let u;if(console.log(`Palette processing done in ${(new Date).getTime()-l}ms`),t.process.supports.threads)if("auto"===t.threads){const e=((e,t)=>e.complexity(X.getSize(t)))(t.process,c),n=this.inputCanvas.width*this.inputCanvas.height,o=1+~~(n/5e4*e/2048);u=o>ye?ye:o,console.log(`Want ${o} threads for ${n}px @CR${e}, got ${u} (max ${ye})`)}else u=t.threads;else u=1;let h=0;const m=8*~~(this.inputCanvas.width/u/8),p=this.inputCanvas.width-m*u;l=(new Date).getTime();for(let e=0;e<u;e++){const n=~~(p/8),a=e*m+8*(n<e?n:e),d=m+(e===u-1?p%8:n>e?8:0),g=r.getImageData(a,0,d,this.inputCanvas.height);g||s("Unable to get image data from context");const f={data:g,x:a,y:0},v=new we;v.onprogress=e=>{e.partial&&i.putImageData(e.partial.data,a,0),i.fillStyle="#ff00ff",i.fillRect(a,e.current/(4*d),d,2)},v.onfinish=t=>{i.putImageData(t.data,a,0),h--,be.splice(be.indexOf(v),1);const n=(new Date).getTime();console.log(`Worker thread ${e+1} done in ${n-l}ms`),0===h&&(console.log(`${u} worker threads done in ${n-l}ms`),o())},v.onerror=e=>s(`Error in worker thread: ${e}`),console.log(`Starting worker thread ${e+1}/${u} w=${d}`),v.start(f,c,t.process.id,"cdRGB",t.features),h++,be.push(v)}}))}}(this.inputCanvas,this.outputCanvas),this.frame.getElementsByClassName("titlebar")[0].style.setProperty("max-width",`${t.w+4}px`)}get inputCanvas(){return this.inputCanvasRef}get outputCanvas(){return this.outputCanvasRef}render(e,t){return this.renderer.render(e,t).then((()=>{this.flash.classList.add("flash-anim")}))}};function Ie(e,t,n){var o;const a=document.createElement("ul");a.className="fake-select-option-list",t.forEach((t=>{const o=document.createElement("li");o.className="fake-select-option",o.dataset.value=t.name,o.innerText=t.name,o.addEventListener("click",(()=>{o.hasAttribute("disabled")||(e.value=t.name,n(t))})),a.appendChild(o)}));const s=document.createElement("img");s.src="./public/img/scrolldown.png";const r=document.createElement("button");r.className="fake-select-button win-bevel",r.appendChild(s);const i=document.createElement("div");i.className=e.className+" fake-select",e.className="fake-select-input win-bevel",null===(o=e.parentElement)||void 0===o||o.replaceChild(i,e),i.appendChild(e),i.appendChild(r),i.appendChild(a),i.addEventListener("click",(e=>{if(e.stopPropagation(),0===e.button)if(a.classList.contains("expanded"))a.classList.remove("expanded");else{a.classList.add("expanded");const e=t=>{const n=t.target;i.contains(n)||(a.classList.remove("expanded"),window.removeEventListener("mousedown",e))};window.addEventListener("mousedown",e)}})),e.addEventListener("click",(()=>i.click())),e.style.userSelect="none",e.style.cursor="default",e.disabled=!0}function Me(e){const t=document.createElement("div");t.className="win-bevel checkbox fake-checkbox",t.style.backgroundImage=e.checked?"url(./public/img/check.png)":"",t.addEventListener("click",(()=>{e.click(),t.style.backgroundImage=e.checked?"url(./public/img/check.png)":""})),e.before(t),e.hidden=!0}function ke(e){e.addEventListener("keypress",(e=>{e.key.match(/[0-9]/)||e.preventDefault()}))}function Ae(e){const t=document.createElement("div");t.className="fake-radio",t.addEventListener("click",(()=>e.click())),e.checked?t.classList.add("checked"):t.classList.remove("checked"),document.getElementsByName(e.name).forEach((n=>n.addEventListener("change",(()=>{e.checked?t.classList.add("checked"):t.classList.remove("checked")})))),new MutationObserver((n=>{n.forEach((n=>{"attributes"===n.type&&"disabled"===n.attributeName&&(e.disabled?t.setAttribute("disabled","true"):t.removeAttribute("disabled"))}))})).observe(e,{attributes:!0,childList:!1,subtree:!1}),e.before(t),e.hidden=!0}!function(e){for(let e=0;e<=1e5;e++)ae[e]=255*Math.pow(e/1e5,1/2.2)}();const Be=document.getElementById("imageName"),Re=document.getElementById("browse"),Ge=document.getElementById("fileInput"),Pe=document.getElementById("previewContainer"),Te=document.getElementById("canvasPreview"),Ne=document.getElementById("resizeInput"),Se=document.getElementById("paletteSelect"),$e=document.getElementById("paletteColors"),De=document.getElementById("processSelect"),ze=document.getElementById("advancedOptions"),Oe=document.getElementById("featGamma"),Ye=document.getElementById("allowSlow"),Ue=document.getElementById("featThreads"),Ke=document.getElementById("threadModeAuto"),Fe=document.getElementById("threadModeManual"),Ve=document.getElementById("threadCount"),We=document.getElementById("toggleAdvanced"),je=document.getElementById("startStop"),He=document.getElementById("slowWarning"),_e=document.getElementById("setupWindowContent"),Xe=new Ee("Render Setup","./public/img/settings.png");Xe.content.classList.remove("win-bevel"),Xe.content.appendChild(_e),Re.addEventListener("click",(()=>Ge.click())),Ge.addEventListener("change",(e=>{var t;(t=e,new Promise(((e,n)=>{const o=t.target;if(null==o?void 0:o.files){const t=o.files[0],n=new Image;n.onload=()=>e(n),n.src=URL.createObjectURL(t)}else n()}))).then((e=>function(e){const t=e.width,n=e.height;Te.width=t,Te.height=n,null==et||et.drawImage(e,0,0,t,n),Be.innerText=Ge.files?Ge.files[0].name:"UNTITLED IMAGE",Pe.style.removeProperty("display"),je.disabled=!1,ge.splice(0)}(e)))})),ke(Ne);const Ze=[s,r,i,l,d,c,u,h,m,g,p,f,v,w,C,y,b,M,k,A,B,R,G,P,T,N,S,$,D,z,x,E,L,I,O,Y,U,K,F,V,W,j,H];let Je=v;Se.value=Je.name,st(),Ie(Se,Ze.map((e=>({name:e.name,value:e}))),(e=>{Je=e.value,ot(),st()}));const Qe=[Z,ne,oe,ce,ue,me];let qe=Z;De.value=qe.name,Ie(De,Qe.map((e=>({name:e.name,value:e}))),(e=>{qe=e.value,at()})),Me(Oe),Me(Ye),Me(Ue),Ye.addEventListener("change",(function(){Ye.checked?He.style.removeProperty("display"):He.style.setProperty("display","none"),ot(),at()}));const et=Te.getContext("2d");function tt(){Ke.disabled=!Ue.checked,Fe.disabled=!Ue.checked,Ve.disabled=!Ue.checked||!Fe.checked}Ve.value="2",Ve.min="1",Ve.max=Ce.toString(),Ue.addEventListener("change",tt),Ke.addEventListener("change",tt),Fe.addEventListener("change",tt),Ve.addEventListener("change",tt),Ae(Ke),Ae(Fe),ke(Ve),We.addEventListener("click",(function(){"none"!==getComputedStyle(ze).getPropertyValue("display")?ze.style.setProperty("display","none"):ze.style.removeProperty("display")}));let nt=!1;function ot(){var e;const t=null===(e=De.parentElement)||void 0===e?void 0:e.getElementsByClassName("fake-select-option");if(t)for(let e=0;e<t.length;e++){const n=t[e],o=Qe.find((e=>e.name===n.innerText));o&&(!Ye.checked&&o.maxAllowedPaletteSize<X.getSize(Je)?n.setAttribute("disabled","true"):n.removeAttribute("disabled"))}}function at(){var e;const t=null===(e=Se.parentElement)||void 0===e?void 0:e.getElementsByClassName("fake-select-option");if(t)for(let e=0;e<t.length;e++){const n=t[e],o=Ze.find((e=>e.name===n.innerText));o&&(!Ye.checked&&qe.maxAllowedPaletteSize<X.getSize(o)?n.setAttribute("disabled","true"):n.removeAttribute("disabled"))}}function st(){for(;$e.firstChild;)$e.removeChild($e.firstChild);Je.type!==a.Auto&&X.getColors(Je).forEach((e=>{let t="#";for(let n=0;n<3;n++){const o=e[n].toString(16);t+=1===o.length?"0"+o:o}const n=document.createElement("div");n.className="win-bevel content",n.style.backgroundColor=t,n.title=t,$e.appendChild(n)}))}je.addEventListener("click",(()=>{nt?(be.forEach((e=>e.terminate())),be.splice(0),je.children[0].innerText="Start",nt=!1):function(){const e=function(){let e=Te.width,t=Te.height;const n=parseInt(Ne.value,10);return e>=t&&e>n&&(t=~~(n*(t/e)),e=n),t>e&&t>n&&(e=~~(n*(e/t)),t=n),{w:e,h:t}}(),t=`Render: ${Ge.files?Ge.files[0].name:"untitled"} - ${Je.name}, ${qe.name} @ ${e.w}x${e.h}`,n=new Le(t,e),o=Ue.checked?Ke.checked?"auto":parseInt(Ve.value,10):1;nt=!0,je.children[0].innerText="Stop",n.render(Te,{palette:Je,process:qe,threads:o,features:{gamma:Oe.checked}}).then((()=>{je.children[0].innerText="Start",nt=!1}))}()}))})();