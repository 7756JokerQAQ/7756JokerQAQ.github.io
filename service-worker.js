if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,d)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let f={};const n=e=>s(e,c),l={module:{uri:c},exports:f,require:n};i[c]=Promise.all(r.map((e=>l[e]||n(e)))).then((e=>(d(...e),f)))}}define(["./workbox-6da860f9"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"2022/08/27/hello-world/index.html",revision:"98c6d5646b73a39a73a93862973fe6c6"},{url:"2022/08/27/代码快演示/演示/index.html",revision:"40293520ac7ba431cf7ec191e1c8eca5"},{url:"2022/08/27/第一篇文章/index.html",revision:"d4814277b14c1ace537644d6729f6a67"},{url:"404.html",revision:"cdc2af137f85d8a1356ada12b43a2ee5"},{url:"about/index.html",revision:"f7f02ad8634db642176f3d029388c173"},{url:"archives/2022/08/index.html",revision:"3766ffde3a4893333b95ca70b73c7d7f"},{url:"archives/2022/index.html",revision:"7dae869f46aa64e9344fb6c5a738f8cc"},{url:"archives/index.html",revision:"506f1589f582f2528d8eefef15887bdc"},{url:"categories/index.html",revision:"bd7fbfdf72e6419dcb8616fbc6b81910"},{url:"css/index.css",revision:"ca32a88a65d4684766116e8ee4ff68fd"},{url:"css/style.css",revision:"79e78915b2483e14095b6f89aa053d04"},{url:"css/var.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"img/404.jpg",revision:"4ef3cfb882b6dd4128da4c8745e9a507"},{url:"img/favicon.png",revision:"7a8c47cb5a2149c1a1af21e90ecd9ca7"},{url:"img/friend_404.gif",revision:"68af0be9d22722e74665ef44dd532ba8"},{url:"index.html",revision:"3bbec34f574d0082752f2bda89c04d22"},{url:"js/main.js",revision:"73e1a92da3a39646678bffb9e7817148"},{url:"js/search/algolia.js",revision:"308de383b932f321e04751fd1f79cffb"},{url:"js/search/local-search.js",revision:"149fcc60c1de0a818e111978d01cbd87"},{url:"js/tw_cn.js",revision:"b3810513e04b13b2d18c6b779c883f85"},{url:"js/utils.js",revision:"24971090b8b1bd5d3f538d414e270fd3"},{url:"link/index.html",revision:"6bd824e17205f53369b39c0f1c5273d4"},{url:"self/duotone.css",revision:"ab105a3d8be3093491c0bb15860e860d"},{url:"tags/index.html",revision:"ae94156c52ec79dbfb3f5d0eb57166e4"}],{})}));
//# sourceMappingURL=service-worker.js.map
