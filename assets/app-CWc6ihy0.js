import{t as e,s as Y,p as I}from"./index-DbChkwc3.js";import{onGemmaProgress as K,withWasmFallback as W,ensureGemma as V,chat as _,GEMMA_REPO as J}from"./inference-CkxFX5J4.js";import{e as o,s as $,t as X,a as j,b as z}from"./fragments-kQZcphFF.js";import{probeWebGPU as Q}from"./runtime-Jg5t-PhK.js";import{m as Z}from"./model-status-CS7V2bNZ.js";import"./transformers.web-Cyg6ssfE.js";import"./model-cache-CVSf8zme.js";import"./model-catalog-DAmf0QpZ.js";const C={cv:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="10" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="6" r="1.4" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5 11c.7-1.2 1.8-1.8 3-1.8s2.3.6 3 1.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',spell:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 11l2-6 2 6M3.5 9.5h3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 8.5h3M9 10.5h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M11 2.5l1 1 2-2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',html:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 4L2 8l3 4M11 4l3 4-3 4M9 3l-2 10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',paraphrase:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 5h7a3 3 0 0 1 0 6H4M13 11l-3 3M13 11l-3-3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function ee(){return{"gemma-cv-writer":{id:"gemma-cv-writer",name:e("gemma.cv.name"),code:"g·02",blurb:e("gemma.cv.blurb"),icon:C.cv,system:`You are a senior career writer. Draft a professional, ATS-friendly CV in plain text using these sections in order: HEADER (name, role, location, email), SUMMARY (2-3 sentences), EXPERIENCE (most recent first; for each role: "Job Title — Company · Dates" then 2-4 bullets starting with strong verbs and quantified results), SKILLS (comma-separated), EDUCATION. Be concise, factual, and use the information supplied — do not invent employers or dates that weren't given. If a field is blank, omit that section gracefully.`,fields:[{id:"name",label:e("gemma.cv.name.label"),kind:"text",placeholder:e("gemma.cv.name.ph"),default:""},{id:"role",label:e("gemma.cv.role.label"),kind:"text",placeholder:e("gemma.cv.role.ph"),default:""},{id:"location",label:e("gemma.cv.location.label"),kind:"text",placeholder:e("gemma.cv.location.ph"),default:""},{id:"email",label:e("gemma.cv.email.label"),kind:"text",placeholder:e("gemma.cv.email.ph"),default:""},{id:"summary",label:e("gemma.cv.summary.label"),kind:"textarea",rows:2,placeholder:e("gemma.cv.summary.ph"),default:""},{id:"experience",label:e("gemma.cv.experience.label"),kind:"textarea",rows:6,placeholder:e("gemma.cv.experience.ph"),default:""},{id:"skills",label:e("gemma.cv.skills.label"),kind:"textarea",rows:2,placeholder:e("gemma.cv.skills.ph"),default:""},{id:"education",label:e("gemma.cv.education.label"),kind:"textarea",rows:2,placeholder:e("gemma.cv.education.ph"),default:""}],buildUserPrompt:t=>!t.name?.trim()&&!t.role?.trim()?"":[`Name: ${t.name||"(blank)"}`,`Target role: ${t.role||"(blank)"}`,`Location: ${t.location||"(blank)"}`,`Email: ${t.email||"(blank)"}`,`About: ${t.summary||"(blank)"}`,`Experience:
${t.experience||"(blank)"}`,`Skills: ${t.skills||"(blank)"}`,`Education: ${t.education||"(blank)"}`].join(`
`)+`

Write the CV now in plain text.`,temperature:.4,maxNewTokens:700},"gemma-spellcheck":{id:"gemma-spellcheck",name:e("gemma.spell.name"),code:"g·03",blurb:e("gemma.spell.blurb"),icon:C.spell,system:"You are a meticulous copy editor. Given a piece of text, return ONLY the corrected version — fix spelling, grammar, punctuation, capitalisation, and obvious typos. Preserve the author's voice, tone, paragraph structure, line breaks, and meaning. Do NOT rewrite for style, do NOT add commentary, do NOT label sections. If the text is already clean, return it unchanged.",fields:[{id:"text",label:e("gemma.spell.text.label"),kind:"textarea",rows:10,placeholder:e("gemma.spell.text.ph"),default:""}],buildUserPrompt:t=>t.text?.trim()??"",temperature:.1,maxNewTokens:900},"gemma-html-gen":{id:"gemma-html-gen",name:e("gemma.html.name"),code:"g·04",blurb:e("gemma.html.blurb"),icon:C.html,system:"You are an expert front-end engineer. Given a description, produce ONE complete, self-contained HTML5 document — including <!doctype html>, <html>, <head>, and <body>. Put all CSS inside a single <style> tag in the head. Use semantic HTML, modern CSS (flex/grid, custom properties), and accessible markup. Do NOT use external scripts or stylesheets. Do NOT fetch images from the network — use CSS gradients, inline SVG, or emoji. Output ONLY the HTML code, nothing else — no markdown fences, no commentary.",fields:[{id:"description",label:e("gemma.html.description.label"),kind:"textarea",rows:4,placeholder:e("gemma.html.description.ph"),default:""},{id:"palette",label:e("gemma.html.palette.label"),kind:"choice",default:"auto",choices:[{value:"auto",label:e("gemma.html.palette.auto")},{value:"dark",label:e("gemma.html.palette.dark")},{value:"light",label:e("gemma.html.palette.light")},{value:"pastel",label:e("gemma.html.palette.pastel")},{value:"mono",label:e("gemma.html.palette.mono")}]}],buildUserPrompt:t=>t.description?.trim()?`Build: ${t.description.trim()}
Palette: ${t.palette}

Return the full HTML document only.`:"",temperature:.5,maxNewTokens:1400,outputKind:"html-preview"},"gemma-paraphrase":{id:"gemma-paraphrase",name:e("gemma.para.name"),code:"g·05",blurb:e("gemma.para.blurb"),icon:C.paraphrase,system:"You are a skilled rewriter. Paraphrase the given text in the requested tone and length. Preserve the original meaning and any factual claims. Output ONLY the paraphrased text — no preamble, no labels, no quotes.",fields:[{id:"text",label:e("gemma.para.text.label"),kind:"textarea",rows:6,placeholder:e("gemma.para.text.ph"),default:""},{id:"tone",label:e("gemma.para.tone.label"),kind:"choice",default:"neutral",choices:[{value:"neutral",label:e("gemma.para.tone.neutral")},{value:"formal",label:e("gemma.para.tone.formal")},{value:"casual",label:e("gemma.para.tone.casual")},{value:"friendly",label:e("gemma.para.tone.friendly")},{value:"persuasive",label:e("gemma.para.tone.persuasive")},{value:"academic",label:e("gemma.para.tone.academic")}]},{id:"length",label:e("gemma.para.length.label"),kind:"choice",default:"same",choices:[{value:"shorter",label:e("gemma.para.length.shorter")},{value:"same",label:e("gemma.para.length.same")},{value:"longer",label:e("gemma.para.length.longer")}]}],buildUserPrompt:t=>t.text?.trim()?`Tone: ${t.tone}
Length: ${t.length}

Original:
${t.text.trim()}

Rewrite now.`:"",temperature:.7,maxNewTokens:600}}}function te(t){return ee()[t]}function ue(t,r){const c=te(r);if(!c){t.innerHTML=`<div class="panel"><p>${e("gemma.unknownTool",{id:o(r)})}</p></div>`;return}const a=c;t.innerHTML=le(a),Z(t,"qwen-coder");const l=n=>t.querySelector(n),m=l("#gp-banner"),g=l("#gp-runtime-pill"),A=l("#gp-form"),b=l("#gp-run-btn"),k=l("#gp-inline-btn"),L=l("#gp-cancel-btn"),M=l("#gp-output"),h=l("#gp-copy-btn"),S=l("#gp-download-btn"),p=l("#gp-status"),T=l('[data-step="load-model"]'),v=l('[data-step="run"]'),N=T.querySelector('[data-role="step-note"]'),x=v.querySelector('[data-role="step-note"]'),H=l("#gp-stat-model"),D=l("#gp-stat-tokens"),U=t.querySelector("#gp-preview-wrap"),q=t.querySelector("#gp-preview-frame");for(const n of t.querySelectorAll("section[data-collapsible]"))n.querySelector(".sec-head")?.addEventListener("click",()=>n.toggleAttribute("data-collapsed"));m.querySelector(".x")?.addEventListener("click",()=>m.classList.add("hidden"));const s={generating:!1,abort:null,modelReady:!1,lastOutput:""},O={};for(const n of a.fields)O[n.id]=n.default??"";A.innerHTML=a.fields.map(ae).join(""),ne(A,a,O),(async()=>{const n=await Q();g.dataset.device=n.device,g.textContent=n.device==="webgpu"?e("gemma.runtime.webgpu",{adapter:n.adapterName??e("gemma.runtime.ready")}):e("gemma.runtime.wasm"),n.device==="wasm"&&$(m,e("gemma.banner.noWebgpu",{reason:n.reason??e("gemma.banner.noAdapter")}))})(),H.textContent="qwen2.5-coder";const F=K(n=>{n.progress<1?(T.setAttribute("data-status","active"),N.textContent=`${n.phase} · ${(n.progress*100).toFixed(0)}%`):(s.modelReady=!0,T.setAttribute("data-status","done"),N.textContent=e("gemma.load.ready",{repo:J}))});t._gemmaUnsub?.(),t._gemmaUnsub=F;async function B(){if(s.generating)return;const n=a.buildUserPrompt(O);if(!n){$(m,e("gemma.banner.fillForm"),"error");return}s.generating=!0,s.abort=new AbortController;const u=Y({tool:a.name,route:a.id,label:e("gemma.job.generating"),detail:e("gemma.status.loadingModel"),progress:null,onCancel:()=>{s.abort?.abort()}});b.disabled=!0,b.textContent=e("gemma.btn.working"),k.disabled=!0,L.classList.remove("hidden"),p.classList.remove("hidden"),p.textContent=e("gemma.status.loadingModel"),M.textContent="",s.lastOutput="",h.disabled=!0,S.disabled=!0,v.setAttribute("data-status","active"),x.textContent=e("gemma.status.preparing");let i=0;const w=performance.now(),y=s.abort.signal;try{const d=await W(async()=>(await V(),v.setAttribute("data-status","active"),x.textContent=e("gemma.status.generating"),p.textContent=e("gemma.status.generating"),i=0,_([{role:"user",content:`${a.system}

${n}`}],{maxNewTokens:a.maxNewTokens??512,temperature:a.temperature??.7,signal:y,onChunk:E=>{M.textContent=E,i+=1,D.textContent=`${i}t`;const G=(performance.now()-w)/1e3,P=i/Math.max(.001,G);p.textContent=e("gemma.status.streaming",{n:i,rate:P.toFixed(1)}),u.update({detail:e("gemma.status.rate",{n:i,rate:P.toFixed(1)})})}})));s.lastOutput=d,a.outputKind!=="html-preview"&&I(a.id,new Blob([d],{type:"text/plain"}),`${a.id}.txt`),M.textContent=d,u.done(e("gemma.status.jobDone",{n:i,chars:d.length})),v.setAttribute("data-status","done");const f=((performance.now()-w)/1e3).toFixed(1);if(x.textContent=e("gemma.status.stepDone",{n:i,s:f}),p.textContent=e("gemma.status.done",{chars:d.length}),h.disabled=!1,S.disabled=!1,a.outputKind==="html-preview"&&q&&U){U.removeAttribute("hidden");const E=R(d);q.srcdoc=E}}catch(d){const f=d;v.setAttribute("data-status","pending"),x.textContent="",p.textContent="",f.name==="AbortError"?u.markCancelled():($(m,e("gemma.banner.failed",{message:f.message}),"error"),u.fail(f.message))}finally{s.generating=!1,s.abort=null,b.disabled=!1,b.textContent=`${e("gemma.btn.run",{code:a.code.toUpperCase()})} ›`,k.disabled=!1,k.textContent=e("gemma.btn.generate"),L.classList.add("hidden")}}b.addEventListener("click",()=>void B()),k.addEventListener("click",()=>void B()),L.addEventListener("click",()=>{s.abort?.abort(),p.textContent=e("gemma.status.cancelling")}),h.addEventListener("click",async()=>{if(s.lastOutput)try{await navigator.clipboard.writeText(s.lastOutput),h.textContent=e("gemma.btn.copied"),setTimeout(()=>h.textContent=e("gemma.btn.copy"),1200)}catch{$(m,e("gemma.banner.clipboard"),"error")}}),S.addEventListener("click",()=>{if(!s.lastOutput)return;const n=a.outputKind==="html-preview"?"html":"txt",u=n==="html"?"text/html":"text/plain",i=n==="html"?R(s.lastOutput):s.lastOutput,w=new Blob([i],{type:u}),y=URL.createObjectURL(w),d=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);z(y,`${a.id}-${d}.${n}`),setTimeout(()=>URL.revokeObjectURL(y),1e3)})}function ae(t){if(t.kind==="text")return`
      <label class="gp-field">
        <span class="gp-field-label">${o(t.label)}</span>
        <input type="text" data-field="${t.id}" value="${o(t.default??"")}" placeholder="${o(t.placeholder??"")}" class="gp-input" />
      </label>
    `;if(t.kind==="textarea")return`
      <label class="gp-field">
        <span class="gp-field-label">${o(t.label)}</span>
        <textarea data-field="${t.id}" rows="${t.rows??4}" placeholder="${o(t.placeholder??"")}" class="gp-textarea">${o(t.default??"")}</textarea>
      </label>
    `;const r=(t.choices??[]).map(c=>`<button type="button" class="gp-chip" data-field="${t.id}" data-value="${o(c.value)}" aria-pressed="${c.value===t.default}">${o(c.label)}</button>`).join("");return`
    <div class="gp-field">
      <span class="gp-field-label">${o(t.label)}</span>
      <div class="gp-chips">${r}</div>
    </div>
  `}function ne(t,r,c){for(const a of t.querySelectorAll("input[data-field], textarea[data-field]"))a.addEventListener("input",()=>{const l=a.dataset.field;l&&(c[l]=a.value)});for(const a of t.querySelectorAll(".gp-chip[data-field]"))a.addEventListener("click",()=>{const l=a.dataset.field,m=a.dataset.value??"";if(l){c[l]=m;for(const g of t.querySelectorAll(`.gp-chip[data-field="${l}"]`))g.setAttribute("aria-pressed",String(g===a))}})}function R(t){let r=t.trim();return r=r.replace(/^```(?:html|xml|svg)?[ \t]*\r?\n?/i,""),r=r.replace(/\r?\n?```[ \t]*$/i,""),r.trim()}function le(t){const r=t.outputKind==="html-preview"?`
      <div id="gp-preview-wrap" class="gp-preview-wrap" hidden>
        <div class="gp-preview-head">${e("gemma.preview.head")}</div>
        <iframe id="gp-preview-frame" class="gp-preview-frame" sandbox="allow-same-origin"></iframe>
      </div>
    `:"";return`
    ${X({name:t.name.toUpperCase(),code:t.code,prefix:"gp",stats:[{k:e("gemma.stat.model"),id:"stat-model"},{k:e("gemma.stat.tokens"),id:"stat-tokens"}]})}

    <main class="panel panel-split">

      <div class="panel-col panel-col-left">
        <section class="sec" data-collapsible>
          ${j(e("gemma.sec.input"))}
          <div class="sec-body">
            <p class="gp-blurb">${o(t.blurb)}</p>
            <div id="gp-form" class="gp-form"></div>
            <div class="gp-run-row">
              <button class="cta-btn cta-btn-sm" id="gp-inline-btn" type="button">${e("gemma.btn.generate")}</button>
              <button class="btn" id="gp-cancel-btn" type="button" hidden>${e("gemma.btn.cancel")}</button>
            </div>
          </div>
        </section>

        <section class="sec" data-collapsible>
          ${j(e("gemma.sec.process"))}
          <div class="sec-body">
            <ol class="steps">
              <li class="step" data-step="load-model" data-status="pending">
                <span class="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <div class="step-body">
                  <div class="step-title">${e("gemma.step.load.title")}</div>
                  <div class="step-desc">${e("gemma.step.load.desc")}</div>
                  <div class="step-note" data-role="step-note"></div>
                </div>
              </li>
              <li class="step" data-step="run" data-status="pending">
                <span class="step-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" class="step-check"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <div class="step-body">
                  <div class="step-title">${e("gemma.step.run.title")}</div>
                  <div class="step-desc">${e("gemma.step.run.desc")}</div>
                  <div class="step-note" data-role="step-note"></div>
                </div>
              </li>
            </ol>
          </div>
        </section>
      </div>

      <div class="panel-col panel-col-right">
        <div class="gp-output-head">
          <span>${e("gemma.sec.output")}</span>
          <div class="gp-output-tools">
            <button class="btn" id="gp-copy-btn" type="button" disabled>${e("gemma.btn.copy")}</button>
            <button class="btn" id="gp-download-btn" type="button" disabled>${e("gemma.btn.download")}</button>
          </div>
        </div>
        <pre id="gp-output" class="gp-output" aria-live="polite"></pre>
        ${r}
      </div>

    </main>

    <footer class="transport">
      <button class="btn ghost" id="gp-run-btn" type="button">${e("gemma.btn.run",{code:t.code.toUpperCase()})} <span class="arrow">›</span></button>
      <div id="gp-info" class="img-info">${e("gemma.info",{name:o(t.name)})}</div>
      <span id="gp-status" class="action-status hidden"></span>
    </footer>
  `}export{ue as mountGemmaPlayground};
//# sourceMappingURL=app-CWc6ihy0.js.map
