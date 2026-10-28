const m=new TextEncoder,R=.6;async function O(t,o="OCR scan"){const r=[],a=[];let s=0;const e=n=>{const c=typeof n=="string"?m.encode(n):n;r.push(c),s+=c.length},l=(n,c)=>{a[n]=s,e(`${n} 0 obj
`),c(),e(`
endobj
`)};e(`%PDF-1.4
%âãÏÓ
`);const T=t.map((n,c)=>5+c*3);l(1,()=>e("<< /Type /Catalog /Pages 2 0 R >>")),l(2,()=>e(`<< /Type /Pages /Kids [${T.map(n=>`${n} 0 R`).join(" ")}] /Count ${t.length} >>`)),l(3,()=>e("<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>")),l(4,()=>e(`<< /Title ${D(o)} /Producer (TOOL/BOX OCR - Florence-2) /CreationDate (D:${E()}) >>`));for(let n=0;n<t.length;n++){const c=t[n],$=T[n],u=c.image.width,p=c.image.height,f=c.widthPt??u*72/150,C=c.heightPt??p*72/150,x=await F(c.image),y=m.encode(P(c.lines,u,p,f,C));l($,()=>e(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${i(f)} ${i(C)}] /Resources << /Font << /F1 3 0 R >> /XObject << /Im0 ${$+1} 0 R >> >> /Contents ${$+2} 0 R >>`)),l($+1,()=>{e(`<< /Type /XObject /Subtype /Image /Width ${u} /Height ${p} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${x.length} >>
stream
`),e(x),e(`
endstream`)}),l($+2,()=>{e(`<< /Length ${y.length} >>
stream
`),e(y),e(`
endstream`)})}const d=5+t.length*3,h=s;let g=`xref
0 ${d}
0000000000 65535 f 
`;for(let n=1;n<d;n++)g+=`${String(a[n]??0).padStart(10,"0")} 00000 n 
`;return e(g),e(`trailer
<< /Size ${d} /Root 1 0 R /Info 4 0 R >>
startxref
${h}
%%EOF
`),new Blob(r,{type:"application/pdf"})}function P(t,o,r,a,s){const e=a/o,l=s/r;let T=`q ${i(a)} 0 0 ${i(s)} 0 0 cm /Im0 Do Q
BT 3 Tr
`;for(const d of t){const h=d.quad,g={x:h[0]*e,y:s-h[1]*l},n={x:h[2]*e,y:s-h[3]*l},c={x:h[6]*e,y:s-h[7]*l},$=Math.hypot(n.x-g.x,n.y-g.y),u=Math.hypot(g.x-c.x,g.y-c.y),p=d.text;if($<1||u<1||!p)continue;const f=u*.95,C=100*$/(R*f*p.length),x=Math.atan2(n.y-g.y,n.x-g.x),y=Math.cos(x),b=Math.sin(x),S=c.x-b*f*.2,w=c.y+y*f*.2;T+=`/F1 ${i(f)} Tf ${i(C)} Tz ${i(y)} ${i(b)} ${i(-b)} ${i(y)} ${i(S)} ${i(w)} Tm ${B(p)} Tj
`}return T+`ET
`}async function F(t){let o;return"convertToBlob"in t?o=await t.convertToBlob({type:"image/jpeg",quality:.85}):o=await new Promise((r,a)=>t.toBlob(s=>s?r(s):a(new Error("JPEG encode failed")),"image/jpeg",.85)),new Uint8Array(await o.arrayBuffer())}const i=t=>(Math.round(t*1e3)/1e3).toString(),j={"€":128,"‚":130,ƒ:131,"„":132,"…":133,"†":134,"‡":135,"ˆ":136,"‰":137,Š:138,"‹":139,Œ:140,Ž:142,"‘":145,"’":146,"“":147,"”":148,"•":149,"–":150,"—":151,"˜":152,"™":153,š:154,"›":155,œ:156,ž:158,Ÿ:159};function B(t){let o="<";for(const r of t){const a=r.codePointAt(0);let s;a>=32&&a<127||a>=160&&a<=255?s=a:s=j[r]??63,o+=s.toString(16).padStart(2,"0")}return o+">"}function D(t){let o="<FEFF";for(let r=0;r<t.length;r++)o+=t.charCodeAt(r).toString(16).padStart(4,"0");return o+">"}function E(){const t=new Date,o=r=>String(r).padStart(2,"0");return`${t.getUTCFullYear()}${o(t.getUTCMonth()+1)}${o(t.getUTCDate())}${o(t.getUTCHours())}${o(t.getUTCMinutes())}${o(t.getUTCSeconds())}Z`}export{O as buildSearchablePdf};
//# sourceMappingURL=pdf-export-eEi_O73_.js.map
