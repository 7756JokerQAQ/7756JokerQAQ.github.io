if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,c)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let n={};const f=e=>s(e,d),l={module:{uri:d},exports:n,require:f};i[d]=Promise.all(r.map((e=>l[e]||f(e)))).then((e=>(c(...e),n)))}}define(["./workbox-6da860f9"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/27/hello-world/index.html",revision:"20629fe736073091e036456b8912a2b6"},{url:"2022/08/27/代码快演示/演示/index.html",revision:"0373ca30d71744c8ede65b239506e6ed"},{url:"2022/08/27/第一篇文章/index.html",revision:"ae6c62212ebbb1bda78c7c73bc539842"},{url:"404.html",revision:"9d236f6b7048cac14fd278ef35129259"},{url:"about/index.html",revision:"bb16b5271b73292eb85a745f2abf4293"},{url:"archives/2022/08/index.html",revision:"313f8732762ca50a7a1bf054faed42c1"},{url:"archives/2022/index.html",revision:"24e4edc396def5c2333ce97063963f2c"},{url:"archives/index.html",revision:"034836295ffd371d7e68b535b6d77c13"},{url:"categories/index.html",revision:"6f6bfd45eca5cc42fe2977130bae3d21"},{url:"css/index.css",revision:"ca32a88a65d4684766116e8ee4ff68fd"},{url:"css/style.css",revision:"79e78915b2483e14095b6f89aa053d04"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"index.html",revision:"7a8641f8cbe771520e1ab024a1333ee1"},{url:"js/main.js",revision:"73e1a92da3a39646678bffb9e7817148"},{url:"js/search/algolia.js",revision:"308de383b932f321e04751fd1f79cffb"},{url:"js/search/local-search.js",revision:"149fcc60c1de0a818e111978d01cbd87"},{url:"js/tw_cn.js",revision:"b3810513e04b13b2d18c6b779c883f85"},{url:"js/utils.js",revision:"24971090b8b1bd5d3f538d414e270fd3"},{url:"link/index.html",revision:"7e05a835177ba55739eceffc6df1eec7"},{url:"self/duotone.css",revision:"ab105a3d8be3093491c0bb15860e860d"},{url:"tags/index.html",revision:"d8056b46887195141160327fb7f8cb8f"}],{})}));
//# sourceMappingURL=service-worker.js.map
