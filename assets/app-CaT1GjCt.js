import{t as o,s as Q,p as J}from"./index-DbChkwc3.js";import{configureTransformersEnv as X,probeWebGPU as Y}from"./runtime-Jg5t-PhK.js";import{M as z,C as Z,l as ee}from"./compositor-BcMJOgNj.js";import{i as te,o as ae}from"./source-CBkpBijo.js";import{p as _,M as oe,A as se,a as ne,b as re}from"./h264-eC01Si3C.js";import{FFmpeg as ie}from"./index-DfgTfcu_.js";import{a as de,p as le,b as ce,d as ue}from"./audio-Bbt7GTjV.js";import{m as me}from"./model-status-CS7V2bNZ.js";import"./transformers.web-Cyg6ssfE.js";import"./gpu-lock-CVLNUbDT.js";import"./gpu-guard-C1llK9pG.js";import"./model-cache-CVSf8zme.js";import"./model-catalog-DAmf0QpZ.js";const U=30;class q{map=new Map;totalBytes=0;maxBytes;constructor(e=384*1024*1024){this.maxBytes=e}static keyFor(e,i=U){return Math.max(0,Math.round(e*i))}has(e){return this.map.has(e)}size(){return this.map.size}bytes(){return this.totalBytes}get(e){const i=this.map.get(e);if(i)return this.map.delete(e),this.map.set(e,i),i.bitmap}set(e,i){const t=this.map.get(e);if(t){this.totalBytes-=t.bytes;try{t.bitmap.close()}catch{}this.map.delete(e)}const l=i.width*i.height*4;this.map.set(e,{bitmap:i,bytes:l}),this.totalBytes+=l,this.evict()}clear(){for(const e of this.map.values())try{e.bitmap.close()}catch{}this.map.clear(),this.totalBytes=0}evict(){for(;this.totalBytes>this.maxBytes&&this.map.size>0;){const e=this.map.keys().next().value;if(e===void 0)break;const i=this.map.get(e);if(i){this.totalBytes-=i.bytes;try{i.bitmap.close()}catch{}}this.map.delete(e)}}}const pe=96*1024*1024;class fe{ffmpeg=null;buffers=[];bufferBytes=0;framesInChunk=0;chunkIndex=0;chunkFiles=[];w=0;h=0;fps=30;profile="prores4444";onProgress=null;async load(e){if(this.ffmpeg)return;this.onProgress=e??null,this.onProgress?.({phase:"loading",message:o("video.ffmpeg.loading")});const i=new ie;i.on("progress",({progress:t,time:l})=>{const d=Math.max(0,Math.min(1,t))*100,u=l/1e6;this.onProgress?.({phase:"encoding-chunk",message:o("video.ffmpeg.chunkProgress",{n:this.chunkIndex+1,pct:d.toFixed(0),t:u.toFixed(1)})})}),await i.load({coreURL:"/ffmpeg/ffmpeg-core.js",wasmURL:"/ffmpeg/ffmpeg-core.wasm"}),this.ffmpeg=i}begin(e){if(!this.ffmpeg)throw new Error("Encoder not loaded — call load() first.");this.w=e.w,this.h=e.h,this.fps=e.fps,this.profile=e.profile??"prores4444",this.buffers=[],this.bufferBytes=0,this.framesInChunk=0,this.chunkIndex=0,this.chunkFiles=[]}async addFrame(e){const i=this.w*this.h*4;if(e.length!==i)throw new Error(`Frame size mismatch: ${e.length} != ${i}`);const t=new Uint8Array(e.byteLength);t.set(e),this.buffers.push(t),this.bufferBytes+=t.byteLength,this.framesInChunk+=1,this.bufferBytes>=pe&&await this.flushChunk()}async finalize(e){if(!this.ffmpeg)throw new Error("Encoder not loaded");const i=this.ffmpeg;if(await this.flushChunk(),this.chunkFiles.length===0)throw new Error(o("video.err.noFrames"));const t=[...this.chunkFiles];let l;if(this.chunkFiles.length===1)l=this.chunkFiles[0];else{this.onProgress?.({phase:"concatenating",message:o("video.ffmpeg.concat",{n:this.chunkFiles.length})});const u=this.chunkFiles.map(f=>`file '${f}'`).join(`
`)+`
`;await i.writeFile("concat.txt",new TextEncoder().encode(u)),await i.exec(["-y","-f","concat","-safe","0","-i","concat.txt","-c","copy","final.mov"]),t.push("concat.txt","final.mov"),l="final.mov"}e?.audioWav&&e.audioWav.byteLength>44&&(this.onProgress?.({phase:"concatenating",message:o("video.ffmpeg.muxAudio")}),await i.writeFile("audio.wav",e.audioWav),await i.exec(["-y","-i",l,"-i","audio.wav","-map","0:v:0","-map","1:a:0","-c:v","copy","-c:a","pcm_s16le","final_av.mov"]),t.push("audio.wav","final_av.mov"),l="final_av.mov"),this.onProgress?.({phase:"reading",message:o("video.ffmpeg.reading",{file:l})});const d=await i.readFile(l);for(const u of t)try{await i.deleteFile(u)}catch{}return this.chunkFiles=[],d}async flushChunk(){if(!this.ffmpeg||this.framesInChunk===0)return;const e=this.ffmpeg,i=new Uint8Array(this.bufferBytes);let t=0;for(const m of this.buffers)i.set(m,t),t+=m.byteLength;this.buffers=[],this.bufferBytes=0;const l="input.rgba",d=`chunk_${String(this.chunkIndex).padStart(4,"0")}.mov`;await e.writeFile(l,i);const u=this.profile==="prores4444"?"4":"3",f=this.profile==="prores4444"?"yuva444p10le":"yuv422p10le";await e.exec(["-y","-f","rawvideo","-pixel_format","rgba","-video_size",`${this.w}x${this.h}`,"-framerate",String(this.fps),"-i",l,"-c:v","prores_ks","-profile:v",u,"-pix_fmt",f,"-vendor","apl0",d]);try{await e.deleteFile(l)}catch{}this.chunkFiles.push(d),this.onProgress?.({phase:"encoding-chunk",message:o("video.ffmpeg.chunkDone",{n:this.chunkIndex+1,frames:this.framesInChunk})}),this.chunkIndex+=1,this.framesInChunk=0}}function ge(n,e){return n==="mov"&&e.kind==="transparent"}async function be(n="mp4"){if(n==="mov")return typeof VideoEncoder<"u"&&typeof WebAssembly<"u";if(typeof VideoEncoder>"u")return!1;try{return n==="webm"?!!(await VideoEncoder.isConfigSupported({codec:"vp09.00.10.08",width:640,height:360,bitrate:1e6})).supported:(await _(640,360,30),!0)}catch{return!1}}async function ve(n){return ge(n.format,n.background)?xe(n):ye(n)}function j(n){const e=n.source.element,i=n.source.durationSec,t=e.muted,l=e.playbackRate;return e.pause(),e.muted=!0,e.playbackRate=1,{v:e,duration:i,seekTo:f=>new Promise(m=>{const v=Math.min(i,f);if(Math.abs(e.currentTime-v)<.5/60){m();return}let x=!1;const y=()=>{x||(x=!0,e.removeEventListener("seeked",w),clearTimeout(F),m())},w=()=>y();e.addEventListener("seeked",w),e.currentTime=v;const F=setTimeout(y,500)}),restore:()=>{e.muted=t,e.playbackRate=l}}}async function he(n,e,i,t){return n==="webm"?{encoderCodec:"vp09.00.10.08",mimeType:"video/webm",extension:"webm"}:{encoderCodec:await _(e,i,t),mimeType:n==="mov"?"video/quicktime":"video/mp4",extension:n==="mov"?"mov":"mp4"}}function we(n,e,i,t,l,d){if(n==="webm"){const f=new oe({target:new se,video:{codec:"V_VP9",width:e,height:i,frameRate:t,alpha:l},...d?{audio:{codec:"A_OPUS",numberOfChannels:d.codec.numberOfChannels,sampleRate:d.codec.sampleRate}}:{}});for(const m of d?.chunks??[])f.addAudioChunk(m.chunk,m.meta);return{addChunk:(m,v)=>f.addVideoChunk(m,v),finalize:()=>f.finalize(),getBuffer:()=>f.target.buffer}}const u=new ne({target:new re,video:{codec:"avc",width:e,height:i,frameRate:t},...d?{audio:{codec:d.codec.muxCodec,numberOfChannels:d.codec.numberOfChannels,sampleRate:d.codec.sampleRate}}:{},fastStart:"in-memory",firstTimestampBehavior:"offset"});for(const f of d?.chunks??[])u.addAudioChunk(f.chunk,f.meta);return{addChunk:(f,m)=>u.addVideoChunk(f,m),finalize:()=>u.finalize(),getBuffer:()=>u.target.buffer}}async function ke(n,e,i){if(!n.audio)return null;const t=await le(e==="webm"?"webm":"mp4",n.audio);return t?ce(n.audio,t,0,i,n.signal):null}async function ye(n){const{source:e,segmenter:i,compositor:t,background:l,fps:d,format:u,onProgress:f,signal:m}=n,v=e.width,x=e.height,y=e.durationSec,w=Math.max(1,Math.floor(y*d)),F=l.kind==="transparent",c=u==="webm",L=F&&c,P=F&&!c?{kind:"color",color:n.chromaKey??"#00ff00"}:l;if(typeof VideoEncoder>"u")throw new Error(o("video.err.noVideoEncoder"));const E=await he(u,v,x,d),B=await ke(n,u,w/d),$=we(u,v,x,d,L,B);let C=null;const g=new VideoEncoder({output:(r,p)=>{try{$.addChunk(r,p)}catch(b){C??=b}},error:r=>{C??=r}});g.configure({codec:E.encoderCodec,width:v,height:x,bitrate:8e6,framerate:d,...u!=="webm"?{avc:{format:"avc"}}:{},...L?{alpha:"keep"}:{}});const{v:I,seekTo:T,restore:O}=j(n);let a=0;try{for(let r=0;r<w;r++){if(m?.aborted)throw new DOMException("Export aborted","AbortError");if(C)throw C;const p=r/d,b=q.keyFor(p,d);let S=n.maskCache?.get(b);if(await T(p),S?a+=1:(S=(await i.segment(I)).bitmap,n.maskCache?.set(b,S)),t.render(I,S,P),C)throw C;const M=new VideoFrame(t.outCanvas,{timestamp:Math.round(p*1e6),duration:Math.round(1/d*1e6),alpha:L?"keep":"discard"});g.encode(M,{keyFrame:r%Math.max(1,d*2)===0}),M.close(),g.encodeQueueSize>12&&await new Promise(k=>{const h=()=>{g.encodeQueueSize<=4?k():queueMicrotask(h)};h()}),f?.({frame:r+1,total:w,ratio:(r+1)/w,cacheHits:a})}if(n.onFinalize?.(),await g.flush(),C)throw C;$.finalize()}finally{try{g.close()}catch{}O()}const s=new Blob([$.getBuffer()],{type:E.mimeType});return{blob:s,url:URL.createObjectURL(s),bytes:s.size,durationSec:y,hasAlpha:L,mimeType:E.mimeType,extension:E.extension,format:u,hasAudio:!!(B&&B.chunks.length>0),...B?{audioCodec:B.codec.muxCodec}:{}}}async function xe(n){const{source:e,segmenter:i,compositor:t,fps:l,onProgress:d,signal:u,onEncoderStatus:f}=n,m=e.width,v=e.height,x=e.durationSec,y=Math.max(1,Math.floor(x*l)),w=new fe;await w.load(f),w.begin({w:m,h:v,fps:l,profile:"prores4444"});const{v:F,seekTo:c,restore:L}=j(n),E=new OffscreenCanvas(m,v).getContext("2d",{willReadFrequently:!0});if(!E)throw new Error("2D context unavailable for frame readback.");let B=0;try{for(let I=0;I<y;I++){if(u?.aborted)throw new DOMException("Export aborted","AbortError");const T=I/l,O=q.keyFor(T,l);let a=n.maskCache?.get(O);await c(T),a?B+=1:(a=(await i.segment(F)).bitmap,n.maskCache?.set(O,a)),t.render(F,a,n.background),E.clearRect(0,0,m,v),E.drawImage(t.outCanvas,0,0);const s=E.getImageData(0,0,m,v);await w.addFrame(new Uint8Array(s.data.buffer)),d?.({frame:I+1,total:y,ratio:(I+1)/y,cacheHits:B})}n.onFinalize?.();const $=n.audio?de(n.audio,0,y/l):null,C=await w.finalize($?{audioWav:$}:void 0),g=new Blob([new Uint8Array(C)],{type:"video/quicktime"});return{blob:g,url:URL.createObjectURL(g),bytes:g.size,durationSec:x,hasAlpha:!0,mimeType:"video/quicktime",extension:"mov",format:"mov",hasAudio:!!$,...$?{audioCodec:"pcm_s16le"}:{}}}finally{L()}}function $e(n){n.innerHTML="",n.append(Ce());const e=i=>{const t=n.querySelector(i);if(!t)throw new Error(`missing element: ${i}`);return t};for(const i of n.querySelectorAll("section[data-collapsible]")){const t=i.querySelector(".sec-head");t&&t.addEventListener("click",()=>{i.toggleAttribute("data-collapsed")})}return{root:n,runtimePill:e("#runtime-pill"),banner:e("#banner"),dropzone:e("#dropzone"),pickBtn:e("#pick-btn"),fileInput:e("#file-input"),fileLabel:e("#file-label"),modelOpts:Array.from(n.querySelectorAll('[data-role="model-opt"]')),bgOpts:Array.from(n.querySelectorAll('[data-role="bg-opt"]')),swatches:Array.from(n.querySelectorAll('[data-role="swatch"]')),colorPicker:e("#color-picker"),bgImageBtn:e("#bg-image-btn"),bgImageInput:e("#bg-image-input"),blurSlider:e("#blur-slider"),blurValue:e("#blur-value"),formatOpts:Array.from(n.querySelectorAll('[data-role="format-opt"]')),formatHint:e("#format-hint"),audioRow:e("#audio-row"),audioToggle:e("#audio-toggle"),audioSub:e("#audio-sub"),processSection:e("#process-section"),segmentViz:e("#segment-viz"),segmentProgress:e("#segment-progress"),tileSource:e("#tile-source"),tileOutput:e("#tile-output"),exportBtn:e("#export-btn"),exportStatus:e("#export-status"),dlStrip:e("#dl-strip"),played:e("#played"),timeText:e("#time-text"),resultOverlay:e("#result-overlay"),resultDownload:e("#result-download"),resultSize:e("#result-size"),resultClose:e("#result-close"),statModel:e("#stat-model"),statCache:e("#stat-cache")}}function Ce(){const n=document.createDocumentFragment(),e=document.createElement("div");for(e.innerHTML=Ae();e.firstChild;)n.appendChild(e.firstChild);return n}function Se(){return'<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'}function V(n,e){return`
    <header class="sec-head">
      <span class="sec-label">${n}</span>
      <span class="sec-meta">${e??""}</span>
      ${Se()}
    </header>
  `}function H(n,e,i,t=""){return`
    <li class="step" data-step="${n}" data-status="pending">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="step-body">
        <div class="step-title">${e}</div>
        <div class="step-desc">${i}</div>
        <div class="step-note" data-role="step-note"></div>
        ${t}
      </div>
    </li>
  `}function Me(){return`
    <div id="segment-viz" class="step-viz" hidden>
      <div class="step-pbar"><div id="segment-progress" class="step-pbar-fill"></div></div>
      <div class="step-tiles">
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${o("bgremove.tile.source")}</div>
          <canvas id="tile-source" width="480" height="270"></canvas>
        </div>
        <div class="step-tile">
          <div class="step-tile-label"><span class="dot"></span>${o("bgremove.tile.output")}</div>
          <canvas id="tile-output" width="480" height="270"></canvas>
        </div>
      </div>
    </div>
  `}function Ae(){const n=Object.values(z).map(e=>`
    <button class="opt" data-role="model-opt" data-id="${e.id}" aria-pressed="${e.id==="ben2"}">
      <span class="dot"></span>
      <span class="label">${e.label}</span>
      <span class="meta">${e.weightsSize}</span>
      <span class="sub">${e.sublabel}${e.portraitOnly?o("bgremove.model.portraitOnly"):""}</span>
    </button>
  `).join("");return`
    <div id="banner" class="banner hidden">
      <button class="x" aria-label="${o("bgremove.banner.dismiss")}">×</button>
      <div><b>${o("bgremove.banner.webgpuHead")}</b></div>
      <div id="banner-msg">${o("bgremove.banner.webgpuMsg")}</div>
    </div>

    <header class="topbar">
      <div class="brand"><span class="brand-mark"></span>${o("bgremove.brand")}<span class="tag">/ t·001</span></div>
      <div class="stat-row">
        <div class="stat"><span class="k">${o("bgremove.stat.model")}</span><span class="v" id="stat-model">—</span></div>
        <div class="stat"><span class="k">${o("bgremove.stat.cache")}</span><span class="v" id="stat-cache">—</span></div>
        <div id="runtime-pill" class="runtime-pill" data-device="probing">${o("bgremove.runtime.probing")}</div>
      </div>
    </header>

    <main class="panel panel-split">

      <div class="panel-col panel-col-left">

      <section class="sec" data-collapsible>
        ${V(o("bgremove.sec.model"),"2")}
        <div class="sec-body">
          <div class="opt-group">${n}</div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${V(o("bgremove.sec.background"))}
        <div class="sec-body">
          <div class="opt-group">
            <button class="opt" data-role="bg-opt" data-kind="transparent" aria-pressed="true">
              <span class="dot"></span>
              <span class="label">${o("bgremove.bg.transparent")}</span>
              <span class="meta">${o("bgremove.bg.transparentMeta")}</span>
              <span class="sub">${o("bgremove.bg.transparentSub")}</span>
            </button>
            <button class="opt" data-role="bg-opt" data-kind="color" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">${o("bgremove.bg.solid")}</span>
              <span class="meta">${o("bgremove.bg.solidMeta")}</span>
            </button>
            <button class="opt" data-role="bg-opt" data-kind="blur" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">${o("bgremove.bg.blur")}</span>
              <span class="meta">${o("bgremove.bg.blurMeta")}</span>
            </button>
            <button class="opt" data-role="bg-opt" data-kind="image" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">${o("bgremove.bg.image")}</span>
              <span class="meta">${o("bgremove.bg.imageMeta")}</span>
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
              <input type="color" id="color-picker" value="#0b0b0c" />
            </div>
          </div>

          <div data-role="bg-config" data-for="blur" class="hidden">
            <div class="row-inline">
              <span class="row-label">${o("bgremove.bg.radius")}</span>
              <input type="range" id="blur-slider" min="0" max="40" step="1" value="18" />
              <span id="blur-value" class="row-value">18px</span>
            </div>
          </div>

          <div data-role="bg-config" data-for="image" class="hidden">
            <div class="file-row">
              <button class="btn" id="bg-image-btn">${o("bgremove.bg.chooseImage")}</button>
              <input type="file" id="bg-image-input" accept="image/*" class="hidden" />
            </div>
          </div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${V(o("bgremove.sec.format"))}
        <div class="sec-body">
          <div class="opt-group">
            <button class="opt" data-role="format-opt" data-format="mp4" aria-pressed="true">
              <span class="dot"></span>
              <span class="label">MP4</span>
              <span class="meta">h.264</span>
              <span class="sub">${o("bgremove.format.mp4Sub")}</span>
            </button>
            <button class="opt" data-role="format-opt" data-format="mov" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">MOV</span>
              <span class="meta">prores 4444</span>
              <span class="sub">${o("bgremove.format.movSub")}</span>
            </button>
            <button class="opt" data-role="format-opt" data-format="webm" aria-pressed="false">
              <span class="dot"></span>
              <span class="label">WebM</span>
              <span class="meta">vp9 + alpha</span>
              <span class="sub">${o("bgremove.format.webmSub")}</span>
            </button>
          </div>
          <div id="format-hint" class="format-hint"></div>
          <label class="row-toggle" id="audio-row" hidden>
            <input type="checkbox" id="audio-toggle" checked />
            <span class="row-toggle-label">${o("bgremove.audio.include")}</span>
            <span class="row-toggle-sub" id="audio-sub">${o("bgremove.audio.sub")}</span>
          </label>
        </div>
      </section>

      </div><!-- /panel-col-left -->

      <div class="panel-col panel-col-right">

      <div id="dropzone" class="intake-cta" data-active="false">
        <button class="cta-btn" id="pick-btn">
          <svg viewBox="0 0 16 16" class="cta-icon" aria-hidden="true">
            <path d="M3 11v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2M8 2v8m0-8l-3 3m3-3l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${o("bgremove.intake.open")}
        </button>
        <input type="file" id="file-input" accept="video/*" class="hidden" />
        <div class="intake-sub" id="file-label">${o("bgremove.intake.sub")}</div>
      </div>

      <section id="process-section" class="sec" data-collapsible hidden>
        ${V(o("bgremove.sec.process"))}
        <div class="sec-body">
          <ol class="steps">
            ${H("load-model",o("bgremove.step.loadModel"),o("bgremove.step.loadModelDesc"))}
            ${H("inspect",o("bgremove.step.inspect"),o("bgremove.step.inspectDesc"))}
            ${H("segment",o("bgremove.step.segment"),o("bgremove.step.segmentDesc"),Me())}
            ${H("encode",o("bgremove.step.encode"),o("bgremove.step.encodeDesc"))}
          </ol>
        </div>
      </section>

      <div class="dl" id="dl-strip"></div>

      </div><!-- /panel-col-right -->

    </main>

    <footer class="transport">
      <button class="btn ghost" id="export-btn" disabled>${o("bgremove.action.process")} <span class="arrow">›</span></button>
      <div class="timeline">
        <div class="ticks"></div>
        <div class="played" id="played"></div>
      </div>
      <div class="time" id="time-text">— / —</div>
      <span id="export-status" class="action-status hidden"></span>
    </footer>

    <div id="result-overlay" class="modal hidden">
      <div class="modal-panel result">
        <div class="modal-head">${o("bgremove.result.head")}</div>
        <div class="modal-msg">${o("bgremove.result.msg")}</div>
        <div class="result-meta"><span id="result-size">—</span></div>
        <div class="modal-foot">
          <button class="btn" id="result-close">${o("bgremove.result.close")}</button>
          <a class="btn hot" id="result-download" download="bgremove.webm">${o("bgremove.result.download")}</a>
        </div>
      </div>
    </div>
  `}const W=new WeakSet;function qe(n){if(W.has(n))return;W.add(n),X();const e=$e(n),i=me(n,"ben2"),t={runtime:{device:"wasm",adapterName:null,reason:"pending probe"},modelId:"ben2",segmenter:null,loadingModel:!1,video:null,background:{kind:"transparent"},bgImage:null,format:"mp4",exporting:!1,exportAbort:null,disposeOnCancel:!1,fileName:"",lastExportUrl:null,audio:null,includeAudio:!0},l=new Z,d=new q,u=e.tileSource.getContext("2d",{willReadFrequently:!1}),f=e.tileOutput.getContext("2d",{willReadFrequently:!1});(async()=>{const a=await Y();t.runtime=a,e.runtimePill.dataset.device=a.device,e.runtimePill.textContent=a.device==="webgpu"?`WebGPU · ${a.adapterName??o("bgremove.runtime.ready")}`:o("bgremove.runtime.wasm"),a.device==="wasm"&&g(o("bgremove.runtime.wasmBanner",{reason:a.reason??o("bgremove.runtime.noAdapter")})),B(t.modelId)})(),e.banner.querySelector(".x")?.addEventListener("click",()=>{e.banner.classList.add("hidden")});for(const a of e.modelOpts)a.addEventListener("click",()=>{const s=a.dataset.id;!s||s===t.modelId||(t.modelId=s,i.setModel(s),B(s),d.clear(),$(),c("load-model","pending"))});for(const a of e.bgOpts)a.addEventListener("click",()=>{const s=a.dataset.kind;if(s){for(const r of e.bgOpts)r.setAttribute("aria-pressed",String(r===a));for(const r of n.querySelectorAll('[data-role="bg-config"]'))r.classList.toggle("hidden",r.dataset.for!==s);s==="transparent"?t.background={kind:"transparent"}:s==="color"?t.background={kind:"color",color:C()}:s==="blur"?t.background={kind:"blur",pixels:Number(e.blurSlider.value)}:s==="image"&&t.bgImage?t.background={kind:"image",image:t.bgImage}:s==="image"&&(t.background={kind:"color",color:"#0b0b0c"}),T(),O()}});for(const a of e.swatches)a.addEventListener("click",()=>{const s=a.dataset.color??"#000000";for(const r of e.swatches)r.setAttribute("aria-pressed",String(r===a));e.colorPicker.value=s,t.background.kind==="color"&&(t.background={kind:"color",color:s})});e.colorPicker.addEventListener("input",()=>{const a=e.colorPicker.value;for(const s of e.swatches)s.setAttribute("aria-pressed","false");t.background.kind==="color"&&(t.background={kind:"color",color:a})}),e.blurSlider.addEventListener("input",()=>{const a=Number(e.blurSlider.value);e.blurValue.textContent=`${a}px`,t.background.kind==="blur"&&(t.background={kind:"blur",pixels:a})});for(const a of e.formatOpts)a.addEventListener("click",()=>{const s=a.dataset.format;if(!(!s||s===t.format)){t.format=s;for(const r of e.formatOpts)r.setAttribute("aria-pressed",String(r===a));O()}});e.audioToggle.addEventListener("change",()=>{t.includeAudio=e.audioToggle.checked}),e.bgImageBtn.addEventListener("click",()=>e.bgImageInput.click()),e.bgImageInput.addEventListener("change",async()=>{const a=e.bgImageInput.files?.[0];if(a){if(!a.type.startsWith("image/")){g(o("bgremove.err.bgImageRejected",{type:a.type||o("bgremove.err.unknownType")}),"error");return}t.bgImage&&t.bgImage.close?.(),t.bgImage=await createImageBitmap(a),t.background={kind:"image",image:t.bgImage},e.bgImageBtn.textContent=a.name}}),e.pickBtn.addEventListener("click",()=>e.fileInput.click()),e.fileInput.addEventListener("change",async()=>{const a=e.fileInput.files?.[0];a&&await v(a)});const m=e.dropzone;["dragenter","dragover"].forEach(a=>{m.addEventListener(a,s=>{s.preventDefault(),m.dataset.active="true"})}),["dragleave","drop"].forEach(a=>{m.addEventListener(a,s=>{s.preventDefault(),m.dataset.active="false"})}),m.addEventListener("drop",async a=>{a.preventDefault();const s=a.dataTransfer?.files?.[0];s&&await v(s)}),e.exportBtn.addEventListener("click",async()=>{if(t.exporting){t.exportAbort?.abort();return}if(!t.video){g(o("bgremove.err.loadVideoFirst"),"error");return}await x(),t.segmenter&&await y()}),e.resultClose.addEventListener("click",()=>{e.resultOverlay.classList.add("hidden")});async function v(a){if(!te(a)){g(o("bgremove.err.rejectedFile",{type:a.type||o("bgremove.err.unknownType")}),"error");return}t.exporting&&t.exportAbort?.abort(),t.video?.dispose(),t.video=null,d.clear(),$(),L(),e.processSection.removeAttribute("hidden"),e.fileLabel.textContent=a.name,t.fileName=a.name,t.audio=null,w(),c("inspect","active");try{const[s,r]=await Promise.all([ae(a),ue(a)]);t.video=s,t.audio=r}catch(s){c("inspect","pending"),g(o("bgremove.err.loadVideo",{msg:s.message}),"error");return}w(),l.resize(t.video.width,t.video.height),E(t.video.width,t.video.height),c("inspect","done",`${a.name} · ${t.video.width}×${t.video.height} · ${t.video.durationSec.toFixed(1)}s · ${t.audio?o("bgremove.inspect.audio",{n:t.audio.numberOfChannels}):o("bgremove.inspect.noAudio")}`),t.video.element.currentTime=0,await new Promise(s=>{t.video.element.addEventListener("seeked",()=>s(),{once:!0})}),F(u,e.tileSource,t.video.element),await x(),t.segmenter&&await y()}async function x(a){if(!t.loadingModel){if(t.segmenter&&t.segmenter.model.id===t.modelId){c("load-model","done",`${z[t.modelId].label} · ${t.segmenter.device}`);return}if(t.loadingModel=!0,c("load-model","active",`${z[t.modelId].label} · ${z[t.modelId].weightsSize}`),e.statModel.textContent=z[t.modelId].label,t.segmenter){try{await t.segmenter.dispose()}catch{}t.segmenter=null}try{t.segmenter=await ee(t.modelId,t.runtime.device,({phase:s,progress:r})=>{c("load-model","active",`${s} · ${(r*100).toFixed(0)}%`)}),c("load-model","done",`${z[t.modelId].label} · ${t.segmenter.device}`)}catch(s){c("load-model","pending"),g(o("bgremove.err.modelLoad",{msg:s.message}),"error")}finally{t.loadingModel=!1}}}async function y(){if(!t.video||!t.segmenter||t.exporting)return;if(!await be(t.format)){g(o("bgremove.err.cannotEncode",{format:t.format.toUpperCase()}),"error");return}t.exporting=!0,t.exportAbort=new AbortController,t.disposeOnCancel=!1;const a=Q({tool:o("tool.bgremove.name"),route:"bgremove",label:t.fileName||o("bgremove.job.label"),detail:o("bgremove.status.starting"),progress:0,onCancel:()=>{t.exportAbort?.abort(),t.disposeOnCancel=!0}});e.exportBtn.textContent=o("bgremove.action.cancel"),e.exportStatus.textContent=o("bgremove.status.starting"),c("segment","active",o("bgremove.status.starting")),c("encode","pending"),P(!0),e.segmentProgress.style.width="0%";let s=null;try{s=await ve({source:t.video,segmenter:t.segmenter,compositor:l,background:t.background,format:t.format,chromaKey:"#00ff00",fps:U,maskCache:d,audio:t.includeAudio?t.audio:null,signal:t.exportAbort.signal,onProgress:({frame:h,total:A,ratio:R,cacheHits:N})=>{const G=(R*100).toFixed(0),K=h>0?N/h*100:0;e.segmentProgress.style.width=`${(R*100).toFixed(2)}%`;const D=o("bgremove.status.frame",{pct:G,frame:h,total:A});e.exportStatus.textContent=D,a.update({progress:R,detail:D}),c("segment","active",o("bgremove.status.segment",{frame:h,total:A,pct:K.toFixed(0)})),t.video&&F(u,e.tileSource,t.video.element,"#0b0b0c"),F(f,e.tileOutput,l.outCanvas,"#00b340"),$()},onFinalize:()=>{const h=Math.floor(t.video.durationSec*U),A=o("bgremove.status.packaging",{format:t.format.toUpperCase()});a.update({progress:1,detail:A}),c("segment","done",o("bgremove.status.frames",{n:h})),c("encode","active",t.format==="mov"&&t.background.kind==="transparent"?o("bgremove.status.concatProres"):A)},onEncoderStatus:h=>{c("encode","active",h.message)}})}catch(h){const A=h;A.name!=="AbortError"?(g(o("bgremove.err.processFailed",{msg:A.message}),"error"),a.fail(A.message)):a.markCancelled(),c("segment","pending"),c("encode","pending")}finally{if(t.exporting=!1,t.exportAbort=null,e.exportBtn.textContent=t.video?o("bgremove.action.processAgain"):o("bgremove.action.processArrow"),t.disposeOnCancel&&(t.disposeOnCancel=!1,t.segmenter)){try{await t.segmenter.dispose()}catch{}t.segmenter=null,e.statModel.textContent="—",c("load-model","pending")}}if(!s)return;a.done(`${(s.bytes/(1024*1024)).toFixed(1)} MB`);const r=(s.bytes/(1024*1024)).toFixed(1),p=`${s.format}${s.hasAlpha?o("bgremove.flavour.alpha"):t.background.kind==="transparent"?o("bgremove.flavour.greenscreen"):""}${s.hasAudio?o("bgremove.flavour.audio",{codec:s.audioCodec??""}).trimEnd():""}`;c("encode","done",`${r} MB · ${p}`),P(!1),t.lastExportUrl&&URL.revokeObjectURL(t.lastExportUrl),t.lastExportUrl=s.url;const b=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),S=s.hasAlpha?"-alpha":t.background.kind==="transparent"?"-greenscreen":"",M=`bgremove-${b}${S}.${s.extension}`;J("bgremove",s.blob,M),e.resultDownload.href=s.url,e.resultDownload.download=M,e.resultSize.textContent=`${r} MB · ${s.durationSec.toFixed(1)}s · ${p}`,e.resultOverlay.classList.remove("hidden"),e.exportStatus.textContent=o("bgremove.status.done",{size:r}),e.dlStrip.innerHTML="";const k=document.createElement("a");k.href=s.url,k.download=M,k.textContent=o("bgremove.dl.link",{size:r}),e.dlStrip.append(k),e.exportBtn.disabled=!1}function w(){const a=!!t.audio;e.audioRow.hidden=!a,e.audioToggle.disabled=!a,t.audio&&(e.audioSub.textContent=o("bgremove.audio.subLoaded",{channels:t.audio.numberOfChannels>1?o("bgremove.audio.stereo"):o("bgremove.audio.mono"),dur:t.audio.duration.toFixed(1)}))}function F(a,s,r,p="#0b0b0c"){if(!a)return;const b=s.width,S=s.height;a.fillStyle=p,a.fillRect(0,0,b,S),a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high";const M="videoWidth"in r&&r.videoWidth?r.videoWidth:r.width,k="videoHeight"in r&&r.videoHeight?r.videoHeight:r.height;if(!M||!k)return;const h=Math.min(b/M,S/k),A=M*h,R=k*h;a.drawImage(r,(b-A)/2,(S-R)/2,A,R)}function c(a,s,r){const p=n.querySelector(`[data-step="${a}"]`);if(!p)return;p.setAttribute("data-status",s);const b=p.querySelector('[data-role="step-note"]');b&&(b.textContent=r??"")}function L(){c("load-model",t.segmenter?"done":"pending",t.segmenter?`${z[t.modelId].label} · ${t.segmenter.device}`:""),c("inspect","pending"),c("segment","pending"),c("encode","pending"),P(!1),e.dlStrip.innerHTML="",e.exportBtn.disabled=!1}function P(a){a?e.segmentViz.removeAttribute("hidden"):e.segmentViz.setAttribute("hidden","")}function E(a,s){if(a<=0||s<=0)return;const r=720,p=Math.max(a,s),b=p>r?r/p:1,S=Math.max(1,Math.round(a*b)),M=Math.max(1,Math.round(s*b));for(const k of[e.tileSource,e.tileOutput])k.width=S,k.height=M}function B(a){for(const s of e.modelOpts)s.setAttribute("aria-pressed",String(s.dataset.id===a));e.statModel.textContent=z[a].label}function $(){const a=t.video?Math.max(1,Math.floor(t.video.durationSec*U)):0,s=d.size(),r=a>0?Math.min(100,s/a*100):0;e.statCache.textContent=a>0?`${s}/${a} (${r.toFixed(0)}%)`:"—"}function C(){return e.swatches.find(s=>s.getAttribute("aria-pressed")==="true")?.dataset.color??e.colorPicker.value??"#0b0b0c"}function g(a,s="info"){e.banner.classList.remove("hidden"),e.banner.classList.toggle("error",s==="error");const r=s==="error"?o("bgremove.banner.errorHead"):o("bgremove.banner.webgpuHead");e.banner.innerHTML=`<button class="x" aria-label="${o("bgremove.banner.dismiss")}">×</button><div><b>${r}</b></div><div>${I(a)}</div>`,e.banner.querySelector(".x")?.addEventListener("click",()=>e.banner.classList.add("hidden"))}function I(a){return a.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s])}function T(){const a=t.background.kind==="transparent";for(const r of e.formatOpts){const p=r.dataset.format,b=a&&p==="mp4";r.hidden=b}if(e.formatOpts.find(r=>r.dataset.format===t.format)?.hidden){const r=e.formatOpts.find(p=>!p.hidden);if(r){t.format=r.dataset.format;for(const p of e.formatOpts)p.setAttribute("aria-pressed",String(p===r))}}}function O(){const a=t.background.kind==="transparent";if(e.formatHint.classList.remove("warn"),!a){e.formatHint.textContent="";return}t.format==="webm"?e.formatHint.textContent=o("bgremove.format.hintWebm"):t.format==="mov"?e.formatHint.textContent=o("bgremove.format.hintMov"):(e.formatHint.textContent=o("bgremove.format.hintMp4"),e.formatHint.classList.add("warn"))}T(),O(),e.exportBtn.disabled=!0}export{qe as mountBgremove};
//# sourceMappingURL=app-CaT1GjCt.js.map
