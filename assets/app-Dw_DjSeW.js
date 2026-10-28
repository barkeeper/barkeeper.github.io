const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/inference-CkxFX5J4.js","assets/transformers.web-Cyg6ssfE.js","assets/runtime-Jg5t-PhK.js","assets/index-DbChkwc3.js","assets/index-B2t3sVwO.css","assets/model-cache-CVSf8zme.js"])))=>i.map(i=>d[i]);
import{t as a,d as U,s as ye,p as ae,_ as xe}from"./index-DbChkwc3.js";import{o as ke,u as ne,e as oe,F as D,r as Ce}from"./florence-B0A8tqZ9.js";import{probeWebGPU as Le,isWebGpuKernelError as Ee}from"./runtime-Jg5t-PhK.js";import{s as N,w as Se,e as Te,b as qe,t as Ae,a as J,c as se,i as Me}from"./fragments-kQZcphFF.js";import"./transformers.web-Cyg6ssfE.js";import"./gpu-lock-CVLNUbDT.js";const j=125,Oe=[/^(?:in )?(?:this|the) (?:image|picture|photo(?:graph)?|scene)(?: (?:we can see|shows|depicts|features|contains|is|has)| ,)?\s*/i,/^(?:an? )?(?:image|picture|photo(?:graph)?|close-?up|view) (?:of|showing|shows)\s+/i,/^there (?:is|are)\s+/i,/^we can see\s+/i];function I(s){let n=s.replace(/<\/?s>|<pad>|<[A-Z_]+>/g," ").replace(/\s+/g," ").trim();for(let l=0;l<3;l++){const u=n;for(const w of Oe)n=n.replace(w,"");if(n=n.replace(/^,\s*/,""),n===u)break}return n?(n=n[0].toUpperCase()+n.slice(1),n):""}function pe(s){return/[.!?…]$/.test(s)?s:`${s}.`}function Y(s,n=j){if(s.length<=n)return s;const l=s.slice(0,n-1),u=l.lastIndexOf(" ");return`${(u>n*.5?l.slice(0,u):l).replace(/[\s,;:.-]+$/,"")}…`}function ie(s,n=""){let l=I(s);return l||(l=I(n.split(/(?<=\.)\s/)[0]??"")),Y(pe(l))}function _e(s){const n=I(s);if(!n)return"";const l=n.split(/(?<=[.!?])\s+/),u=new Set,w=[];for(const $ of l){const y=$.toLowerCase().trim();!y||u.has(y)||(u.add(y),w.push($[0].toUpperCase()+$.slice(1)))}return pe(w.join(" "))}const ue=new Set("a an the and or but of in on at to for with from by over under into onto near is are was were be been being has have had it its this that these those there their his her they them he she we you i which who whom whose what where when image picture photo photograph shows show showing depicts features appears seems can see seen also some very while other each one two three several many few left right top bottom front back side middle center centre background foreground behind above below around next out up down off all any both more most such small large big little long short tall dark light bright white black red blue green yellow orange purple pink brown grey gray silver gold colored coloured wearing holding standing sitting looking made like looks well slightly overall visible appear appears giving gives creating create adds add part parts possibly likely suggests something lot lots way area view close shown upper lower different various item items simple".split(/\s+/));function R(s){return(s.toLowerCase().match(/[a-z][a-z-]{2,}/g)??[]).filter(n=>!ue.has(n)).map(n=>n.replace(/(?:es|s)$/,""))}function je(s,...n){const l=[],u=m=>{const d=m.toLowerCase().trim();!d||d.length<3||l.includes(d)||l.includes(d.replace(/s$/,""))||l.includes(`${d}s`)||l.push(d)},w=new Set(n.flatMap(R));for(const m of s)R(m).some(d=>w.has(d))&&u(m);const $=new Map;for(const m of n)for(const d of m.toLowerCase().match(/[a-z][a-z-]{2,}/g)??[])ue.has(d)||/ly$|ing$|ed$/.test(d)||$.set(d,($.get(d)??0)+1);const y=[...$.entries()].sort((m,d)=>d[1]-m[1]||m[0].localeCompare(d[0]));for(const[m]of y){if(l.length>=12)break;u(m)}for(const m of s){if(l.length>=8)break;u(m)}return l.slice(0,12)}function ce(s){return I(s).replace(/[.!?]+$/,"").replace(/^the (background|sky|wall|floor|ground|lighting) (?:is|are) (.+)$/i,"$2 $1").replace(/^(?:it|they|he|she) (?:is wearing|are wearing|is|are|has|have|wears)\s+/i,"").replace(/^(?:the overall|the) (?:mood|atmosphere|scene) (?:is|of the image is)\s+/i,"").replace(/^there(?: is| are)?\s+/i,"").toLowerCase().trim()}function Ie(s,n,l){const u=[],w=new Set,$=(d,T)=>{if(!d)return;const C=R(d),L=C.filter(O=>!w.has(O));if(!(u.length&&L.length<Math.max(1,Math.ceil(C.length*T)))){for(const O of C)w.add(O);u.push(d.length>120?Y(d,120).replace(/…$/,""):d)}};$(ce(s),0);for(const d of I(n).split(/(?<=[.!?])\s+/))$(ce(d),.4);let y=u.join(", ");const m=l.filter(d=>!R(d).every(T=>w.has(T))).slice(0,3);return m.length&&(y+=`, ${m.join(", ")}`),y+=", highly detailed, sharp focus",Y(y,300).replace(/…$/,"")}function re(s,n){const l=u=>u.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`<img src="${l(s)}" alt="${l(n)}">`}function Ue(s){return/[",\n\r]/.test(s)?`"${s.replace(/"/g,'""')}"`:s}const De="toolbox:sd-prompt-handoff",le=768,de=new WeakSet;function ze(s){if(de.has(s))return;de.add(s),s.innerHTML=Ne();const n=e=>s.querySelector(e),l=n("#icap-banner"),u=n("#icap-runtime-pill"),w=n("#icap-stat-model"),$=n("#icap-stat-count"),y=n("#icap-dropzone"),m=n("#icap-pick-btn"),d=n("#icap-file-input"),T=n("#icap-file-label"),C=n("#icap-list"),L=n("#icap-run-btn"),O=n("#icap-info"),E=n("#icap-status"),ge=n("#icap-process-section"),K=Array.from(s.querySelectorAll("[data-export]")),V=n("#icap-clear");for(const e of s.querySelectorAll("section[data-collapsible]"))e.querySelector(".sec-head")?.addEventListener("click",()=>e.toggleAttribute("data-collapsed"));l.querySelector(".x")?.addEventListener("click",()=>l.classList.add("hidden"));const g=[];let me=0,X="<MORE_DETAILED_CAPTION>",P="en",Q=!0,q=!1,A=!1,S={device:"wasm",adapterName:null,reason:"pending"},x=null;F("detail",e=>X=e),F("lang",e=>P=e),F("od",e=>Q=e==="on");function F(e,t){const o=Array.from(s.querySelectorAll(`[data-field="${e}"]`));for(const i of o)i.addEventListener("click",()=>{t(i.dataset.value??"");for(const c of o)c.setAttribute("aria-pressed",String(c===i))})}(async()=>(S=await Le(),u.dataset.device=S.device,u.textContent=S.device==="webgpu"?`WebGPU · ${S.adapterName??a("image-caption.runtime.ready")}`:a("image-caption.runtime.wasm"),S.device==="wasm"&&N(l,a("image-caption.banner.wasm",{reason:S.reason??a("image-caption.banner.noAdapter")}))))(),w.textContent="florence-2-base";const fe=ke(e=>{s.isConnected&&e.progress<1&&h("load-model","active",`${e.phase} · ${(e.progress*100).toFixed(0)}%`)});s._icapUnsub=fe,m.addEventListener("click",()=>d.click()),d.addEventListener("change",()=>{const e=Array.from(d.files??[]);d.value="",B(e)}),Se(y,()=>{},{multiple:!0,onAll:e=>void B(e)}),s.addEventListener("dragover",e=>e.preventDefault()),s.addEventListener("drop",e=>{e.target.closest("#icap-dropzone")||(e.preventDefault(),B(Array.from(e.dataTransfer?.files??[])))});async function B(e){const t=e.filter(o=>o.type.startsWith("image/"));if(t.length<e.length&&N(l,a("image-caption.banner.skipped",{n:e.length-t.length}),"error"),!!t.length){for(const o of t)try{const i=await createImageBitmap(o),c=Math.min(1,le/Math.max(i.width,i.height)),p=new OffscreenCanvas(Math.max(1,Math.round(i.width*c)),Math.max(1,Math.round(i.height*c)));p.getContext("2d").drawImage(i,0,0,p.width,p.height);const r=await p.convertToBlob({type:"image/jpeg",quality:.9});g.push({id:++me,file:o,name:o.name,thumbUrl:URL.createObjectURL(r),width:i.width,height:i.height,status:"queued",altEn:"",alt:"",caption:"",tags:[],sd:"",ms:0}),i.close()}catch(i){N(l,a("image-caption.banner.decodeFailed",{name:o.name,msg:i.message}),"error")}T.textContent=U(g.length,"image-caption.intake.queued.one","image-caption.intake.queued.other"),H(),W()}}L.addEventListener("click",()=>{for(const e of g)e.status!=="running"&&(e.status="queued");H(),W()});async function he(){if(x)return x;h("load-model","active",`${D} · ${S.device}`);const e=performance.now();return x=await oe(),h("load-model","done",`${D} · ${x.device} · ${x.dtype} · ${((performance.now()-e)/1e3).toFixed(1)}s`),x}async function W(){if(q)return;const e=()=>g.filter(c=>c.status==="queued");if(!e().length)return;q=!0,A=!1,ge.removeAttribute("hidden"),L.disabled=!0,E.classList.remove("hidden");const t=e().length;let o=0;const i=ye({tool:a("tool.image-caption.name"),route:"image-caption",label:U(t,"image-caption.job.label.one","image-caption.job.label.other"),detail:a("image-caption.job.loadingModel"),progress:0,onCancel:()=>{A=!0}});try{let c=await he();h("caption","active",`0 / ${t}`);let p;for(;!A&&(p=e()[0]);){const r=p;r.status="running",z(r);const b=performance.now();try{await Z(c,r)}catch(k){if(Ee(k)&&c.device==="webgpu")console.warn("[icap] WebGPU kernel error, retrying on WASM",k),await ne(),x=null,h("load-model","active",a("image-caption.step.load.webgpuFailed")),x=await oe("wasm"),c=x,h("load-model","done",`${D} · wasm · ${c.dtype}`),await Z(c,r);else throw k}r.ms=performance.now()-b,r.status="done",o++,z(r);const v=a("image-caption.progress",{done:o,total:t,secs:(r.ms/1e3).toFixed(1)});h("caption","active",v),E.textContent=v,i.update({progress:o/t,detail:v})}if(A){for(const r of g)r.status==="running"&&(r.status="queued");i.markCancelled(),E.textContent=a("image-caption.status.cancelled"),h("caption","pending",a("image-caption.step.cancelledAfter",{done:o,total:t}))}else{const r=g.filter(v=>v.ms).reduce((v,k)=>v+k.ms,0)/Math.max(1,o),b=a("image-caption.summary",{done:o,secs:(r/1e3).toFixed(1)});h("caption","done",b),E.textContent=a("image-caption.status.done",{msg:b}),i.done(b),we()}}catch(c){const p=c;for(const r of g)r.status==="running"&&(r.status="error",r.error=p.message,z(r));h("caption","pending"),x||h("load-model","pending"),N(l,a("image-caption.banner.failed",{msg:p.message}),"error"),i.fail(p.message),E.textContent=a("image-caption.status.failed")}finally{q=!1,L.disabled=g.length===0,L.innerHTML=a("image-caption.run.again"),_(),A&&(await ne(),x=null,h("load-model","pending"))}!A&&e().length&&W()}async function Z(e,t){const o=await createImageBitmap(t.file),i=Ce(o,le);o.close();const c=performance.now(),p=String(await e.run(i,"<CAPTION>",{maxNewTokens:48})??""),r=performance.now(),b=String(await e.run(i,X,{maxNewTokens:160})??""),v=performance.now();let k=[];Q&&(k=(await e.run(i,"<OD>",{maxNewTokens:128}))?.labels??[]),console.info(`[icap] ${t.name}: caption ${Math.round(r-c)} ms · detail ${Math.round(v-r)} ms · od ${Math.round(performance.now()-v)} ms`),t.altEn=ie(p,b),t.caption=_e(b),t.tags=je(k,p,b),t.sd=Ie(p,b,t.tags),t.alt=t.altEn,P==="nl"&&(t.alt=await be(t.altEn))}async function be(e){h("caption","active",a("image-caption.step.translating"));const i=(await(await xe(()=>import("./inference-CkxFX5J4.js"),__vite__mapDeps([0,1,2,3,4,5]))).chat([{role:"system",content:"You translate English image alt-text into natural Dutch. Reply with ONLY the Dutch sentence, no quotes, no notes."},{role:"user",content:e}],{maxNewTokens:96,temperature:0})).split(`
`)[0].replace(/^["'“”]+|["'“”]+$/g,"").trim();return i?ve(i):e}function ve(e){return e.length<=j?e:ie(e)}function H(){C.innerHTML="";for(const e of g)C.append(ee(e));_()}function z(e){const t=C.querySelector(`[data-item="${e.id}"]`),o=ee(e);t?t.replaceWith(o):C.append(o),_()}function _(){const e=g.filter(t=>t.status==="done").length;$.textContent=g.length?`${e}/${g.length}`:"—",O.textContent=g.length?U(g.length,"image-caption.info.one","image-caption.info.other",{done:e}):a("image-caption.info.empty");for(const t of K)t.disabled=e===0;V.disabled=q||g.length===0,q||(L.disabled=g.length===0)}function ee(e){const t=document.createElement("article");t.className="icap-card",t.dataset.item=String(e.id),t.dataset.status=e.status;const o=e.status==="done",i=e.status==="done"?`${(e.ms/1e3).toFixed(1)}s`:e.status==="running"?a("image-caption.card.captioning"):e.status==="error"?a("image-caption.card.error"):a("image-caption.card.queued");t.innerHTML=`
      <div class="icap-thumb"><img alt="" src="${e.thumbUrl}" /></div>
      <div class="icap-fields">
        <div class="icap-head">
          <span class="icap-name"></span>
          <span class="icap-meta">${e.width}×${e.height} · <span class="icap-state" data-status="${e.status}">${i}</span></span>
          <button class="icap-x" type="button" data-act="remove" aria-label="${a("image-caption.card.removeImage")}" title="${a("image-caption.card.remove")}">×</button>
        </div>
        ${e.error?`<div class="icap-err">${Te(e.error)}</div>`:""}
        <label class="gp-field">
          <span class="gp-field-label">${a("image-caption.card.alt")} <span class="icap-count" data-role="count"></span></span>
          <textarea class="gp-textarea icap-alt" rows="2" data-key="alt" maxlength="250" ${o?"":"disabled"}></textarea>
        </label>
        <label class="gp-field">
          <span class="gp-field-label">${a("image-caption.card.caption")}</span>
          <textarea class="gp-textarea" rows="3" data-key="caption" ${o?"":"disabled"}></textarea>
        </label>
        <label class="gp-field">
          <span class="gp-field-label">${a("image-caption.card.tags")}</span>
          <input class="gp-input" type="text" data-key="tags" ${o?"":"disabled"} />
        </label>
        <label class="gp-field">
          <span class="gp-field-label">${a("image-caption.card.sd")}</span>
          <textarea class="gp-textarea" rows="2" data-key="sd" ${o?"":"disabled"}></textarea>
        </label>
        <div class="gp-run-row">
          <button class="btn" type="button" data-act="copy-img" ${o?"":"disabled"}>${a("image-caption.card.copyImg")}</button>
          <button class="btn" type="button" data-act="copy-alt" ${o?"":"disabled"}>${a("image-caption.card.copyAlt")}</button>
          <button class="btn" type="button" data-act="send-sd" ${o?"":"disabled"}>${a("image-caption.card.sendSd")}</button>
          <span class="icap-flash" data-role="flash"></span>
        </div>
      </div>
    `,t.querySelector(".icap-name").textContent=e.name;const c=f=>t.querySelector(`[data-key="${f}"]`),p=c("alt"),r=t.querySelector('[data-role="count"]'),b=t.querySelector('[data-role="flash"]');p.value=e.alt,c("caption").value=e.caption,c("tags").value=e.tags.join(", "),c("sd").value=e.sd;const v=()=>{const f=p.value.length;r.textContent=`${f}/${j}`,r.dataset.over=String(f>j)};v(),p.addEventListener("input",()=>{e.alt=p.value,v()}),c("caption").addEventListener("input",f=>{e.caption=f.target.value}),c("tags").addEventListener("input",f=>{e.tags=f.target.value.split(",").map($e=>$e.trim()).filter(Boolean)}),c("sd").addEventListener("input",f=>{e.sd=f.target.value});const k=f=>{b.textContent=f,setTimeout(()=>{b.textContent===f&&(b.textContent="")},1800)};return t.querySelector('[data-act="copy-img"]')?.addEventListener("click",()=>{G(re(e.name,e.alt)).then(()=>k(a("image-caption.card.copiedImg")))}),t.querySelector('[data-act="copy-alt"]')?.addEventListener("click",()=>{G(e.alt).then(()=>k(a("image-caption.card.copied")))}),t.querySelector('[data-act="send-sd"]')?.addEventListener("click",()=>{try{sessionStorage.setItem(De,e.sd)}catch{}location.hash="#/gemma-image-prompt"}),t.querySelector('[data-act="remove"]')?.addEventListener("click",()=>{if(e.status==="running")return;const f=g.indexOf(e);f>=0&&g.splice(f,1),URL.revokeObjectURL(e.thumbUrl),t.remove(),_()}),t}async function G(e){try{await navigator.clipboard.writeText(e)}catch{const t=document.createElement("textarea");t.value=e,document.body.append(t),t.select(),document.execCommand("copy"),t.remove()}}for(const e of K)e.addEventListener("click",()=>{const t=g.filter(c=>c.status==="done");if(!t.length)return;const o=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),i=e.dataset.export;if(i==="csv"){const c=["file","width","height","alt","alt_en","caption","tags","sd_prompt"],p=t.map(r=>[r.name,String(r.width),String(r.height),r.alt,r.altEn,r.caption,r.tags.join("; "),r.sd].map(Ue).join(","));te(`\uFEFF${[c.join(","),...p].join(`\r
`)}\r
`,`captions-${o}.csv`,"text/csv")}else if(i==="json"){const c=t.map(p=>({file:p.name,width:p.width,height:p.height,alt:p.alt,alt_en:p.altEn,caption:p.caption,tags:p.tags,sd_prompt:p.sd}));te(JSON.stringify({model:D,lang:P,images:c},null,2),`captions-${o}.json`,"application/json")}else i==="html"&&G(t.map(c=>re(c.name,c.alt)).join(`
`)).then(()=>{E.classList.remove("hidden"),E.textContent=U(t.length,"image-caption.status.copiedTags.one","image-caption.status.copiedTags.other")})});function we(){const e=g.filter(o=>o.status==="done"&&o.caption);if(!e.length)return;const t=e.length===1?e[0].caption:e.map(o=>`${o.name}: ${o.caption}`).join(`
`);ae("image-caption",new Blob([t],{type:"text/plain"}),"captions.txt","text")}function te(e,t,o){ae("image-caption",new Blob([e],{type:o}),t,"text");const i=URL.createObjectURL(new Blob([e],{type:`${o};charset=utf-8`}));qe(i,t),setTimeout(()=>URL.revokeObjectURL(i),1e4)}V.addEventListener("click",()=>{if(!q){for(const e of g)URL.revokeObjectURL(e.thumbUrl);g.length=0,H(),T.textContent=a("image-caption.intake.cleared"),h("caption","pending")}});function h(e,t,o=""){const i=s.querySelector(`[data-step="${e}"]`);if(!i)return;i.setAttribute("data-status",t);const c=i.querySelector('[data-role="step-note"]');c&&(c.textContent=o)}_()}function M(s,n,l,u){return`<button type="button" class="gp-chip" data-field="${s}" data-value="${n}" aria-pressed="${u}">${l}</button>`}function Ne(){return`
    ${Ae({name:a("image-caption.brand"),code:"t·022",prefix:"icap",stats:[{k:a("image-caption.stat.model"),id:"stat-model"},{k:a("image-caption.stat.done"),id:"stat-count"}]})}

    <main class="panel panel-split">
      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${J(a("image-caption.sec.options"))}
          <div class="sec-body">
            <p class="gp-blurb">${a("image-caption.blurb",{max:j})}</p>
            <div class="gp-form">
            <div class="gp-field">
              <span class="gp-field-label">${a("image-caption.opt.detail")}</span>
              <div class="gp-chips">
                ${M("detail","<DETAILED_CAPTION>",a("image-caption.opt.detail.detailed"),!1)}
                ${M("detail","<MORE_DETAILED_CAPTION>",a("image-caption.opt.detail.more"),!0)}
              </div>
            </div>
            <div class="gp-field">
              <span class="gp-field-label">${a("image-caption.opt.od")}</span>
              <div class="gp-chips">
                ${M("od","on",a("image-caption.opt.od.on"),!0)}
                ${M("od","off",a("image-caption.opt.od.off"),!1)}
              </div>
            </div>
            <div class="gp-field">
              <span class="gp-field-label">${a("image-caption.opt.lang")}</span>
              <div class="gp-chips">
                ${M("lang","en",a("image-caption.opt.lang.en"),!0)}
                ${M("lang","nl",a("image-caption.opt.lang.nl"),!1)}
              </div>
            </div>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${J(a("image-caption.sec.export"))}
          <div class="sec-body">
            <div class="gp-run-row">
              <button class="btn" type="button" data-export="csv" disabled>CSV</button>
              <button class="btn" type="button" data-export="json" disabled>JSON</button>
              <button class="btn" type="button" data-export="html" disabled>${a("image-caption.export.html")}</button>
              <button class="btn" type="button" id="icap-clear" disabled>${a("image-caption.export.clear")}</button>
            </div>
          </div>
        </section>

        <section id="icap-process-section" class="sec" data-collapsible hidden>
          ${J(a("image-caption.sec.process"))}
          <div class="sec-body">
            <ol class="steps">
              ${se("load-model",a("image-caption.step.load.title"),a("image-caption.step.load.desc"))}
              ${se("caption",a("image-caption.step.caption.title"),a("image-caption.step.caption.desc"))}
            </ol>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        ${Me({prefix:"icap",cta:a("image-caption.intake.cta"),hint:a("image-caption.intake.hint"),accept:"image/*",multiple:!0})}
        <div id="icap-list" class="icap-list"></div>
      </div>
    </main>

    <footer class="transport">
      <button class="btn ghost" id="icap-run-btn" type="button" disabled>${a("image-caption.run.idle")}</button>
      <div id="icap-info" class="img-info">${a("image-caption.info.empty")}</div>
      <span id="icap-status" class="action-status hidden"></span>
    </footer>
  `}export{De as SD_PROMPT_HANDOFF_KEY,ze as mountImageCaption};
//# sourceMappingURL=app-Dw_DjSeW.js.map
