import{t as o,s as ae,c as se}from"./index-DbChkwc3.js";import{configureTransformersEnv as oe,probeWebGPU as ne}from"./runtime-Jg5t-PhK.js";import{UPSCALE_MODELS as w}from"./models-OFmNMcf2.js";import{l as re}from"./upscaler--FcqI4c0.js";import{m as le}from"./model-status-CS7V2bNZ.js";import{B as ie}from"./batch-queue-DSO5kB6T.js";import{C as pe}from"./compare-slider-ClD46mW-.js";import"./transformers.web-Cyg6ssfE.js";import"./model-cache-CVSf8zme.js";import"./gpu-guard-C1llK9pG.js";import"./model-catalog-DAmf0QpZ.js";import"./fragments-kQZcphFF.js";function ce(i){i.innerHTML="",i.append(de());const e=f=>{const t=i.querySelector(f);if(!t)throw new Error(`missing element: ${f}`);return t};for(const f of i.querySelectorAll("section[data-collapsible]")){const t=f.querySelector(".sec-head");t&&t.addEventListener("click",()=>{f.toggleAttribute("data-collapsed")})}return{root:i,runtimePill:e("#pup-runtime-pill"),banner:e("#pup-banner"),dropzone:e("#pup-dropzone"),pickBtn:e("#pup-pick-btn"),fileInput:e("#pup-file-input"),fileLabel:e("#pup-file-label"),modelOpts:Array.from(i.querySelectorAll('[data-role="model-opt"]')),formatOpts:Array.from(i.querySelectorAll('[data-role="format-opt"]')),formatHint:e("#pup-format-hint"),processSection:e("#pup-process-section"),segmentViz:e("#pup-segment-viz"),tileSource:e("#pup-tile-source"),tileOutput:e("#pup-tile-output"),exportBtn:e("#pup-export-btn"),exportStatus:e("#pup-export-status"),imageInfo:e("#pup-info"),dlStrip:e("#pup-dl-strip"),statModel:e("#pup-stat-model"),statDim:e("#pup-stat-dim")}}function de(){const i=document.createDocumentFragment(),e=document.createElement("div");for(e.innerHTML=he();e.firstChild;)i.appendChild(e.firstChild);return i}function ue(){return'<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'}function F(i,e){return`
    <header class="sec-head">
      <span class="sec-label">${i}</span>
      <span class="sec-meta">${e??""}</span>
      ${ue()}
    </header>
  `}function O(i,e,f,t=""){return`
    <li class="step" data-step="${i}" data-status="pending">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="step-body">
        <div class="step-title">${e}</div>
        <div class="step-desc">${f}</div>
        <div class="step-note" data-role="step-note"></div>
        ${t}
      </div>
    </li>
  `}function me(){return`
    <div id="pup-segment-viz" class="step-viz" hidden>
      <div class="step-tiles">
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${o("photo-upscaler.tile.source")}</div>
          <canvas id="pup-tile-source" width="480" height="480"></canvas>
        </div>
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${o("photo-upscaler.tile.upscaled")}</div>
          <canvas id="pup-tile-output" width="480" height="480"></canvas>
        </div>
      </div>
    </div>
  `}function he(){const i=Object.values(w).map(e=>`
    <button class="opt" data-role="model-opt" data-id="${e.id}" aria-pressed="${e.id==="realworld-4x"}">
      <span class="dot"></span>
      <span class="label">${e.label}</span>
      <span class="meta">${e.weightsSize}</span>
      <span class="sub">${e.sublabel}</span>
    </button>
  `).join("");return`
    <div id="pup-banner" class="banner hidden">
      <button class="x" aria-label="${o("photo-upscaler.banner.dismiss")}">×</button>
      <div><b>${o("photo-upscaler.banner.webgpuHead")}</b></div>
      <div>${o("photo-upscaler.banner.fallback")}</div>
    </div>

    <header class="topbar">
      <div class="brand"><span class="brand-mark"></span>${o("photo-upscaler.brand")}<span class="tag">/ t·005</span></div>
      <div class="stat-row">
        <div class="stat"><span class="k">${o("photo-upscaler.stat.model")}</span><span class="v" id="pup-stat-model">—</span></div>
        <div class="stat"><span class="k">${o("photo-upscaler.stat.size")}</span><span class="v" id="pup-stat-dim">—</span></div>
        <div id="pup-runtime-pill" class="runtime-pill" data-device="probing">${o("photo-upscaler.runtime.probing")}</div>
      </div>
    </header>

    <main class="panel panel-split">

      <div class="panel-col panel-col-left">

      <section class="sec" data-collapsible>
        ${F(o("photo-upscaler.sec.model"),"3")}
        <div class="sec-body">
          <div class="opt-group">${i}</div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${F(o("photo-upscaler.sec.format"))}
        <div class="sec-body">
          <div class="opt-group">
            <button class="opt" data-role="format-opt" data-format="png" aria-pressed="true">
              <span class="dot"></span>
              <span class="label">PNG</span>
              <span class="meta">${o("photo-upscaler.fmt.lossless")}</span>
              <span class="sub">${o("photo-upscaler.fmt.png.sub")}</span>
            </button>
            <button class="opt" data-role="format-opt" data-format="webp" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">WebP</span>
              <span class="meta">${o("photo-upscaler.fmt.lossy")}</span>
              <span class="sub">${o("photo-upscaler.fmt.webp.sub")}</span>
            </button>
            <button class="opt" data-role="format-opt" data-format="jpeg" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">JPEG</span>
              <span class="meta">${o("photo-upscaler.fmt.lossy")}</span>
              <span class="sub">${o("photo-upscaler.fmt.jpeg.sub")}</span>
            </button>
          </div>
          <div id="pup-format-hint" class="format-hint"></div>
        </div>
      </section>

      </div><!-- /panel-col-left -->

      <div class="panel-col panel-col-right">

      <div id="pup-dropzone" class="intake-cta" data-active="false">
        <button class="cta-btn" id="pup-pick-btn">
          <svg viewBox="0 0 16 16" class="cta-icon" aria-hidden="true">
            <path d="M3 11v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2M8 2v8m0-8l-3 3m3-3l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${o("photo-upscaler.intake.cta")}
        </button>
        <input type="file" id="pup-file-input" accept="image/*" class="hidden" />
        <div class="intake-sub" id="pup-file-label">${o("photo-upscaler.intake.hint")}</div>
      </div>

      <div class="dl" id="pup-dl-strip"></div>

      <section id="pup-process-section" class="sec" data-collapsible hidden>
        ${F(o("photo-upscaler.sec.process"))}
        <div class="sec-body">
          <ol class="steps">
            ${O("load-model",o("photo-upscaler.step.load.title"),o("photo-upscaler.step.load.desc"))}
            ${O("inspect",o("photo-upscaler.step.inspect.title"),o("photo-upscaler.step.inspect.desc"))}
            ${O("segment",o("photo-upscaler.step.segment.title"),o("photo-upscaler.step.segment.desc"),me())}
            ${O("encode",o("photo-upscaler.step.encode.title"),o("photo-upscaler.step.encode.desc"))}
          </ol>
        </div>
      </section>

      </div><!-- /panel-col-right -->

    </main>

    <footer class="transport">
      <button class="btn ghost" id="pup-export-btn" disabled>${o("photo-upscaler.btn.upscale")} <span class="arrow">›</span></button>
      <div id="pup-info" class="img-info">${o("photo-upscaler.info.empty")}</div>
      <span id="pup-export-status" class="action-status hidden"></span>
    </footer>
  `}let _=null;function Be(i){if(_===i)return;_=i,oe();const e=ce(i),f=le(i,"swin2sr-realworld-4x"),t={runtime:{device:"wasm",adapterName:null,reason:"pending probe"},modelId:"realworld-4x",upscaler:null,loadingModel:!1,image:null,format:"png",processing:!1,cancelRequested:!1,lastUrl:null},j=e.tileSource.getContext("2d",{willReadFrequently:!1}),C=e.tileOutput.getContext("2d",{willReadFrequently:!1}),H=new pe({beforeLabel:o("photo-upscaler.tile.source"),afterLabel:o("photo-upscaler.tile.upscaled")}),b=document.createElement("div");b.className="cmp-host",b.id="pup-compare",b.hidden=!0,b.append(H.el),e.segmentViz.append(b);const M=new ie({tool:o("tool.photo-upscaler.name"),route:"photo-upscaler",zipPrefix:"upscale",accept:R,prepare:async()=>t.processing?(v(o("photo-upscaler.msg.batchBusy"),"error"),!1):(e.processSection.removeAttribute("hidden"),await z(),t.upscaler?(t.processing=!0,e.exportBtn.disabled=!0,!0):!1),process:X,onRunEnd:async({viaDock:a})=>{if(t.processing=!1,e.exportBtn.disabled=!t.image,a&&t.upscaler){try{await t.upscaler.dispose()}catch{}t.upscaler=null,e.statModel.textContent="—",l("load-model","pending")}}});M.el.id="pup-batch",e.dlStrip.after(M.el),e.fileInput.multiple=!0,(async()=>{const a=await ne();t.runtime=a,e.runtimePill.dataset.device=a.device,e.runtimePill.textContent=a.device==="webgpu"?`WebGPU · ${a.adapterName??o("photo-upscaler.runtime.ready")}`:o("photo-upscaler.runtime.cpuFallback"),a.device==="wasm"&&v(o("photo-upscaler.msg.noWebgpu",{reason:a.reason??o("photo-upscaler.msg.noAdapter")})),T(t.modelId)})(),e.banner.querySelector(".x")?.addEventListener("click",()=>{e.banner.classList.add("hidden")});for(const a of e.modelOpts)a.addEventListener("click",()=>{const s=a.dataset.id;!s||s===t.modelId||(t.modelId=s,f.setModel(`swin2sr-${s}`),T(s),l("load-model","pending"),t.upscaler&&(t.upscaler.dispose().catch(()=>{}),t.upscaler=null))});for(const a of e.formatOpts)a.addEventListener("click",()=>{const s=a.dataset.format;if(!(!s||s===t.format)){t.format=s;for(const n of e.formatOpts)n.setAttribute("aria-pressed",String(n===a))}});e.pickBtn.addEventListener("click",()=>e.fileInput.click()),e.fileInput.addEventListener("change",async()=>{const a=Array.from(e.fileInput.files??[]);e.fileInput.value="",await U(a)});const y=e.dropzone;["dragenter","dragover"].forEach(a=>{y.addEventListener(a,s=>{s.preventDefault(),y.dataset.active="true"})}),["dragleave","drop"].forEach(a=>{y.addEventListener(a,s=>{s.preventDefault(),y.dataset.active="false"})}),y.addEventListener("drop",async a=>{a.preventDefault(),await U(Array.from(a.dataTransfer?.files??[]))}),e.exportBtn.addEventListener("click",async()=>{if(!t.processing){if(!t.image){v(o("photo-upscaler.msg.noImage"),"error");return}await z(),t.upscaler&&await P()}});async function U(a){a.length>1?M.add(a):a[0]&&await Y(a[0])}async function X(a,s){const n=t.upscaler;if(!n)throw new Error("model not loaded");s.progress(null,o("photo-upscaler.status.decoding"));const p=await createImageBitmap(a);try{B(p.width,p.height),L(!0),b.hidden=!0,$(j,e.tileSource,p),$(C,e.tileOutput,null),s.progress(0,o("photo-upscaler.status.upscaling"));const r=await n.upscale(p,(I,W,S)=>{s.progress(I*.95,o("photo-upscaler.status.tile",{tile:W,total:S}))},s.signal);if(s.signal.aborted)throw new DOMException("cancelled","AbortError");B(r.width,r.height,e.tileOutput),$(C,e.tileOutput,r.bitmap),s.progress(.97,o("photo-upscaler.status.encoding"));const c=new OffscreenCanvas(r.width,r.height),h=c.getContext("2d");if(!h)throw new Error("OffscreenCanvas 2D unavailable");h.drawImage(r.bitmap,0,0),r.bitmap.close?.();const{mime:d,ext:u}=D(t.format),g=await c.convertToBlob({type:d,quality:t.format==="jpeg"?.95:t.format==="webp"?.92:void 0}),x=a.name.replace(/\.[^.]+$/,"")||"image";return{blob:g,filename:`${x}-x${n.model.scale}.${u}`,meta:`${(g.size/1024).toFixed(0)} KB · ${r.width}×${r.height}`}}finally{p.close?.()}}async function Y(a){if(M.running){v(o("photo-upscaler.msg.batchRunning"),"error");return}if(!R(a)){v(o("photo-upscaler.msg.rejected",{type:a.type||o("photo-upscaler.msg.unknown")}),"error");return}if(t.processing)return;t.image?.bitmap.close?.(),t.image=null,Z(),e.processSection.removeAttribute("hidden"),e.fileLabel.textContent=a.name,l("inspect","active");let s;try{s=await createImageBitmap(a)}catch(c){l("inspect","pending"),v(o("photo-upscaler.msg.decodeFailed",{msg:c.message}),"error");return}t.image={bitmap:s,name:a.name,width:s.width,height:s.height,bytes:a.size};const n=w[t.modelId],p=s.width*n.scale,r=s.height*n.scale;B(s.width,s.height),e.statDim.textContent=`${s.width}×${s.height} → ${p}×${r}`,e.imageInfo.textContent=`${a.name} · ${s.width}×${s.height} → ${p}×${r} · ${(a.size/1024).toFixed(0)} KB`,l("inspect","done",`${a.name} · ${s.width}×${s.height} (× ${n.scale} → ${p}×${r})`),L(!0),$(j,e.tileSource,s),$(C,e.tileOutput,null),await z(),t.upscaler&&await P()}async function z(){if(t.loadingModel)return;if(t.upscaler&&t.upscaler.model.id===t.modelId){l("load-model","done",`${w[t.modelId].label} · ${t.upscaler.device} · ${t.upscaler.dtype}`);return}t.loadingModel=!0;const a=w[t.modelId];if(l("load-model","active",`${a.label} · ${a.weightsSize}`),e.statModel.textContent=a.label,t.upscaler){try{await t.upscaler.dispose()}catch{}t.upscaler=null}try{t.upscaler=await re(t.modelId,t.runtime.device,({phase:s,progress:n})=>{l("load-model","active",`${s} · ${(n*100).toFixed(0)}%`)},()=>{const s=t.upscaler;l("load-model","done",`${a.label} · ${s?.device??"wasm"} · ${s?.dtype??"q8"} · ${o("photo-upscaler.note.gpuFallback")}`),e.runtimePill.dataset.device="wasm",e.runtimePill.textContent=o("photo-upscaler.runtime.gpuFallback")}),l("load-model","done",`${a.label} · ${t.upscaler.device} · ${t.upscaler.dtype}`)}catch(s){l("load-model","pending"),v(o("photo-upscaler.msg.modelFailed",{msg:s.message}),"error")}finally{t.loadingModel=!1}}async function P(){if(!t.image||!t.upscaler||t.processing)return;t.processing=!0,t.cancelRequested=!1;const a=new AbortController,s=ae({tool:o("tool.photo-upscaler.name"),route:"photo-upscaler",label:t.image.name||o("photo-upscaler.job.image"),detail:o("photo-upscaler.status.upscaling"),progress:null,onCancel:()=>{a.abort(),t.cancelRequested=!0}});e.exportBtn.disabled=!0,e.exportBtn.textContent=o("photo-upscaler.btn.upscaling"),e.exportStatus.classList.remove("hidden"),e.exportStatus.textContent=o("photo-upscaler.status.runningModel"),l("segment","active",o("photo-upscaler.status.runningModel")),l("encode","pending"),L(!0);let n=null,p=0,r="image/png",c="png";const h=performance.now();try{const m=await t.upscaler.upscale(t.image.bitmap,(J,Q,q)=>{if(q>1){const A=(J*100).toFixed(0);l("segment","active",o("photo-upscaler.status.upscalingTile",{tile:Q,total:q,pct:A})),e.exportStatus.textContent=o("photo-upscaler.status.upscalingPct",{pct:A}),s.update({progress:J,detail:o("photo-upscaler.status.tilePct",{tile:Q,total:q,pct:A})})}},a.signal),k=performance.now()-h;l("segment","done",`${m.width}×${m.height} · ${(k/1e3).toFixed(1)}s`),e.exportStatus.textContent=o("photo-upscaler.status.encoding"),l("encode","active",o("photo-upscaler.status.packaging",{fmt:t.format.toUpperCase()})),B(m.width,m.height,e.tileOutput),$(C,e.tileOutput,m.bitmap),H.setSources(t.image.bitmap,m.bitmap),b.hidden=!1;const K=new OffscreenCanvas(m.width,m.height),V=K.getContext("2d");if(!V)throw new Error("OffscreenCanvas 2D unavailable");V.drawImage(m.bitmap,0,0);const N=D(t.format);r=N.mime,c=N.ext;const G=await K.convertToBlob({type:r,quality:t.format==="jpeg"?.95:t.format==="webp"?.92:void 0});p=G.size,t.lastUrl&&URL.revokeObjectURL(t.lastUrl),n=URL.createObjectURL(G),t.lastUrl=n}catch(m){const k=m;k.name==="AbortError"?(s.markCancelled(),e.exportStatus.textContent=o("photo-upscaler.status.cancelled")):(v(o("photo-upscaler.msg.upscaleFailed",{msg:k.message}),"error"),s.fail(k.message)),l("segment","pending"),l("encode","pending");return}finally{if(t.processing=!1,e.exportBtn.disabled=!1,e.exportBtn.textContent=t.image?o("photo-upscaler.btn.again"):o("photo-upscaler.btn.go"),t.cancelRequested&&(t.cancelRequested=!1,t.upscaler)){try{await t.upscaler.dispose()}catch{}t.upscaler=null,e.statModel.textContent="—",l("load-model","pending")}}if(!n)return;const d=(p/1024).toFixed(1),u=w[t.modelId],g=t.image.width*u.scale,x=t.image.height*u.scale,I=`${t.format.toUpperCase()} · ×${u.scale}`;l("encode","done",`${d} KB · ${I}`),s.done(`${d} KB · ×${u.scale}`);const S=`upscale-${new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}-x${u.scale}.${c}`;se("photo-upscaler",n,S),ee(n,S),te({filename:S,url:n,sizeKB:d,width:g,height:x,flavour:I}),e.exportStatus.textContent=o("photo-upscaler.status.done",{size:d})}function $(a,s,n,p="#0b0b0c"){if(!a)return;const r=s.width,c=s.height;if(a.fillStyle=p,a.fillRect(0,0,r,c),!n)return;a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const h=n.width??n.naturalWidth??0,d=n.height??n.naturalHeight??0;if(!h||!d)return;const u=Math.min(r/h,c/d),g=h*u,x=d*u;a.drawImage(n,(r-g)/2,(c-x)/2,g,x)}function B(a,s,n){if(a<=0||s<=0)return;const p=720,r=Math.max(a,s),c=r>p?p/r:1,h=Math.max(1,Math.round(a*c)),d=Math.max(1,Math.round(s*c)),u=n?[n]:[e.tileSource,e.tileOutput];for(const g of u)g.width=h,g.height=d}function l(a,s,n){const p=i.querySelector(`[data-step="${a}"]`);if(!p)return;p.setAttribute("data-status",s);const r=p.querySelector('[data-role="step-note"]');r&&(r.textContent=n??"")}function Z(){l("load-model",t.upscaler?"done":"pending",t.upscaler?`${w[t.modelId].label} · ${t.upscaler.device}`:""),l("inspect","pending"),l("segment","pending"),l("encode","pending"),L(!1),b.hidden=!0,e.dlStrip.innerHTML="",e.exportBtn.disabled=!1}function L(a){a?e.segmentViz.removeAttribute("hidden"):e.segmentViz.setAttribute("hidden","")}function T(a){for(const s of e.modelOpts)s.setAttribute("aria-pressed",String(s.dataset.id===a));e.statModel.textContent=w[a].label}function v(a,s="info"){e.banner.classList.remove("hidden"),e.banner.classList.toggle("error",s==="error");const n=s==="error"?o("photo-upscaler.banner.errorHead"):o("photo-upscaler.banner.webgpuHead");e.banner.innerHTML=`<button class="x" aria-label="${o("photo-upscaler.banner.dismiss")}">×</button><div><b>${n}</b></div><div>${E(a)}</div>`,e.banner.querySelector(".x")?.addEventListener("click",()=>e.banner.classList.add("hidden"))}function E(a){return a.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s])}function R(a){return a.type.startsWith("image/")}function D(a){return a==="jpeg"?{mime:"image/jpeg",ext:"jpg"}:a==="webp"?{mime:"image/webp",ext:"webp"}:{mime:"image/png",ext:"png"}}function ee(a,s){const n=document.createElement("a");n.href=a,n.download=s,n.rel="noopener",n.style.display="none",document.body.appendChild(n),n.click(),n.remove()}function te(a){e.dlStrip.innerHTML="";const s=document.createElement("div");s.className="dl-toast",s.innerHTML=`
      <span class="dl-toast-mark" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="dl-toast-body">
        <div class="dl-toast-head">${o("photo-upscaler.toast.head")}</div>
        <div class="dl-toast-name"></div>
        <div class="dl-toast-meta">${E(a.sizeKB)} KB · ${a.width}×${a.height} · ${E(a.flavour)}</div>
      </div>
      <a class="dl-toast-link" href="${a.url}" download="${E(a.filename)}">${o("photo-upscaler.toast.again")}</a>
    `,s.querySelector(".dl-toast-name").textContent=a.filename,e.dlStrip.append(s)}e.exportBtn.disabled=!0}export{Be as mountPhotoUpscaler};
//# sourceMappingURL=app-DodoHv4g.js.map
