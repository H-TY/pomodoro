if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,o)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let c={};const d=e=>n(e,t),s={module:{uri:t},exports:c,require:d};i[t]=Promise.all(r.map((e=>s[e]||d(e)))).then((e=>(o(...e),c)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index.html",revision:"30b0cc1f04777ad5b4ecdd691cdee54c"},{url:"android-chrome-192x192.png",revision:"c333156111dfe47b2a640696b5a95240"},{url:"android-chrome-512x512.png",revision:"a23ed822cb51a5667847d22ad7cc19c2"},{url:"manifest.webmanifest",revision:"e414fcdfe66a4e8838966d1ada9e2bc1"}],{ignoreURLParametersMatching:[/.*/]}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
