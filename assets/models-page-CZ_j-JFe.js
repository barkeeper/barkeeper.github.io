import{t as D,a as $}from"./fragments-kQZcphFF.js";import{b as I,i as U,t,o as W,g as _,f as G}from"./index-DbChkwc3.js";import{C as w,m as y,f as n,a as Q}from"./model-catalog-DAmf0QpZ.js";import{l as T,d as A,a as J,o as K,M as V,T as X}from"./model-cache-CVSf8zme.js";function B(c){return c===V?t("shell.models.cacheToolbox"):c===X?t("shell.models.cacheTransformers"):c}function lt(c){c.innerHTML=Y();const o=e=>c.querySelector(e),C=o("#mdl-rows"),L=o("#mdl-stat-used"),q=o("#mdl-stat-quota"),k=o("#mdl-stat-cached"),H=o("#mdl-usage-fill"),z=o("#mdl-usage-text"),b=o("#mdl-persist"),x=o("#mdl-persist-state"),u=o("#mdl-delete-all"),O=o("#mdl-source-note"),R=o("#mdl-install"),F=o("#mdl-install-note");I(R),F.textContent=U()?t("shell.models.installed"):t("shell.models.installable");let m=!1;async function p(){const e=await T();j(e);const s=e.reduce((a,l)=>a+l.bytes,0);k.textContent=n(s),u.disabled=e.length===0,await S()}async function S(){const e=await navigator.storage?.estimate?.().catch(()=>{}),s=e?.usage??0,a=e?.quota??0;L.textContent=n(s),q.textContent=a?n(a):"—";const l=a?Math.min(100,s/a*100):0;H.style.width=`${l.toFixed(2)}%`,z.textContent=a?t("shell.models.usage",{used:n(s),quota:n(a),pct:l<.1&&s>0?"<0.1":l.toFixed(1)}):t("shell.models.noEstimate");const d=await navigator.storage?.persisted?.().catch(()=>!1)??!1;x.textContent=d?t("shell.models.persistent"):t("shell.models.bestEffort"),x.dataset.on=String(d),b.disabled=d||!navigator.storage?.persist,b.textContent=d?t("shell.models.persistOn"):t("shell.models.persistBtn")}function j(e){const s=new Set,a=w.map(d=>{const r=e.filter(i=>i.url.startsWith(y(d)));for(const i of r)s.add(i);return N(d,r)}),l=e.filter(d=>!s.has(d));l.length&&a.push(P(l)),C.innerHTML=a.join("")}function N(e,s){const a=Q(e),l=s.reduce((h,f)=>h+f.bytes,0),d=[...new Set(s.map(h=>B(h.cache)))],r=s.length?l>=a*.98?"cached":"partial":"missing",i=r==="missing"?t("shell.models.notCached"):r==="cached"?t("shell.models.cached",{size:n(l)}):t("shell.models.partly",{size:n(l)}),g=e.tools.map(h=>{const f=G(h);return f?`<a href="#/${h}" class="mdl-tool">${v(f.name)}</a>`:""}).join("");return`
      <tr data-model="${e.id}" data-state="${r}">
        <td class="mdl-name"><b>${v(e.name)}</b><span class="mdl-repo">${v(e.repo)}</span></td>
        <td class="mdl-tools">${g}</td>
        <td class="mdl-size">${n(a)}</td>
        <td class="mdl-state"><span class="mdl-pill">${i}</span></td>
        <td class="mdl-where">${d.length?d.join(" + "):"—"}</td>
        <td class="mdl-act">
          <button type="button" class="mdl-btn" data-delete="${e.id}" ${s.length?"":"disabled"}>${t("shell.models.delete")}</button>
        </td>
      </tr>`}function P(e){const s=e.reduce((l,d)=>l+d.bytes,0),a=[...new Set(e.map(l=>B(l.cache)))];return`
      <tr data-model="other" data-state="cached">
        <td class="mdl-name"><b>${t("shell.models.otherFiles")}</b><span class="mdl-repo">${t("shell.models.otherSub",{n:e.length})}</span></td>
        <td class="mdl-tools">—</td>
        <td class="mdl-size">${n(s)}</td>
        <td class="mdl-state"><span class="mdl-pill">${t("shell.models.cached",{size:n(s)})}</span></td>
        <td class="mdl-where">${a.join(" + ")}</td>
        <td class="mdl-act">
          <button type="button" class="mdl-btn" data-delete="other">${t("shell.models.delete")}</button>
        </td>
      </tr>`}function E(e){if(e.dataset.armed==="true")return!0;e.dataset.armed="true";const s=e.textContent;return e.textContent=t("shell.models.confirm"),setTimeout(()=>{e.isConnected&&e.dataset.armed==="true"&&(e.dataset.armed="false",e.textContent=s)},3e3),!1}C.addEventListener("click",async e=>{const s=e.target.closest("[data-delete]");if(!(!s||m||!E(s))){m=!0;try{const a=s.dataset.delete;if(a==="other"){const l=await T(),d=w.map(y),r=l.map(i=>i.url).filter(i=>!d.some(g=>i.startsWith(g)));await A(r)}else{const l=w.find(d=>d.id===a);l&&await A([y(l)])}}finally{m=!1,await p()}}}),u.addEventListener("click",async()=>{if(!(m||!E(u))){m=!0;try{await J()}finally{m=!1,u.dataset.armed="false",u.textContent=t("shell.models.deleteAll"),await p()}}}),b.addEventListener("click",async()=>{try{await navigator.storage.persist()}finally{await S()}});function M(){O.textContent=_()==="remote"?t("shell.models.sourceOnline"):t("shell.models.sourceOffline")}M(),W(M),K(()=>void p()),c.addEventListener("pane-shown",()=>void p()),p()}function v(c){return c.replace(/[&<>"]/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[o])}function Y(){return`
    ${D({name:t("shell.models.title"),code:t("shell.models.code"),prefix:"mdl",withRuntime:!1,stats:[{k:t("shell.models.statCached"),id:"stat-cached"},{k:t("shell.models.statUsed"),id:"stat-used"},{k:t("shell.models.statQuota"),id:"stat-quota"}]})}
    <main class="panel mdl-panel">
      <section class="sec">
        ${$(t("shell.models.secStorage"))}
        <div class="sec-body">
          <div class="mdl-usage"><span id="mdl-usage-fill"></span></div>
          <div class="mdl-usage-text" id="mdl-usage-text">${t("shell.models.measuring")}</div>
          <div class="mdl-row">
            <button type="button" class="mdl-btn" id="mdl-persist">${t("shell.models.persistBtn")}</button>
            <span class="mdl-note" id="mdl-persist-state"></span>
          </div>
          <div class="mdl-row">
            <button type="button" class="mdl-btn mdl-btn-bad" id="mdl-delete-all">${t("shell.models.deleteAll")}</button>
            <span class="mdl-note" id="mdl-source-note"></span>
          </div>
        </div>
      </section>

      <section class="sec">
        ${$(t("shell.models.secModels"))}
        <div class="sec-body">
          <div class="mdl-table-wrap">
            <table class="mdl-table">
              <thead>
                <tr><th>${t("shell.models.colModel")}</th><th>${t("shell.models.colUsedBy")}</th><th>${t("shell.models.colDownload")}</th><th>${t("shell.models.colStatus")}</th><th>${t("shell.models.colStored")}</th><th></th></tr>
              </thead>
              <tbody id="mdl-rows"></tbody>
            </table>
          </div>
          <div class="mdl-note">${t("shell.models.tableNote")}</div>
        </div>
      </section>

      <section class="sec">
        ${$(t("shell.models.secApp"))}
        <div class="sec-body">
          <div class="mdl-row">
            <button type="button" class="mdl-btn" id="mdl-install" hidden>${t("shell.models.install")}</button>
            <span class="mdl-note" id="mdl-install-note"></span>
          </div>
        </div>
      </section>
    </main>
  `}export{lt as mountModelsPage};
//# sourceMappingURL=models-page-CZ_j-JFe.js.map
