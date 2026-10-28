import{t as r,p as he}from"./index-DbChkwc3.js";import{p as be,M as ge,A as we,a as Se,b as xe}from"./h264-eC01Si3C.js";import{i as ye,o as ke}from"./source-CBkpBijo.js";import{d as $e,e as Ce,w as Le,m as Ee}from"./audio-Bbt7GTjV.js";import{w as Me}from"./encoder-backpressure-KwTwXbZ9.js";import{w as Te,s as g,t as Ae,a as G,i as Fe,b as Be,r as ze,e as Pe}from"./fragments-kQZcphFF.js";let J=null,K=null;function je(d){if(J===d)return;J=d,K?.(),d.innerHTML=He();const s=t=>d.querySelector(t),l=s("#vt-banner"),M=s("#vt-dropzone"),Y=s("#vt-pick-btn"),T=s("#vt-file-input"),Z=s("#vt-file-label"),ee=s("#vt-stage"),c=s("#vt-preview"),$=s("#vt-timeline"),A=s("#vt-handle-start"),F=s("#vt-handle-end"),D=s("#vt-range"),te=s("#vt-playhead"),re=s("#vt-start-label"),ae=s("#vt-end-label"),ne=s("#vt-dur-label"),R=Array.from(d.querySelectorAll('[data-role="format-opt"]')),U=Array.from(d.querySelectorAll('[data-role="fps-opt"]')),u=s("#vt-export-btn"),v=s("#vt-inline-trim"),w=s("#vt-export-status"),se=s("#vt-progress"),B=s("#vt-progress-fill"),ie=s("#vt-info"),O=s("#vt-dl-strip"),oe=s("#vt-stat-res"),de=s("#vt-stat-range"),e={video:null,audio:null,startSec:0,endSec:0,format:"mp4",fps:30,processing:!1,abort:null,lastUrl:null};K=()=>{c.pause(),e.video?.element.pause()};for(const t of d.querySelectorAll("section[data-collapsible]"))t.querySelector(".sec-head")?.addEventListener("click",()=>t.toggleAttribute("data-collapsed"));l.querySelector(".x")?.addEventListener("click",()=>l.classList.add("hidden"));for(const t of R)t.addEventListener("click",()=>{e.format=t.dataset.format;for(const n of R)n.setAttribute("aria-pressed",String(n===t))});for(const t of U)t.addEventListener("click",()=>{e.fps=Number(t.dataset.fps);for(const n of U)n.setAttribute("aria-pressed",String(n===t))});Y.addEventListener("click",()=>T.click()),T.addEventListener("change",async()=>{const t=T.files?.[0];t&&await N(t)}),Te(M,t=>void N(t));const q=async()=>{if(e.processing){e.abort?.abort();return}if(!e.video){g(l,r("video-trimmer.err.noVideo"),"error");return}if(e.endSec<=e.startSec){g(l,r("video-trimmer.err.range"),"error");return}await pe()};u.addEventListener("click",q),v.addEventListener("click",q);let S=null;const z=t=>{if(!S||!e.video)return;const n=$.getBoundingClientRect(),o=Math.max(0,Math.min(1,(t.clientX-n.left)/n.width))*e.video.durationSec;S==="start"?(e.startSec=Math.min(o,e.endSec-.1),c.currentTime=e.startSec,I()):S==="end"?(e.endSec=Math.max(o,e.startSec+.1),c.currentTime=e.endSec,I()):c.currentTime=o,Q()},ce=u.innerHTML,le=v.innerHTML;function I(){e.processing||(O.innerHTML="",u.innerHTML=ce,v.innerHTML=le,w.classList.add("hidden"),w.textContent="")}const j=t=>{S=null,$.hasPointerCapture?.(t.pointerId)&&$.releasePointerCapture(t.pointerId),window.removeEventListener("pointermove",z),window.removeEventListener("pointerup",j)},P=t=>n=>{n.preventDefault(),S=t,z(n),window.addEventListener("pointermove",z),window.addEventListener("pointerup",j)};A.addEventListener("pointerdown",P("start")),F.addEventListener("pointerdown",P("end")),$.addEventListener("pointerdown",t=>{t.target===A||t.target===F||P("play")(t)}),c.addEventListener("timeupdate",()=>{e.video&&(c.currentTime>e.endSec&&(c.currentTime=e.startSec),W())});async function N(t){if(!ye(t)){g(l,r("video-trimmer.err.rejected",{type:t.type||r("video-trimmer.unknownType")}),"error");return}e.processing&&e.abort?.abort(),e.video?.dispose(),e.video=null,e.audio=null,Z.textContent=t.name;try{const[n,p]=await Promise.all([ke(t),$e(t)]);e.video=n,e.audio=p}catch(n){g(l,r("video-trimmer.err.load",{msg:n.message}),"error");return}c.src=e.video.element.currentSrc||e.video.element.src,c.load(),await new Promise(n=>c.addEventListener("loadedmetadata",()=>n(),{once:!0})),e.startSec=0,e.endSec=e.video.durationSec,oe.textContent=`${e.video.width}×${e.video.height}`,ie.textContent=`${t.name} · ${e.video.width}×${e.video.height} · ${e.video.durationSec.toFixed(1)}s`,ee.removeAttribute("hidden"),u.disabled=!1,v.disabled=!1,Q()}function Q(){if(!e.video)return;const t=e.video.durationSec,n=e.startSec/t*100,p=e.endSec/t*100;A.style.left=`${n}%`,F.style.left=`${p}%`,D.style.left=`${n}%`,D.style.width=`${p-n}%`,re.textContent=E(e.startSec),ae.textContent=E(e.endSec),ne.textContent=`${(e.endSec-e.startSec).toFixed(2)}s`,de.textContent=`${E(e.startSec)} – ${E(e.endSec)}`,W()}function W(){if(!e.video)return;const t=e.video.durationSec,n=Math.max(0,Math.min(100,c.currentTime/t*100));te.style.left=`${n}%`}async function pe(){if(!e.video)return;if(typeof VideoEncoder>"u"){g(l,r("video-trimmer.err.noEncoder"),"error");return}e.processing=!0,e.abort=new AbortController;const t=e.abort.signal;u.textContent=r("video-trimmer.cancel"),v.textContent=r("video-trimmer.cancel"),v.disabled=!1,w.classList.remove("hidden"),se.removeAttribute("hidden"),B.style.width="0%";const n=e.video.width%2===0?e.video.width:e.video.width+1,p=e.video.height%2===0?e.video.height:e.video.height+1,o=e.fps,C=Math.max(1,Math.floor((e.endSec-e.startSec)*o)),me=e.format==="webm"?"vp09.00.10.08":await be(n,p,o),X=e.format==="webm"?"video/webm":"video/mp4",ve=e.format==="webm"?"webm":"mp4";let f=null;try{f=await Ce(e.audio,e.format,e.startSec,e.startSec+C/o,t)}catch(a){console.warn("[video-trimmer] audio encode failed; exporting video only",a)}let x;if(e.format==="webm"){const a=new ge({target:new we,video:{codec:"V_VP9",width:n,height:p,frameRate:o},...f?{audio:Le(f)}:{}});for(const i of f?.chunks??[])a.addAudioChunk(i.chunk,i.meta);x={addChunk:(i,m)=>a.addVideoChunk(i,m),finalize:()=>a.finalize(),getBuffer:()=>a.target.buffer}}else{const a=new Se({target:new xe,video:{codec:"avc",width:n,height:p,frameRate:o},...f?{audio:Ee(f)}:{},fastStart:"in-memory",firstTimestampBehavior:"offset"});for(const i of f?.chunks??[])a.addAudioChunk(i.chunk,i.meta);x={addChunk:(i,m)=>a.addVideoChunk(i,m),finalize:()=>a.finalize(),getBuffer:()=>a.target.buffer}}let y=null;const h=new VideoEncoder({output:(a,i)=>x.addChunk(a,i),error:a=>{y=a}});h.configure({codec:me,width:n,height:p,bitrate:8e6,framerate:o,...e.format==="webm"?{}:{avc:{format:"avc"}}});const b=e.video.element;b.muted=!0,b.pause();const ue=a=>new Promise(i=>{if(Math.abs(b.currentTime-a)<.5/o){i();return}let m=!1;const k=()=>{m||(m=!0,b.removeEventListener("seeked",_),clearTimeout(fe),i())},_=()=>k();b.addEventListener("seeked",_),b.currentTime=a;const fe=setTimeout(k,800)});try{for(let a=0;a<C;a++){if(t.aborted)throw new DOMException("Aborted","AbortError");if(y)throw y;const i=e.startSec+a/o;await ue(i);const m=new VideoFrame(b,{timestamp:Math.round(a/o*1e6),duration:Math.round(1/o*1e6)});if(h.encode(m,{keyFrame:a%(o*2)===0}),m.close(),h.encodeQueueSize>8&&await Me(h,3),a%3===0){const k=(a+1)/C*100;B.style.width=`${k.toFixed(1)}%`,w.textContent=r("video-trimmer.progress",{pct:k.toFixed(0),i:a+1,n:C})}}if(await h.flush(),y)throw y;x.finalize()}catch(a){const i=a;i.name!=="AbortError"&&g(l,r("video-trimmer.err.trim",{msg:i.message}),"error");try{h.close()}catch{}e.processing=!1,e.abort=null,u.textContent=r("video-trimmer.again"),v.textContent=r("video-trimmer.again");return}finally{try{h.close()}catch{}}const L=new Blob([x.getBuffer()],{type:X});e.lastUrl&&URL.revokeObjectURL(e.lastUrl);const H=URL.createObjectURL(L);e.lastUrl=H;const V=`trim-${new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}.${ve}`;he("video-trimmer",L,V),Be(H,V),ze(O,{filename:V,url:H,meta:`${(L.size/1024/1024).toFixed(2)} MB · ${(e.endSec-e.startSec).toFixed(2)}s · ${Pe(X)}`}),e.processing=!1,e.abort=null,u.textContent=r("video-trimmer.again"),v.textContent=r("video-trimmer.again"),w.textContent=r("video-trimmer.done",{size:(L.size/1024/1024).toFixed(2)}),B.style.width="100%"}}function He(){return`
    ${Ae({name:r("tool.video-trimmer.name").toUpperCase(),code:"t·014",prefix:"vt",withRuntime:!1,stats:[{k:r("video-trimmer.stat.size"),id:"stat-res"},{k:r("video-trimmer.stat.range"),id:"stat-range"}]})}

    <main class="panel panel-split">
      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${G(r("video-trimmer.sec.format"))}
          <div class="sec-body">
            <div class="opt-group">
              <button class="opt" data-role="format-opt" data-format="mp4" aria-pressed="true">
                <span class="dot"></span><span class="label">MP4</span><span class="meta">h.264</span>
                <span class="sub">${r("video-trimmer.mp4.sub")}</span>
              </button>
              <button class="opt" data-role="format-opt" data-format="webm" aria-pressed="false">
                <span class="dot"></span><span class="label">WebM</span><span class="meta">vp9</span>
                <span class="sub">${r("video-trimmer.webm.sub")}</span>
              </button>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${G(r("video-trimmer.sec.fps"))}
          <div class="sec-body">
            <div class="opt-group">
              <button class="opt" data-role="fps-opt" data-fps="24" aria-pressed="false">
                <span class="dot"></span><span class="label">24 fps</span><span class="meta">${r("video-trimmer.fps.cinema")}</span>
              </button>
              <button class="opt" data-role="fps-opt" data-fps="30" aria-pressed="true">
                <span class="dot"></span><span class="label">30 fps</span><span class="meta">${r("video-trimmer.fps.default")}</span>
              </button>
              <button class="opt" data-role="fps-opt" data-fps="60" aria-pressed="false">
                <span class="dot"></span><span class="label">60 fps</span><span class="meta">${r("video-trimmer.fps.smooth")}</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        ${Fe({prefix:"vt",cta:r("video-trimmer.cta"),hint:r("video-trimmer.hint"),accept:"video/*"})}
        <div class="dl" id="vt-dl-strip"></div>
        <div id="vt-stage" class="vt-stage" hidden>
          <video id="vt-preview" class="vt-preview" controls muted></video>
          <div class="vt-trim">
            <div class="vt-trim-labels">
              <span><span class="k">${r("video-trimmer.start")}</span> <span id="vt-start-label" class="v">0:00</span></span>
              <span><span class="k">${r("video-trimmer.end")}</span> <span id="vt-end-label" class="v">0:00</span></span>
              <span><span class="k">${r("video-trimmer.length")}</span> <span id="vt-dur-label" class="v">0.00s</span></span>
            </div>
            <div id="vt-timeline" class="vt-timeline">
              <div id="vt-range" class="vt-range"></div>
              <div id="vt-playhead" class="vt-playhead"></div>
              <div id="vt-handle-start" class="vt-handle vt-handle-start"></div>
              <div id="vt-handle-end" class="vt-handle vt-handle-end"></div>
            </div>
          </div>
          <div id="vt-progress" class="step-pbar" hidden><div id="vt-progress-fill" class="step-pbar-fill"></div></div>
          <div class="vt-cta-row">
            <button class="cta-btn cta-btn-sm" id="vt-inline-trim" type="button">
              <svg viewBox="0 0 16 16" class="cta-icon" aria-hidden="true"><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="4" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.7 5.7l8.3 6.3M5.7 10.3l8.3-6.3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              ${r("video-trimmer.trimClip")}
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="transport">
      <button class="btn ghost" id="vt-export-btn" disabled>${r("video-trimmer.trim")} <span class="arrow">›</span></button>
      <div id="vt-info" class="img-info">${r("video-trimmer.info.empty")}</div>
      <span id="vt-export-status" class="action-status hidden"></span>
    </footer>
  `}function E(d){if(!isFinite(d)||d<0)return"0:00";const s=Math.floor(d/60),l=Math.floor(d%60),M=Math.floor(d%1*100);return`${s}:${String(l).padStart(2,"0")}.${String(M).padStart(2,"0")}`}export{je as mountVideoTrimmer};
//# sourceMappingURL=app-BJjuGLR7.js.map
