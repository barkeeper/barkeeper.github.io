import{t as n}from"./index-DbChkwc3.js";function c(){return'<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'}function p(e,t){return`
    <header class="sec-head">
      <span class="sec-label">${e}</span>
      <span class="sec-meta">${t??""}</span>
      ${c()}
    </header>
  `}function v(e,t,a,s=""){return`
    <li class="step" data-step="${e}" data-status="pending">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="step-body">
        <div class="step-title">${t}</div>
        <div class="step-desc">${a}</div>
        <div class="step-note" data-role="step-note"></div>
        ${s}
      </div>
    </li>
  `}function m({name:e,code:t,stats:a=[],prefix:s,withRuntime:i=!0}){const l=a.map(r=>`<div class="stat"><span class="k">${r.k}</span><span class="v" id="${s}-${r.id}">—</span></div>`).join(""),o=i?`<div id="${s}-runtime-pill" class="runtime-pill" data-device="probing">${n("ui.runtime.probing")}</div>`:"";return`
    <div id="${s}-banner" class="banner hidden">
      <button class="x" aria-label="${n("ui.dismiss")}">×</button>
      <div><b>${n("ui.banner.webgpuTitle")}</b></div>
      <div>${n("ui.banner.webgpuBody")}</div>
    </div>
    <header class="topbar">
      <div class="brand"><span class="brand-mark"></span>${e}<span class="tag">/ ${t}</span></div>
      <div class="stat-row">
        ${l}
        ${o}
      </div>
    </header>
  `}function $(e){return`
    <div id="${e.prefix}-dropzone" class="intake-cta" data-active="false">
      <button class="cta-btn" id="${e.prefix}-pick-btn">
        <svg viewBox="0 0 16 16" class="cta-icon" aria-hidden="true">
          <path d="M3 11v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2M8 2v8m0-8l-3 3m3-3l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${e.cta}
      </button>
      <input type="file" id="${e.prefix}-file-input" accept="${e.accept}"${e.multiple?" multiple":""} class="hidden" />
      <div class="intake-sub" id="${e.prefix}-file-label">${e.hint}</div>
    </div>
  `}function f(e,t){const a=document.createElement("a");a.href=e,a.download=t,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove()}function h(e,t){e.innerHTML="";const a=document.createElement("div");a.className="dl-toast",a.innerHTML=`
    <span class="dl-toast-mark" aria-hidden="true">
      <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </span>
    <div class="dl-toast-body">
      <div class="dl-toast-head">${n("ui.download.head")}</div>
      <div class="dl-toast-name"></div>
      <div class="dl-toast-meta">${d(t.meta)}</div>
    </div>
    <a class="dl-toast-link" href="${t.url}" download="${d(t.filename)}">${n("ui.download.again")}</a>
  `,a.querySelector(".dl-toast-name").textContent=t.filename,e.append(a)}function d(e){return e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function b(e,t,a="info"){e.classList.remove("hidden"),e.classList.toggle("error",a==="error");const s=a==="error"?n("ui.banner.error"):n("ui.banner.webgpuTitle");e.innerHTML=`<button class="x" aria-label="${n("ui.dismiss")}">×</button><div><b>${s}</b></div><div>${d(t)}</div>`,e.querySelector(".x")?.addEventListener("click",()=>e.classList.add("hidden"))}function k(e,t,a={}){["dragenter","dragover"].forEach(s=>{e.addEventListener(s,i=>{i.preventDefault(),e.dataset.active="true"})}),["dragleave","drop"].forEach(s=>{e.addEventListener(s,i=>{i.preventDefault(),e.dataset.active="false"})}),e.addEventListener("drop",s=>{s.preventDefault();const i=Array.from(s.dataTransfer?.files??[]);i.length!==0&&(a.multiple?a.onAll?.(i):t(i[0]))})}export{p as a,f as b,v as c,d as e,$ as i,h as r,b as s,m as t,k as w};
//# sourceMappingURL=fragments-kQZcphFF.js.map
