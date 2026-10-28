async function u(e,i=3){for(;e.encodeQueueSize>i&&e.state==="configured";)await new Promise(n=>{const t=()=>{clearTimeout(o),e.removeEventListener?.("dequeue",t),n()};e.addEventListener?.("dequeue",t,{once:!0});const o=setTimeout(t,4)})}export{u as w};
//# sourceMappingURL=encoder-backpressure-KwTwXbZ9.js.map
