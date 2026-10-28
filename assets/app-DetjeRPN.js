const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/runtime-Jg5t-PhK.js","assets/transformers.web-Cyg6ssfE.js","assets/index-DbChkwc3.js","assets/index-B2t3sVwO.css","assets/models-OFmNMcf2.js"])))=>i.map(i=>d[i]);
import{t as s,e as R,_ as G}from"./index-DbChkwc3.js";import{t as V,a as k,e as A}from"./fragments-kQZcphFF.js";import{f as Y,l as I,a as z,r as N,b as K,m as _}from"./gpu-guard-C1llK9pG.js";function J(e){const t=R[e.key],r=e.params;return r?t.replace(/\{(\w+)\}/g,(a,n)=>n in r?String(r[n]):a):t}const U=["shader-f16","subgroups","timestamp-query","float32-filterable"],Q=["maxBufferSize","maxStorageBufferBindingSize","maxComputeWorkgroupStorageSize","maxComputeInvocationsPerWorkgroup","maxStorageBuffersPerShaderStage","maxTextureDimension2D"],X=["upscale:lightweight-2x","upscale:classical-2x","upscale:realworld-4x"],D=new WeakSet;function ve(e){if(D.has(e))return;D.add(e),e.innerHTML=me();const t=c=>e.querySelector(c);for(const c of e.querySelectorAll("section[data-collapsible]"))c.querySelector(".sec-head")?.addEventListener("click",()=>{c.toggleAttribute("data-collapsed")});const r={generatedAt:new Date().toISOString(),userAgent:navigator.userAgent,environment:Z(),webgpu:{available:!1},webcodecs:{},benchmark:{},rememberedGpuFaults:I(),forceCpuFallbackFlag:Y(),recommendations:[]},a=t("#gpu-run-btn"),n=t("#gpu-copy-btn"),o=t("#gpu-bench-status"),i=()=>{r.rememberedGpuFaults=I();const c=ce(r);r.recommendations=c.map(J),t("#gpu-env").innerHTML=B(r.environment),t("#gpu-adapter").innerHTML=le(r.webgpu),t("#gpu-features").innerHTML=pe(r.webgpu),t("#gpu-limits").innerHTML=de(r.webgpu),t("#gpu-codecs").innerHTML=B(r.webcodecs),t("#gpu-bench").innerHTML=fe(r.benchmark),t("#gpu-faults").innerHTML=ge(r),t("#gpu-recs").innerHTML=c.map(l=>`<li>${A(s(l.key,l.params))}</li>`).join(""),t("#gpu-json").textContent=JSON.stringify(r,null,2),t("#gpu-stat-webgpu").textContent=r.webgpu.available?s("gpu-check.yes"):s("gpu-check.no"),e.dataset.ready="true"};e.addEventListener("click",c=>{const l=c.target;if(l.closest("#gpu-clear-faults"))z(),i();else if(l.closest("#gpu-use-cpu-upscale")){for(const f of X)N(f,`Swin2SR (${f.slice(8)})`,"GPU check: WebGPU output mismatch");i()}}),n.addEventListener("click",async()=>{const c=JSON.stringify(r,null,2);try{await navigator.clipboard.writeText(c),n.textContent=s("gpu-check.copied")}catch{const l=window.getSelection(),f=document.createRange();f.selectNodeContents(t("#gpu-json")),l?.removeAllRanges(),l?.addRange(f),n.textContent=s("gpu-check.selected")}setTimeout(()=>n.textContent=s("gpu-check.copy"),2e3)}),a.addEventListener("click",async()=>{a.disabled=!0;const c=performance.now();r.benchmark={};try{o.textContent=s("gpu-check.status.matmul"),i(),r.benchmark.matmul=await re().catch(l=>({error:F(l)})),i(),o.textContent=s("gpu-check.status.ort"),r.benchmark.ort=await se(l=>o.textContent=l).catch(l=>({error:F(l)})),r.benchmark.totalMs=Math.round(performance.now()-c),o.textContent=s("gpu-check.status.done",{s:(r.benchmark.totalMs/1e3).toFixed(1)})}finally{a.disabled=!1,e.dataset.benchDone="true",i()}}),i(),(async()=>(r.webgpu=await ee(),i(),r.webcodecs=await te(),i()))()}function F(e){return e instanceof Error?e.message:String(e)}function Z(){const e=navigator;return{webgpuApi:"gpu"in navigator&&!!navigator.gpu,crossOriginIsolated:typeof crossOriginIsolated<"u"&&crossOriginIsolated,sharedArrayBuffer:typeof SharedArrayBuffer<"u",hardwareConcurrency:e.hardwareConcurrency??null,deviceMemoryGB:e.deviceMemory??null,webCodecs:typeof VideoEncoder<"u",offscreenCanvas:typeof OffscreenCanvas<"u"}}async function ee(){if(!("gpu"in navigator)||!navigator.gpu)return{available:!1,reason:"navigator.gpu unavailable"};try{const e=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!e)return{available:!1,reason:"no adapter returned"};const t=O(e),r={};for(const n of Q){const o=e.limits[n];typeof o=="number"&&(r[n]=o)}let a=null;try{const n=await navigator.gpu.requestAdapter({powerPreference:"low-power"});n&&(a=O(n))}catch{}return{available:!0,info:t,isFallbackAdapter:!!(e.isFallbackAdapter??t.isFallbackAdapter),features:[...e.features].map(String).sort(),limits:r,lowPowerInfo:a}}catch(e){return{available:!1,reason:F(e)}}}function O(e){const t=e.info;if(!t)return{};const r={};for(const a of["vendor","architecture","device","description","isFallbackAdapter"]){const n=t[a];n!==void 0&&n!==""&&(r[a]=n)}return r}async function te(){if(typeof VideoEncoder>"u")return{VideoEncoder:"unavailable"};const e=[["H.264 baseline 720p","avc1.42001f"],["H.264 high 1080p","avc1.640028"],["VP9 1080p","vp09.00.40.08"],["AV1 1080p","av01.0.08M.08"]],t={};for(const[r,a]of e){const n=r.includes("1080");try{const o=await VideoEncoder.isConfigSupported({codec:a,width:n?1920:1280,height:n?1080:720,bitrate:8e6,framerate:30});t[r]=!!o.supported}catch{t[r]=!1}}return t}const ae=`
const TILE: u32 = 16u;
struct Dims { n: u32 };
@group(0) @binding(0) var<storage, read> a: array<f32>;
@group(0) @binding(1) var<storage, read> b: array<f32>;
@group(0) @binding(2) var<storage, read_write> c: array<f32>;
@group(0) @binding(3) var<uniform> dims: Dims;
var<workgroup> ta: array<f32, 256>;
var<workgroup> tb: array<f32, 256>;
@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>) {
  let n = dims.n;
  let row = gid.y;
  let col = gid.x;
  var acc = 0.0;
  for (var t = 0u; t < n; t += TILE) {
    ta[lid.y * TILE + lid.x] = a[row * n + t + lid.x];
    tb[lid.y * TILE + lid.x] = b[(t + lid.y) * n + col];
    workgroupBarrier();
    for (var k = 0u; k < TILE; k++) {
      acc += ta[lid.y * TILE + k] * tb[k * TILE + lid.x];
    }
    workgroupBarrier();
  }
  c[row * n + col] = acc;
}`;async function re(e=1024,t=20){if(!navigator.gpu)throw new Error("WebGPU unavailable");const r=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!r)throw new Error("no adapter");const a=await r.requestDevice();try{const n=e*e,o=new Float32Array(n),i=new Float32Array(n);for(let p=0;p<n;p++)o[p]=p*7%5-2,i[p]=p*3%7-3;const c=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST,l=p=>{const g=a.createBuffer({size:p.byteLength,usage:c});return a.queue.writeBuffer(g,0,p),g},f=l(o),M=l(i),C=a.createBuffer({size:n*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),S=a.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});a.queue.writeBuffer(S,0,new Uint32Array([e,0,0,0]));const b=await a.createComputePipelineAsync({layout:"auto",compute:{module:a.createShaderModule({code:ae}),entryPoint:"main"}}),v=a.createBindGroup({layout:b.getBindGroupLayout(0),entries:[f,M,C,S].map((p,g)=>({binding:g,resource:{buffer:p}}))}),y=p=>{const g=a.createCommandEncoder();for(let d=0;d<p;d++){const u=g.beginComputePass();u.setPipeline(b),u.setBindGroup(0,v),u.dispatchWorkgroups(e/16,e/16),u.end()}return a.queue.submit([g.finish()]),a.queue.onSubmittedWorkDone()};await y(2);const $=performance.now();await y(t);const E=performance.now()-$,w=a.createBuffer({size:n*4,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),L=a.createCommandEncoder();L.copyBufferToBuffer(C,0,w,0,n*4),a.queue.submit([L.finish()]),await w.mapAsync(GPUMapMode.READ);const m=new Float32Array(w.getMappedRange().slice(0));w.unmap();let h=0;for(const[p,g]of[[0,0],[1,2],[e-1,e-1],[e>>1,17],[123,e-5]]){let d=0;for(let u=0;u<e;u++)d+=o[p*e+u]*i[u*e+g];h=Math.max(h,Math.abs(d-m[p*e+g]))}for(const p of[f,M,C,S,w])p.destroy();const x=2*e**3*t/(E/1e3)/1e9;return{n:e,iterations:t,ms:Math.round(E),gflops:Math.round(x*10)/10,maxError:h,correct:h<.001}}finally{a.destroy()}}function ne(e=64){const t=new ImageData(e,e);for(let r=0;r<e;r++)for(let a=0;a<e;a++){const n=(r*e+a)*4,o=a<e/2,i=r<e/2,c=(a+r)/(2*e),[l,f,M]=i?o?[220,40,40]:[40,200,60]:o?[40,70,220]:[230,200,40];t.data[n]=Math.round(l*(.6+.4*c)),t.data[n+1]=Math.round(f*(.6+.4*c)),t.data[n+2]=Math.round(M*(.6+.4*c)),t.data[n+3]=255}return t}async function se(e){const[{pipeline:t,RawImage:r},{configureTransformersEnv:a},{UPSCALE_MODELS:n}]=await Promise.all([G(()=>import("./transformers.web-Cyg6ssfE.js").then(d=>d.t),[]),G(()=>import("./runtime-Jg5t-PhK.js"),__vite__mapDeps([0,1,2,3])),G(()=>import("./models-OFmNMcf2.js"),__vite__mapDeps([4,2,3]))]);a();const o=n["lightweight-2x"],i=ne(64),c=new r(new Uint8ClampedArray(i.data),64,64,4),l=t,f=async d=>{const u=performance.now();return{pipe:await l("image-to-image",o.repo,{device:d,dtype:"fp32"}),loadMs:performance.now()-u}},M=async(d,u)=>{e(s("gpu-check.status.ortRunning",{device:d}));const P=performance.now();await u(c);const j=performance.now()-P,H=performance.now(),T=await u(c),q=performance.now()-H;return{out:Array.isArray(T)?T[0]:T,ms:q,warmMs:j}},C=d=>d?.dispose?.(),S=d=>d.then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}));e(s("gpu-check.status.ortLoading",{device:"WebGPU"}));const b=await S(f("webgpu"));e(s("gpu-check.status.ortLoading",{device:"WASM"}));const v=await S(f("wasm"));let y,$;try{if(b.status==="rejected")throw b.reason;if(v.status==="rejected")throw v.reason;y={...await M("webgpu",b.value.pipe),loadMs:b.value.loadMs},$={...await M("wasm",v.value.pipe),loadMs:v.value.loadMs}}finally{await C(b.status==="fulfilled"?b.value.pipe:void 0),await C(v.status==="fulfilled"?v.value.pipe:void 0)}let E=0,w=0,L=0;const m=y.out,h=$.out;if(m.width!==h.width||m.height!==h.height)throw new Error(`output size mismatch ${m.width}×${m.height} vs ${h.width}×${h.height}`);for(let d=0;d<m.width*m.height;d++)for(let u=0;u<3;u++){const P=Math.abs(m.data[d*m.channels+u]-h.data[d*h.channels+u]);E+=P,P>w&&(w=P),L++}const x=E/L,p={data:i.data,width:64,height:64,channels:4},g=!K(p,m).ok;return{model:o.repo,input:"64×64 colour test card",webgpuMs:Math.round(y.ms),wasmMs:Math.round($.ms),webgpuLoadMs:Math.round(y.loadMs),wasmLoadMs:Math.round($.loadMs),webgpuWarmupMs:Math.round(y.warmMs),wasmWarmupMs:Math.round($.warmMs),meanAbsDiff:Math.round(x*100)/100,maxAbsDiff:w,inputChroma:Math.round(_(p)*10)/10,webgpuChroma:Math.round(_(m)*10)/10,wasmChroma:Math.round(_(h)*10)/10,colourCollapsed:g,match:!g&&x<3}}function ce(e){const t=[],r=e.environment,a=e.webgpu;if(!a.available)t.push({key:"gpu-check.rec.noWebgpu",params:{reason:a.reason??R["gpu-check.rec.unknown"]}});else{a.isFallbackAdapter&&t.push({key:"gpu-check.rec.fallbackAdapter"}),a.features?.includes("shader-f16")||t.push({key:"gpu-check.rec.noF16"});const c=a.limits?.maxBufferSize??0;c&&c<2**30&&t.push({key:"gpu-check.rec.maxBuffer",params:{size:W(c)}})}const n=e.benchmark.ort;n&&"match"in n?n.colourCollapsed?t.push({key:"gpu-check.rec.collapse"}):n.match||t.push({key:"gpu-check.rec.mismatch",params:{diff:n.meanAbsDiff}}):n&&"error"in n&&a.available&&t.push({key:"gpu-check.rec.ortFailed",params:{error:n.error}});const o=e.benchmark.matmul;o&&"gflops"in o&&(o.correct?o.gflops<100&&t.push({key:"gpu-check.rec.lowThroughput",params:{gflops:o.gflops}}):t.push({key:"gpu-check.rec.matmulWrong"})),r.crossOriginIsolated||t.push({key:"gpu-check.rec.notIsolated"});const i=r.deviceMemoryGB;return i!==null&&i<=4&&t.push({key:"gpu-check.rec.lowMemory",params:{mem:i}}),e.webcodecs["H.264 baseline 720p"]===!1&&t.push({key:"gpu-check.rec.noH264"}),e.rememberedGpuFaults.length&&t.push({key:"gpu-check.rec.faults",params:{labels:e.rememberedGpuFaults.map(c=>c.label).join(", ")}}),t.length||t.push({key:"gpu-check.rec.allGood"}),t}function W(e){return e>=2**30?`${(e/2**30).toFixed(1)} GB`:`${Math.round(e/2**20)} MB`}function oe(e){return e==="isFallbackAdapter"||e===s("gpu-check.bench.collapse")}function B(e){const t=Object.entries(e);return t.length?`<dl class="gpu-kv">${t.map(([r,a])=>{const n=oe(r)&&typeof a=="boolean"?!a:a;return`<dt>${A(r)}</dt><dd data-v="${ue(n)}">${ie(a)}</dd>`}).join("")}</dl>`:`<div class="gpu-empty">${s("gpu-check.checking")}</div>`}function ie(e){return e==null?"—":typeof e=="boolean"?e?s("gpu-check.yes"):s("gpu-check.no"):typeof e=="number"&&e>2**20?`${e.toLocaleString()} (${W(e)})`:typeof e=="number"?e.toLocaleString():A(String(e))}function ue(e){return e===!0?"yes":e===!1?"no":""}function le(e){return e.available?B({available:!0,...e.info,isFallbackAdapter:!!e.isFallbackAdapter,[s("gpu-check.lowPower")]:e.lowPowerInfo?[e.lowPowerInfo.vendor,e.lowPowerInfo.architecture,e.lowPowerInfo.description].filter(Boolean).join(" · ")||s("gpu-check.sameAnon"):null}):B({available:!1,reason:e.reason??s("gpu-check.checking")})}function pe(e){if(!e.features)return'<div class="gpu-empty">—</div>';const t=U.map(a=>`<span class="gpu-chip" data-on="${e.features.includes(a)}">${A(a)}</span>`).join(""),r=e.features.filter(a=>!U.includes(a)).map(a=>`<span class="gpu-chip" data-on="true">${A(a)}</span>`).join("");return`<div class="gpu-chips">${t}${r}</div>`}function de(e){return e.limits?B(e.limits):'<div class="gpu-empty">—</div>'}function fe(e){const t={},r=e.matmul;r&&"gflops"in r?(t.matmul=`${r.gflops} GFLOPS (${r.n}² × ${r.iterations} in ${r.ms} ms)`,t[s("gpu-check.bench.correct")]=r.correct):r&&(t.matmul=s("gpu-check.bench.error",{msg:r.error}));const a=e.ort;return a&&"match"in a?(t["ORT WebGPU vs WASM"]=a.match,t[s("gpu-check.bench.diff")]=`${a.meanAbsDiff} / ${a.maxAbsDiff}`,t["chroma in → gpu / cpu"]=`${a.inputChroma} → ${a.webgpuChroma} / ${a.wasmChroma}`,t[s("gpu-check.bench.collapse")]=a.colourCollapsed,t[s("gpu-check.bench.runTime")]=`${a.webgpuMs} ms / ${a.wasmMs} ms`):a&&(t["ORT WebGPU vs WASM"]=s("gpu-check.bench.error",{msg:a.error})),Object.keys(t).length?B(t):`<div class="gpu-empty">${s("gpu-check.bench.empty")}</div>`}function ge(e){const t=e.rememberedGpuFaults,r=e.forceCpuFallbackFlag?`<div class="format-hint warn">${s("gpu-check.faults.flag")}</div>`:"",a=e.benchmark.ort,n=a&&"match"in a&&!a.match?`<button class="btn" id="gpu-use-cpu-upscale">${s("gpu-check.faults.useCpu")}</button>`:"",o=t.length?`<ul class="gpu-faults">${t.map(i=>`<li><b>${A(i.label)}</b> · ${A(i.reason)} · ${new Date(i.at).toLocaleString()}</li>`).join("")}</ul><button class="btn" id="gpu-clear-faults">${s("gpu-check.faults.clear")}</button>`:`<div class="gpu-empty">${s("gpu-check.faults.none")}</div>`;return`${r}${o}${n}`}function me(){return`
    ${V({name:s("gpu-check.name"),code:"sys",prefix:"gpu",withRuntime:!1,stats:[{k:"webgpu",id:"stat-webgpu"}]})}
    <main class="panel panel-split gpu-check">
      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.env"))}
          <div class="sec-body" id="gpu-env"></div>
        </section>
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.adapter"))}
          <div class="sec-body" id="gpu-adapter"></div>
        </section>
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.features"))}
          <div class="sec-body" id="gpu-features"></div>
        </section>
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.limits"))}
          <div class="sec-body" id="gpu-limits"></div>
        </section>
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.codecs"))}
          <div class="sec-body" id="gpu-codecs"></div>
        </section>
      </div>
      <div class="panel-col panel-col-right">
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.bench"))}
          <div class="sec-body">
            <div class="gpu-actions">
              <button class="btn hot" id="gpu-run-btn">${s("gpu-check.run")}</button>
              <span class="gpu-status" id="gpu-bench-status"></span>
            </div>
            <div id="gpu-bench"></div>
          </div>
        </section>
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.recs"))}
          <div class="sec-body"><ul class="gpu-recs" id="gpu-recs"></ul></div>
        </section>
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.faults"))}
          <div class="sec-body" id="gpu-faults"></div>
        </section>
        <section class="sec" data-collapsible>
          ${k(s("gpu-check.sec.report"))}
          <div class="sec-body">
            <div class="gpu-actions">
              <button class="btn" id="gpu-copy-btn">${s("gpu-check.copy")}</button>
              <span class="gpu-status">${s("gpu-check.copyHint")}</span>
            </div>
            <pre class="gpu-json" id="gpu-json"></pre>
          </div>
        </section>
      </div>
    </main>
  `}export{ne as makeTestImage,ve as mountGpuCheck,ce as recommend};
//# sourceMappingURL=app-DetjeRPN.js.map
