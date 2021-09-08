"use strict";__filename="background/sync.js",define(["require","exports","./store","./utils","./browser","./settings"],(e,t,l,n,r,i)=>{function o(){return new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toJSON().slice(0,-5).replace("T"," ")}Object.defineProperty(t,"__esModule",{value:true}),n=__importStar(n),i=__importStar(i);let u,s,f=n.st({findModeRawQueryList:1,innerCSS:1,keyboard:1,newTabUrl_f:1,vomnibarPage_f:1}),a=r.Al.storage,c=null,d="",S=null,y=null,g=null,p=0,m=()=>u||(u=a&&a.sync),b=e=>{v(e,"sync")},v=(e,t)=>{if("sync"!==t)return;let r=e=>{if(S){n.st(e);for(let t in S){let l=t.split(":")[0],n=l===t;if(n||!(l in S)){let r=n?S[t]:null;N(l,null!=r?r.newValue:e[l],e)}}S=null}};n.st(e);let i=l.O&&l.O();if(S?Object.assign(S,e):S=e,i)i.then(()=>v({},t));else{e=S,S=null;for(let t in e){let l=e[t];if(8===(t.includes(":")?8:N(t,null!=l?l.newValue:null)))return S=e,void m().get(r);delete e[t]}}},O=function(){console.log.apply(console,[`[${o()}]`].concat([].slice.call(arguments)))},N=(e,t,l)=>{if(!(e in i.Ft)||e in i.Bt||!D(e))return;let n=i.Ft[e],r=t&&"object"==typeof t&&t.$_serialize||"";if(r){if("split"===r&&!l)return 8;if(8===(t=T(e,t,l)))return}if(null==t)return void(null!=localStorage.getItem(e)&&(g||O("sync.this: reset",e),w(e,n)));let o,u,s,f=g?n:i.Nt(e);(s="object"!=typeof n)?(u=t,o=f):(u=JSON.stringify(t),o=JSON.stringify(f)),u!==o&&(f=s?n:JSON.stringify(n),u===f&&(t=n),g||O("sync.this: update",e,"string"==typeof t?(t.length>32?t.slice(0,30)+"...":t).replace(/\n/g,"\\n"):t),w(e,t))},w=(e,t)=>{d=e,i.Rt(e,t),d="",e in i.Lt&&i.Pt({N:6,d:[i.Lt[e]]})},J=(e,t)=>{D(e)&&e!==d&&(c||(setTimeout(h,800),c=n.ct()),c[e]=t)},_=(e,t)=>{if(!m())return void l.S(l.A);let n=a.local,i=()=>{let t=r.Fl();if(t)return O("storage.local: Failed to update",e,":",t.message||t),t};null==t?n.remove(e,i):n.set({[e]:t},i)},j=e=>{let t={Q:'\\"',S:"\\\\",d:"`",l:"<",n:"\u2029",q:'"',r:"\u2028"};return e.replace(/`[QSdlnqr]/g,e=>t[e[1]])},T=(e,t,l)=>{let n="";switch(t.$_serialize){case"split":for(let{k:r,s:i}=t,o=0;o<i;o++){let t=l[e+":"+o];if(!t||"string"!=typeof t||!t.startsWith(r))return 8;n+=t.slice(r.length)}break;case"single":return JSON.parse(j(JSON.stringify(t.d)));default:return O("Error: can not support the data format in synced settings data:",e,":",t.$_serialize),null}return"string"==typeof i.Ft[e]?(n=j(n),n):(n=j(JSON.stringify(n)),JSON.parse(n.slice(1,-1)))},k=(e,t,l)=>{if(!t||("string"!=typeof t?"object"!=typeof t:t.length<8192/6-40))return;let n=JSON.stringify(t),r="";if(n.length<8192/6-40)return;if(n=n.replace(/[<`\u2028\u2029]/g,e=>"<"===e?"`l":"`"===e?"`d":"\u2028"===e?"`r":"`n"),4*n.length<8093)return n;if(r=l.encode(n),r.length<8093)return n;let o=0,u=Date.now().toString(36)+":",s={};n="string"==typeof i.Ft[e]?n.slice(1,-1):n.replace(/"|\\[\\"]/g,e=>'"'===e?"`q":'\\"'===e?"`Q":"`S"),y||(y=new TextDecoder),r=l.encode(n);for(let t=0,l=r.length;t<l;){let i,f=Math.min(t+8134,l),a=0;for(;f<l&&128==(192&r[f]);f--);if(i=y.decode(r.subarray(t,f)),n=i.slice(-6),a=n.lastIndexOf("\\"),a>n.length-2)i+="b",a=1;else if(a>0&&"u"===n[a+1]){a=n.length-a;for(let e=a;e++<6;i+="b");}else a=0;if(i=JSON.parse(`"${i}"`),a){let e=i.endsWith("b");e||(f-=a),i=i.slice(0,a>1&&e?a-6:-1)}if(s[e+":"+o++]=u+i,t=f,o>=13)break}return s[e]={$_serialize:"split",k:u,s:o},s},h=()=>{let e=c,t=[],o=[],u=[],s=n.ct(),f={};if(c=null,!e||l.V!==J)return;let a=new TextEncoder;for(let l in e){let n=l,r=e[n],c=i.Ft[n],d="string"==typeof c||"object"==typeof c&&"vimSync"!==n?0:13;if(null!=r){let e=k(n,r,a);e&&"object"==typeof e?(s[n]=e,d=e[n].s):(f[n]=e?{$_serialize:"single",d:JSON.parse(e)}:r,o.push(n))}else u.push(n),t.push(n);for(;d<13;d++)u.push(n+":"+d)}y=a=null,t.length>0&&O("sync.cloud: reset",t.join(", ")),u.length>0&&m().remove(u),o.length>0&&(O("sync.cloud: update",o.join(", ")),m().set(f));for(let e in s)m().set(s[e],()=>{let t=r.Fl();return t?O("Failed to update",e,":",t.message||t):O("sync.cloud: update (serialized) "+e),t})},D=e=>!(e in f),q=e=>{l.i(null),p&&clearTimeout(p),p=setTimeout(()=>{p=0,a.local.get(e=>{if(i.Nt("vimSync")||!localStorage.length)return;O("storage.local: backup all settings from localStorage"),n.st(e);for(let t=0,l=localStorage.length;t<l;t++){let l=localStorage.key(t);if(l in i.Ft&&(D(l)||"keyboard"===l)){let t=i.Ft[l],n=e[l],r=i.Nt(l),o=r,u=n;"object"==typeof t&&(u=JSON.stringify(n),o=JSON.stringify(r)),o!==u&&_(l,r),delete e[l]}}let t=Object.keys(e);t.length>0&&a.local.remove(t)})},e)},P=(e,t,o)=>{if(2&t&&a.local.get(e=>{let u=r.Fl();if(u&&l.b(null),u||!l.Be&&true===i.Nt("vimSync"))return(t-=2)||o(),u;n.st(e);let s=e.vimSync,f=void 0!==s||Object.keys(e).length>0;delete e.vimSync,f&&O("storage.local: restore settings to localStorage");for(let t in e)if(t in i.Ft){let l=e[t];d=t,l=null==l?i.Ft[t]:l,i.Rt(t,l)}d="",null!=s&&i.Rt("vimSync",s),setTimeout(()=>{i.Pt({N:6,d:l.Ye})},100),(t-=2)||o()}),2===t)return;n.st(e);let u=e.vimSync||i.Nt("vimSync");if(!u)return s=u,l.S(_),void(--t||o());e.vimSync||(O("sync.cloud: enable vimSync"),e.vimSync=u,m().set({vimSync:u}));let f=[];for(let t in e)t in i.Gt&&f.push(t);let c=[],S={};for(let t of f){let l=i.Gt[t];for(let n,r=-1;r<13&&(n=r<0?t:t+":"+r)in e;r++){let t=r<0?l:l+":"+r;S[t]=e[t]=e[n],delete e[n],c.push(n)}}f.length>0&&(a.onChanged.removeListener(v),l.S(l.A),m().remove(c),m().set(S,r.Fl),f.length=0);for(let t=0,l=localStorage.length;t<l;t++){let l=localStorage.key(t);!(l in e)&&l in i.Ft&&D(l)&&f.push(l)}for(let e of f)N(e,null);for(let t in e)t.includes(":")||N(t,e[t],e);i.Dt("vimSync"),setTimeout(()=>{--t||o()},4),g&&3!==t&&O("sync.cloud: download settings to localStorage")};if(i.Ct.vimSync=e=>{if(s=e,!m())return;let t=m().onChanged,n=b;if(!e)return t.removeListener(n),void(l.V!==_&&(l.S(_),q(600)));if(l.V!==J){t.addListener(n),l.S(J),p&&clearTimeout(p),p=0;let e=()=>{a.local.get(e=>{delete e.vimSync,O("switch to sync.cloud, when old settings data in storage.local is:","\n"+JSON.stringify(e,null,2)),p=setTimeout(()=>{p=0,a.local.clear()},8e3)})};a.local.getBytesInUse(t=>{t>0&&e()})}},l.b(()=>{if(g);else{if(localStorage.length)return null;g=new Promise(e=>{s?m().get(t=>{let n=r.Fl();return n?(l.b(null),e()):P(t,1,e),n}):P({},2,e)}).then(()=>{g=null})}return g}),s=i.Nt("vimSync"),false===s||!s&&!l.Be){let e=true===l.f;l.i(e?null:q),e&&q(6e3),l.S(_)}else m()?m().get(e=>{let t=r.Fl();if(t)return O("Error: failed to get storage:",t,"\n\tSo disable syncing temporarily."),i.Ct.vimSync=void 0,l.S(l.A),l.b(null),t;g=Promise.resolve(),g=new Promise(t=>P(e,3,t)).then(()=>{g=null})}):(l.S(l.A),l.b(null))});