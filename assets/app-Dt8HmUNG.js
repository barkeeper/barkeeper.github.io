import{t as n,p as Z}from"./index-DbChkwc3.js";import{w as _,s as E,b as tt,r as et,t as at,a as T,i as st}from"./fragments-kQZcphFF.js";let q=null;function rt(w){if(q===w)return;q=w,w.innerHTML=nt();const i=e=>w.querySelector(e),x=i("#ib-banner"),F=i("#ib-dropzone"),P=i("#ib-pick-btn"),k=i("#ib-file-input"),j=i("#ib-file-label"),A=i("#ib-cols-slider"),Q=i("#ib-cols-value"),D=i("#ib-gap-slider"),V=i("#ib-gap-value"),I=i("#ib-width-input"),M=i("#ib-bg-picker"),C=Array.from(w.querySelectorAll('[data-role="bg-swatch"]')),$=i("#ib-preview"),O=i("#ib-thumbs"),X=i("#ib-stage"),U=i("#ib-export-btn"),H=i("#ib-export-status"),R=i("#ib-info"),Y=i("#ib-dl-strip"),B=i("#ib-stat-count"),G=i("#ib-stat-out"),t={items:[],cols:3,gap:12,bg:"#0b0b0c",outWidth:1600,lastUrl:null};for(const e of w.querySelectorAll("section[data-collapsible]"))e.querySelector(".sec-head")?.addEventListener("click",()=>e.toggleAttribute("data-collapsed"));x.querySelector(".x")?.addEventListener("click",()=>x.classList.add("hidden")),A.addEventListener("input",()=>{t.cols=Number(A.value),Q.textContent=String(t.cols),v()}),D.addEventListener("input",()=>{t.gap=Number(D.value),V.textContent=`${t.gap}px`,v()}),I.addEventListener("input",()=>{const e=Math.max(200,Math.min(8e3,Number(I.value)||1600));t.outWidth=e,v()}),M.addEventListener("input",()=>{t.bg=M.value;for(const e of C)e.setAttribute("aria-pressed","false");v()});for(const e of C)e.addEventListener("click",()=>{const s=e.dataset.color??"#0b0b0c";t.bg=s,M.value=s;for(const a of C)a.setAttribute("aria-pressed",String(a===e));v()});P.addEventListener("click",()=>k.click()),k.addEventListener("change",async()=>{const e=Array.from(k.files??[]);await N(e),k.value=""}),_(F,()=>{},{multiple:!0,onAll:e=>void N(e)}),U.addEventListener("click",()=>{if(!t.items.length){E(x,n("image-board.err.none"),"error");return}J()});async function N(e){const s=e.filter(a=>a.type.startsWith("image/"));if(s.length===0){e.length>0&&E(x,n("image-board.err.noImages"),"error");return}for(const a of s)try{const c=await createImageBitmap(a);t.items.push({bitmap:c,name:a.name,id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`})}catch(c){E(x,n("image-board.err.decode",{name:a.name,msg:c.message}),"error")}j.textContent=n("image-board.loaded",{n:t.items.length}),B.textContent=String(t.items.length),X.removeAttribute("hidden"),U.disabled=!1,R.textContent=n("image-board.info",{n:t.items.length,cols:t.cols,gap:t.gap}),W(),v()}function W(){O.innerHTML="",t.items.forEach((e,s)=>{const a=document.createElement("div");a.className="ib-thumb",a.draggable=!0,a.dataset.idx=String(s);const c=document.createElement("canvas");c.width=64,c.height=64;const l=c.getContext("2d");if(l){l.fillStyle="#0b0b0c",l.fillRect(0,0,64,64);const o=Math.min(64/e.bitmap.width,64/e.bitmap.height),d=e.bitmap.width*o,b=e.bitmap.height*o;l.drawImage(e.bitmap,(64-d)/2,(64-b)/2,d,b)}const m=document.createElement("button");m.className="ib-thumb-del",m.textContent="×",m.addEventListener("click",o=>{o.stopPropagation(),t.items.splice(s,1),B.textContent=String(t.items.length),W(),v()}),a.append(c,m),a.addEventListener("dragstart",o=>{o.dataTransfer?.setData("text/plain",String(s))}),a.addEventListener("dragover",o=>o.preventDefault()),a.addEventListener("drop",o=>{o.preventDefault();const d=Number(o.dataTransfer?.getData("text/plain")??-1);if(d<0||d===s)return;const[b]=t.items.splice(d,1);t.items.splice(s,0,b),W(),v()}),O.append(a)})}function v(){if(t.items.length===0)return;const e=Math.max(1,t.cols),s=t.gap,a=t.outWidth,c=Math.floor((a-s*(e+1))/e),l=[];for(let p=0;p<t.items.length;p+=e)l.push(t.items.slice(p,p+e));const m=l.map(p=>{const h=p.map(r=>Math.round(c*(r.bitmap.height/r.bitmap.width)));return Math.max(...h)}),o=m.reduce((p,h)=>p+h,0)+s*(l.length+1);G.textContent=`${a}×${o}`,R.textContent=n("image-board.info.out",{n:t.items.length,cols:e,gap:s,w:a,h:o});const d=Math.min(a,1200),b=Math.round(o*(d/a));$.width=d,$.height=b;const f=$.getContext("2d");if(!f)return;f.fillStyle=t.bg,f.fillRect(0,0,d,b),f.imageSmoothingEnabled=!0,f.imageSmoothingQuality="high";const u=d/a;let y=s*u;for(let p=0;p<l.length;p++){let h=s*u;const r=m[p];for(const g of l[p]){const S=Math.round(c*(g.bitmap.height/g.bitmap.width)),L=Math.round((r-S)/2);f.drawImage(g.bitmap,h,y+L*u,c*u,S*u),h+=(c+s)*u}y+=(r+s)*u}}async function J(){H.classList.remove("hidden"),H.textContent=n("image-board.rendering");const e=Math.max(1,t.cols),s=t.gap,a=t.outWidth,c=Math.floor((a-s*(e+1))/e),l=[];for(let r=0;r<t.items.length;r+=e)l.push(t.items.slice(r,r+e));const m=l.map(r=>Math.max(...r.map(g=>Math.round(c*(g.bitmap.height/g.bitmap.width))))),o=m.reduce((r,g)=>r+g,0)+s*(l.length+1),d=new OffscreenCanvas(a,o),b=d.getContext("2d");if(!b){E(x,n("image-board.err.noOffscreen"),"error");return}b.fillStyle=t.bg,b.fillRect(0,0,a,o),b.imageSmoothingEnabled=!0,b.imageSmoothingQuality="high";let f=s;for(let r=0;r<l.length;r++){let g=s;const S=m[r];for(const L of l[r]){const z=Math.round(c*(L.bitmap.height/L.bitmap.width)),K=Math.round((S-z)/2);b.drawImage(L.bitmap,g,f+K,c,z),g+=c+s}f+=S+s}const u=await d.convertToBlob({type:"image/png"});t.lastUrl&&URL.revokeObjectURL(t.lastUrl);const y=URL.createObjectURL(u);t.lastUrl=y;const h=`board-${new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}.png`;Z("image-board",u,h),tt(y,h),et(Y,{filename:h,url:y,meta:`${(u.size/1024/1024).toFixed(2)} MB · ${a}×${o} · PNG`}),H.textContent=n("image-board.done",{size:(u.size/1024/1024).toFixed(2)})}}function nt(){return`
    ${at({name:n("tool.image-board.name").toUpperCase(),code:"t·010",prefix:"ib",withRuntime:!1,stats:[{k:n("image-board.stat.images"),id:"stat-count"},{k:n("image-board.stat.output"),id:"stat-out"}]})}

    <main class="panel panel-split">
      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${T(n("image-board.sec.layout"))}
          <div class="sec-body">
            <div class="row-inline">
              <span class="row-label">${n("image-board.cols")}</span>
              <input type="range" id="ib-cols-slider" min="1" max="8" step="1" value="3" />
              <span id="ib-cols-value" class="row-value">3</span>
            </div>
            <div class="row-inline">
              <span class="row-label">${n("image-board.gap")}</span>
              <input type="range" id="ib-gap-slider" min="0" max="64" step="2" value="12" />
              <span id="ib-gap-value" class="row-value">12px</span>
            </div>
            <div class="row-inline">
              <span class="row-label">${n("image-board.width")}</span>
              <input type="number" id="ib-width-input" class="tx-select" value="1600" min="200" max="8000" step="50" style="text-align:right; padding-right: 12px;" />
              <span class="row-value">px</span>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${T(n("image-board.sec.bg"))}
          <div class="sec-body">
            <div class="color-row">
              <button class="swatch" data-role="bg-swatch" data-color="#0b0b0c" style="background:#0b0b0c" aria-pressed="true"></button>
              <button class="swatch" data-role="bg-swatch" data-color="#ffffff" style="background:#ffffff"></button>
              <button class="swatch" data-role="bg-swatch" data-color="#1a1c17" style="background:#1a1c17"></button>
              <button class="swatch" data-role="bg-swatch" data-color="#f5f4ef" style="background:#f5f4ef"></button>
              <button class="swatch" data-role="bg-swatch" data-color="#9eff3d" style="background:#9eff3d"></button>
              <button class="swatch" data-role="bg-swatch" data-color="#2d5fa3" style="background:#2d5fa3"></button>
              <input type="color" id="ib-bg-picker" value="#0b0b0c" />
            </div>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        ${st({prefix:"ib",cta:n("image-board.cta"),hint:n("image-board.hint"),accept:"image/*",multiple:!0})}
        <div class="dl" id="ib-dl-strip"></div>
        <div id="ib-stage" class="ib-stage" hidden>
          <div id="ib-thumbs" class="ib-thumbs"></div>
          <div class="ib-preview-wrap">
            <canvas id="ib-preview"></canvas>
          </div>
        </div>
      </div>
    </main>

    <footer class="transport">
      <button class="btn ghost" id="ib-export-btn" disabled>${n("image-board.export")} <span class="arrow">›</span></button>
      <div id="ib-info" class="img-info">${n("image-board.info.empty")}</div>
      <span id="ib-export-status" class="action-status hidden"></span>
    </footer>
  `}export{rt as mountImageBoard};
//# sourceMappingURL=app-Dt8HmUNG.js.map
