import{t as n,s as _,c as ee}from"./index-DbChkwc3.js";import{configureTransformersEnv as te,probeWebGPU as ae}from"./runtime-Jg5t-PhK.js";import{M as w,C as ne,l as se}from"./compositor-BcMJOgNj.js";import{m as re}from"./model-status-CS7V2bNZ.js";import{B as ie}from"./batch-queue-DSO5kB6T.js";import{C as oe}from"./compare-slider-ClD46mW-.js";import"./transformers.web-Cyg6ssfE.js";import"./gpu-lock-CVLNUbDT.js";import"./gpu-guard-C1llK9pG.js";import"./model-cache-CVSf8zme.js";import"./model-catalog-DAmf0QpZ.js";import"./fragments-kQZcphFF.js";function le(i){i.innerHTML="",i.append(de());const e=u=>{const t=i.querySelector(u);if(!t)throw new Error(`missing element: ${u}`);return t};for(const u of i.querySelectorAll("section[data-collapsible]")){const t=u.querySelector(".sec-head");t&&t.addEventListener("click",()=>{u.toggleAttribute("data-collapsed")})}return{root:i,runtimePill:e("#img-runtime-pill"),banner:e("#img-banner"),dropzone:e("#img-dropzone"),pickBtn:e("#img-pick-btn"),fileInput:e("#img-file-input"),fileLabel:e("#img-file-label"),modelOpts:Array.from(i.querySelectorAll('[data-role="model-opt"]')),bgOpts:Array.from(i.querySelectorAll('[data-role="bg-opt"]')),swatches:Array.from(i.querySelectorAll('[data-role="swatch"]')),colorPicker:e("#img-color-picker"),bgImageBtn:e("#img-bg-image-btn"),bgImageInput:e("#img-bg-image-input"),blurSlider:e("#img-blur-slider"),blurValue:e("#img-blur-value"),formatOpts:Array.from(i.querySelectorAll('[data-role="format-opt"]')),formatHint:e("#img-format-hint"),processSection:e("#img-process-section"),segmentViz:e("#img-segment-viz"),tileSource:e("#img-tile-source"),tileOutput:e("#img-tile-output"),exportBtn:e("#img-export-btn"),exportStatus:e("#img-export-status"),imageInfo:e("#img-info"),dlStrip:e("#img-dl-strip"),statModel:e("#img-stat-model"),statDim:e("#img-stat-dim")}}function de(){const i=document.createDocumentFragment(),e=document.createElement("div");for(e.innerHTML=ge();e.firstChild;)i.appendChild(e.firstChild);return i}function ce(){return'<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'}function E(i,e){return`
    <header class="sec-head">
      <span class="sec-label">${i}</span>
      <span class="sec-meta">${e??""}</span>
      ${ce()}
    </header>
  `}function A(i,e,u,t=""){return`
    <li class="step" data-step="${i}" data-status="pending">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="step-body">
        <div class="step-title">${e}</div>
        <div class="step-desc">${u}</div>
        <div class="step-note" data-role="step-note"></div>
        ${t}
      </div>
    </li>
  `}function me(){return`
    <div id="img-segment-viz" class="step-viz" hidden>
      <div class="step-tiles">
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${n("image-bgremove.tile.source")}</div>
          <canvas id="img-tile-source" width="480" height="480"></canvas>
        </div>
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${n("image-bgremove.tile.output")}</div>
          <canvas id="img-tile-output" width="480" height="480"></canvas>
        </div>
      </div>
    </div>
  `}function ge(){const i=Object.values(w).map(e=>`
    <button class="opt" data-role="model-opt" data-id="${e.id}" aria-pressed="${e.id==="ben2"}">
      <span class="dot"></span>
      <span class="label">${e.label}</span>
      <span class="meta">${e.weightsSize}</span>
      <span class="sub">${e.sublabel}${e.portraitOnly?n("image-bgremove.model.portraitOnly"):""}</span>
    </button>
  `).join("");return`
    <div id="img-banner" class="banner hidden">
      <button class="x" aria-label="${n("image-bgremove.banner.dismiss")}">×</button>
      <div><b>${n("image-bgremove.banner.webgpuHead")}</b></div>
      <div>${n("image-bgremove.banner.webgpuMsg")}</div>
    </div>

    <header class="topbar">
      <div class="brand"><span class="brand-mark"></span>${n("image-bgremove.brand")}<span class="tag">/ t·002</span></div>
      <div class="stat-row">
        <div class="stat"><span class="k">${n("image-bgremove.stat.model")}</span><span class="v" id="img-stat-model">—</span></div>
        <div class="stat"><span class="k">${n("image-bgremove.stat.size")}</span><span class="v" id="img-stat-dim">—</span></div>
        <div id="img-runtime-pill" class="runtime-pill" data-device="probing">${n("image-bgremove.runtime.probing")}</div>
      </div>
    </header>

    <main class="panel panel-split">

      <div class="panel-col panel-col-left">

      <section class="sec" data-collapsible>
        ${E(n("image-bgremove.sec.model"),"2")}
        <div class="sec-body">
          <div class="opt-group">${i}</div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${E(n("image-bgremove.sec.background"))}
        <div class="sec-body">
          <div class="opt-group">
            <button class="opt" data-role="bg-opt" data-kind="transparent" aria-pressed="true">
              <span class="dot"></span>
              <span class="label">${n("image-bgremove.bg.transparent")}</span>
              <span class="meta">${n("image-bgremove.bg.transparentMeta")}</span>
              <span class="sub">${n("image-bgremove.bg.transparentSub")}</span>
            </button>
            <button class="opt" data-role="bg-opt" data-kind="color" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">${n("image-bgremove.bg.solid")}</span>
              <span class="meta">${n("image-bgremove.bg.solidMeta")}</span>
            </button>
            <button class="opt" data-role="bg-opt" data-kind="blur" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">${n("image-bgremove.bg.blur")}</span>
              <span class="meta">${n("image-bgremove.bg.blurMeta")}</span>
            </button>
            <button class="opt" data-role="bg-opt" data-kind="image" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">${n("image-bgremove.bg.image")}</span>
              <span class="meta">${n("image-bgremove.bg.imageMeta")}</span>
            </button>
          </div>

          <div data-role="bg-config" data-for="color" class="hidden">
            <div class="color-row">
              <button class="swatch" data-role="swatch" data-color="#0b0b0c" style="background:#0b0b0c" aria-pressed="true"></button>
              <button class="swatch" data-role="swatch" data-color="#ffffff" style="background:#ffffff"></button>
              <button class="swatch" data-role="swatch" data-color="#9eff3d" style="background:#9eff3d"></button>
              <button class="swatch" data-role="swatch" data-color="#ff5252" style="background:#ff5252"></button>
              <button class="swatch" data-role="swatch" data-color="#1a3d2e" style="background:#1a3d2e"></button>
              <button class="swatch" data-role="swatch" data-color="#2d5fa3" style="background:#2d5fa3"></button>
              <input type="color" id="img-color-picker" value="#0b0b0c" />
            </div>
          </div>

          <div data-role="bg-config" data-for="blur" class="hidden">
            <div class="row-inline">
              <span class="row-label">${n("image-bgremove.bg.radius")}</span>
              <input type="range" id="img-blur-slider" min="0" max="40" step="1" value="18" />
              <span id="img-blur-value" class="row-value">18px</span>
            </div>
          </div>

          <div data-role="bg-config" data-for="image" class="hidden">
            <div class="file-row">
              <button class="btn" id="img-bg-image-btn">${n("image-bgremove.bg.chooseImage")}</button>
              <input type="file" id="img-bg-image-input" accept="image/*" class="hidden" />
            </div>
          </div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${E(n("image-bgremove.sec.format"))}
        <div class="sec-body">
          <div class="opt-group">
            <button class="opt" data-role="format-opt" data-format="png" aria-pressed="true">
              <span class="dot"></span>
              <span class="label">PNG</span>
              <span class="meta">${n("image-bgremove.format.pngMeta")}</span>
              <span class="sub">${n("image-bgremove.format.pngSub")}</span>
            </button>
            <button class="opt" data-role="format-opt" data-format="webp" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">WebP</span>
              <span class="meta">${n("image-bgremove.format.webpMeta")}</span>
              <span class="sub">${n("image-bgremove.format.webpSub")}</span>
            </button>
            <button class="opt" data-role="format-opt" data-format="jpeg" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">JPEG</span>
              <span class="meta">${n("image-bgremove.format.jpegMeta")}</span>
              <span class="sub">${n("image-bgremove.format.jpegSub")}</span>
            </button>
          </div>
          <div id="img-format-hint" class="format-hint"></div>
        </div>
      </section>

      </div><!-- /panel-col-left -->

      <div class="panel-col panel-col-right">

      <div id="img-dropzone" class="intake-cta" data-active="false">
        <button class="cta-btn" id="img-pick-btn">
          <svg viewBox="0 0 16 16" class="cta-icon" aria-hidden="true">
            <path d="M3 11v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2M8 2v8m0-8l-3 3m3-3l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${n("image-bgremove.intake.open")}
        </button>
        <input type="file" id="img-file-input" accept="image/*" class="hidden" />
        <div class="intake-sub" id="img-file-label">${n("image-bgremove.intake.sub")}</div>
      </div>

      <div class="dl" id="img-dl-strip"></div>

      <section id="img-process-section" class="sec" data-collapsible hidden>
        ${E(n("image-bgremove.sec.process"))}
        <div class="sec-body">
          <ol class="steps">
            ${A("load-model",n("image-bgremove.step.loadModel"),n("image-bgremove.step.loadModelDesc"))}
            ${A("inspect",n("image-bgremove.step.inspect"),n("image-bgremove.step.inspectDesc"))}
            ${A("segment",n("image-bgremove.step.segment"),n("image-bgremove.step.segmentDesc"),me())}
            ${A("encode",n("image-bgremove.step.encode"),n("image-bgremove.step.encodeDesc"))}
          </ol>
        </div>
      </section>

      </div><!-- /panel-col-right -->

    </main>

    <footer class="transport">
      <button class="btn ghost" id="img-export-btn" disabled>${n("image-bgremove.action.process")} <span class="arrow">›</span></button>
      <div id="img-info" class="img-info">${n("image-bgremove.info.empty")}</div>
      <span id="img-export-status" class="action-status hidden"></span>
    </footer>

  `}const W=new WeakSet;function Ie(i){if(W.has(i))return;W.add(i),te();const e=le(i),u=re(i,"ben2"),t={runtime:{device:"wasm",adapterName:null,reason:"pending probe"},modelId:"ben2",segmenter:null,loadingModel:!1,image:null,background:{kind:"transparent"},bgImage:null,format:"png",processing:!1,cancelRequested:!1,fileName:"",lastUrl:null},p=new ne,j=e.tileSource.getContext("2d",{willReadFrequently:!1}),C=e.tileOutput.getContext("2d",{willReadFrequently:!1}),z=new oe({beforeLabel:n("image-bgremove.compare.before"),afterLabel:n("image-bgremove.compare.after")}),f=document.createElement("div");f.className="cmp-host",f.id="img-compare",f.hidden=!0,f.append(z.el),e.segmentViz.append(f);const M=new ie({tool:n("tool.image-bgremove.name"),route:"image-bgremove",zipPrefix:"bgremove",accept:T,prepare:async()=>t.processing?(b(n("image-bgremove.err.batchWait"),"error"),!1):(e.processSection.removeAttribute("hidden"),await O(),t.segmenter?(t.processing=!0,e.exportBtn.disabled=!0,!0):!1),process:K,onRunEnd:async({viaDock:a})=>{if(t.processing=!1,e.exportBtn.disabled=!t.image,a&&t.segmenter){try{await t.segmenter.dispose()}catch{}t.segmenter=null,e.statModel.textContent="—",l("load-model","pending")}}});M.el.id="img-batch",e.dlStrip.after(M.el),e.fileInput.multiple=!0,(async()=>{const a=await ae();t.runtime=a,e.runtimePill.dataset.device=a.device,e.runtimePill.textContent=a.device==="webgpu"?`WebGPU · ${a.adapterName??n("image-bgremove.runtime.ready")}`:n("image-bgremove.runtime.wasm"),a.device==="wasm"&&b(n("image-bgremove.runtime.wasmBanner",{reason:a.reason??n("image-bgremove.runtime.noAdapter")})),D(t.modelId)})(),e.banner.querySelector(".x")?.addEventListener("click",()=>{e.banner.classList.add("hidden")});for(const a of e.modelOpts)a.addEventListener("click",()=>{const s=a.dataset.id;!s||s===t.modelId||(t.modelId=s,u.setModel(s),D(s),l("load-model","pending"))});for(const a of e.bgOpts)a.addEventListener("click",()=>{const s=a.dataset.kind;if(s){for(const r of e.bgOpts)r.setAttribute("aria-pressed",String(r===a));for(const r of i.querySelectorAll('[data-role="bg-config"]'))r.classList.toggle("hidden",r.dataset.for!==s);s==="transparent"?t.background={kind:"transparent"}:s==="color"?t.background={kind:"color",color:X()}:s==="blur"?t.background={kind:"blur",pixels:Number(e.blurSlider.value)}:s==="image"&&t.bgImage?t.background={kind:"image",image:t.bgImage}:s==="image"&&(t.background={kind:"color",color:"#0b0b0c"}),q()}});for(const a of e.swatches)a.addEventListener("click",()=>{const s=a.dataset.color??"#000000";for(const r of e.swatches)r.setAttribute("aria-pressed",String(r===a));e.colorPicker.value=s,t.background.kind==="color"&&(t.background={kind:"color",color:s})});e.colorPicker.addEventListener("input",()=>{const a=e.colorPicker.value;for(const s of e.swatches)s.setAttribute("aria-pressed","false");t.background.kind==="color"&&(t.background={kind:"color",color:a})}),e.blurSlider.addEventListener("input",()=>{const a=Number(e.blurSlider.value);e.blurValue.textContent=`${a}px`,t.background.kind==="blur"&&(t.background={kind:"blur",pixels:a})});for(const a of e.formatOpts)a.addEventListener("click",()=>{const s=a.dataset.format;if(!(!s||s===t.format)){t.format=s;for(const r of e.formatOpts)r.setAttribute("aria-pressed",String(r===a));q()}});e.bgImageBtn.addEventListener("click",()=>e.bgImageInput.click()),e.bgImageInput.addEventListener("change",async()=>{const a=e.bgImageInput.files?.[0];if(a){if(!a.type.startsWith("image/")){b(n("image-bgremove.err.bgImageRejected",{type:a.type||n("image-bgremove.err.unknownType")}),"error");return}t.bgImage&&t.bgImage.close?.(),t.bgImage=await createImageBitmap(a),t.background={kind:"image",image:t.bgImage},e.bgImageBtn.textContent=a.name}}),e.pickBtn.addEventListener("click",()=>e.fileInput.click()),e.fileInput.addEventListener("change",async()=>{const a=Array.from(e.fileInput.files??[]);e.fileInput.value="",await H(a)});const x=e.dropzone;["dragenter","dragover"].forEach(a=>{x.addEventListener(a,s=>{s.preventDefault(),x.dataset.active="true"})}),["dragleave","drop"].forEach(a=>{x.addEventListener(a,s=>{s.preventDefault(),x.dataset.active="false"})}),x.addEventListener("drop",async a=>{a.preventDefault(),await H(Array.from(a.dataTransfer?.files??[]))}),e.exportBtn.addEventListener("click",async()=>{if(!t.processing){if(!t.image){b(n("image-bgremove.err.loadImageFirst"),"error");return}await O(),t.segmenter&&await P()}});async function H(a){a.length>1?M.add(a):a[0]&&await V(a[0])}async function K(a,s){const r=t.segmenter;if(!r)throw new Error("model not loaded");s.progress(null,n("image-bgremove.status.decoding"));const o=await createImageBitmap(a);try{F(o.width,o.height),B(!0),f.hidden=!0,$(j,e.tileSource,o),$(C,e.tileOutput,null),s.progress(null,n("image-bgremove.status.segmenting"));const d=await r.segment(o);if(s.signal.aborted)throw new DOMException("cancelled","AbortError");s.progress(.8,n("image-bgremove.status.compositing"));const m=t.background.kind==="transparent"&&t.format==="jpeg"?{kind:"color",color:"#ffffff"}:t.background;p.resize(o.width,o.height),p.render(o,d.bitmap,m),d.bitmap.close?.(),$(C,e.tileOutput,p.outCanvas);const{mime:c,ext:g}=R(t.format),y=await new Promise((k,h)=>{p.outCanvas.toBlob(I=>I?k(I):h(new Error(`toBlob returned null for ${c}`)),c,t.format==="jpeg"?.95:t.format==="webp"?.92:void 0)}),S=a.name.replace(/\.[^.]+$/,"")||"image",v=(t.format==="png"||t.format==="webp")&&t.background.kind==="transparent";return{blob:y,filename:`${S}-bgremove${v?"-alpha":""}.${g}`,meta:`${(y.size/1024).toFixed(0)} KB · ${o.width}×${o.height}`}}finally{o.close?.()}}async function V(a){if(M.running){b(n("image-bgremove.err.batchRunning"),"error");return}if(!T(a)){b(n("image-bgremove.err.rejectedFile",{type:a.type||n("image-bgremove.err.unknownType")}),"error");return}if(t.processing)return;t.image?.bitmap.close?.(),t.image=null,Q(),e.processSection.removeAttribute("hidden"),e.fileLabel.textContent=a.name,t.fileName=a.name,l("inspect","active");let s;try{s=await createImageBitmap(a)}catch(r){l("inspect","pending"),b(n("image-bgremove.err.decode",{msg:r.message}),"error");return}t.image={bitmap:s,name:a.name,width:s.width,height:s.height,bytes:a.size},p.resize(s.width,s.height),F(s.width,s.height),e.statDim.textContent=`${s.width}×${s.height}`,e.imageInfo.textContent=`${a.name} · ${s.width}×${s.height} · ${(a.size/1024).toFixed(0)} KB`,l("inspect","done",`${a.name} · ${s.width}×${s.height} · ${(a.size/1024).toFixed(0)} KB`),B(!0),$(j,e.tileSource,s),$(C,e.tileOutput,null),await O(),t.segmenter&&await P()}async function O(){if(!t.loadingModel){if(t.segmenter&&t.segmenter.model.id===t.modelId){l("load-model","done",`${w[t.modelId].label} · ${t.segmenter.device}`);return}if(t.loadingModel=!0,l("load-model","active",`${w[t.modelId].label} · ${w[t.modelId].weightsSize}`),e.statModel.textContent=w[t.modelId].label,t.segmenter){try{await t.segmenter.dispose()}catch{}t.segmenter=null}try{t.segmenter=await se(t.modelId,t.runtime.device,({phase:a,progress:s})=>{l("load-model","active",`${a} · ${(s*100).toFixed(0)}%`)}),l("load-model","done",`${w[t.modelId].label} · ${t.segmenter.device}`)}catch(a){l("load-model","pending"),b(n("image-bgremove.err.modelLoad",{msg:a.message}),"error")}finally{t.loadingModel=!1}}}async function P(){if(!t.image||!t.segmenter||t.processing)return;t.processing=!0,t.cancelRequested=!1;const a=_({tool:n("tool.image-bgremove.name"),route:"image-bgremove",label:t.fileName||n("image-bgremove.job.label"),detail:n("image-bgremove.status.segmenting"),progress:null,onCancel:()=>{t.cancelRequested=!0}});e.exportBtn.disabled=!0,e.exportBtn.textContent=n("image-bgremove.action.working"),e.exportStatus.classList.remove("hidden"),e.exportStatus.textContent=n("image-bgremove.status.segmenting"),l("segment","active",n("image-bgremove.status.runningModel")),l("encode","pending"),B(!0);let s=null,r=0,o="image/png",d="png",m=!1;try{const k=await t.segmenter.segment(t.image.bitmap);if(t.cancelRequested)throw new DOMException("cancelled","AbortError");l("segment","done",`${k.width}×${k.height}`),e.exportStatus.textContent=n("image-bgremove.status.compositing"),a.update({detail:n("image-bgremove.status.compositing")}),l("encode","active",n("image-bgremove.status.packaging",{format:t.format.toUpperCase()}));const h=t.background.kind==="transparent"&&t.format==="jpeg"?{kind:"color",color:"#ffffff"}:t.background;p.resize(t.image.width,t.image.height),p.render(t.image.bitmap,k.bitmap,h),$(C,e.tileOutput,p.outCanvas),z.el.querySelector(".cmp-after")?.classList.toggle("cmp-checker",h.kind==="transparent"),z.setSources(t.image.bitmap,p.outCanvas),f.hidden=!1;const I=R(t.format);o=I.mime,d=I.ext,m=(t.format==="png"||t.format==="webp")&&t.background.kind==="transparent";const U=await new Promise((Y,Z)=>{p.outCanvas.toBlob(N=>N?Y(N):Z(new Error(`toBlob returned null for ${o}`)),o,t.format==="jpeg"?.95:t.format==="webp"?.92:void 0)});r=U.size,t.lastUrl&&URL.revokeObjectURL(t.lastUrl),s=URL.createObjectURL(U),t.lastUrl=s}catch(k){const h=k;h.name==="AbortError"?a.markCancelled():(b(n("image-bgremove.err.processFailed",{msg:h.message}),"error"),a.fail(h.message)),l("segment","pending"),l("encode","pending");return}finally{if(t.processing=!1,e.exportBtn.disabled=!1,e.exportBtn.textContent=t.image?n("image-bgremove.action.processAgain"):n("image-bgremove.action.processArrow"),t.cancelRequested&&(t.cancelRequested=!1,t.segmenter)){try{await t.segmenter.dispose()}catch{}t.segmenter=null,e.statModel.textContent="—",l("load-model","pending")}}if(!s)return;a.done(`${(r/1024).toFixed(0)} KB`);const c=(r/1024).toFixed(0),g=`${t.format.toUpperCase()}${m?n("image-bgremove.flavour.alpha"):""}`;l("encode","done",`${c} KB · ${g}`);const v=`bgremove-${new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}${m?"-alpha":""}.${d}`;e.exportStatus.textContent=n("image-bgremove.status.done",{size:c}),ee("image-bgremove",s,v),G(s,v),J({filename:v,url:s,sizeKB:c,width:t.image.width,height:t.image.height,flavour:g})}function G(a,s){const r=document.createElement("a");r.href=a,r.download=s,r.rel="noopener",r.style.display="none",document.body.appendChild(r),r.click(),r.remove()}function J(a){e.dlStrip.innerHTML="";const s=document.createElement("div");s.className="dl-toast",s.innerHTML=`
      <span class="dl-toast-mark" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="dl-toast-body">
        <div class="dl-toast-head">${n("image-bgremove.dl.head")}</div>
        <div class="dl-toast-name"></div>
        <div class="dl-toast-meta">${L(a.sizeKB)} KB · ${a.width}×${a.height} · ${L(a.flavour)}</div>
      </div>
      <a class="dl-toast-link" href="${a.url}" download="${L(a.filename)}">${n("image-bgremove.dl.again")}</a>
    `,s.querySelector(".dl-toast-name").textContent=a.filename,e.dlStrip.append(s)}function $(a,s,r,o="#0b0b0c"){if(!a)return;const d=s.width,m=s.height;if(a.fillStyle=o,a.fillRect(0,0,d,m),!r)return;a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const c=r.width??r.naturalWidth??0,g=r.height??r.naturalHeight??0;if(!c||!g)return;const y=Math.min(d/c,m/g),S=c*y,v=g*y;a.drawImage(r,(d-S)/2,(m-v)/2,S,v)}function l(a,s,r){const o=i.querySelector(`[data-step="${a}"]`);if(!o)return;o.setAttribute("data-status",s);const d=o.querySelector('[data-role="step-note"]');d&&(d.textContent=r??"")}function Q(){l("load-model",t.segmenter?"done":"pending",t.segmenter?`${w[t.modelId].label} · ${t.segmenter.device}`:""),l("inspect","pending"),l("segment","pending"),l("encode","pending"),B(!1),f.hidden=!0,e.dlStrip.innerHTML="",e.exportBtn.disabled=!1}function B(a){a?e.segmentViz.removeAttribute("hidden"):e.segmentViz.setAttribute("hidden","")}function F(a,s){if(a<=0||s<=0)return;const r=720,o=Math.max(a,s),d=o>r?r/o:1,m=Math.max(1,Math.round(a*d)),c=Math.max(1,Math.round(s*d));for(const g of[e.tileSource,e.tileOutput])g.width=m,g.height=c}function D(a){for(const s of e.modelOpts)s.setAttribute("aria-pressed",String(s.dataset.id===a));e.statModel.textContent=w[a].label}function X(){return e.swatches.find(s=>s.getAttribute("aria-pressed")==="true")?.dataset.color??e.colorPicker.value??"#0b0b0c"}function b(a,s="info"){e.banner.classList.remove("hidden"),e.banner.classList.toggle("error",s==="error");const r=s==="error"?n("image-bgremove.banner.errorHead"):n("image-bgremove.banner.webgpuHead");e.banner.innerHTML=`<button class="x" aria-label="${n("image-bgremove.banner.dismiss")}">×</button><div><b>${r}</b></div><div>${L(a)}</div>`,e.banner.querySelector(".x")?.addEventListener("click",()=>e.banner.classList.add("hidden"))}function L(a){return a.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s])}function q(){const a=t.background.kind==="transparent";if(e.formatHint.classList.remove("warn"),!a){e.formatHint.textContent="";return}t.format==="png"?e.formatHint.textContent=n("image-bgremove.format.hintPng"):t.format==="webp"?e.formatHint.textContent=n("image-bgremove.format.hintWebp"):(e.formatHint.textContent=n("image-bgremove.format.hintJpeg"),e.formatHint.classList.add("warn"))}function R(a){return a==="jpeg"?{mime:"image/jpeg",ext:"jpg"}:a==="webp"?{mime:"image/webp",ext:"webp"}:{mime:"image/png",ext:"png"}}function T(a){return a.type.startsWith("image/")}q(),e.exportBtn.disabled=!0}export{Ie as mountImageBgremove};
//# sourceMappingURL=app-Njm6Xhgj.js.map
