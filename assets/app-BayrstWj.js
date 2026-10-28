import{configureTransformersEnv as gt,isWebGpuKernelError as wt,probeWebGPU as bt}from"./runtime-Jg5t-PhK.js";import{t as r,o as xt,s as ct,p as yt}from"./index-DbChkwc3.js";import{_ as $t,a as Mt}from"./transformers.web-Cyg6ssfE.js";import{r as J}from"./gpu-lock-CVLNUbDT.js";import{p as Et,a as St,b as Tt,M as At,A as kt}from"./h264-eC01Si3C.js";const Dt="onnx-community/depth-anything-v2-small",Ct={fp16:"50 MB",fp32:"99 MB",q8:"27 MB"};async function Rt(){try{return!!(await navigator.gpu?.requestAdapter({powerPreference:"high-performance"}))?.features.has("shader-f16")}catch{return!1}}async function Bt(a){return a==="wasm"?"q8":await Rt()?"fp16":"fp32"}async function Pt(a,e){gt();const t=await Bt(a);try{return await ot(a,t,e)}catch(o){if(a!=="webgpu")throw o;return console.warn("[depth] WebGPU load failed, falling back to WASM q8",o),ot("wasm","q8",e)}}async function ot(a,e,t){const o=$t;t?.({phase:r("depth-3d.phase.loading",{dtype:e}),progress:0});const i=await J(()=>o("depth-estimation",Dt,{device:a,dtype:e,progress_callback:l=>{l.status==="progress"&&typeof l.progress=="number"?t?.({phase:l.file??"weights",progress:l.progress/100}):l.status==="ready"&&t?.({phase:r("depth-3d.phase.ready"),progress:1})}}));console.info(`[depth] Depth Anything V2 Small: device=${a} dtype=${e}`);let s=null;const d={device:a,dtype:e,async estimate(l,u){if(s)return s.estimate(l,u);const h=Ft(l,u),g=i.processor?.image_processor;g&&(g.size={width:h.width,height:h.height});let M;try{M=await J(()=>i(h))}catch(x){if(a==="webgpu"&&wt(x))return console.warn("[depth] WebGPU kernel error, re-running on WASM q8",x),s=await ot("wasm","q8"),d.device="wasm",d.dtype="q8",s.estimate(l,u);throw x}const m=Array.isArray(M)?M[0]:M;return It(m.predicted_depth)},async dispose(){try{await J(async()=>{await i.dispose?.()})}catch{}await s?.dispose()}};return d}function Ut(a,e,t){const o=h=>Math.max(14,Math.round(h/14)*14),i=t/Math.min(a,e);let s=a*i,d=e*i;const l=t*2.5,u=Math.max(s,d)/l;return u>1&&(s/=u,d/=u),[o(s),o(d)]}function Ft(a,e){const[t,o]=Ut(a.width,a.height,e),s=new OffscreenCanvas(t,o).getContext("2d");if(!s)throw new Error("OffscreenCanvas 2D unavailable");s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(a,0,0,t,o);const d=s.getImageData(0,0,t,o),l=new Uint8ClampedArray(t*o*3);for(let u=0,h=0;u<d.data.length;u+=4,h+=3)l[h]=d.data[u],l[h+1]=d.data[u+1],l[h+2]=d.data[u+2];return new Mt(l,t,o,3)}function It(a){const[e,t]=a.dims.slice(-2),o=a.data,i=t*e;let s=1/0,d=-1/0;for(let h=0;h<i;h++){const g=o[h];g<s&&(s=g),g>d&&(d=g)}const l=d-s||1,u=new Float32Array(i);for(let h=0;h<i;h++)u[h]=(o[h]-s)/l;return{data:u,width:t,height:e}}function Lt(a,e,t){const o=new Float32Array(e*t),i=a.width/e,s=a.height/t,d=a.width,l=a.height;for(let u=0;u<t;u++){const h=Math.min(l-1,Math.max(0,(u+.5)*s-.5)),g=Math.floor(h),M=Math.min(l-1,g+1),m=h-g;for(let x=0;x<e;x++){const w=Math.min(d-1,Math.max(0,(x+.5)*i-.5)),T=Math.floor(w),C=Math.min(d-1,T+1),U=w-T,b=a.data[g*d+T],k=a.data[g*d+C],F=a.data[M*d+T],W=a.data[M*d+C];o[u*e+x]=(b+(k-b)*U)*(1-m)+(F+(W-F)*U)*m}}return{data:o,width:e,height:t}}function z(a,e,t,o){const i=new Float32Array(e*t),s=new Float32Array(e*t);for(let d=0;d<t;d++){const l=d*e;let u=0;for(let h=0;h<=Math.min(o,e-1);h++)u+=a[l+h];for(let h=0;h<e;h++){const g=Math.max(0,h-o),M=Math.min(e-1,h+o);i[l+h]=u/(M-g+1);const m=h+o+1;m<e&&(u+=a[l+m]);const x=h-o;x>=0&&(u-=a[l+x])}}for(let d=0;d<e;d++){let l=0;for(let u=0;u<=Math.min(o,t-1);u++)l+=i[u*e+d];for(let u=0;u<t;u++){const h=Math.max(0,u-o),g=Math.min(t-1,u+o);s[u*e+d]=l/(g-h+1);const M=u+o+1;M<t&&(l+=i[M*e+d]);const m=u-o;m>=0&&(l-=i[m*e+d])}}return s}function _t(a,e){const t=new Float32Array(e);for(let o=0,i=0;o<e;o++,i+=4)t[o]=(.299*a[i]+.587*a[i+1]+.114*a[i+2])/255;return t}function zt(a,e,t,o,i,s){const d=t*o,l=new Float32Array(d),u=new Float32Array(d);for(let b=0;b<d;b++)l[b]=a[b]*e[b],u[b]=a[b]*a[b];const h=z(a,t,o,i),g=z(e,t,o,i),M=z(u,t,o,i),m=z(l,t,o,i),x=u,w=l;for(let b=0;b<d;b++){const k=h[b],F=M[b]-k*k,X=(m[b]-k*g[b])/(F+s);x[b]=X,w[b]=g[b]-X*k}const T=z(x,t,o,i),C=z(w,t,o,i),U=new Float32Array(d);for(let b=0;b<d;b++){const k=T[b]*a[b]+C[b];U[b]=k<0?0:k>1?1:k}return U}function Ot(a,e,t,o){const i=Lt(a,t,o);if(t<=a.width&&o<=a.height)return i;const s=_t(e,t*o),d=Math.max(t/a.width,o/a.height),l=Math.max(2,Math.round(d*2)),u=zt(s,i.data,t,o,l,.001),h=new Float32Array(t*o);for(let g=0;g<h.length;g++){const M=u[g]-i.data[g],m=.08;h[g]=i.data[g]+(M>m?m:M<-m?-m:M)}return{data:h,width:t,height:o}}function Vt(a){const e=a<0?0:a>1?1:a,t=.13572138+e*(4.6153926+e*(-42.66032258+e*(132.13108234+e*(-152.94239396+e*59.28637943)))),o=.09140261+e*(2.19418839+e*(4.84296658+e*(-14.18503333+e*(4.27729857+e*2.82956604)))),i=.1066733+e*(12.64194608+e*(-60.58204836+e*(110.36276771+e*(-89.90310912+e*27.34824973)))),s=d=>Math.round(Math.max(0,Math.min(1,d))*255);return[s(t),s(o),s(i)]}function lt(a,e){const t=a.width*a.height,o=new Uint8ClampedArray(t*4),i=new Uint8ClampedArray(256*3);for(let s=0;s<256;s++){const[d,l,u]=e==="turbo"?Vt(s/255):[s,s,s];i[s*3]=d,i[s*3+1]=l,i[s*3+2]=u}for(let s=0;s<t;s++){const d=Math.round(Math.max(0,Math.min(1,a.data[s]))*255)*3;o[s*4]=i[d],o[s*4+1]=i[d+1],o[s*4+2]=i[d+2],o[s*4+3]=255}return o}const qt=(()=>{const a=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let o=0;o<8;o++)t=t&1?3988292384^t>>>1:t>>>1;a[e]=t>>>0}return a})();function Ht(a){let e=4294967295;for(let t=0;t<a.length;t++)e=qt[(e^a[t])&255]^e>>>8;return(e^4294967295)>>>0}function tt(a,e){const t=new Uint8Array(12+e.length),o=new DataView(t.buffer);o.setUint32(0,e.length);for(let i=0;i<4;i++)t[4+i]=a.charCodeAt(i);return t.set(e,8),o.setUint32(8+e.length,Ht(t.subarray(4,8+e.length))),t}async function Nt(a){const e=new CompressionStream("deflate"),t=new Blob([a]).stream().pipeThrough(e);return new Uint8Array(await new Response(t).arrayBuffer())}async function Wt(a){const{width:e,height:t,data:o}=a,i=e*2+1,s=new Uint8Array(i*t),d=new Uint8Array(e*2);for(let m=0;m<t;m++){for(let w=0;w<e;w++){const T=Math.round(Math.max(0,Math.min(1,o[m*e+w]))*65535);d[w*2]=T>>8,d[w*2+1]=T&255}const x=m*i;s[x]=1;for(let w=0;w<d.length;w++)s[x+1+w]=d[w]-(w>=2?d[w-2]:0)&255}const l=new Uint8Array(13),u=new DataView(l.buffer);u.setUint32(0,e),u.setUint32(4,t),l[8]=16,l[9]=0,l[10]=0,l[11]=0,l[12]=0;const h=new Uint8Array([137,80,78,71,13,10,26,10]),g=await Nt(s),M=[h,tt("IHDR",l),tt("IDAT",g),tt("IEND",new Uint8Array)];return new Blob(M,{type:"image/png"})}const Xt=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`,Gt=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uImg;
uniform sampler2D uDepth;
uniform int uMode;
uniform bool uTurbo;
uniform vec2 uRes;      // texture size in px
uniform float uFocus;
uniform float uBlurPx;  // max CoC radius in px
uniform float uDof;
uniform vec2 uOffset;
uniform float uZoom;
uniform float uPivot;
uniform float uScale;   // parallax overscan (<1 crops in)

float depthAt(vec2 uv) { return texture(uDepth, uv).r; }

vec3 turbo(float x) {
  x = clamp(x, 0.0, 1.0);
  vec4 v4 = vec4(1.0, x, x * x, x * x * x);
  vec2 v2 = v4.zw * v4.z;
  return clamp(vec3(
    dot(v4, vec4(0.13572138, 4.61539260, -42.66032258, 132.13108234)) + dot(v2, vec2(-152.94239396, 59.28637943)),
    dot(v4, vec4(0.09140261, 2.19418839, 4.84296658, -14.18503333)) + dot(v2, vec2(4.27729857, 2.82956604)),
    dot(v4, vec4(0.10667330, 12.64194608, -60.58204836, 110.36276771)) + dot(v2, vec2(-89.90310912, 27.34824973))
  ), 0.0, 1.0);
}

float coc(float d) {
  return uBlurPx * clamp((abs(d - uFocus) - uDof) / 0.35, 0.0, 1.0);
}

vec4 portrait(vec2 uv) {
  float dc = depthAt(uv);
  float cc = coc(dc);
  vec3 acc = texture(uImg, uv).rgb;
  float wsum = 1.0;
  if (uBlurPx < 0.5) return vec4(acc, 1.0);
  const int N = 96;
  const float GA = 2.39996323;
  for (int i = 0; i < N; i++) {
    float fi = float(i) + 0.5;
    float r = sqrt(fi / float(N)) * uBlurPx;
    float th = fi * GA;
    vec2 suv = uv + vec2(cos(th), sin(th)) * r / uRes;
    float ds = depthAt(suv);
    float cs = coc(ds);
    // A sample that is farther away than the centre may not bleed over an
    // in-focus foreground: limit its spread to the centre's own CoC.
    float spread = ds < dc ? min(cs, cc) : cs;
    float w = clamp(spread - r + 1.0, 0.0, 1.0);
    vec3 c = texture(uImg, suv).rgb;
    // gentle bokeh: bright samples weigh a bit more
    float lum = dot(c, vec3(0.299, 0.587, 0.114));
    w *= 1.0 + 2.0 * pow(lum, 4.0);
    acc += c * w;
    wsum += w;
  }
  return vec4(acc / wsum, 1.0);
}

vec4 parallax(vec2 uv) {
  vec2 p = 0.5 + (uv - 0.5) * uScale;
  vec2 dir = uOffset + (p - 0.5) * uZoom;
  // A surface at depth k drawn at source s appears at s + dir * (k - pivot).
  // March k from near (1) to far (0); the first k whose source sample is at
  // least that near is the front-most surface → correct occlusion.
  const int STEPS = 40;
  float prevK = 1.0;
  float prevF = depthAt(p - dir * (1.0 - uPivot)) - 1.0;
  vec2 hit = p - dir * (0.0 - uPivot);
  for (int i = 1; i <= STEPS; i++) {
    float k = 1.0 - float(i) / float(STEPS);
    vec2 s = p - dir * (k - uPivot);
    float f = depthAt(s) - k;
    if (f >= 0.0) {
      float t = prevF / (prevF - f);
      float kk = mix(prevK, k, t);
      hit = p - dir * (kk - uPivot);
      break;
    }
    prevK = k;
    prevF = f;
  }
  return vec4(texture(uImg, hit).rgb, 1.0);
}

void main() {
  if (uMode == 1) {
    float d = depthAt(vUv);
    outColor = vec4(uTurbo ? turbo(d) : vec3(d), 1.0);
  } else if (uMode == 2) {
    outColor = portrait(vUv);
  } else if (uMode == 3) {
    outColor = parallax(vUv);
  } else {
    outColor = vec4(texture(uImg, vUv).rgb, 1.0);
  }
}`,jt={photo:0,depth:1,portrait:2,parallax:3};function Kt(a){const e=new Float32Array(1),t=new Uint32Array(e.buffer);e[0]=a;const o=t[0],i=o>>>16&32768;let s=(o>>>23&255)-127+15,d=o&8388607;return s<=0?s<-10?i:(d=(d|8388608)>>1-s,i|d>>13):s>=31?i|31743:(d&4096&&(d+=8192,d&8388608&&(d=0,s+=1)),i|s<<10|d>>13)}class et{canvas;gl;prog;imgTex;depthTex;loc={};texW=1;texH=1;constructor(e){this.canvas=e;const t=e.getContext("webgl2",{preserveDrawingBuffer:!0,antialias:!1,premultipliedAlpha:!1});if(!t)throw new Error("WebGL2 unavailable");this.gl=t,this.prog=Zt(t,Xt,Gt),t.useProgram(this.prog);const o=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);const i=t.getAttribLocation(this.prog,"aPos");t.enableVertexAttribArray(i),t.vertexAttribPointer(i,2,t.FLOAT,!1,0,0);for(const s of["uImg","uDepth","uMode","uTurbo","uRes","uFocus","uBlurPx","uDof","uOffset","uZoom","uPivot","uScale"])this.loc[s]=t.getUniformLocation(this.prog,s);this.imgTex=pt(t),this.depthTex=pt(t),t.uniform1i(this.loc.uImg,0),t.uniform1i(this.loc.uDepth,1)}setImage(e){const t=this.gl;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.imgTex),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,e),this.texW=e.width,this.texH=e.height}setDepth(e){const t=this.gl,o=new Uint16Array(e.data.length);for(let i=0;i<o.length;i++)o[i]=Kt(e.data[i]);t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.depthTex),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R16F,e.width,e.height,0,t.RED,t.HALF_FLOAT,o)}resize(e,t){this.canvas.width!==e&&(this.canvas.width=e),this.canvas.height!==t&&(this.canvas.height=t)}render(e){const t=this.gl,o=this.canvas.width,i=this.canvas.height;t.viewport(0,0,o,i),t.useProgram(this.prog),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.imgTex),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.depthTex),t.uniform1i(this.loc.uMode,jt[e.mode]),t.uniform1i(this.loc.uTurbo,e.turbo?1:0),t.uniform2f(this.loc.uRes,o,i),t.uniform1f(this.loc.uFocus,e.focus),t.uniform1f(this.loc.uBlurPx,e.blur*Math.max(o,i)),t.uniform1f(this.loc.uDof,e.dof),t.uniform2f(this.loc.uOffset,e.offset[0],e.offset[1]),t.uniform1f(this.loc.uZoom,e.zoom),t.uniform1f(this.loc.uPivot,e.pivot);const s=e.maxShift*Math.max(e.pivot,1-e.pivot);t.uniform1f(this.loc.uScale,Math.max(.6,1-2*s)),t.drawArrays(t.TRIANGLE_STRIP,0,4)}get imageSize(){return[this.texW,this.texH]}dispose(){const e=this.gl;e.deleteTexture(this.imgTex),e.deleteTexture(this.depthTex),e.deleteProgram(this.prog),e.getExtension("WEBGL_lose_context")?.loseContext()}}function pt(a){const e=a.createTexture();if(!e)throw new Error("createTexture failed");return a.bindTexture(a.TEXTURE_2D,e),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),e}function Zt(a,e,t){const o=(s,d)=>{const l=a.createShader(s);if(a.shaderSource(l,d),a.compileShader(l),!a.getShaderParameter(l,a.COMPILE_STATUS))throw new Error(`shader compile failed: ${a.getShaderInfoLog(l)??""}`);return l},i=a.createProgram();if(a.attachShader(i,o(a.VERTEX_SHADER,e)),a.attachShader(i,o(a.FRAGMENT_SHADER,t)),a.linkProgram(i),!a.getProgramParameter(i,a.LINK_STATUS))throw new Error(`program link failed: ${a.getProgramInfoLog(i)??""}`);return i}function ut(a,e,t){const o=Math.PI*2*e;return a==="sway"?{offset:[t*Math.sin(o),0],zoom:0}:a==="dolly"?{offset:[0,0],zoom:t*2*(.5-.5*Math.cos(o))}:{offset:[t*Math.cos(o),t*.6*Math.sin(o)],zoom:0}}function Yt(a,e){return a==="dolly"?e*1.42:e}async function Qt(a){if(typeof VideoEncoder>"u")throw new Error(r("depth-3d.msg.noVideoEncoder"));const{width:e,height:t,fps:o}=a,i=Math.max(2,Math.round(a.seconds*o)),s=Math.round(Math.min(16e6,e*t*o*.15));let d,l,u;if(a.format==="webm"){u="vp09.00.10.08";const m=new At({target:new kt,video:{codec:"V_VP9",width:e,height:t,frameRate:o}});l=(x,w)=>m.addVideoChunk(x,w),d=()=>(m.finalize(),m.target.buffer)}else{u=await Et(e,t,o,s);const m=new St({target:new Tt,video:{codec:"avc",width:e,height:t,frameRate:o},fastStart:"in-memory",firstTimestampBehavior:"offset"});l=(x,w)=>m.addVideoChunk(x,w),d=()=>(m.finalize(),m.target.buffer)}let h=null;const g=new VideoEncoder({output:(m,x)=>l(m,x),error:m=>{h=m}});g.configure({codec:u,width:e,height:t,bitrate:s,framerate:o,...a.format==="mp4"?{avc:{format:"avc"}}:{}});try{for(let m=0;m<i;m++){if(a.signal?.aborted)throw new DOMException("export cancelled","AbortError");if(h)throw h;a.drawFrame(m,i);const x=new VideoFrame(a.canvas,{timestamp:Math.round(m/o*1e6),duration:Math.round(1/o*1e6)});for(g.encode(x,{keyFrame:m%(o*2)===0}),x.close();g.encodeQueueSize>8;)await new Promise(w=>setTimeout(w,4));m%4===0&&(a.onProgress?.((m+1)/i),await new Promise(w=>setTimeout(w,0)))}if(await g.flush(),h)throw h}finally{g.state!=="closed"&&g.close()}a.onProgress?.(1);const M=d();return new Blob([M],{type:a.format==="webm"?"video/webm":"video/mp4"})}function Jt(a){a.innerHTML="";const e=document.createElement("div");e.innerHTML=ee();const t=document.createDocumentFragment();for(;e.firstChild;)t.appendChild(e.firstChild);a.append(t);const o=s=>{const d=a.querySelector(s);if(!d)throw new Error(`missing element: ${s}`);return d},i=s=>Array.from(a.querySelectorAll(`[data-role="${s}"]`));for(const s of a.querySelectorAll("section[data-collapsible]"))s.querySelector(".sec-head")?.addEventListener("click",()=>s.toggleAttribute("data-collapsed"));return{root:a,runtimePill:o("#d3d-runtime-pill"),banner:o("#d3d-banner"),dropzone:o("#d3d-dropzone"),pickBtn:o("#d3d-pick-btn"),fileInput:o("#d3d-file-input"),fileLabel:o("#d3d-file-label"),detailOpts:i("detail-opt"),viewOpts:i("view-opt"),cmapOpts:i("cmap-opt"),motionOpts:i("motion-opt"),vfmtOpts:i("vfmt-opt"),vsizeOpts:i("vsize-opt"),blurSlider:o("#d3d-blur"),blurValue:o("#d3d-blur-v"),dofSlider:o("#d3d-dof"),dofValue:o("#d3d-dof-v"),focusValue:o("#d3d-focus-v"),amountSlider:o("#d3d-amount"),amountValue:o("#d3d-amount-v"),pivotSlider:o("#d3d-pivot"),pivotValue:o("#d3d-pivot-v"),durSlider:o("#d3d-dur"),durValue:o("#d3d-dur-v"),gyroBtn:o("#d3d-gyro-btn"),dlDepth16Btn:o("#d3d-dl-depth16"),dlDepthColorBtn:o("#d3d-dl-depthcolor"),dlPortraitBtn:o("#d3d-dl-portrait"),dlVideoBtn:o("#d3d-dl-video"),videoStatus:o("#d3d-video-status"),processSection:o("#d3d-process-section"),segmentViz:o("#d3d-segment-viz"),tileSource:o("#d3d-tile-source"),tileDepth:o("#d3d-tile-depth"),previewSection:o("#d3d-preview-section"),stageWrap:o("#d3d-stage-wrap"),stage:o("#d3d-stage"),focusMark:o("#d3d-focus-mark"),stageHint:o("#d3d-stage-hint"),runBtn:o("#d3d-run-btn"),runStatus:o("#d3d-run-status"),imageInfo:o("#d3d-info"),dlStrip:o("#d3d-dl-strip"),statModel:o("#d3d-stat-model"),statDim:o("#d3d-stat-dim")}}function te(){return'<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'}function L(a,e=""){return`<header class="sec-head"><span class="sec-label">${a}</span><span class="sec-meta">${e}</span>${te()}</header>`}function j(a,e,t,o=""){return`
    <li class="step" data-step="${a}" data-status="pending">
      <span class="step-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="step-body">
        <div class="step-title">${e}</div>
        <div class="step-desc">${t}</div>
        <div class="step-note" data-role="step-note"></div>
        ${o}
      </div>
    </li>`}function H(a,e,t,o,i,s,d=!1){return`
    <button class="opt" data-role="${a}" data-${e}="${t}" aria-pressed="${d}">
      <span class="dot"></span>
      <span class="label">${o}</span>
      <span class="meta">${i}</span>
      <span class="sub">${s}</span>
    </button>`}function K(a,e,t,o){return`<div class="d3d-seg" role="group">${t.map(([i,s])=>`<button type="button" data-role="${a}" data-${e}="${i}" aria-pressed="${i===o}">${s}</button>`).join("")}</div>`}function N(a,e,t,o,i,s,d){return`
    <div class="row-inline">
      <span class="row-label d3d-row-label">${e}</span>
      <input type="range" id="${a}" min="${t}" max="${o}" step="${i}" value="${s}" />
      <span id="${a}-v" class="row-value d3d-row-value">${d}</span>
    </div>`}function ee(){return`
    <div id="d3d-banner" class="banner hidden">
      <button class="x" aria-label="${r("depth-3d.banner.dismiss")}">×</button>
      <div><b>${r("depth-3d.banner.webgpuHead")}</b></div>
      <div>${r("depth-3d.banner.fallback")}</div>
    </div>

    <header class="topbar">
      <div class="brand"><span class="brand-mark"></span>${r("depth-3d.brand")}<span class="tag">/ t·019</span></div>
      <div class="stat-row">
        <div class="stat"><span class="k">${r("depth-3d.stat.model")}</span><span class="v" id="d3d-stat-model">—</span></div>
        <div class="stat"><span class="k">${r("depth-3d.stat.size")}</span><span class="v" id="d3d-stat-dim">—</span></div>
        <div id="d3d-runtime-pill" class="runtime-pill" data-device="probing">${r("depth-3d.runtime.probing")}</div>
      </div>
    </header>

    <main class="panel panel-split d3d">
      <div class="panel-col panel-col-left">

      <section class="sec" data-collapsible>
        ${L(r("depth-3d.sec.model"),"depth anything v2")}
        <div class="sec-body">
          <div class="opt-group">
            ${H("detail-opt","size","518",r("depth-3d.detail.standard"),"518 px",r("depth-3d.detail.standardSub"),!0)}
            ${H("detail-opt","size","798",r("depth-3d.detail.detailed"),"798 px",r("depth-3d.detail.detailedSub"))}
          </div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${L(r("depth-3d.sec.view"))}
        <div class="sec-body">
          <div class="opt-group">
            ${H("view-opt","view","depth",r("depth-3d.view.depth"),r("depth-3d.view.depthMeta"),r("depth-3d.view.depthSub"),!0)}
            ${H("view-opt","view","portrait",r("depth-3d.view.portrait"),r("depth-3d.view.portraitMeta"),r("depth-3d.view.portraitSub"))}
            ${H("view-opt","view","parallax",r("depth-3d.view.parallax"),r("depth-3d.view.parallaxMeta"),r("depth-3d.view.parallaxSub"))}
          </div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${L(r("depth-3d.sec.depthMap"))}
        <div class="sec-body d3d-stack">
          <div class="row-inline"><span class="row-label d3d-row-label">${r("depth-3d.row.colour")}</span>
            ${K("cmap-opt","cmap",[["grey",r("depth-3d.cmap.grey")],["turbo","Turbo"]],"grey")}
          </div>
          <div class="d3d-btn-row">
            <button class="btn" id="d3d-dl-depth16" disabled>${r("depth-3d.dl.depth16")}</button>
            <button class="btn" id="d3d-dl-depthcolor" disabled>${r("depth-3d.dl.depthColor")}</button>
          </div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${L(r("depth-3d.sec.portrait"))}
        <div class="sec-body d3d-stack">
          ${N("d3d-blur",r("depth-3d.row.blur"),0,100,1,45,"45")}
          ${N("d3d-dof",r("depth-3d.row.focusBand"),0,30,1,6,"6")}
          <div class="row-inline"><span class="row-label d3d-row-label">${r("depth-3d.row.focus")}</span><span class="row-value" id="d3d-focus-v">${r("depth-3d.focus.auto")}</span></div>
          <div class="d3d-btn-row"><button class="btn" id="d3d-dl-portrait" disabled>${r("depth-3d.dl.portrait")}</button></div>
        </div>
      </section>

      <section class="sec" data-collapsible>
        ${L(r("depth-3d.sec.photo3d"))}
        <div class="sec-body d3d-stack">
          <div class="row-inline"><span class="row-label d3d-row-label">${r("depth-3d.row.motion")}</span>
            ${K("motion-opt","motion",[["circle",r("depth-3d.motion.circle")],["sway",r("depth-3d.motion.sway")],["dolly",r("depth-3d.motion.dolly")]],"circle")}
          </div>
          ${N("d3d-amount",r("depth-3d.row.strength"),0,100,1,40,"40")}
          ${N("d3d-pivot",r("depth-3d.row.pivot"),0,100,1,50,"50")}
          ${N("d3d-dur",r("depth-3d.row.loop"),2,8,1,4,"4 s")}
          <div class="row-inline"><span class="row-label d3d-row-label">${r("depth-3d.row.format")}</span>
            ${K("vfmt-opt","fmt",[["mp4","MP4"],["webm","WebM"]],"mp4")}
            ${K("vsize-opt","vsize",[["720","720p"],["1080","1080p"]],"1080")}
          </div>
          <div class="d3d-btn-row">
            <button class="btn" id="d3d-gyro-btn" type="button" aria-pressed="false">${r("depth-3d.gyro.off")}</button>
            <button class="btn" id="d3d-dl-video" disabled>${r("depth-3d.dl.video")}</button>
          </div>
          <div id="d3d-video-status" class="format-hint"></div>
        </div>
      </section>

      </div>

      <div class="panel-col panel-col-right">

      <div id="d3d-dropzone" class="intake-cta" data-active="false">
        <button class="cta-btn" id="d3d-pick-btn">
          <svg viewBox="0 0 16 16" class="cta-icon" aria-hidden="true">
            <path d="M3 11v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2M8 2v8m0-8l-3 3m3-3l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${r("depth-3d.intake.open")}
        </button>
        <input type="file" id="d3d-file-input" accept="image/*" class="hidden" />
        <div class="intake-sub" id="d3d-file-label">${r("depth-3d.intake.sub")}</div>
      </div>

      <div class="dl" id="d3d-dl-strip"></div>

      <section id="d3d-preview-section" class="sec" hidden>
        ${L(r("depth-3d.sec.preview"))}
        <div class="sec-body">
          <div class="d3d-stage-wrap" id="d3d-stage-wrap">
            <canvas id="d3d-stage" width="16" height="9"></canvas>
            <div class="d3d-focus-mark" id="d3d-focus-mark" hidden></div>
          </div>
          <div class="d3d-stage-hint" id="d3d-stage-hint"></div>
        </div>
      </section>

      <section id="d3d-process-section" class="sec" data-collapsible hidden>
        ${L(r("depth-3d.sec.process"))}
        <div class="sec-body">
          <ol class="steps">
            ${j("load-model",r("depth-3d.step.loadModel"),r("depth-3d.step.loadModelDesc"))}
            ${j("inspect",r("depth-3d.step.inspect"),r("depth-3d.step.inspectDesc"))}
            ${j("estimate",r("depth-3d.step.estimate"),r("depth-3d.step.estimateDesc"),`<div id="d3d-segment-viz" class="step-viz" hidden><div class="step-tiles">
                <div class="step-tile"><div class="step-tile-label"><span class="dot"></span>${r("depth-3d.tile.source")}</div><canvas id="d3d-tile-source" width="480" height="270"></canvas></div>
                <div class="step-tile"><div class="step-tile-label"><span class="dot"></span>${r("depth-3d.tile.depth")}</div><canvas id="d3d-tile-depth" width="480" height="270"></canvas></div>
              </div></div>`)}
            ${j("refine",r("depth-3d.step.refine"),r("depth-3d.step.refineDesc"))}
          </ol>
        </div>
      </section>

      </div>
    </main>

    <footer class="transport">
      <button class="btn ghost" id="d3d-run-btn" disabled>${r("depth-3d.run.estimate")} <span class="arrow">›</span></button>
      <div id="d3d-info" class="img-info">${r("depth-3d.info.none")}</div>
      <span id="d3d-run-status" class="action-status hidden"></span>
    </footer>
  `}const ne=2048,ae=1400,nt=.06;let ht=null;function le(a){if(ht===a)return;ht=a;const e=Jt(a),t={runtime:{device:"wasm",adapterName:null,reason:"pending probe"},probed:null,model:null,loadingModel:null,shortSide:518,src:null,depth:null,processing:!1,cancelRequested:!1,exporting:!1,view:"depth",cmap:"grey",blur:.45,dof:.06,focus:.8,focusPoint:null,motion:"circle",amount:.4,pivot:.5,seconds:4,vfmt:"mp4",vsize:1080,pointer:null,gyro:null,gyroOn:!1,gyroBase:null,cur:[0,0],curZoom:0,raf:0,visible:!0,lastUrl:[]};let o=null,i=null;t.probed=(async()=>{const n=await bt();t.runtime=n,e.runtimePill.dataset.device=n.device,e.runtimePill.textContent=n.device==="webgpu"?r("depth-3d.runtime.webgpu",{name:n.adapterName??r("depth-3d.runtime.ready")}):r("depth-3d.runtime.wasm"),n.device==="wasm"&&D(r("depth-3d.msg.webgpuFallback",{reason:n.reason??r("depth-3d.msg.noAdapter")})),e.statModel.textContent="DA-V2 S"})(),e.banner.querySelector(".x")?.addEventListener("click",()=>{e.banner.classList.add("hidden")}),xt(()=>{t.processing||!t.model||(t.model.dispose(),t.model=null,E("load-model","pending"))}),_(e.detailOpts,"size",n=>{t.shortSide=Number(n),t.src&&t.depth&&!t.processing&&g()}),_(e.viewOpts,"view",n=>{t.view=n,C()}),_(e.cmapOpts,"cmap",n=>{t.cmap=n,t.view!=="depth"&&P("depth"),rt(),T()}),_(e.motionOpts,"motion",n=>{t.motion=n,t.view!=="parallax"&&P("parallax")}),_(e.vfmtOpts,"fmt",n=>{t.vfmt=n}),_(e.vsizeOpts,"vsize",n=>{t.vsize=Number(n)}),V(e.blurSlider,e.blurValue,n=>(t.blur=n/100,t.view!=="portrait"&&P("portrait"),T(),String(n))),V(e.dofSlider,e.dofValue,n=>(t.dof=n/100,t.view!=="portrait"&&P("portrait"),T(),String(n))),V(e.amountSlider,e.amountValue,n=>(t.amount=n/100,t.view!=="parallax"&&P("parallax"),String(n))),V(e.pivotSlider,e.pivotValue,n=>(t.pivot=n/100,t.view!=="parallax"&&P("parallax"),String(n))),V(e.durSlider,e.durValue,n=>(t.seconds=n,`${n} s`)),e.gyroBtn.addEventListener("click",async()=>{if(t.gyroOn)t.gyroOn=!1,t.gyro=null,window.removeEventListener("deviceorientation",s);else{const n=window.DeviceOrientationEvent;if(!n){D(r("depth-3d.msg.noSensor"),"error");return}try{if(typeof n.requestPermission=="function"&&await n.requestPermission()!=="granted")throw new Error(r("depth-3d.msg.permissionDenied"))}catch(c){D(r("depth-3d.msg.gyroUnavailable",{error:c.message}),"error");return}t.gyroOn=!0,t.gyroBase=null,window.addEventListener("deviceorientation",s),t.view!=="parallax"&&P("parallax")}e.gyroBtn.setAttribute("aria-pressed",String(t.gyroOn)),e.gyroBtn.textContent=t.gyroOn?r("depth-3d.gyro.on"):r("depth-3d.gyro.off")});function s(n){if(n.beta==null||n.gamma==null)return;t.gyroBase||(t.gyroBase=[n.gamma,n.beta]);const c=O((n.gamma-t.gyroBase[0])/25,-1,1),p=O((n.beta-t.gyroBase[1])/25,-1,1);t.gyro=[c,p]}e.pickBtn.addEventListener("click",()=>e.fileInput.click()),e.fileInput.addEventListener("change",async()=>{const n=e.fileInput.files?.[0];e.fileInput.value="",n&&await l(n)});const d=e.dropzone;for(const n of["dragenter","dragover"])d.addEventListener(n,c=>{c.preventDefault(),d.dataset.active="true"});for(const n of["dragleave","drop"])d.addEventListener(n,c=>{c.preventDefault(),d.dataset.active="false"});d.addEventListener("drop",async n=>{const c=n.dataTransfer?.files?.[0];c&&await l(c)}),e.runBtn.addEventListener("click",async()=>{if(!t.processing){if(!t.src){D(r("depth-3d.msg.loadFirst"),"error");return}await g()}}),e.dlDepth16Btn.addEventListener("click",async()=>{if(!t.depth)return;const n=await Wt(t.depth);G(n,`depth16-${Z()}.png`,r("depth-3d.dl.depth16"),t.depth.width,t.depth.height)}),e.dlDepthColorBtn.addEventListener("click",async()=>{if(!t.depth)return;const{width:n,height:c}=t.depth,p=new OffscreenCanvas(n,c);p.getContext("2d").putImageData(new ImageData(lt(t.depth,t.cmap),n,c),0,0);const f=await p.convertToBlob({type:"image/png"});G(f,`depth-${t.cmap}-${Z()}.png`,`PNG · ${t.cmap}`,n,c)}),e.dlPortraitBtn.addEventListener("click",async()=>{if(!t.src||!t.depth)return;const n=x();n.resize(t.src.width,t.src.height),n.render(w("portrait"));const c=await n.canvas.convertToBlob({type:"image/jpeg",quality:.95});G(c,`portrait-${Z()}.jpg`,r("depth-3d.flavour.portrait"),t.src.width,t.src.height)}),e.dlVideoBtn.addEventListener("click",()=>void M()),e.stage.addEventListener("pointermove",n=>{t.view!=="parallax"||n.pointerType==="touch"||(t.pointer=F(n))}),e.stage.addEventListener("pointerleave",()=>{t.pointer=null}),e.stage.addEventListener("click",n=>{if(!t.depth)return;const[c,p]=F(n),f=W(c,p);if(t.view==="parallax"){t.pivot=f,e.pivotSlider.value=String(Math.round(f*100)),e.pivotValue.textContent=e.pivotSlider.value;return}t.view!=="portrait"&&P("portrait"),t.focus=f,t.focusPoint=[c,p],e.focusValue.textContent=r("depth-3d.focus.picked",{d:(f*100).toFixed(0),x:Math.round(c*100),y:Math.round(p*100)}),T()}),a.addEventListener("pane-hidden",()=>{t.visible=!1,b()}),a.addEventListener("pane-shown",()=>{t.visible=!0,C()});async function l(n){if(!n.type.startsWith("image/")){D(r("depth-3d.msg.rejected",{type:n.type||r("depth-3d.msg.unknown")}),"error");return}if(t.processing)return;mt(),e.processSection.removeAttribute("hidden"),e.fileLabel.textContent=n.name,E("inspect","active");let c;try{c=await createImageBitmap(n)}catch(I){E("inspect","pending"),D(r("depth-3d.msg.decodeFailed",{error:I.message}),"error");return}const p=c.width,f=c.height,v=Math.min(1,ne/Math.max(p,f)),y=Math.max(1,Math.round(p*v)),$=Math.max(1,Math.round(f*v)),S=new OffscreenCanvas(y,$),A=S.getContext("2d",{willReadFrequently:!0});A.imageSmoothingQuality="high",A.drawImage(c,0,0,y,$),c.close();const R=A.getImageData(0,0,y,$).data;t.src?.bitmap.close(),t.src={name:n.name,bitmap:await createImageBitmap(S),rgba:R,width:y,height:$,origW:p,origH:f},t.depth=null,t.focusPoint=null,e.focusMark.hidden=!0,e.focusValue.textContent=r("depth-3d.focus.auto");const B=v<1?r("depth-3d.note.working",{w:y,h:$}):"";e.statDim.textContent=`${p}×${f}`,e.imageInfo.textContent=`${n.name} · ${p}×${f} · ${(n.size/1024).toFixed(0)} KB`,E("inspect","done",`${n.name} · ${p}×${f}${B}`),e.segmentViz.removeAttribute("hidden"),ft(y,$),Y(e.tileSource,t.src.bitmap),Y(e.tileDepth,null),e.runBtn.disabled=!1,await g()}async function u(){if(t.model){E("load-model","done",h());return}return t.loadingModel||(t.loadingModel=(async()=>{await t.probed,E("load-model","active","Depth Anything V2 Small");try{t.model=await Pt(t.runtime.device,({phase:n,progress:c})=>{E("load-model","active",`${n} · ${(c*100).toFixed(0)}%`)}),E("load-model","done",h()),e.statModel.textContent=`DA-V2 S · ${t.model.dtype}`}catch(n){E("load-model","pending"),D(r("depth-3d.msg.modelFailed",{error:n.message}),"error")}finally{t.loadingModel=null}})()),t.loadingModel}function h(){const n=t.model;return n?`DA-V2 Small · ${n.device} · ${n.dtype} · ${Ct[n.dtype]}`:""}async function g(){const n=t.src;if(!n||t.processing)return;t.processing=!0,t.cancelRequested=!1,e.runBtn.disabled=!0,Q(!1),e.runStatus.classList.remove("hidden"),e.runStatus.textContent=r("depth-3d.status.loadingModel");const c=ct({tool:r("tool.depth-3d.name"),route:"depth-3d",label:n.name,detail:r("depth-3d.status.estimating"),progress:null,onCancel:()=>{t.cancelRequested=!0}});try{if(await u(),!t.model)throw new Error(r("depth-3d.msg.modelUnavailable"));if(t.cancelRequested)throw new DOMException("cancelled","AbortError");e.runStatus.textContent=r("depth-3d.status.estimating"),E("estimate","active",r("depth-3d.note.inference",{px:t.shortSide})),E("refine","pending");const p=performance.now(),f=await t.model.estimate(n.bitmap,t.shortSide),v=performance.now()-p;if(t.cancelRequested)throw new DOMException("cancelled","AbortError");E("estimate","done",`${f.width}×${f.height} · ${t.model.device}/${t.model.dtype} · ${(v/1e3).toFixed(2)} s`),e.statModel.textContent=`DA-V2 S · ${t.model.dtype}`,console.info(`[depth] inference ${f.width}x${f.height} on ${t.model.device}/${t.model.dtype} in ${Math.round(v)} ms`),E("refine","active",`${n.width}×${n.height}…`),c.update({detail:r("depth-3d.status.upsample")}),await oe();const y=performance.now();t.depth=Ot(f,n.rgba,n.width,n.height);const $=performance.now()-y;E("refine","done",`${n.width}×${n.height} · ${($/1e3).toFixed(2)} s`),console.info(`[depth] refine ${n.width}x${n.height} in ${Math.round($)} ms`),t.focus=X(t.depth),m(),rt(),Q(!0),e.previewSection.removeAttribute("hidden"),c.done(`${n.width}×${n.height} · ${((v+$)/1e3).toFixed(1)} s`),e.runStatus.textContent=r("depth-3d.status.done",{s:((v+$)/1e3).toFixed(1)}),a.dataset.depthReady="true"}catch(p){const f=p;f.name==="AbortError"?(c.markCancelled(),e.runStatus.textContent=r("depth-3d.status.cancelled")):(D(r("depth-3d.msg.estimateFailed",{error:f.message}),"error"),c.fail(f.message),e.runStatus.textContent=r("depth-3d.status.failed")),E("estimate","pending"),E("refine","pending")}finally{t.processing=!1,e.runBtn.disabled=!1,e.runBtn.innerHTML=`${r("depth-3d.run.again")} <span class="arrow">›</span>`,t.cancelRequested&&t.model&&(t.cancelRequested=!1,await t.model.dispose(),t.model=null,E("load-model","pending"))}}async function M(){if(!t.src||!t.depth||t.exporting)return;t.exporting=!0,e.dlVideoBtn.disabled=!0;const n=new AbortController,c=t.vsize,p=Math.min(1,c/Math.max(t.src.width,t.src.height)),f=B=>Math.max(2,Math.round(B/2)*2),v=f(t.src.width*p),y=f(t.src.height*p),$=30,S=ct({tool:r("tool.depth-3d.name"),route:"depth-3d",label:r("depth-3d.job.loopLabel",{name:t.src.name}),detail:r("depth-3d.job.rendering"),progress:0,onCancel:()=>n.abort()}),A=new OffscreenCanvas(v,y);let R=null;try{R=new et(A),R.setImage(t.src.bitmap),R.setDepth(t.depth);const B=R,I=performance.now(),it=await Qt({canvas:A,width:v,height:y,fps:$,seconds:t.seconds,format:t.vfmt,signal:n.signal,drawFrame:(q,vt)=>{const dt=ut(t.motion,q/vt,t.amount*nt);B.render({...w("parallax"),offset:dt.offset,zoom:dt.zoom})},onProgress:q=>{S.update({progress:q,detail:`${Math.round(q*100)}%`}),e.videoStatus.textContent=r("depth-3d.video.encoding",{pct:Math.round(q*100)})}}),st=((performance.now()-I)/1e3).toFixed(1);S.done(`${(it.size/1024/1024).toFixed(1)} MB · ${st} s`),e.videoStatus.textContent=r("depth-3d.video.done",{w:v,h:y,secs:t.seconds,enc:st}),G(it,`3d-photo-${t.motion}-${Z()}.${t.vfmt}`,r("depth-3d.flavour.loop",{fmt:t.vfmt.toUpperCase(),secs:t.seconds,motion:t.motion}),v,y)}catch(B){const I=B;I.name==="AbortError"?(S.markCancelled(),e.videoStatus.textContent=r("depth-3d.status.cancelled")):(S.fail(I.message),e.videoStatus.textContent="",D(r("depth-3d.msg.videoFailed",{error:I.message}),"error"))}finally{R?.dispose(),t.exporting=!1,e.dlVideoBtn.disabled=!t.depth}}function m(){const n=t.src;if(!n||!t.depth)return;if(!o)try{o=new et(e.stage)}catch(p){D(r("depth-3d.msg.webglUnavailable",{error:p.message}),"error");return}const c=Math.min(1,ae/Math.max(n.width,n.height));o.resize(Math.round(n.width*c),Math.round(n.height*c)),o.setImage(n.bitmap),o.setDepth(t.depth),i&&(i.setImage(n.bitmap),i.setDepth(t.depth)),e.stageWrap.style.aspectRatio=`${n.width} / ${n.height}`,e.stageWrap.style.setProperty("--ar",String(n.width/n.height)),C()}function x(){return i||(i=new et(new OffscreenCanvas(16,16)),t.src&&i.setImage(t.src.bitmap),t.depth&&i.setDepth(t.depth)),i}function w(n){const c=t.amount*nt;return{mode:n,turbo:t.cmap==="turbo",focus:t.focus,blur:t.blur*.025,dof:t.dof,offset:t.cur,zoom:t.curZoom,pivot:t.pivot,maxShift:Yt(t.motion,c)}}function T(){!o||!t.depth||(o.render(w(t.view)),k())}function C(){const n={depth:r("depth-3d.hint.depth"),portrait:r("depth-3d.hint.portrait"),parallax:r("depth-3d.hint.parallax")};e.stageHint.textContent=n[t.view],e.stage.dataset.view=t.view,k(),t.view==="parallax"&&t.visible&&t.depth?U():(b(),T())}function U(){if(t.raf)return;const n=performance.now(),c=p=>{t.raf=requestAnimationFrame(c);const f=t.amount*nt;let v,y=0;if(t.gyro)v=[t.gyro[0]*f,t.gyro[1]*f];else if(t.pointer)v=[(t.pointer[0]-.5)*2*f,(t.pointer[1]-.5)*2*f];else{const S=ut(t.motion,(p-n)/1e3/t.seconds%1,f);v=S.offset,y=S.zoom}const $=t.pointer||t.gyro?.15:1;t.cur=[t.cur[0]+(v[0]-t.cur[0])*$,t.cur[1]+(v[1]-t.cur[1])*$],t.curZoom+=(y-t.curZoom)*$,o?.render(w("parallax"))};t.raf=requestAnimationFrame(c)}function b(){t.raf&&cancelAnimationFrame(t.raf),t.raf=0}function k(){const n=t.focusPoint;if(!n||t.view!=="portrait"){e.focusMark.hidden=!0;return}e.focusMark.hidden=!1,e.focusMark.style.left=`${n[0]*100}%`,e.focusMark.style.top=`${n[1]*100}%`}function F(n){const c=e.stage.getBoundingClientRect();return[O((n.clientX-c.left)/c.width,0,1),O((n.clientY-c.top)/c.height,0,1)]}function W(n,c){const p=t.depth,f=Math.min(p.width-1,Math.floor(n*p.width)),v=Math.min(p.height-1,Math.floor(c*p.height));let y=0,$=0;for(let S=-2;S<=2;S++)for(let A=-2;A<=2;A++){const R=O(f+A,0,p.width-1),B=O(v+S,0,p.height-1);y+=p.data[B*p.width+R],$++}return y/$}function X(n){const c=new Uint32Array(256);for(let v=0;v<n.data.length;v+=7)c[Math.round(n.data[v]*255)]++;const p=c.reduce((v,y)=>v+y,0);let f=0;for(let v=255;v>=0;v--)if(f+=c[v],f>=p*.1)return v/255;return .8}function P(n){t.view=n;for(const c of e.viewOpts)c.setAttribute("aria-pressed",String(c.dataset.view===n));C()}function rt(){if(!t.depth)return;const{width:n,height:c}=t.depth,p=new OffscreenCanvas(n,c);p.getContext("2d").putImageData(new ImageData(lt(t.depth,t.cmap),n,c),0,0),Y(e.tileDepth,p)}function ft(n,c){const f=480/Math.max(n,c);for(const v of[e.tileSource,e.tileDepth])v.width=Math.max(1,Math.round(n*f)),v.height=Math.max(1,Math.round(c*f)),v.style.aspectRatio=`${n} / ${c}`}function Y(n,c){const p=n.getContext("2d");p&&(p.fillStyle="#0b0b0c",p.fillRect(0,0,n.width,n.height),c&&p.drawImage(c,0,0,n.width,n.height))}function Q(n){for(const c of[e.dlDepth16Btn,e.dlDepthColorBtn,e.dlPortraitBtn])c.disabled=!n;e.dlVideoBtn.disabled=!n||t.exporting}function _(n,c,p){for(const f of n)f.addEventListener("click",()=>{const v=f.dataset[c];if(v){for(const y of n)y.setAttribute("aria-pressed",String(y===f));p(v)}})}function V(n,c,p){n.addEventListener("input",()=>{c.textContent=p(Number(n.value))})}function E(n,c,p){const f=a.querySelector(`[data-step="${n}"]`);if(!f)return;f.setAttribute("data-status",c);const v=f.querySelector('[data-role="step-note"]');v&&(v.textContent=p??"")}function mt(){E("load-model",t.model?"done":"pending",h()),E("inspect","pending"),E("estimate","pending"),E("refine","pending"),e.dlStrip.innerHTML="",delete a.dataset.depthReady,Q(!1)}function D(n,c="info"){e.banner.classList.remove("hidden"),e.banner.classList.toggle("error",c==="error");const p=c==="error"?r("depth-3d.banner.errorHead"):r("depth-3d.banner.webgpuHead");e.banner.innerHTML=`<button class="x" aria-label="${r("depth-3d.banner.dismiss")}">×</button><div><b>${p}</b></div><div>${at(n)}</div>`,e.banner.querySelector(".x")?.addEventListener("click",()=>e.banner.classList.add("hidden"))}function G(n,c,p,f,v){yt("depth-3d",n,c);const y=URL.createObjectURL(n);for(t.lastUrl.push(y);t.lastUrl.length>6;)URL.revokeObjectURL(t.lastUrl.shift());const $=document.createElement("a");$.href=y,$.download=c,$.rel="noopener",$.style.display="none",document.body.appendChild($),$.click(),$.remove();const S=(n.size/1024).toFixed(1);e.dlStrip.innerHTML="";const A=document.createElement("div");A.className="dl-toast",A.innerHTML=`
      <span class="dl-toast-mark" aria-hidden="true">
        <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div class="dl-toast-body">
        <div class="dl-toast-head">${r("depth-3d.toast.head")}</div>
        <div class="dl-toast-name"></div>
        <div class="dl-toast-meta">${S} KB · ${f}×${v} · ${at(p)}</div>
      </div>
      <a class="dl-toast-link" href="${y}" download="${at(c)}">${r("depth-3d.toast.again")}</a>`,A.querySelector(".dl-toast-name").textContent=c,e.dlStrip.append(A)}}function O(a,e,t){return a<e?e:a>t?t:a}function Z(){return new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}function oe(){return new Promise(a=>requestAnimationFrame(()=>a()))}function at(a){return a.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}export{le as mountDepth3d};
//# sourceMappingURL=app-BayrstWj.js.map
