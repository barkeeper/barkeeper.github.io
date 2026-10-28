import{t,m as at,s as ot,p as rt}from"./index-DbChkwc3.js";import{j,g as it,d as dt,h as lt}from"./transformers.web-Cyg6ssfE.js";import{configureTransformersEnv as ct,probeWebGPU as ut}from"./runtime-Jg5t-PhK.js";import{b as pt,e as bt}from"./model-cache-CVSf8zme.js";import{f as H,c as X}from"./model-catalog-DAmf0QpZ.js";import{r as gt,g as tt,d as mt,h as ft,e as ht}from"./gpu-guard-C1llK9pG.js";import{s as K,e as vt,t as wt,a as et,b as yt}from"./fragments-kQZcphFF.js";import{m as xt}from"./model-status-CS7V2bNZ.js";function St(){const r=Math.sqrt(85e-5),l=Math.sqrt(.012),c=new Float64Array(1e3);for(let o=0;o<1e3;o++){const x=o/999,f=r+(l-r)*x;c[o]=f*f}const u=new Float64Array(1e3);for(let o=0;o<1e3;o++)u[o]=1-c[o];const m=new Float64Array(1e3);let d=1;for(let o=0;o<1e3;o++)d*=u[o],m[o]=d;const p=new Float64Array(1e3);for(let o=0;o<1e3;o++)p[o]=Math.sqrt((1-m[o])/m[o]);const b=999,g=p[b],v=g,y=Math.sqrt(g*g+1);return{initNoiseSigma:v,modelInputScale:y,timestep:BigInt(b),sigma:g}}function $t(e,s,n){if(e.length!==s.length)throw new Error(`sample/epsilon length mismatch: ${e.length} vs ${s.length}`);const r=new Float32Array(e.length);for(let l=0;l<e.length;l++)r[l]=e[l]-n*s[l];return r}function kt(e,s,n){const r=Et(s>>>0),l=new Float32Array(e);for(let c=0;c<e;c+=2){let u=0;for(;u===0;)u=r();const m=r(),d=Math.sqrt(-2*Math.log(u)),p=2*Math.PI*m;l[c]=d*Math.cos(p)*n,c+1<e&&(l[c+1]=d*Math.sin(p)*n)}return l}function Et(e){let s=e;return function(){s|=0,s=s+1831565813|0;let n=s;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}const q="schmuell/sd-turbo-ort-web",C=512,_=C/8,Tt=.18215;let I=null,W=null;const Z=new Set;function F(e){W=e;for(const s of Z)s(e)}function At(e){return Z.add(e),W&&e(W),()=>Z.delete(e)}function nt(){return I||(I=_t(),I.catch(()=>{I=null})),I}async function _t(){ct();const e=it;if(e.wasm&&(e.wasm.wasmPaths="/ort/",e.wasm.numThreads=1),e.webgpu&&(e.webgpu.powerPreference="high-performance"),!(typeof navigator<"u"&&"gpu"in navigator&&!!navigator.gpu))throw new Error(t("sd-turbo.err.noGpu"));try{if(!await navigator.gpu.requestAdapter({powerPreference:"high-performance"}))throw new Error("no adapter")}catch(b){throw new Error(t("sd-turbo.err.noAdapter",{message:b.message}))}const n=["webgpu"],r="webgpu",l={executionProviders:n,graphOptimizationLevel:"disabled",enableMemPattern:!1,enableCpuMemArena:!1};F({phase:t("sd-turbo.phase.tokenizer"),progress:.02});const c=await dt.from_pretrained(q),u=async(b,g,v,y)=>{const o=at(q,b);F({phase:t("sd-turbo.phase.loading",{label:g,size:H(X(q,b))}),progress:v});const x=pt(w=>{w.url!==o||!w.total||w.done||F({phase:t("sd-turbo.phase.downloading",{label:g,loaded:H(w.loaded),total:H(w.total)}),progress:v+(y-v)*Math.min(1,w.loaded/w.total)})});let f;try{f=await bt(o,{expectedBytes:X(q,b)})}finally{x()}try{return F({phase:t("sd-turbo.phase.init",{label:g}),progress:y}),await lt.create(f.url,l)}finally{f.release()}},m=await u("text_encoder/model.onnx",t("sd-turbo.part.textEncoder"),.05,.3),d=await u("unet/model.onnx",t("sd-turbo.part.unet"),.3,.9),p=await u("vae_decoder/model.onnx",t("sd-turbo.part.vae"),.9,.97);return F({phase:t("sd-turbo.phase.ready"),progress:1}),{tokenizer:c,textEncoder:m,unet:d,vaeDecoder:p,device:r}}async function Ct(e){const s=performance.now(),n=await nt(),r=e.onStage??(()=>{}),l=(e.seed??Math.floor(Math.random()*2**30))>>>0,c=St();r(t("sd-turbo.stage.tokenising"),.05);const u=n.tokenizer,d=u(e.prompt,{padding:"max_length",max_length:77,truncation:!0}).input_ids.data,p=new Int32Array(77);if(d instanceof BigInt64Array)for(let a=0;a<77;a++)p[a]=Number(d[a]??0n);else for(let a=0;a<77;a++)p[a]=d[a]??0;const b=new j("int32",p,[1,77]);r(t("sd-turbo.stage.textEncoder"),.12);const g=P(n.textEncoder,["input_ids"]),v=await n.textEncoder.run({[g]:b}),y=z(v,["last_hidden_state","text_embeds"]),o=v[y];if(!o||o.type!=="float32")throw new Error("text encoder output missing or wrong dtype");r(t("sd-turbo.stage.noise"),.2);const x=4*_*_,f=kt(x,l,c.initNoiseSigma),w=new Float32Array(x);for(let a=0;a<x;a++)w[a]=f[a]/c.modelInputScale;const E=new j("float32",w,[1,4,_,_]);r(t("sd-turbo.stage.denoise"),.3);const O=new j("int64",new BigInt64Array([c.timestep]),[1]),R=P(n.unet,["sample"]),h=P(n.unet,["timestep"]),U=P(n.unet,["encoder_hidden_states","encoder_hidden_state"]),M=await n.unet.run({[R]:E,[h]:O,[U]:o}),G=z(M,["out_sample","noise_pred","output"]),S=M[G];if(!S||S.type!=="float32")throw new Error("unet output missing or wrong dtype");st("UNet",S.data,tt),r(t("sd-turbo.stage.euler"),.75);const i=$t(f,S.data,c.sigma);for(let a=0;a<i.length;a++)i[a]/=Tt;const T=new j("float32",i,[1,4,_,_]);r(t("sd-turbo.stage.vae"),.85);const A=P(n.vaeDecoder,["latent_sample","sample","latents"]),L=await n.vaeDecoder.run({[A]:T}),N=z(L,["sample","image"]),$=L[N];if(!$||$.type!=="float32")throw new Error("vae decoder output missing or wrong dtype");st("VAE",$.data,a=>mt(tt(a),ht(a,.02),ft(a,-10,10))),r(t("sd-turbo.stage.rendering"),.95);const B=Mt($.data,C);return r(t("sd-turbo.stage.done"),1),{imageData:B,width:C,height:C,durationMs:performance.now()-s,seed:l,device:n.device}}function st(e,s,n){const r=n(s);if(!r.ok)throw gt("sd-turbo","SD Turbo",`${e}: ${r.reason}`,{persist:!1,switchedToCpu:!1}),new Error(t("sd-turbo.err.badOutput",{stage:e,reason:r.reason}))}function P(e,s){for(const n of s)if(e.inputNames.includes(n))return n;throw new Error(`session is missing all of: ${s.join(", ")}; has ${e.inputNames.join(", ")}`)}function z(e,s){for(const r of s)if(r in e)return r;const n=Object.keys(e).join(", ");throw new Error(`session output is missing all of: ${s.join(", ")}; has ${n}`)}function Mt(e,s){const n=new Uint8ClampedArray(s*s*4),r=s*s,l=0,c=r,u=r*2;let m=0;for(let d=0;d<r;d++){const p=V((e[l+d]+1)*.5)*255,b=V((e[c+d]+1)*.5)*255,g=V((e[u+d]+1)*.5)*255;n[m++]=p,n[m++]=b,n[m++]=g,n[m++]=255}return new ImageData(n,s,s)}function V(e){return e<0?0:e>1?1:e}const J=[{value:"none",get label(){return t("sd-turbo.style.none")},suffix:""},{value:"photoreal",get label(){return t("sd-turbo.style.photoreal")},suffix:", photorealistic, dslr, high detail, sharp focus"},{value:"cinematic",get label(){return t("sd-turbo.style.cinematic")},suffix:", cinematic lighting, shallow depth of field, film grain, anamorphic"},{value:"anime",get label(){return t("sd-turbo.style.anime")},suffix:", anime style, cel shaded, vibrant, studio ghibli inspired"},{value:"oil",get label(){return t("sd-turbo.style.oil")},suffix:", oil painting, thick brush strokes, rich colours, canvas texture"},{value:"watercolour",get label(){return t("sd-turbo.style.watercolour")},suffix:", watercolour painting, soft edges, paper texture, washes of colour"},{value:"cyberpunk",get label(){return t("sd-turbo.style.cyberpunk")},suffix:", cyberpunk, neon lights, rainy night, blade runner aesthetic"},{value:"fantasy",get label(){return t("sd-turbo.style.fantasy")},suffix:", fantasy concept art, dramatic lighting, intricate detail, magical"},{value:"minimal",get label(){return t("sd-turbo.style.minimal")},suffix:", minimal flat vector illustration, simple shapes, two-tone palette"}];function jt(e){e.innerHTML=Lt(),xt(e,"sd-turbo");const s=i=>e.querySelector(i),n=s("#sdt-banner"),r=s("#sdt-runtime-pill"),l=s("#sdt-prompt"),c=Array.from(e.querySelectorAll('.gp-chip[data-field="style"]')),u=s("#sdt-seed"),m=s("#sdt-seed-random"),d=s("#sdt-run-btn"),p=s("#sdt-inline-btn"),b=s("#sdt-reseed"),g=s("#sdt-download"),v=s("#sdt-canvas"),y=s("#sdt-progress-fill"),o=s("#sdt-status"),x=s('[data-step="load-model"]'),f=s('[data-step="run"]'),w=x.querySelector('[data-role="step-note"]'),E=f.querySelector('[data-role="step-note"]'),O=s("#sdt-stat-model"),R=s("#sdt-stat-seed");for(const i of e.querySelectorAll("section[data-collapsible]"))i.querySelector(".sec-head")?.addEventListener("click",()=>i.toggleAttribute("data-collapsed"));n.querySelector(".x")?.addEventListener("click",()=>n.classList.add("hidden"));const h={generating:!1,lastSeed:null,lastBlobUrl:null,modelReady:!1};let U="photoreal";for(const i of c)i.addEventListener("click",()=>{U=i.dataset.value??"none";for(const A of c)A.setAttribute("aria-pressed",String(A===i))});const M=()=>{try{const i=sessionStorage.getItem("toolbox:sd-prompt-handoff");i&&(sessionStorage.removeItem("toolbox:sd-prompt-handoff"),l.value=i)}catch{}};M(),e.addEventListener("pane-shown",M),m.addEventListener("click",()=>{u.value=String(Math.random()*2**30|0)}),(async()=>{const i=await ut();r.dataset.device=i.device,r.textContent=i.device==="webgpu"?t("sd-turbo.runtime.webgpu",{adapter:i.adapterName??t("sd-turbo.runtime.ready")}):t("sd-turbo.runtime.required"),i.device==="wasm"&&K(n,t("sd-turbo.banner.noWebgpu",{reason:i.reason??t("sd-turbo.banner.noAdapter")}),"error")})(),O.textContent="sd-turbo";const G=At(i=>{i.progress<1?(x.setAttribute("data-status","active"),w.textContent=`${i.phase} · ${(i.progress*100).toFixed(0)}%`,y.style.width=`${(i.progress*100).toFixed(1)}%`):(h.modelReady=!0,x.setAttribute("data-status","done"),w.textContent=t("sd-turbo.load.ready",{repo:q}),y.style.width="100%")});e._sdtUnsub?.(),e._sdtUnsub=G;async function S(){if(h.generating)return;const i=l.value.trim();if(!i){K(n,t("sd-turbo.banner.noPrompt"),"error");return}const T=J.find(a=>a.value===U)??J[0],A=(i+T.suffix).slice(0,1500),L=u.value.trim(),N=L?Number(L)|0:Math.random()*2**30|0;u.value=String(N),h.generating=!0;let $=!1;const B=ot({tool:t("tool.gemma-image-prompt.name"),route:"gemma-image-prompt",label:i.slice(0,40)||t("sd-turbo.job.image"),detail:t("sd-turbo.status.preparing"),progress:0,onCancel:()=>{$=!0}});d.disabled=!0,d.textContent=t("sd-turbo.btn.working"),p.disabled=!0,b.disabled=!0,g.disabled=!0,o.classList.remove("hidden"),o.textContent=t("sd-turbo.status.preparing"),f.setAttribute("data-status","active"),E.textContent=t("sd-turbo.status.preparing"),y.style.width="4%";try{await nt();const a=await Ct({prompt:A,seed:N,onStage:(k,D)=>{E.textContent=t("sd-turbo.status.stage",{stage:k}),o.textContent=t("sd-turbo.status.stagePct",{stage:k,pct:(D*100).toFixed(0)}),y.style.width=`${(D*100).toFixed(1)}%`,B.update({progress:D,detail:t("sd-turbo.status.stagePct",{stage:k,pct:(D*100).toFixed(0)})})}});if($){f.setAttribute("data-status","pending"),o.textContent=t("sd-turbo.status.cancelled");return}v.width=a.width,v.height=a.height;const Y=v.getContext("2d");if(!Y)throw new Error("canvas 2d context unavailable");Y.putImageData(a.imageData,0,0),h.lastSeed=a.seed,R.textContent=String(a.seed),f.setAttribute("data-status","done");const Q=(a.durationMs/1e3).toFixed(1);E.textContent=t("sd-turbo.status.stepDone",{w:a.width,h:a.height,s:Q,seed:a.seed,device:a.device}),o.textContent=t("sd-turbo.status.done",{s:Q,device:a.device}),g.disabled=!1,b.disabled=!1,v.toBlob(k=>{k&&(h.lastBlobUrl&&URL.revokeObjectURL(h.lastBlobUrl),h.lastBlobUrl=URL.createObjectURL(k),rt("gemma-image-prompt",k,`sd-turbo-${h.lastSeed??"img"}.png`))},"image/png"),B.done(`${a.width}×${a.height} · ${(a.durationMs/1e3).toFixed(1)}s`)}catch(a){f.setAttribute("data-status","pending"),E.textContent="",o.textContent="",K(n,t("sd-turbo.banner.failed",{message:a.message}),"error"),B.fail(a.message)}finally{h.generating=!1,d.disabled=!1,d.textContent=`${t("sd-turbo.btn.generateImage")} ›`,p.disabled=!1,p.textContent=t("sd-turbo.btn.generate")}}d.addEventListener("click",()=>void S()),p.addEventListener("click",()=>void S()),b.addEventListener("click",()=>{u.value=String(Math.random()*2**30|0),S()}),g.addEventListener("click",()=>{if(!h.lastBlobUrl)return;const i=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),T=h.lastSeed!=null?`-s${h.lastSeed}`:"";yt(h.lastBlobUrl,`sd-turbo-${i}${T}.png`)})}function Lt(){const e=J.map(s=>`<button type="button" class="gp-chip" data-field="style" data-value="${s.value}" aria-pressed="${s.value==="photoreal"}">${vt(s.label)}</button>`).join("");return`
    ${wt({name:t("sd-turbo.brand"),code:"g·01",prefix:"sdt",stats:[{k:t("sd-turbo.stat.model"),id:"stat-model"},{k:t("sd-turbo.stat.seed"),id:"stat-seed"}]})}

    <main class="panel panel-split">

      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${et(t("sd-turbo.sec.prompt"))}
          <div class="sec-body">
            <p class="gp-blurb">${t("sd-turbo.blurb")}</p>

            <label class="gp-field">
              <span class="gp-field-label">${t("sd-turbo.prompt.label")}</span>
              <textarea id="sdt-prompt" class="gp-textarea" rows="4" placeholder="${t("sd-turbo.prompt.ph")}"></textarea>
            </label>

            <div class="gp-field">
              <span class="gp-field-label">${t("sd-turbo.style.label")}</span>
              <div class="gp-chips">${e}</div>
            </div>

            <div class="gp-field">
              <span class="gp-field-label">${t("sd-turbo.seed.label")}</span>
              <div class="sdt-seed-row">
                <input type="text" id="sdt-seed" class="gp-input" inputmode="numeric" placeholder="${t("sd-turbo.seed.ph")}" />
                <button type="button" class="btn" id="sdt-seed-random">${t("sd-turbo.seed.random")}</button>
              </div>
            </div>

            <div class="gp-run-row">
              <button class="cta-btn cta-btn-sm" id="sdt-inline-btn" type="button">${t("sd-turbo.btn.generate")}</button>
              <button class="btn" id="sdt-reseed" type="button" disabled>${t("sd-turbo.btn.reroll")}</button>
              <button class="btn" id="sdt-download" type="button" disabled>${t("sd-turbo.btn.download")}</button>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${et(t("sd-turbo.sec.process"))}
          <div class="sec-body">
            <ol class="steps">
              <li class="step" data-step="load-model" data-status="pending">
                <span class="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <div class="step-body">
                  <div class="step-title">${t("sd-turbo.step.load.title")}</div>
                  <div class="step-desc">${t("sd-turbo.step.load.desc")}</div>
                  <div class="step-note" data-role="step-note"></div>
                </div>
              </li>
              <li class="step" data-step="run" data-status="pending">
                <span class="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <div class="step-body">
                  <div class="step-title">${t("sd-turbo.step.run.title")}</div>
                  <div class="step-desc">${t("sd-turbo.step.run.desc")}</div>
                  <div class="step-note" data-role="step-note"></div>
                </div>
              </li>
            </ol>
            <div class="step-pbar" style="margin-top: 10px;"><div id="sdt-progress-fill" class="step-pbar-fill"></div></div>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        <div class="sdt-canvas-wrap">
          <canvas id="sdt-canvas" class="sdt-canvas" width="${C}" height="${C}"></canvas>
        </div>
      </div>

    </main>

    <footer class="transport">
      <button class="btn ghost" id="sdt-run-btn" type="button">${t("sd-turbo.btn.generateImage")} <span class="arrow">›</span></button>
      <div id="sdt-info" class="img-info">${t("sd-turbo.info")}</div>
      <span id="sdt-status" class="action-status hidden"></span>
    </footer>
  `}export{jt as mountSdTurbo};
//# sourceMappingURL=app-BGZdH-j2.js.map
