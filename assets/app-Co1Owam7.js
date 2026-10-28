import{t as i,p as z}from"./index-DbChkwc3.js";import{w as N,s as B,b as P,r as W,t as J,a as E,i as G}from"./fragments-kQZcphFF.js";import{B as K}from"./batch-queue-DSO5kB6T.js";let A=null;function et(e){if(A===e)return;A=e,e.innerHTML=V();const s=t=>e.querySelector(t),c=s("#ce-banner"),a=s("#ce-dropzone"),u=s("#ce-pick-btn"),p=s("#ce-file-input"),f=s("#ce-file-label"),m=s("#ce-k-slider"),r=s("#ce-k-value"),h=s("#ce-source-canvas"),x=s("#ce-palette"),n=Array.from(e.querySelectorAll('[data-role="format-opt"]')),d=s("#ce-process-section"),v=s("#ce-export-btn"),w=s("#ce-export-status"),y=s("#ce-info"),j=s("#ce-dl-strip"),U=s("#ce-stat-dim"),O=s("#ce-stat-clusters"),k=h.getContext("2d",{willReadFrequently:!0}),o={image:null,k:6,palette:[],format:"png",lastUrl:null};for(const t of e.querySelectorAll("section[data-collapsible]"))t.querySelector(".sec-head")?.addEventListener("click",()=>{t.toggleAttribute("data-collapsed")});c.querySelector(".x")?.addEventListener("click",()=>c.classList.add("hidden")),m.addEventListener("input",()=>{o.k=Number(m.value),r.textContent=String(o.k),o.image&&H()});for(const t of n)t.addEventListener("click",()=>{const l=t.dataset.format;if(!(!l||l===o.format)){o.format=l;for(const g of n)g.setAttribute("aria-pressed",String(g===t))}});const S=new K({tool:i("tool.color-extract.name"),route:"color-extract",zipPrefix:"palette",accept:t=>t.type.startsWith("image/"),process:q});S.el.id="ce-batch",j.after(S.el),p.multiple=!0,u.addEventListener("click",()=>p.click()),p.addEventListener("change",async()=>{const t=Array.from(p.files??[]);p.value="",t.length>1?S.add(t):t[0]&&await C(t[0])}),N(a,t=>void C(t),{multiple:!0,onAll:t=>{t.length>1?S.add(t):C(t[0])}});async function q(t,l){l.progress(null,i("color-extract.decoding"));const g=await createImageBitmap(t);try{if(l.progress(.3,i("color-extract.clustering")),await new Promise(L=>setTimeout(L,0)),l.signal.aborted)throw new DOMException("cancelled","AbortError");const b=Q(g,o.k),$=await D(b,o.format),M=t.name.replace(/\.[^.]+$/,"")||"image";return{blob:$.blob,filename:`${M}-palette.${$.ext}`,meta:i("color-extract.batchMeta",{n:b.length,hexes:b.slice(0,3).map(L=>L.hex).join(" ")})}}finally{g.close?.()}}v.addEventListener("click",()=>{if(!o.palette.length){B(c,i("color-extract.err.noImage"),"error");return}R()});async function C(t){if(!t.type.startsWith("image/")){B(c,i("color-extract.err.rejected",{type:t.type||i("color-extract.unknownType")}),"error");return}o.image?.bitmap.close?.(),f.textContent=t.name,y.textContent=i("color-extract.info.decoding",{name:t.name});let l;try{l=await createImageBitmap(t)}catch(g){B(c,i("color-extract.err.decode",{msg:g.message}),"error");return}o.image={bitmap:l,name:t.name},U.textContent=`${l.width}×${l.height}`,y.textContent=`${t.name} · ${l.width}×${l.height}`,d.removeAttribute("hidden"),H()}function H(){if(!o.image||!k)return;w.classList.remove("hidden"),w.textContent=i("color-extract.sampling");const l=Math.min(1,200/Math.max(o.image.bitmap.width,o.image.bitmap.height)),g=Math.max(1,Math.round(o.image.bitmap.width*l)),b=Math.max(1,Math.round(o.image.bitmap.height*l));h.width=g,h.height=b,k.drawImage(o.image.bitmap,0,0,g,b);const $=k.getImageData(0,0,g,b).data;o.palette=T($,o.k),O.textContent=String(o.palette.length),F(),v.disabled=!1,w.textContent=i("color-extract.done",{n:o.palette.length}),h.width=o.image.bitmap.width,h.height=o.image.bitmap.height,k.drawImage(o.image.bitmap,0,0)}function F(){x.innerHTML="";for(const t of o.palette){const l=document.createElement("button");l.className="ce-swatch",l.style.background=t.hex,l.title=`${t.hex} · ${(t.share*100).toFixed(1)}%`;const g=document.createElement("div");g.className="ce-swatch-body",g.innerHTML=`
        <div class="ce-swatch-hex">${t.hex}</div>
        <div class="ce-swatch-meta">${(t.share*100).toFixed(1)}% · ${t.r},${t.g},${t.b}</div>
      `;const b=(t.r*299+t.g*587+t.b*114)/1e3>160;l.dataset.contrast=b?"dark":"light",l.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(t.hex),l.dataset.copied="true",setTimeout(()=>{delete l.dataset.copied},900)}catch{}}),l.append(g),x.append(l)}}async function R(){if(!o.palette.length)return;const{blob:t,ext:l,mime:g}=await D(o.palette,o.format);o.lastUrl&&URL.revokeObjectURL(o.lastUrl);const b=URL.createObjectURL(t);o.lastUrl=b;const M=`palette-${new Date().toISOString().replace(/[:.]/g,"-").slice(0,19)}.${l}`;o.format==="png"&&z("color-extract",t,M),P(b,M),W(j,{filename:M,url:b,meta:i("color-extract.dlMeta",{size:(t.size/1024).toFixed(1),n:o.palette.length,mime:g})})}}function Q(e,s){const a=Math.min(1,200/Math.max(e.width,e.height)),u=Math.max(1,Math.round(e.width*a)),p=Math.max(1,Math.round(e.height*a)),m=new OffscreenCanvas(u,p).getContext("2d",{willReadFrequently:!0});if(!m)throw new Error("2D context unavailable");return m.drawImage(e,0,0,u,p),T(m.getImageData(0,0,u,p).data,s)}async function D(e,s){if(s==="png"){const a=Y(e);return{blob:await new Promise((p,f)=>a.toBlob(m=>m?p(m):f(new Error("toBlob null")),"image/png")),ext:"png",mime:"image/png"}}if(s==="css"){const a=`:root {
`+e.map((u,p)=>`  --color-${p+1}: ${u.hex};`).join(`
`)+`
}
`;return{blob:new Blob([a],{type:"text/css"}),ext:"css",mime:"text/css"}}const c=JSON.stringify({palette:e.map(a=>({hex:a.hex,rgb:[a.r,a.g,a.b],share:a.share}))},null,2);return{blob:new Blob([c],{type:"application/json"}),ext:"json",mime:"application/json"}}function V(){return`
    ${J({name:i("tool.color-extract.name").toUpperCase(),code:"t·012",prefix:"ce",withRuntime:!1,stats:[{k:i("color-extract.stat.size"),id:"stat-dim"},{k:i("color-extract.stat.clusters"),id:"stat-clusters"}]})}

    <main class="panel panel-split">
      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${E(i("color-extract.sec.clusters"))}
          <div class="sec-body">
            <div class="row-inline">
              <span class="row-label">K</span>
              <input type="range" id="ce-k-slider" min="2" max="12" step="1" value="6" />
              <span id="ce-k-value" class="row-value">6</span>
            </div>
            <div class="format-hint">${i("color-extract.clustersHint")}</div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${E(i("color-extract.sec.format"))}
          <div class="sec-body">
            <div class="opt-group">
              <button class="opt" data-role="format-opt" data-format="png" aria-pressed="true">
                <span class="dot"></span><span class="label">PNG</span><span class="meta">${i("color-extract.png.meta")}</span>
                <span class="sub">${i("color-extract.png.sub")}</span>
              </button>
              <button class="opt" data-role="format-opt" data-format="json" aria-pressed="false">
                <span class="dot"></span><span class="label">JSON</span><span class="meta">${i("color-extract.json.meta")}</span>
                <span class="sub">${i("color-extract.json.sub")}</span>
              </button>
              <button class="opt" data-role="format-opt" data-format="css" aria-pressed="false">
                <span class="dot"></span><span class="label">CSS</span><span class="meta">${i("color-extract.css.meta")}</span>
                <span class="sub">--color-1 .. --color-N under :root</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        ${G({prefix:"ce",cta:i("color-extract.cta"),hint:i("color-extract.hint"),accept:"image/*"})}
        <div class="dl" id="ce-dl-strip"></div>
        <section id="ce-process-section" class="sec" data-collapsible hidden>
          ${E(i("color-extract.sec.palette"))}
          <div class="sec-body">
            <div class="ce-source">
              <canvas id="ce-source-canvas" width="320" height="180"></canvas>
            </div>
            <div id="ce-palette" class="ce-palette"></div>
            <div class="format-hint">${i("color-extract.copyHint")}</div>
          </div>
        </section>
      </div>
    </main>

    <footer class="transport">
      <button class="btn ghost" id="ce-export-btn" disabled>${i("color-extract.export")} <span class="arrow">›</span></button>
      <div id="ce-info" class="img-info">${i("color-extract.info.empty")}</div>
      <span id="ce-export-status" class="action-status hidden"></span>
    </footer>
  `}function T(e,s){const c=[];for(let r=0;r<e.length;r+=4)e[r+3]<32||c.push([e[r],e[r+1],e[r+2]]);if(c.length===0)return[];const a=[];for(a.push(c[Math.floor(Math.random()*c.length)]);a.length<s;){const r=c.map(d=>Math.min(...a.map(v=>I(d,v)))),h=r.reduce((d,v)=>d+v,0);if(h===0)break;let x=Math.random()*h,n=0;for(;n<r.length&&(x-=r[n],!(x<=0));n++);a.push(c[Math.min(n,c.length-1)])}const u=new Int32Array(c.length);for(let r=0;r<12;r++){for(let n=0;n<c.length;n++){let d=0,v=1/0;for(let w=0;w<a.length;w++){const y=I(c[n],a[w]);y<v&&(v=y,d=w)}u[n]=d}const h=a.map(()=>[0,0,0,0]);for(let n=0;n<c.length;n++){const d=u[n];h[d][0]+=c[n][0],h[d][1]+=c[n][1],h[d][2]+=c[n][2],h[d][3]+=1}let x=!1;for(let n=0;n<a.length;n++){const d=h[n];if(d[3]===0)continue;const v=[d[0]/d[3],d[1]/d[3],d[2]/d[3]];I(v,a[n])>.5&&(x=!0),a[n]=v}if(!x)break}const p=new Array(a.length).fill(0);for(let r=0;r<u.length;r++)p[u[r]]+=1;const f=c.length;return a.map((r,h)=>{const x=Math.round(r[0]),n=Math.round(r[1]),d=Math.round(r[2]);return{hex:X(x,n,d),r:x,g:n,b:d,share:p[h]/f}}).filter(r=>r.share>0).sort((r,h)=>h.share-r.share)}function I(e,s){const c=e[0]-s[0],a=e[1]-s[1],u=e[2]-s[2];return c*c+a*a+u*u}function X(e,s,c){return"#"+[e,s,c].map(a=>a.toString(16).padStart(2,"0")).join("").toUpperCase()}function Y(e){const a=Math.min(e.length,3),u=Math.ceil(e.length/a),p=document.createElement("canvas");p.width=240*a,p.height=120*u;const f=p.getContext("2d");f.font='600 16px "JetBrains Mono", monospace',f.textBaseline="top";for(let m=0;m<e.length;m++){const r=m%a,h=Math.floor(m/a),x=r*240,n=h*120;f.fillStyle=e[m].hex,f.fillRect(x,n,240,120);const d=(e[m].r*299+e[m].g*587+e[m].b*114)/1e3>160;f.fillStyle=d?"#111":"#fff",f.fillText(e[m].hex,x+16,n+16),f.font='400 12px "JetBrains Mono", monospace',f.fillText(`${(e[m].share*100).toFixed(1)}%`,x+16,n+40),f.font='600 16px "JetBrains Mono", monospace'}return p}export{et as mountColorExtract};
//# sourceMappingURL=app-Co1Owam7.js.map
