(()=>{"use strict";function t(t,e=2.2){return t.map((t=>{let r=t/255;return r=r>.04045?Math.pow((r+.055)/1.055,e):r/12.92,100*r}))}function e(t,e=2.2){return t.map((t=>{let r=t/100;return r=r>.0031308?1.055*Math.pow(r,1/e)-.055:12.92*r,~~(255*r)}))}function r(e,r=2.2){return function(t){let e=[95.047*t[0],100*t[1],108.883*t[2]];return e=e.map((t=>t>.008856?Math.pow(t,1/3):7.787*t+16/116)),[116*e[1]-16,500*(e[0]-e[1]),200*(e[1]-e[2])]}(function(e,r=2.2){const o=t(e,r);return[.4124*o[0]+.3576*o[1]+.1805*o[2],.2126*o[0]+.7152*o[1]+.0722*o[2],.0193*o[0]+.1192*o[1]+.9505*o[2]]}(e,r))}var o;!function(t){t.CGA2Bit="IBM CGA 2-bit modes",t.RetroPC="Retro PCs",t.RetroVC="Retro Consoles",t.Mono="Monochrome",t.Duo="Dual Tone",t.RGB="RGB",t.CMYK="CMYK",t.Auto="Optimized (Auto)",t.Other="Other",t.Generated="AUTOGENERATED PALETTE",t.Hidden="HIDDEN PALETTE"}(o||(o={}));const a=o;var n;!function(t){t[t.Indexed=0]="Indexed",t[t.Mono=1]="Mono",t[t.RGB=2]="RGB",t[t.Mixer=3]="Mixer",t[t.Auto=4]="Auto"}(n||(n={}));const s=n,l=class{static getSize(t){switch(t.type){case s.Indexed:return t.data.length/3;case s.Mono:return t.data[0];case s.RGB:return t.data[0]*t.data[1]*t.data[2];case s.Mixer:{const e=(t.data.length-4)/5;let r=1;for(let o=0;o<e;o++)r*=t.data[4+5*o];return r}case s.Auto:return t.data[0];default:return 0}}static getColor(t,e){if(e<0||e>=this.getSize(t))throw new Error(`Color index ${e} out of bounds`);switch(t.type){case s.Indexed:return t.data.slice(3*e,3*e+3);case s.Mono:return t.data.slice(2,5).map((r=>{const o=~~(r*t.data[1]);return o+e*~~((r-o)/(t.data[0]-1))}));case s.Mixer:return this.getMixerColor(t,e);case s.RGB:{const r=e%t.data[2],o=~~(e/t.data[2])%t.data[1];return[~~(e/(t.data[2]*t.data[1])),o,r].map(((e,r)=>e*~~(255/(t.data[r]-1))))}case s.Auto:default:throw new Error("Invalid or Auto palette type")}}static getColors(t){return Array.from({length:this.getSize(t)},((e,r)=>this.getColor(t,r)))}static transform(t,e){const r=this.getColors(t).map((t=>e(t)));return{name:`${t.name} :: ${e.name}`,type:s.Indexed,group:a.Generated,data:r.reduce(((t,e)=>t.concat(e)))}}static getMixerColor(t,e){const r=1===t.data.slice(0,4)[1],o=(t.data.length-4)/5,a=r?[255,255,255]:[0,0,0],n=e=>t.data[4+5*e],s=e=>t.data[5+5*e],l=e=>t.data.slice(6+5*e,9+5*e),c=t=>{let r=e;for(let e=0;e<t;e++)r=~~(r/n(e));return r%n(t)};for(let t=0;t<o;t++)l(t).forEach(((e,o)=>{r&&(e=255-e);const l=~~(e*s(t)),i=e-l,d=l+c(t)*~~(i/(n(t)-1));a[o]+=r?-d:d,a[o]<0&&(a[o]=0)}));return a}},c=(t,e)=>(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1])+(t[2]-e[2])*(t[2]-e[2]);function i(t,e){return c(t,e)}function d(t,r){return i(e(t),e(r))}const u={};function m(t,e){const o=t[0]+(t[1]<<8)+(t[2]<<16),a=e[0]+(e[1]<<8)+(e[2]<<16);let n=u[o];n||(n=r(t),u[o]=n);let s=u[a];return s||(s=r(e),u[a]=s),c(n,s)}function f(t,e,r){let o=[],a=Number.POSITIVE_INFINITY;for(let n=0;n<e.length;n++){const s=r(t,e[n]);s<=a&&(o=e[n],a=s)}return o}const g={id:"ProcBasic",name:"Basic (no dithering)",procFn:(t,e,r,o,a)=>{const n=4*t.width,s=t.width*t.height*4,c=l.getColors(e);for(let e=0;e<s;e+=4){const o=f(Array.from(t.data.slice(e,e+4)),c,r);for(let r=0;r<3;r++)t.data[e+r]=o[r];e%(8*n)==0&&a&&a(e,s,t)}return t},maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!1},complexity:t=>t},h=Array.from({length:100001});function p(t){const e=[0,0,0];for(let r=0;r<3;r++)e[r]=Math.pow(t[r]/255,2.2);return e}function w(t){const e=[0,0,0];for(let r=0;r<3;r++)0===t[r]?e[r]=0:t[r]<0?e[r]=-1*h[~~(1e5*-t[r])]:e[r]=h[~~(1e5*t[r])];return e}const x=[0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21].map((t=>t/64));function y(t,e,r,o,a){return a(t,e)+r*((o<0?-o:o)+.5)}function A(t=!0){return(e,r,o,a,n)=>{const s=e.width*e.height*4,c=4*e.width,i=l.getColors(r),d={};for(let t=0;t<i.length;t++)for(let e=t;e<i.length;e++)d[t*i.length+e]=.1*o(i[t],i[e]);const u=a.gamma?l.getColors(l.transform(r,p)):[],m=[0,0,0];let f,g,h,A,M=[],C=[];for(let r=0;r<s;r+=4){f=Array.from(e.data.slice(r,r+3));const l=x[r%c/4%8+~~(r/c)%8*8];A={color1:[0,0,0],color2:f,ratio:.33};let p=Number.MAX_VALUE;for(let e=0;e<i.length;e++)for(let r=e;r<i.length;r++)if(g=i[e],h=i[r],a.gamma&&(M=u[e],C=u[r]),t){let t=32;e!==r&&(t=((g[0]!==h[0]?19136*(f[0]-g[0])/(h[0]-g[0]):0)+(g[1]!==h[1]?37568*(f[1]-g[1])/(h[1]-g[1]):0)+(g[2]!==h[2]?7296*(f[2]-g[2])/(h[2]-g[2]):0))/((g[0]!==h[0]?299:0)+(g[1]!==h[1]?587:0)+(g[2]!==h[2]?114:0)),t<0?t=0:t>63&&(t=63),t=~~t);const n=t/64;if(a.gamma)for(let t=0;t<3;t++)m[t]=M[t]+n*(C[t]-M[t]);else for(let t=0;t<3;t++)m[t]=g[t]+n*(h[t]-g[t]);const s=d[e*i.length+r],l=y(f,a.gamma?w(m):m,s,n-.5,o);l<p&&(p=l,A.color1=g,A.color2=h,A.ratio=n)}else for(let t=0;t<64&&!(e===r&&t>0);t++){const n=t/64;if(a.gamma)for(let t=0;t<3;t++)m[t]=M[t]+n*(C[t]-M[t]);else for(let t=0;t<3;t++)m[t]=g[t]+n*(h[t]-g[t]);const s=d[e*i.length+r],l=y(f,a.gamma?w(m):m,s,n-.5,o);l<p&&(p=l,A.color1=g,A.color2=h,A.ratio=n)}for(let t=0;t<3;t++)e.data[r+t]=l<A.ratio?A.color2[t]:A.color1[t];r%(4*c)==0&&n&&n(r,s,e)}return e}}const M={id:"ProcBayerLikeFast",name:"Bayer-like - Fast",procFn:A(),maxAllowedPaletteSize:192,supports:{threads:!0,gamma:!1},complexity:t=>t*t/2},C={id:"ProcBayerLikeThorough",name:"Bayer-like - High Quality",procFn:A(!1),maxAllowedPaletteSize:24,supports:{threads:!0,gamma:!1},complexity:t=>t*t*32};function E(r){return(o,a,n,s,c)=>{const u=o.width*o.height*4,m=4*o.width,g=l.getColors(a);if(s.gamma){for(let e=0;e<u;e+=4){const r=t(Array.from(o.data.slice(e,e+3)));for(let t=0;t<3;t++)o.data[e+t]=r[t];e%(4*m)==0&&c&&c(e,u,o)}for(let e=0;e<g.length;e++)g[e]=t(g[e])}for(let t=0;t<u;t+=4){const a=Array.from(o.data.slice(t,t+3)),n=f(a,g,s.gamma?d:i),l=t%m/4;for(let r=0;r<3;r++)o.data[t+r]=(s.gamma?e(n):n)[r];const h=a.map(((t,e)=>t-n[e]));for(let e=0;e<r.length;e++){const a=t+4*r[e].x+r[e].y*m;if(l+r[e].x>=0&&l+r[e].x<o.width)for(let t=0;t<3;t++)o.data[a+t]+=h[t]*r[e].w}t%(4*m)==0&&c&&c(t,u,o)}return o}}const P={id:"ProcFloydSteinberg",name:"Floyd-Steinberg",procFn:E([{x:1,y:0,w:7/16},{x:-1,y:1,w:3/16},{x:0,y:1,w:5/16},{x:1,y:1,w:1/16}]),maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!0},complexity:t=>2*t},I={id:"ProcMinAverageError",name:"Minimum Average Error (JJ&N)",procFn:E([{x:1,y:0,w:7/48},{x:2,y:0,w:5/48},{x:-2,y:1,w:3/48},{x:-1,y:1,w:5/48},{x:0,y:1,w:7/48},{x:1,y:1,w:5/48},{x:2,y:1,w:3/48},{x:-2,y:2,w:1/48},{x:-1,y:2,w:3/48},{x:0,y:2,w:5/48},{x:1,y:2,w:3/48},{x:2,y:2,w:1/48}]),maxAllowedPaletteSize:65536,supports:{threads:!1,gamma:!0},complexity:t=>6*t},B=[0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21].map((t=>t/64)),F={id:"ProcColorThresholdMatrix",name:"Color Threshold Matrix",procFn:(t,e,r,o,a)=>{const n=t.width*t.height*4,s=4*t.width,c=[];let i,d,u,m;const f=[0,0,0],g=l.getColors(e).map((t=>299*t[0]+587*t[1]+114*t[2])),w=l.getColors(e),x=l.getColors(o.gamma?l.transform(e,p):e);for(let e=0;e<n;e+=4){i=Array.from(t.data.slice(e,e+4));const l=e%s/4,p=~~(e/s);for(c.splice(0),u=[0,0,0];c.length<16;){let t=0,e=1,a=Number.MAX_VALUE;const n=c.length||1;for(let s=0;s<x.length;s++){d=[...x[s]],m=[...u];for(let l=1;l<=n;l*=2){const n=c.length+l;for(let t=0;t<3;t++)m[t]=u[t]+d[t]*l,f[t]=m[t]/n,o.gamma&&(f[t]=0===(y=f[t])?0:y<0?-1*h[~~(1e5*-y)]:h[~~(1e5*y)]);const g=r(f,i);g<a&&(e=l,t=s,a=g)}}for(let r=0;r<e;r++)c.push(t);for(let r=0;r<3;r++)u[r]+=x[t][r]*e}c.sort(((t,e)=>g[t]-g[e]));const A=~~(B[l%8+p%8*8]*c.length);for(let r=0;r<3;r++)t.data[e+r]=w[c[A]][r];e%(4*s)==0&&a&&a(e,n,t)}var y;return t},maxAllowedPaletteSize:64,supports:{threads:!0,gamma:!0},complexity:t=>384*t},G=self;var R;!function(t){t[t.Progress=0]="Progress",t[t.Done=1]="Done",t[t.Error=2]="Error"}(R||(R={}));const S=(t,e,r)=>{G.postMessage({msg:R.Progress,params:{current:t,total:e,partial:r}})};G.addEventListener("message",(t=>{const e=t.data,r=(t=>{switch(t){case g.id:return g;case P.id:return P;case I.id:return I;case M.id:return M;case C.id:return C;case F.id:return F;default:return null}})(e.procId);if(!r)return G.postMessage({msg:R.Error,params:{error:`WorkerInit failed: process ${e.procId} not found`}}),void self.close();!function(t){for(let t=0;t<=1e5;t++)h[t]=255*Math.pow(t/1e5,1/2.2)}();const o=(t=>{switch(t){case"cdLab":return m;case"cdRGB":default:return i}})(e.distFnId);r.procFn(e.dataIn,e.palette,o,e.features,S),G.postMessage({msg:R.Done,params:{result:e.dataIn}}),self.close()}))})();