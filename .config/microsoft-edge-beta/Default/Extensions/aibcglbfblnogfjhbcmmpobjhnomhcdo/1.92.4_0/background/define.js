"use strict";globalThis.gA=null,globalThis.__filename=null,(()=>{let l={},e=l=>l.slice(l.lastIndexOf("/")+1).replace(".js",""),n=(l,e,n,i)=>{n.bind(null,t,i).apply(null,e.slice(2).map(s))},s=n=>{n=e(n);let s=l[n];return s=s?s instanceof Promise?s.__esModule||(s.__esModule={}):s:l[n]={},s},t=([n],s)=>{let i=e(n),o=l[i]||(l[i]=new Promise(l=>{let e=document.createElement("script");e.src=n,e.onload=()=>{l(),e.remove()},document.head.appendChild(e)}));o instanceof Promise?o.then(()=>{t([n],s)}):s(o)};globalThis.define=(s,t)=>{let i=e(__filename||document.currentScript.src),o=l[i];if(o&&o instanceof Promise){let e=o.then(()=>{l[i]=o,n(0,s,t,o)});o=e.__esModule=o.__esModule||{},l[i]=e}else n(0,s,t,o||(l[i]={}))},globalThis.__importStar=l=>l})();