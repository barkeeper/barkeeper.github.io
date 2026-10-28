import{t as i,s as Y,p as Z}from"./index-DbChkwc3.js";import{f as ee,M as te,A as ae,a as se,b as ie}from"./h264-eC01Si3C.js";import{configureTransformersEnv as ne,probeWebGPU as oe}from"./runtime-Jg5t-PhK.js";import{i as re,o as le}from"./source-CBkpBijo.js";import{UPSCALE_MODELS as F}from"./models-OFmNMcf2.js";import{l as de}from"./upscaler--FcqI4c0.js";import{C as ce}from"./compare-slider-ClD46mW-.js";import{m as pe}from"./model-status-CS7V2bNZ.js";import"./transformers.web-Cyg6ssfE.js";import"./model-cache-CVSf8zme.js";import"./gpu-guard-C1llK9pG.js";import"./model-catalog-DAmf0QpZ.js";function ue(r){r.innerHTML="",r.append(ve());const e=p=>{const t=r.querySelector(p);if(!t)throw new Error(`missing element: ${p}`);return t};for(const p of r.querySelectorAll("section[data-collapsible]")){const t=p.querySelector(".sec-head");t&&t.addEventListener("click",()=>p.toggleAttribute("data-collapsed"))}return{root:r,runtimePill:e("#vup-runtime-pill"),banner:e("#vup-banner"),dropzone:e("#vup-dropzone"),pickBtn:e("#vup-pick-btn"),fileInput:e("#vup-file-input"),fileLabel:e("#vup-file-label"),modelOpts:Array.from(r.querySelectorAll('[data-role="model-opt"]')),formatOpts:Array.from(r.querySelectorAll('[data-role="format-opt"]')),processSection:e("#vup-process-section"),segmentViz:e("#vup-segment-viz"),segmentProgress:e("#vup-segment-progress"),tileSource:e("#vup-tile-source"),tileOutput:e("#vup-tile-output"),exportBtn:e("#vup-export-btn"),exportStatus:e("#vup-export-status"),played:e("#vup-played"),timeText:e("#vup-time-text"),dlStrip:e("#vup-dl-strip"),statModel:e("#vup-stat-model"),statRes:e("#vup-stat-res")}}function ve(){const r=document.createDocumentFragment(),e=document.createElement("div");for(e.innerHTML=ge();e.firstChild;)r.appendChild(e.firstChild);return r}function me(){return'<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'}function Q(r,e){return`
    <header class="sec-head">
      <span class="sec-label">${r}</span>
      <span class="sec-meta">${e??""}</span>
      ${me()}
    </header>
  `}function D(r,e,p,t=""){return`
    <li class="step" data-step="${r}" data-status="pending">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="step-body">
        <div class="step-title">${e}</div>
        <div class="step-desc">${p}</div>
        <div class="step-note" data-role="step-note"></div>
        ${t}
      </div>
    </li>
  `}function fe(){return`
    <div id="vup-segment-viz" class="step-viz" hidden>
      <div class="step-pbar"><div id="vup-segment-progress" class="step-pbar-fill"></div></div>
      <div class="step-tiles">
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${i("video-upscaler.tile.source")}</div>
          <canvas id="vup-tile-source" width="480" height="270"></canvas>
        </div>
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${i("video-upscaler.tile.upscaled")}</div>
          <canvas id="vup-tile-output" width="480" height="270"></canvas>
        </div>
      </div>
    </div>
  `}function ge(){const r=Object.values(F).map(e=>`
    <button class="opt" data-role="model-opt" data-id="${e.id}" aria-pressed="${e.id==="lightweight-2x"}">
      <span class="dot"></span>
      <span class="label">${e.label}</span>
      <span class="meta">${e.weightsSize}</span>
      <span class="sub">${e.sublabel}</span>
    </button>
  `).join("");return`
    <div id="vup-banner" class="banner hidden">
      <button class="x" aria-label="${i("video-upscaler.banner.dismiss")}">×</button>
      <div><b>${i("video-upscaler.banner.webgpuHead")}</b></div>
      <div>${i("video-upscaler.banner.fallback")}</div>
    </div>

    <header class="topbar">
      <div class="brand"><span class="brand-mark"></span>${i("video-upscaler.brand")}<span class="tag">/ t·006</span></div>
      <div class="stat-row">
        <div class="stat"><span class="k">${i("video-upscaler.stat.model")}</span><span class="v" id="vup-stat-model">—</span></div>
        <div class="stat"><span class="k">${i("video-upscaler.stat.size")}</span><span class="v" id="vup-stat-res">—</span></div>
        <div id="vup-runtime-pill" class="runtime-pill" data-device="probing">${i("video-upscaler.runtime.probing")}</div>
      </div>
    </header>

    <main class="panel panel-split">

      <div class="panel-col panel-col-left">

      <section class="sec" data-collapsible>
        ${Q(i("video-upscaler.sec.model"),"3")}
        <div class="sec-body">
          <div class="opt-group">${r}</div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${Q(i("video-upscaler.sec.format"))}
        <div class="sec-body">
          <div class="opt-group">
            <button class="opt" data-role="format-opt" data-format="mp4" aria-pressed="true">
              <span class="dot"></span>
              <span class="label">MP4</span>
              <span class="meta">h.264</span>
              <span class="sub">${i("video-upscaler.fmt.mp4.sub")}</span>
            </button>
            <button class="opt" data-role="format-opt" data-format="webm" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">WebM</span>
              <span class="meta">vp9</span>
              <span class="sub">${i("video-upscaler.fmt.webm.sub")}</span>
            </button>
          </div>
        </div>
      </section>

      </div><!-- /panel-col-left -->

      <div class="panel-col panel-col-right">

      <div id="vup-dropzone" class="intake-cta" data-active="false">
        <button class="cta-btn" id="vup-pick-btn">
          <svg viewBox="0 0 16 16" class="cta-icon" aria-hidden="true">
            <path d="M3 11v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2M8 2v8m0-8l-3 3m3-3l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${i("video-upscaler.intake.cta")}
        </button>
        <input type="file" id="vup-file-input" accept="video/*" class="hidden" />
        <div class="intake-sub" id="vup-file-label">${i("video-upscaler.intake.hint")}</div>
      </div>

      <div class="dl" id="vup-dl-strip"></div>

      <section id="vup-process-section" class="sec" data-collapsible hidden>
        ${Q(i("video-upscaler.sec.process"))}
        <div class="sec-body">
          <ol class="steps">
            ${D("load-model",i("video-upscaler.step.load.title"),i("video-upscaler.step.load.desc"))}
            ${D("inspect",i("video-upscaler.step.inspect.title"),i("video-upscaler.step.inspect.desc"))}
            ${D("segment",i("video-upscaler.step.segment.title"),i("video-upscaler.step.segment.desc"),fe())}
            ${D("encode",i("video-upscaler.step.encode.title"),i("video-upscaler.step.encode.desc"))}
          </ol>
        </div>
      </section>

      </div><!-- /panel-col-right -->

    </main>

    <footer class="transport">
      <button class="btn ghost" id="vup-export-btn" disabled>${i("video-upscaler.btn.upscale")} <span class="arrow">›</span></button>
      <div class="timeline">
        <div class="ticks"></div>
        <div class="played" id="vup-played"></div>
      </div>
      <div class="time" id="vup-time-text">— / —</div>
      <span id="vup-export-status" class="action-status hidden"></span>
    </footer>
  `}const G=30;let J=null;function Te(r){if(J===r)return;J=r,ne();const e=ue(r),p=pe(r,"swin2sr-lightweight-2x"),t={runtime:{device:"wasm",adapterName:null,reason:"pending probe"},modelId:"lightweight-2x",upscaler:null,loadingModel:!1,video:null,format:"mp4",processing:!1,abort:null,lastUrl:null},v=e.tileSource.getContext("2d",{willReadFrequently:!1}),B=e.tileOutput.getContext("2d",{willReadFrequently:!1}),w=new ce({beforeLabel:i("video-upscaler.tile.source"),afterLabel:i("video-upscaler.tile.upscaled")}),f=document.createElement("div");f.className="cmp-host",f.id="vup-compare",f.hidden=!0,f.append(w.el),e.segmentViz.append(f);let C=null;const P=document.createElement("canvas"),N=P.getContext("2d",{willReadFrequently:!1});(async()=>{const a=await oe();t.runtime=a,e.runtimePill.dataset.device=a.device,e.runtimePill.textContent=a.device==="webgpu"?`WebGPU · ${a.adapterName??i("video-upscaler.runtime.ready")}`:i("video-upscaler.runtime.cpuFallback"),a.device==="wasm"&&h(i("video-upscaler.msg.noWebgpu",{reason:a.reason??i("video-upscaler.msg.noAdapter")})),L(t.modelId)})(),e.banner.querySelector(".x")?.addEventListener("click",()=>{e.banner.classList.add("hidden")});for(const a of e.modelOpts)a.addEventListener("click",()=>{const s=a.dataset.id;!s||s===t.modelId||(t.modelId=s,p.setModel(`swin2sr-${s}`),L(s),d("load-model","pending"),t.upscaler&&(t.upscaler.dispose().catch(()=>{}),t.upscaler=null))});for(const a of e.formatOpts)a.addEventListener("click",()=>{const s=a.dataset.format;if(!(!s||s===t.format)){t.format=s;for(const n of e.formatOpts)n.setAttribute("aria-pressed",String(n===a))}});e.pickBtn.addEventListener("click",()=>e.fileInput.click()),e.fileInput.addEventListener("change",async()=>{const a=e.fileInput.files?.[0];a&&await U(a)});const M=e.dropzone;["dragenter","dragover"].forEach(a=>{M.addEventListener(a,s=>{s.preventDefault(),M.dataset.active="true"})}),["dragleave","drop"].forEach(a=>{M.addEventListener(a,s=>{s.preventDefault(),M.dataset.active="false"})}),M.addEventListener("drop",async a=>{a.preventDefault();const s=a.dataTransfer?.files?.[0];s&&await U(s)}),e.exportBtn.addEventListener("click",async()=>{if(t.processing){t.abort?.abort();return}if(!t.video){h(i("video-upscaler.msg.noVideo"),"error");return}await V(),t.upscaler&&await q()});async function U(a){if(!re(a)){h(i("video-upscaler.msg.rejected",{type:a.type||i("video-upscaler.msg.unknown")}),"error");return}t.processing&&t.abort?.abort(),t.video?.dispose(),t.video=null,O(),e.processSection.removeAttribute("hidden"),e.fileLabel.textContent=a.name,d("inspect","active");try{t.video=await le(a)}catch(l){d("inspect","pending"),h(i("video-upscaler.msg.loadFailed",{msg:l.message}),"error");return}const s=F[t.modelId],n=t.video.width*s.scale,c=t.video.height*s.scale;H(t.video.width,t.video.height,e.tileSource),H(n,c,e.tileOutput),P.width=t.video.width,P.height=t.video.height,e.statRes.textContent=`${t.video.width}×${t.video.height} → ${n}×${c}`,e.timeText.textContent=`0:00 / ${_(t.video.durationSec)}`,d("inspect","done",`${a.name} · ${t.video.width}×${t.video.height} · ${t.video.durationSec.toFixed(1)}s · → ${n}×${c}`),t.video.element.currentTime=0,await new Promise(l=>{t.video.element.addEventListener("seeked",()=>l(),{once:!0})}),j(v,e.tileSource,t.video.element),await V(),t.upscaler&&await q()}async function V(){if(t.loadingModel)return;if(t.upscaler&&t.upscaler.model.id===t.modelId){d("load-model","done",`${F[t.modelId].label} · ${t.upscaler.device} · ${t.upscaler.dtype}`);return}t.loadingModel=!0;const a=F[t.modelId];if(d("load-model","active",`${a.label} · ${a.weightsSize}`),e.statModel.textContent=a.label,t.upscaler){try{await t.upscaler.dispose()}catch{}t.upscaler=null}try{t.upscaler=await de(t.modelId,t.runtime.device,({phase:s,progress:n})=>{d("load-model","active",`${s} · ${(n*100).toFixed(0)}%`)},()=>{const s=t.upscaler;d("load-model","done",`${a.label} · ${s?.device??"wasm"} · ${s?.dtype??"q8"} · ${i("video-upscaler.note.gpuFallback")}`),e.runtimePill.dataset.device="wasm",e.runtimePill.textContent=i("video-upscaler.runtime.gpuFallback")}),d("load-model","done",`${a.label} · ${t.upscaler.device} · ${t.upscaler.dtype}`)}catch(s){d("load-model","pending"),h(i("video-upscaler.msg.modelFailed",{msg:s.message}),"error")}finally{t.loadingModel=!1}}async function q(){if(!t.video||!t.upscaler||t.processing)return;if(typeof VideoEncoder>"u"){h(i("video-upscaler.msg.noEncoder"),"error");return}t.processing=!0,t.abort=new AbortController;const a=t.abort.signal,s=Y({tool:i("tool.video-upscaler.name"),route:"video-upscaler",label:e.fileLabel.textContent||i("video-upscaler.job.video"),detail:i("video-upscaler.status.starting"),progress:0,onCancel:()=>{t.abort?.abort()}});e.exportBtn.textContent=i("video-upscaler.btn.cancel"),e.exportStatus.classList.remove("hidden"),e.exportStatus.textContent=i("video-upscaler.status.starting"),d("segment","active",i("video-upscaler.status.starting")),d("encode","pending"),I(!0),e.segmentProgress.style.width="0%";let n=null,c="video/mp4",l="mp4";try{const S=await he({source:t.video,upscaler:t.upscaler,format:t.format,fps:G,signal:a,frameCanvas:P,frameCtx:N,tileSourceCtx:v,tileOutputCtx:B,tileSource:e.tileSource,tileOutput:e.tileOutput,onSample:(o,u)=>{C={src:E(o),out:E(u)}},onProgress:({frame:o,total:u,ratio:m})=>{const b=(m*100).toFixed(1);e.segmentProgress.style.width=`${b}%`,e.played.style.width=`${b}%`,e.exportStatus.textContent=i("video-upscaler.status.frameProgress",{pct:b,frame:o,total:u}),e.timeText.textContent=`${_(o/G)} / ${_(t.video.durationSec)}`,d("segment","active",i("video-upscaler.status.frames",{frame:o,total:u})),s.update({progress:m,detail:i("video-upscaler.status.frameProgress",{pct:b,frame:o,total:u})})},onFinalize:()=>{d("segment","done");const o=t.format.toUpperCase();d("encode","active",i("video-upscaler.status.packaging",{fmt:o})),s.update({progress:1,detail:i("video-upscaler.status.packagingFmt",{fmt:o})})}});n=S.blob,c=S.mimeType,l=S.extension}catch(S){const o=S;o.name==="AbortError"?s.markCancelled():(h(i("video-upscaler.msg.upscaleFailed",{msg:o.message}),"error"),s.fail(o.message)),d("segment","pending"),d("encode","pending"),t.processing=!1,t.abort=null,e.exportBtn.textContent=t.video?i("video-upscaler.btn.again"):i("video-upscaler.btn.go");return}finally{t.processing=!1,t.abort=null,e.exportBtn.textContent=t.video?i("video-upscaler.btn.again"):i("video-upscaler.btn.go")}if(!n)return;C&&(w.setSources(C.src,C.out),f.hidden=!1);const g=(n.size/(1024*1024)).toFixed(1);d("encode","done",`${g} MB · ${l.toUpperCase()}`),t.lastUrl&&URL.revokeObjectURL(t.lastUrl);const y=URL.createObjectURL(n);t.lastUrl=y;const T=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),x=F[t.modelId],k=`upscale-${T}-x${x.scale}.${l}`;Z("video-upscaler",n,k),A(y,k),z({filename:k,url:y,sizeMB:g,width:t.video.width*x.scale,height:t.video.height*x.scale,mime:c}),s.done(`${g} MB · ×${x.scale}`),e.exportStatus.textContent=i("video-upscaler.status.done",{size:g})}function j(a,s,n,c="#0b0b0c"){if(!a)return;const l=s.width,g=s.height;if(a.fillStyle=c,a.fillRect(0,0,l,g),!n)return;a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const y="videoWidth"in n&&n.videoWidth?n.videoWidth:n.width??0,T="videoHeight"in n&&n.videoHeight?n.videoHeight:n.height??0;if(!y||!T)return;const x=Math.min(l/y,g/T),k=y*x,S=T*x;a.drawImage(n,(l-k)/2,(g-S)/2,k,S)}function H(a,s,n){if(a<=0||s<=0)return;const c=720,l=Math.max(a,s),g=l>c?c/l:1;n.width=Math.max(1,Math.round(a*g)),n.height=Math.max(1,Math.round(s*g))}function d(a,s,n){const c=r.querySelector(`[data-step="${a}"]`);if(!c)return;c.setAttribute("data-status",s);const l=c.querySelector('[data-role="step-note"]');l&&(l.textContent=n??"")}function O(){d("load-model",t.upscaler?"done":"pending",t.upscaler?`${F[t.modelId].label} · ${t.upscaler.device}`:""),d("inspect","pending"),d("segment","pending"),d("encode","pending"),I(!1),f.hidden=!0,C=null,e.dlStrip.innerHTML="",e.exportBtn.disabled=!1}function E(a){const s=document.createElement("canvas");return s.width=a.width,s.height=a.height,s.getContext("2d")?.drawImage(a,0,0),s}function I(a){a?e.segmentViz.removeAttribute("hidden"):e.segmentViz.setAttribute("hidden","")}function L(a){for(const s of e.modelOpts)s.setAttribute("aria-pressed",String(s.dataset.id===a));e.statModel.textContent=F[a].label}function h(a,s="info"){e.banner.classList.remove("hidden"),e.banner.classList.toggle("error",s==="error");const n=s==="error"?i("video-upscaler.banner.errorHead"):i("video-upscaler.banner.webgpuHead");e.banner.innerHTML=`<button class="x" aria-label="${i("video-upscaler.banner.dismiss")}">×</button><div><b>${n}</b></div><div>${$(a)}</div>`,e.banner.querySelector(".x")?.addEventListener("click",()=>e.banner.classList.add("hidden"))}function $(a){return a.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s])}function A(a,s){const n=document.createElement("a");n.href=a,n.download=s,n.rel="noopener",n.style.display="none",document.body.appendChild(n),n.click(),n.remove()}function z(a){e.dlStrip.innerHTML="";const s=document.createElement("div");s.className="dl-toast",s.innerHTML=`
      <span class="dl-toast-mark" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="dl-toast-body">
        <div class="dl-toast-head">${i("video-upscaler.toast.head")}</div>
        <div class="dl-toast-name"></div>
        <div class="dl-toast-meta">${$(a.sizeMB)} MB · ${a.width}×${a.height} · ${$(a.mime)}</div>
      </div>
      <a class="dl-toast-link" href="${a.url}" download="${$(a.filename)}">${i("video-upscaler.toast.again")}</a>
    `,s.querySelector(".dl-toast-name").textContent=a.filename,e.dlStrip.append(s)}e.exportBtn.disabled=!0}async function he(r){const{source:e,upscaler:p,format:t,fps:v,signal:B,frameCanvas:w,frameCtx:f,tileSource:C,tileOutput:P,tileSourceCtx:N,tileOutputCtx:M,onProgress:U,onFinalize:V,onSample:q}=r;if(!f)throw new Error("Frame canvas 2D context unavailable");const j=e.width,H=e.height,d=p.model.scale,O=j*d,E=H*d,I=e.durationSec,L=Math.max(1,Math.floor(I*v));let h,$,A,z,a=t==="webm",s=null;if(a||(s=await ee(O,E,v),s||(a=!0)),a){h="vp09.00.10.08",$="video/webm",A="webm";const o=new te({target:new ae,video:{codec:"V_VP9",width:O,height:E,frameRate:v}});z={addChunk:(u,m)=>o.addVideoChunk(u,m),finalize:()=>o.finalize(),getBuffer:()=>o.target.buffer}}else{h=s,$="video/mp4",A="mp4";const o=new se({target:new ie,video:{codec:"avc",width:O,height:E,frameRate:v},fastStart:"in-memory",firstTimestampBehavior:"offset"});z={addChunk:(u,m)=>o.addVideoChunk(u,m),finalize:()=>o.finalize(),getBuffer:()=>o.target.buffer}}let n=null;const c=new VideoEncoder({output:(o,u)=>z.addChunk(o,u),error:o=>{n=o}});c.configure({codec:h,width:O,height:E,bitrate:12e6,framerate:v,...a?{}:{avc:{format:"avc"}}});const l=e.element,g=l.muted,y=l.playbackRate;l.pause(),l.muted=!0,l.playbackRate=1;const T=()=>{l.muted=g,l.playbackRate=y},x=o=>new Promise(u=>{const m=Math.min(I,o);if(Math.abs(l.currentTime-m)<.5/v){u();return}let b=!1;const W=()=>{b||(b=!0,l.removeEventListener("seeked",R),clearTimeout(K),u())},R=()=>W();l.addEventListener("seeked",R),l.currentTime=m;const K=setTimeout(W,800)}),k=o=>{f.drawImage(o,0,0,j,H)};try{for(let o=0;o<L;o++){if(B.aborted)throw new DOMException("Upscale aborted","AbortError");if(n)throw n;const u=o/v;await x(u),k(l),o%4===0&&X(N,C,w);const m=await p.upscale(w);o%4===0&&X(M,P,m.bitmap),o===Math.floor(L/2)&&q?.(w,m.bitmap);const b=new VideoFrame(m.bitmap,{timestamp:Math.round(u*1e6),duration:Math.round(1/v*1e6)});c.encode(b,{keyFrame:o%Math.max(1,v*2)===0}),b.close(),m.bitmap.close?.(),c.encodeQueueSize>8&&await new Promise(W=>{const R=()=>{c.encodeQueueSize<=3?W():queueMicrotask(R)};R()}),U({frame:o+1,total:L,ratio:(o+1)/L})}if(V(),await c.flush(),n)throw n;z.finalize()}finally{try{c.close()}catch{}T()}return{blob:new Blob([z.getBuffer()],{type:$}),mimeType:$,extension:A}}function X(r,e,p){if(!r)return;r.fillStyle="#0b0b0c",r.fillRect(0,0,e.width,e.height),r.imageSmoothingEnabled=!0,r.imageSmoothingQuality="high";const t=p.width??0,v=p.height??0;if(!t||!v)return;const B=Math.min(e.width/t,e.height/v),w=t*B,f=v*B;r.drawImage(p,(e.width-w)/2,(e.height-f)/2,w,f)}function _(r){if(!isFinite(r)||r<0)return"—";const e=Math.floor(r/60),p=Math.floor(r%60);return`${e}:${String(p).padStart(2,"0")}`}export{Te as mountVideoUpscaler};
//# sourceMappingURL=app-DCRTCwNv.js.map
