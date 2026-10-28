import{t as s,s as ue,p as me}from"./index-DbChkwc3.js";import{p as fe,M as he,A as be,a as ge,b as we}from"./h264-eC01Si3C.js";import{i as ye,o as xe}from"./source-CBkpBijo.js";import{d as $e,e as Me,w as ke,m as Ce}from"./audio-Bbt7GTjV.js";import{w as Se}from"./encoder-backpressure-KwTwXbZ9.js";import{w as Ae,s as E,t as Ee,a as _,i as Le,b as ze,r as Te,e as Fe}from"./fragments-kQZcphFF.js";const $=30,X={"9:16":9/16,"4:5":4/5,"1:1":1};let ee=null;function qe(C){if(ee===C)return;ee=C,C.innerHTML=Re();const y=e=>C.querySelector(e),S=y("#vv-banner"),te=y("#vv-dropzone"),ae=y("#vv-pick-btn"),B=y("#vv-file-input"),J=y("#vv-file-label"),Q=Array.from(C.querySelectorAll('[data-role="aspect-opt"]')),W=Array.from(C.querySelectorAll('[data-role="mode-opt"]')),Y=Array.from(C.querySelectorAll('[data-role="format-opt"]')),d=y("#vv-preview"),oe=y("#vv-stage"),se=y("#vv-progress"),O=y("#vv-progress-fill"),A=y("#vv-export-btn"),P=y("#vv-export-status"),re=y("#vv-info"),ne=y("#vv-dl-strip"),ie=y("#vv-stat-size"),ce=y("#vv-stat-out"),t={video:null,audio:null,aspect:"9:16",mode:"center",format:"mp4",crop:{x:0,y:0,w:0,h:0},processing:!1,abort:null,lastUrl:null};for(const e of C.querySelectorAll("section[data-collapsible]"))e.querySelector(".sec-head")?.addEventListener("click",()=>e.toggleAttribute("data-collapsed"));S.querySelector(".x")?.addEventListener("click",()=>S.classList.add("hidden"));for(const e of Q)e.addEventListener("click",()=>{const a=e.dataset.aspect;t.aspect=a;for(const o of Q)o.setAttribute("aria-pressed",String(o===e));t.mode==="custom"&&t.video&&(t.crop=V()),U(),F()});for(const e of W)e.addEventListener("click",()=>{const a=e.dataset.mode;t.mode=a;for(const o of W)o.setAttribute("aria-pressed",String(o===e));a==="custom"&&t.video&&(t.crop=V()),F()});for(const e of Y)e.addEventListener("click",()=>{const a=e.dataset.format;t.format=a;for(const o of Y)o.setAttribute("aria-pressed",String(o===e))});ae.addEventListener("click",()=>B.click()),B.addEventListener("change",async()=>{const e=B.files?.[0];e&&await G(e)}),Ae(te,e=>void G(e)),A.addEventListener("click",async()=>{if(t.processing){t.abort?.abort();return}if(!t.video){E(S,s("vertical-video.msg.noVideo"),"error");return}await pe()});async function G(e){if(!ye(e)){E(S,s("vertical-video.msg.rejected",{type:e.type||s("vertical-video.msg.unknown")}),"error");return}t.processing&&t.abort?.abort(),t.video?.dispose(),t.video=null,t.audio=null,J.textContent=e.name;try{const[a,o]=await Promise.all([xe(e),$e(e)]);t.video=a,t.audio=o}catch(a){E(S,s("vertical-video.msg.loadFailed",{msg:a.message}),"error");return}ie.textContent=`${t.video.width}×${t.video.height}`,re.textContent=`${e.name} · ${t.video.width}×${t.video.height} · ${t.video.durationSec.toFixed(1)}s`,oe.removeAttribute("hidden"),A.disabled=!1,A.textContent=s("vertical-video.btn.startArrow"),t.video.element.currentTime=0,await new Promise(a=>t.video.element.addEventListener("seeked",()=>a(),{once:!0})),t.crop=V(),U(),F()}function V(){const e=t.video,a=e.width,o=e.height,i=X[t.aspect];let n=o,r=n*i;return r>a&&(r=a,n=r/i),{x:(a-r)/2,y:(o-n)/2,w:r,h:n}}function de(e){const a=t.video,o=Math.min(e.w,a.width),i=Math.min(e.h,a.height),n=Math.max(0,Math.min(a.width-o,e.x)),r=Math.max(0,Math.min(a.height-i,e.y));return{x:n,y:r,w:o,h:i}}const H=()=>t.video?d.width/t.video.width:1;function I(e){const a=d.getBoundingClientRect(),o=(e.clientX-a.left)*(d.width/a.width),i=(e.clientY-a.top)*(d.height/a.height),n=H();return{x:o/n,y:i/n}}const K=()=>18/H();let p=null;d.addEventListener("pointerdown",e=>{if(t.mode!=="custom"||!t.video||t.processing)return;const a=I(e),o=t.crop,i=K(),n=Math.abs(a.x-(o.x+o.w))<=i&&Math.abs(a.y-(o.y+o.h))<=i,r=a.x>=o.x&&a.x<=o.x+o.w&&a.y>=o.y&&a.y<=o.y+o.h;if(n)p={kind:"resize",px:a.x,py:a.y,orig:{...o}};else if(r)p={kind:"move",px:a.x,py:a.y,orig:{...o}};else return;d.setPointerCapture(e.pointerId),e.preventDefault()}),d.addEventListener("pointermove",e=>{if(t.mode!=="custom"||!t.video)return;if(!p){const n=I(e),r=t.crop,v=K(),u=Math.abs(n.x-(r.x+r.w))<=v&&Math.abs(n.y-(r.y+r.h))<=v,m=n.x>=r.x&&n.x<=r.x+r.w&&n.y>=r.y&&n.y<=r.y+r.h;d.style.cursor=u?"nwse-resize":m?"grab":"default";return}const a=I(e),o=a.x-p.px,i=a.y-p.py;if(p.kind==="move")t.crop=de({...p.orig,x:p.orig.x+o,y:p.orig.y+i});else{const n=X[t.aspect],r=t.video,v=Math.max(32,r.width*.08);let u=p.orig.w+o;u=Math.max(v,Math.min(r.width-p.orig.x,u));let m=u/n;m>r.height-p.orig.y&&(m=r.height-p.orig.y,u=m*n),t.crop={x:p.orig.x,y:p.orig.y,w:u,h:m}}d.style.cursor=p.kind==="resize"?"nwse-resize":"grabbing",U(),F(),e.preventDefault()});const N=e=>{if(p){p=null;try{d.releasePointerCapture(e.pointerId)}catch{}}};d.addEventListener("pointerup",N),d.addEventListener("pointercancel",N);function D(){if(!t.video)return{w:0,h:0};if(t.mode==="custom"&&t.crop.w>0){const i=Math.max(2,Math.round(t.crop.w/2)*2),n=Math.max(2,Math.round(t.crop.h/2)*2);return{w:i,h:n}}const e=X[t.aspect],a=t.video.height;return{w:Math.max(2,Math.round(a*e/2)*2),h:a}}function U(){const{w:e,h:a}=D();ce.textContent=`${e}×${a} (${t.aspect})`}function F(){if(!t.video)return;const e=d.getContext("2d");if(!e)return;if(t.mode==="custom"){le(e);return}const{w:a,h:o}=D(),i=480,n=Math.min(i/a,i/o);d.width=Math.round(a*n),d.height=Math.round(o*n),Z(e,t.video.element,t.video.width,t.video.height,d.width,d.height,t.mode)}function le(e){const a=t.video,o=a.width,i=a.height,n=520,r=Math.min(n/o,n/i);d.width=Math.round(o*r),d.height=Math.round(i*r);const v=d.width,u=d.height,m=getComputedStyle(document.documentElement).getPropertyValue("--hot").trim()||"#6f97ff";e.clearRect(0,0,v,u),e.drawImage(a.element,0,0,v,u),e.fillStyle="rgba(0,0,0,0.58)",e.fillRect(0,0,v,u);const f=t.crop,h=f.x*r,w=f.y*r,x=f.w*r,g=f.h*r;e.drawImage(a.element,f.x,f.y,f.w,f.h,h,w,x,g),e.strokeStyle="rgba(255,255,255,0.35)",e.lineWidth=1,e.beginPath();for(let M=1;M<3;M++)e.moveTo(h+x*M/3,w),e.lineTo(h+x*M/3,w+g),e.moveTo(h,w+g*M/3),e.lineTo(h+x,w+g*M/3);e.stroke(),e.strokeStyle=m,e.lineWidth=2,e.strokeRect(h+1,w+1,Math.max(0,x-2),Math.max(0,g-2));const b=14;e.fillStyle=m,e.fillRect(h+x-b,w+g-b,b,b)}function Z(e,a,o,i,n,r,v){if(e.fillStyle="#000",e.fillRect(0,0,n,r),v==="custom"){const f=t.crop;e.drawImage(a,f.x,f.y,f.w,f.h,0,0,n,r);return}if(v==="letterbox"){e.save();const f=Math.max(n/o,r/i),h=o*f,w=i*f;e.filter="blur(28px) brightness(0.5)",e.drawImage(a,(n-h)/2,(r-w)/2,h,w),e.filter="none",e.restore();const x=Math.min(n/o,r/i),g=o*x,b=i*x;e.drawImage(a,(n-g)/2,(r-b)/2,g,b);return}const u=Math.round(i*n/r);let m=0;v==="center"?m=Math.round((o-u)/2):v==="right"&&(m=Math.max(0,o-u)),m=Math.max(0,Math.min(o-u,m)),e.drawImage(a,m,0,u,i,0,0,n,r)}async function pe(){if(!t.video)return;if(typeof VideoEncoder>"u"){E(S,s("vertical-video.msg.noEncoder"),"error");return}t.processing=!0,t.abort=new AbortController;const e=t.abort.signal,a=ue({tool:s("tool.vertical-video.name"),route:"vertical-video",label:J.textContent||s("vertical-video.job.video"),detail:s("vertical-video.status.starting"),progress:0,onCancel:()=>{t.abort?.abort()}});A.textContent=s("vertical-video.btn.cancel"),P.classList.remove("hidden"),se.removeAttribute("hidden"),O.style.width="0%";const{w:o,h:i}=D(),n=new OffscreenCanvas(o,i),r=n.getContext("2d");if(!r){E(S,s("vertical-video.msg.noOffscreen"),"error"),t.processing=!1;return}const v=Math.max(1,Math.floor(t.video.durationSec*$)),u=t.format==="webm"?"vp09.00.10.08":await fe(o,i,$),m=t.format==="webm"?"video/webm":"video/mp4",f=t.format==="webm"?"webm":"mp4";let h=null;try{h=await Me(t.audio,t.format,0,v/$,e)}catch(c){console.warn("[vertical-video] audio encode failed; exporting video only",c)}let w;if(t.format==="webm"){const c=new he({target:new be,video:{codec:"V_VP9",width:o,height:i,frameRate:$},...h?{audio:ke(h)}:{}});for(const l of h?.chunks??[])c.addAudioChunk(l.chunk,l.meta);w={addChunk:(l,k)=>c.addVideoChunk(l,k),finalize:()=>c.finalize(),getBuffer:()=>c.target.buffer}}else{const c=new ge({target:new we,video:{codec:"avc",width:o,height:i,frameRate:$},...h?{audio:Ce(h)}:{},fastStart:"in-memory",firstTimestampBehavior:"offset"});for(const l of h?.chunks??[])c.addAudioChunk(l.chunk,l.meta);w={addChunk:(l,k)=>c.addVideoChunk(l,k),finalize:()=>c.finalize(),getBuffer:()=>c.target.buffer}}let x=null;const g=new VideoEncoder({output:(c,l)=>w.addChunk(c,l),error:c=>{x=c}});g.configure({codec:u,width:o,height:i,bitrate:1e7,framerate:$,...t.format==="webm"?{}:{avc:{format:"avc"}}});const b=t.video.element,M=b.muted;b.muted=!0,b.pause();const ve=c=>new Promise(l=>{if(Math.abs(b.currentTime-c)<.5/$){l();return}let k=!1;const z=()=>{k||(k=!0,b.removeEventListener("seeked",T),clearTimeout(R),l())},T=()=>z();b.addEventListener("seeked",T),b.currentTime=c;const R=setTimeout(z,800)});try{for(let c=0;c<v;c++){if(e.aborted)throw new DOMException("Aborted","AbortError");if(x)throw x;const l=c/$;await ve(l),Z(r,b,t.video.width,t.video.height,o,i,t.mode);const k=new VideoFrame(n,{timestamp:Math.round(l*1e6),duration:Math.round(1/$*1e6)});if(g.encode(k,{keyFrame:c%($*2)===0}),k.close(),g.encodeQueueSize>8&&await Se(g,3),c%4===0){const z=(c+1)/v,T=z*100;O.style.width=`${T.toFixed(1)}%`;const R=s("vertical-video.status.frameProgress",{pct:T.toFixed(0),frame:c+1,total:v});P.textContent=R,a.update({progress:z,detail:R})}}if(a.update({progress:1,detail:s("vertical-video.status.packaging",{fmt:t.format.toUpperCase()})}),await g.flush(),x)throw x;w.finalize()}catch(c){const l=c;l.name==="AbortError"?a.markCancelled():(E(S,s("vertical-video.msg.exportFailed",{msg:l.message}),"error"),a.fail(l.message)),t.processing=!1,t.abort=null,A.textContent=t.video?s("vertical-video.btn.again"):s("vertical-video.btn.startArrow");try{g.close()}catch{}b.muted=M;return}finally{try{g.close()}catch{}b.muted=M}const L=new Blob([w.getBuffer()],{type:m});t.lastUrl&&URL.revokeObjectURL(t.lastUrl);const q=URL.createObjectURL(L);t.lastUrl=q;const j=`vertical-${new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}.${f}`;me("vertical-video",L,j),ze(q,j),Te(ne,{filename:j,url:q,meta:`${(L.size/1024/1024).toFixed(2)} MB · ${o}×${i} · ${Fe(m)}`}),t.processing=!1,t.abort=null,A.textContent=s("vertical-video.btn.again"),P.textContent=s("vertical-video.status.done",{size:(L.size/1024/1024).toFixed(2)}),O.style.width="100%",a.done(`${(L.size/1024/1024).toFixed(2)} MB · ${o}×${i}`)}}function Re(){return`
    ${Ee({name:s("vertical-video.brand"),code:"t·008",prefix:"vv",withRuntime:!1,stats:[{k:s("vertical-video.stat.source"),id:"stat-size"},{k:s("vertical-video.stat.output"),id:"stat-out"}]})}

    <main class="panel panel-split">
      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${_(s("vertical-video.sec.aspect"))}
          <div class="sec-body">
            <div class="opt-group">
              <button class="opt" data-role="aspect-opt" data-aspect="9:16" aria-pressed="true">
                <span class="dot"></span><span class="label">9:16</span><span class="meta">${s("vertical-video.aspect.portrait")}</span>
                <span class="sub">${s("vertical-video.aspect.916.sub")}</span>
              </button>
              <button class="opt" data-role="aspect-opt" data-aspect="4:5" aria-pressed="false">
                <span class="dot"></span><span class="label">4:5</span><span class="meta">${s("vertical-video.aspect.portrait")}</span>
                <span class="sub">${s("vertical-video.aspect.45.sub")}</span>
              </button>
              <button class="opt" data-role="aspect-opt" data-aspect="1:1" aria-pressed="false">
                <span class="dot"></span><span class="label">1:1</span><span class="meta">${s("vertical-video.aspect.square")}</span>
                <span class="sub">${s("vertical-video.aspect.11.sub")}</span>
              </button>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${_(s("vertical-video.sec.framing"))}
          <div class="sec-body">
            <div class="opt-group">
              <button class="opt" data-role="mode-opt" data-mode="center" aria-pressed="true">
                <span class="dot"></span><span class="label">${s("vertical-video.mode.center")}</span><span class="meta">${s("vertical-video.mode.crop")}</span>
                <span class="sub">${s("vertical-video.mode.center.sub")}</span>
              </button>
              <button class="opt" data-role="mode-opt" data-mode="left" aria-pressed="false">
                <span class="dot"></span><span class="label">${s("vertical-video.mode.left")}</span><span class="meta">${s("vertical-video.mode.crop")}</span>
              </button>
              <button class="opt" data-role="mode-opt" data-mode="right" aria-pressed="false">
                <span class="dot"></span><span class="label">${s("vertical-video.mode.right")}</span><span class="meta">${s("vertical-video.mode.crop")}</span>
              </button>
              <button class="opt" data-role="mode-opt" data-mode="letterbox" aria-pressed="false">
                <span class="dot"></span><span class="label">${s("vertical-video.mode.letterbox")}</span><span class="meta">${s("vertical-video.mode.letterbox.meta")}</span>
                <span class="sub">${s("vertical-video.mode.letterbox.sub")}</span>
              </button>
              <button class="opt" data-role="mode-opt" data-mode="custom" aria-pressed="false">
                <span class="dot"></span><span class="label">${s("vertical-video.mode.custom")}</span><span class="meta">${s("vertical-video.mode.custom.meta")}</span>
                <span class="sub">${s("vertical-video.mode.custom.sub")}</span>
              </button>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${_(s("vertical-video.sec.format"))}
          <div class="sec-body">
            <div class="opt-group">
              <button class="opt" data-role="format-opt" data-format="mp4" aria-pressed="true">
                <span class="dot"></span><span class="label">MP4</span><span class="meta">h.264</span>
                <span class="sub">${s("vertical-video.fmt.mp4.sub")}</span>
              </button>
              <button class="opt" data-role="format-opt" data-format="webm" aria-pressed="false">
                <span class="dot"></span><span class="label">WebM</span><span class="meta">vp9</span>
                <span class="sub">${s("vertical-video.fmt.webm.sub")}</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        ${Le({prefix:"vv",cta:s("vertical-video.intake.cta"),hint:s("vertical-video.intake.hint"),accept:"video/*"})}
        <div class="dl" id="vv-dl-strip"></div>
        <div id="vv-stage" class="vv-stage" hidden>
          <div class="vv-preview-wrap">
            <canvas id="vv-preview"></canvas>
          </div>
          <div class="vv-start-row">
            <button class="cta-btn cta-btn-sm" id="vv-export-btn">${s("vertical-video.btn.start")} <span class="arrow">›</span></button>
          </div>
          <div id="vv-progress" class="step-pbar" hidden>
            <div id="vv-progress-fill" class="step-pbar-fill"></div>
          </div>
        </div>
      </div>
    </main>

    <footer class="transport">
      <div id="vv-info" class="img-info">${s("vertical-video.info.empty")}</div>
      <span id="vv-export-status" class="action-status hidden"></span>
    </footer>
  `}export{qe as mountVerticalVideo};
//# sourceMappingURL=app-Drj-TDg5.js.map
