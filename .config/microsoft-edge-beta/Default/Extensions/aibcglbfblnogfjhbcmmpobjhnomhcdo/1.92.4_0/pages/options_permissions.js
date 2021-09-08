import{$ as n,OnEdge as k,browser_ as _,OnFirefox as f,OnChrome as i,nextTick_ as h,CurCVer_ as t,IsEdg_ as q,bgSettings_ as s}from"./async_bg.js";import{Option_ as a,oTrans_ as m}from"./options_base.js";import{registerClass as J,createNewOption as $}from"./options_defs.js";let z="downloads.shelf",D="chrome://new-tab-page/*",G="chrome://*/*",H={[G]:"opt_chromeUrl",[D]:"opt_cNewtab",[z]:"opt_closeShelf"},I=n("#optionalPermissionsTemplate"),K=I.content.firstElementChild,M=[],Q=I.parentElement,W=_.permissions,X=_.runtime.getManifest().optional_permissions||[];J("OptionalPermissions",class extends a{constructor(){super(...arguments),this.ms=()=>M.map(e=>e.ts.checked?e.ts.indeterminate?"1":"2":"0").join(""),this.rs=()=>M.map(e=>e.ss).join("")}Fr(){this.ts.onchange=this.is}as(e){for(let o=0;o<M.length;o++)M[o].ts.checked="0"!==e[o],M[o].ts.indeterminate="1"===e[o]}xs(e){let o=[],t=[],r={},i=1;for(let n=0;n<M.length;n++){let m=M[n],p=+e[n];if(m.ss===p)continue;let a=m.Nl===D?"chrome://newtab/*":"";m.ss=p,m.Nl===G&&s.Nt("allBrowserUrls")!==(2===p)&&s.Rt("allBrowserUrls",2===p),p?(m.Nl===z&&o.push("downloads"),(m.Nl.includes(":")?t:o).push(m.Nl),a&&t.push(a),r[m.Nl]=m):(i++,W.remove(m.Nl.includes(":")?{origins:a?[m.Nl,a]:[m.Nl]}:{permissions:m.Nl===z?["downloads",m.Nl]:[m.Nl]},e=>{let o=_.runtime.lastError;return(o||!e)&&console.log("Can not remove the permission %o :",m.Nl,o&&o.message||o),l(),o}))}let n=(e,o)=>{let t=_.runtime.lastError;if((t||!o)&&console.log("Can not request permissions of %o :",e,t&&t.message||t),!o){for(let o of e){let e=r[o];if(e&&(e.ss=0),!e||!t)return;let s=e.ts.parentElement,i=s.nextElementSibling;i&&i.classList.contains("tip")||(i=document.createElement("div"),i.className="tip",s.parentElement.insertBefore(i,s.nextElementSibling));let n=(t&&t.message||JSON.stringify(t))+"";o.startsWith("chrome://")&&n.includes("Only permissions specified in the manifest")&&o.startsWith("chrome:")&&(n=m("optNeedChromeUrlFirst"),n=q?n.replace("chrome:","edge:"):n),i.textContent=s.title=m("exc")+n,s.lastElementChild.classList.add("has-error")}this.os()}return l(),t},l=()=>{i--,i>0||Promise.all(M.map(Z)).then(()=>{this.os()})};return i+=(o.length&&1)+(t.length&&1),o.length&&W.request({permissions:o},n.bind(0,o)),t.length&&W.request({origins:t},n.bind(0,t)),l(),e}});let Y=()=>{let e=document.createDocumentFragment();for(let o of X){let t=document.importNode(K,true),s=t.querySelector("input"),r=H[o];s.value=o;let i=m(r||`opt_${o}`)||o,n="";o.startsWith("chrome:")&&(i=q?i.replace("chrome:","edge:"):i,n=m("optOfChromeUrl").replace(q?"chrome":"edge","edge")),t.lastElementChild.textContent=i+n,1===X.length&&t.classList.add("single"),e.append(t),M.push({Nl:o,ss:0,ts:s})}Q.append(e),Q.addEventListener("change",ee,true),setTimeout(()=>{Promise.all(M.map(Z)).then(()=>{Q.dataset.model="OptionalPermissions",$(Q).os()})},17)},Z=e=>{let o,t=e.Nl,r=new Promise(e=>{o=e});return W.contains(t.includes(":")?{origins:[t]}:{permissions:t===z?["downloads",t]:[t]},t=>{let r=t?e.Nl!==G||s.Nt("allBrowserUrls")?2:1:0;return e.ss=r,o(),_.runtime.lastError}),r},ee=e=>{let o=e.target,t=M.find(e=>e.ts===o);if(!t)return;let s=o.checked;if(t.Nl===G||t.Nl===D){let e=t.Nl===D,r=e?G:D,i=M.find(e=>e.Nl===r);i&&(e&&s&&!i.ts.checked?i.ts.checked=i.ts.indeterminate=true:!e&&s&&o.indeterminate?o.indeterminate=false:(i.ts.checked=s,i.ts.indeterminate=false))}};{let e=["downloads"];!q||e.push(D),e.push("cookies"),X=X.filter(o=>!e.some(e=>"string"==typeof e?o===e:e.test(o)))}h(X.length?Y:()=>{n("#optionalPermissionsBox").style.display="none"});