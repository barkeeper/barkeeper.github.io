import{w as z,s as y,b as A,r as I,t as O,a as C,i as X}from"./fragments-kQZcphFF.js";import{t as a}from"./index-DbChkwc3.js";let E=null;function J(f){if(E===f)return;E=f,f.innerHTML=Y();const i=t=>f.querySelector(t),u=i("#pf-banner"),M=i("#pf-dropzone"),j=i("#pf-pick-btn"),v=i("#pf-file-input"),U=i("#pf-file-label"),r=i("#pf-canvas"),m=r.getContext("2d",{willReadFrequently:!0}),B=i("#pf-stage"),x=i("#pf-crosshair"),w=i("#pf-readout"),$=i("#pf-list"),q=i("#pf-clear-btn"),k=i("#pf-export-btn"),L=Array.from(f.querySelectorAll('[data-role="format-opt"]')),R=i("#pf-info"),T=i("#pf-dl-strip"),D=i("#pf-stat-dim"),g=i("#pf-stat-picks"),s={image:null,picks:[],format:"json",lastUrl:null};for(const t of f.querySelectorAll("section[data-collapsible]"))t.querySelector(".sec-head")?.addEventListener("click",()=>t.toggleAttribute("data-collapsed"));u.querySelector(".x")?.addEventListener("click",()=>u.classList.add("hidden"));for(const t of L)t.addEventListener("click",()=>{const e=t.dataset.format;if(!(!e||e===s.format)){s.format=e;for(const n of L)n.setAttribute("aria-pressed",String(n===t))}});j.addEventListener("click",()=>v.click()),v.addEventListener("change",async()=>{const t=v.files?.[0];t&&await S(t)}),z(M,t=>void S(t)),q.addEventListener("click",()=>{s.picks=[],b(),g.textContent="0"}),k.addEventListener("click",()=>{if(!s.picks.length){y(u,a("pixel-finder.err.none"),"error");return}H()}),r.addEventListener("click",t=>{if(!s.image||!m)return;const e=r.getBoundingClientRect(),n=r.width/e.width,l=r.height/e.height,d=Math.max(0,Math.min(r.width-1,Math.round((t.clientX-e.left)*n))),p=Math.max(0,Math.min(r.height-1,Math.round((t.clientY-e.top)*l))),o=m.getImageData(d,p,1,1).data,c={x:d,y:p,r:o[0],g:o[1],b:o[2],a:o[3],hex:"#"+[o[0],o[1],o[2]].map(h=>h.toString(16).padStart(2,"0")).join("").toUpperCase()};s.picks.push(c),b(),g.textContent=String(s.picks.length)}),r.addEventListener("mousemove",t=>{if(!s.image||!m)return;const e=r.getBoundingClientRect(),n=r.width/e.width,l=r.height/e.height,d=Math.round((t.clientX-e.left)*n),p=Math.round((t.clientY-e.top)*l);if(d<0||p<0||d>=r.width||p>=r.height){x.style.display="none",w.textContent="";return}x.style.display="block",x.style.left=`${t.clientX-e.left}px`,x.style.top=`${t.clientY-e.top}px`;const o=m.getImageData(d,p,1,1).data,c="#"+[o[0],o[1],o[2]].map(h=>h.toString(16).padStart(2,"0")).join("").toUpperCase();w.innerHTML=`
      <span class="pf-readout-swatch" style="background:${c}"></span>
      <span class="pf-readout-text">${d},${p} · ${c} · ${o[0]},${o[1]},${o[2]}</span>
    `});async function S(t){if(!t.type.startsWith("image/")){y(u,a("pixel-finder.err.rejected",{type:t.type||a("pixel-finder.unknownType")}),"error");return}s.image?.bitmap.close?.(),U.textContent=t.name;let e;try{e=await createImageBitmap(t)}catch(n){y(u,a("pixel-finder.err.decode",{msg:n.message}),"error");return}s.image={bitmap:e,name:t.name},r.width=e.width,r.height=e.height,m?.drawImage(e,0,0),B.removeAttribute("hidden"),D.textContent=`${e.width}×${e.height}`,R.textContent=`${t.name} · ${e.width}×${e.height}`,s.picks=[],g.textContent="0",b(),k.disabled=!1}function b(){if($.innerHTML="",s.picks.length===0){$.innerHTML=`<div class="pf-empty">${a("pixel-finder.empty")}</div>`;return}s.picks.forEach((t,e)=>{const n=document.createElement("div");n.className="pf-row",n.innerHTML=`
        <span class="pf-row-idx">${String(e+1).padStart(2,"0")}</span>
        <span class="pf-row-sw" style="background:${t.hex}"></span>
        <span class="pf-row-coord">${t.x}, ${t.y}</span>
        <button class="pf-row-hex" type="button" title="${a("pixel-finder.copy")}">${t.hex}</button>
        <span class="pf-row-rgb">${t.r},${t.g},${t.b}</span>
        <button class="pf-row-del" aria-label="${a("pixel-finder.remove")}">×</button>
      `;const l=n.querySelector(".pf-row-hex");l.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t.hex),l.dataset.copied="true",setTimeout(()=>{delete l.dataset.copied},900)}catch{}}),n.querySelector(".pf-row-del").addEventListener("click",()=>{s.picks.splice(e,1),b(),g.textContent=String(s.picks.length)}),$.append(n)})}function H(){let t,e,n;if(s.format==="csv"){const o=["index,x,y,r,g,b,a,hex",...s.picks.map((c,h)=>`${h+1},${c.x},${c.y},${c.r},${c.g},${c.b},${c.a},${c.hex}`)].join(`
`);t=new Blob([o],{type:"text/csv"}),e="csv",n="text/csv"}else t=new Blob([JSON.stringify({picks:s.picks},null,2)],{type:"application/json"}),e="json",n="application/json";s.lastUrl&&URL.revokeObjectURL(s.lastUrl);const l=URL.createObjectURL(t);s.lastUrl=l;const p=`picks-${new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}.${e}`;A(l,p),I(T,{filename:p,url:l,meta:a("pixel-finder.dlMeta",{size:(t.size/1024).toFixed(1),n:s.picks.length,mime:n})})}}function Y(){return`
    ${O({name:a("tool.pixel-finder.name").toUpperCase(),code:"t·011",prefix:"pf",withRuntime:!1,stats:[{k:a("pixel-finder.stat.size"),id:"stat-dim"},{k:a("pixel-finder.stat.picks"),id:"stat-picks"}]})}

    <main class="panel panel-split">
      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${C(a("pixel-finder.sec.format"))}
          <div class="sec-body">
            <div class="opt-group">
              <button class="opt" data-role="format-opt" data-format="json" aria-pressed="true">
                <span class="dot"></span><span class="label">JSON</span><span class="meta">${a("pixel-finder.json.meta")}</span>
                <span class="sub">${a("pixel-finder.json.sub")}</span>
              </button>
              <button class="opt" data-role="format-opt" data-format="csv" aria-pressed="false">
                <span class="dot"></span><span class="label">CSV</span><span class="meta">${a("pixel-finder.csv.meta")}</span>
                <span class="sub">${a("pixel-finder.csv.sub")}</span>
              </button>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${C(a("pixel-finder.sec.picks"))}
          <div class="sec-body">
            <div id="pf-list" class="pf-list"></div>
            <div class="file-row">
              <button class="btn" id="pf-clear-btn">${a("pixel-finder.clear")}</button>
            </div>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        ${X({prefix:"pf",cta:a("pixel-finder.cta"),hint:a("pixel-finder.hint"),accept:"image/*"})}
        <div class="dl" id="pf-dl-strip"></div>
        <div id="pf-stage" class="pf-stage" hidden>
          <div class="pf-canvas-wrap">
            <canvas id="pf-canvas" width="320" height="180"></canvas>
            <div id="pf-crosshair" class="pf-crosshair" style="display:none"></div>
          </div>
          <div id="pf-readout" class="pf-readout"></div>
        </div>
      </div>
    </main>

    <footer class="transport">
      <button class="btn ghost" id="pf-export-btn" disabled>${a("pixel-finder.export")} <span class="arrow">›</span></button>
      <div id="pf-info" class="img-info">${a("pixel-finder.info.empty")}</div>
      <span class="action-status hidden"></span>
    </footer>
  `}export{J as mountPixelFinder};
//# sourceMappingURL=app-BV2tyYUc.js.map
