/*! Based on coi-serviceworker v0.1.7 - Guido Zuidhof and contributors, licensed under MIT.
 *  Extended for TOOL/BOX: the same worker also precaches the app shell (PWA /
 *  offline) and caches the big ORT / ffmpeg runtimes on first use. Only one
 *  service worker can control scope '/', so header injection and caching live
 *  together here.
 *
 *  The two placeholders below are filled in by the `toolbox-sw-precache` Vite
 *  plugin (vite.config.ts) at build time. In dev they stay empty, so the
 *  worker is a plain COOP/COEP shim and the page never registers it (the dev
 *  server already sends the headers). */
const PRECACHE = ["/assets/_commonjsHelpers-Cpj98o6Y.js","/assets/app-B4n0pBCu.js","/assets/app-B7Vbc4v4.js","/assets/app-BGZdH-j2.js","/assets/app-BJjuGLR7.js","/assets/app-BO-Dhg0U.js","/assets/app-BV2tyYUc.js","/assets/app-BayrstWj.js","/assets/app-C4QXb0NG.js","/assets/app-CWc6ihy0.js","/assets/app-CaT1GjCt.js","/assets/app-CjvQbyIA.js","/assets/app-Co1Owam7.js","/assets/app-DCRTCwNv.js","/assets/app-DetjeRPN.js","/assets/app-Dj_kpaW0.js","/assets/app-DodoHv4g.js","/assets/app-DqyiypjA.js","/assets/app-Drj-TDg5.js","/assets/app-Dt8HmUNG.js","/assets/app-Dw_DjSeW.js","/assets/app-Njm6Xhgj.js","/assets/app-S_34L6zN.css","/assets/app-vI3WNjmV.js","/assets/audio-Bbt7GTjV.js","/assets/batch-queue-BchDyuIC.css","/assets/batch-queue-DSO5kB6T.js","/assets/bricolage-grotesque-latin-500-normal-CV-uA8Lw.woff","/assets/bricolage-grotesque-latin-500-normal-DEDBoLFO.woff2","/assets/bricolage-grotesque-latin-700-normal-DvJDmrLu.woff","/assets/bricolage-grotesque-latin-700-normal-gtcctNPv.woff2","/assets/bricolage-grotesque-latin-800-normal-Br4b-5gk.woff","/assets/bricolage-grotesque-latin-800-normal-J50vIsBe.woff2","/assets/bricolage-grotesque-latin-ext-500-normal-B0ZDNVGf.woff","/assets/bricolage-grotesque-latin-ext-500-normal-DIhLz7G7.woff2","/assets/bricolage-grotesque-latin-ext-700-normal-BXpPFNFj.woff","/assets/bricolage-grotesque-latin-ext-700-normal-fBkt-7fi.woff2","/assets/bricolage-grotesque-latin-ext-800-normal-BimIDUhy.woff2","/assets/bricolage-grotesque-latin-ext-800-normal-CkoBqIJM.woff","/assets/bricolage-grotesque-vietnamese-500-normal-CAK5R6Iy.woff","/assets/bricolage-grotesque-vietnamese-500-normal-FzY9NZwK.woff2","/assets/bricolage-grotesque-vietnamese-700-normal-BLYPkJbo.woff2","/assets/bricolage-grotesque-vietnamese-700-normal-CHrFuVHU.woff","/assets/bricolage-grotesque-vietnamese-800-normal-DJ4hCX8l.woff","/assets/bricolage-grotesque-vietnamese-800-normal-RJtJa6zl.woff2","/assets/compare-slider-ClD46mW-.js","/assets/compare-slider-DHj5Y28x.css","/assets/compositor-BcMJOgNj.js","/assets/encoder-backpressure-KwTwXbZ9.js","/assets/florence-B0A8tqZ9.js","/assets/fragments-kQZcphFF.js","/assets/gpu-guard-C1llK9pG.js","/assets/gpu-lock-CVLNUbDT.js","/assets/h264-eC01Si3C.js","/assets/index-B2t3sVwO.css","/assets/index-DbChkwc3.js","/assets/index-DfgTfcu_.js","/assets/inference-CkxFX5J4.js","/assets/jetbrains-mono-cyrillic-400-normal-BEIGL1Tu.woff2","/assets/jetbrains-mono-cyrillic-400-normal-ugxPyKxw.woff","/assets/jetbrains-mono-cyrillic-500-normal-DJqRU3vO.woff","/assets/jetbrains-mono-cyrillic-500-normal-DmUKJPL_.woff2","/assets/jetbrains-mono-cyrillic-700-normal-BWTpRfYl.woff2","/assets/jetbrains-mono-cyrillic-700-normal-CEoEElIJ.woff","/assets/jetbrains-mono-greek-400-normal-B9oWc5Lo.woff","/assets/jetbrains-mono-greek-400-normal-C190GLew.woff2","/assets/jetbrains-mono-greek-500-normal-D7SFKleX.woff","/assets/jetbrains-mono-greek-500-normal-JpySY46c.woff2","/assets/jetbrains-mono-greek-700-normal-C6CZE3T8.woff2","/assets/jetbrains-mono-greek-700-normal-DEigVDxa.woff","/assets/jetbrains-mono-latin-400-normal-6-qcROiO.woff","/assets/jetbrains-mono-latin-400-normal-V6pRDFza.woff2","/assets/jetbrains-mono-latin-500-normal-BWZEU5yA.woff2","/assets/jetbrains-mono-latin-500-normal-CJOVTJB7.woff","/assets/jetbrains-mono-latin-700-normal-BYuf6tUa.woff2","/assets/jetbrains-mono-latin-700-normal-D3wTyLJW.woff","/assets/jetbrains-mono-latin-ext-400-normal-Bc8Ftmh3.woff2","/assets/jetbrains-mono-latin-ext-400-normal-fXTG6kC5.woff","/assets/jetbrains-mono-latin-ext-500-normal-Cut-4mMH.woff2","/assets/jetbrains-mono-latin-ext-500-normal-ckzbgY84.woff","/assets/jetbrains-mono-latin-ext-700-normal-CZipNAKV.woff2","/assets/jetbrains-mono-latin-ext-700-normal-CxPITLHs.woff","/assets/jetbrains-mono-vietnamese-400-normal-CqNFfHCs.woff","/assets/jetbrains-mono-vietnamese-500-normal-DNRqzVM1.woff","/assets/jetbrains-mono-vietnamese-700-normal-BDLVIk2r.woff","/assets/model-cache-CVSf8zme.js","/assets/model-catalog-DAmf0QpZ.js","/assets/model-status-BHGXJYff.css","/assets/model-status-CS7V2bNZ.js","/assets/models-OFmNMcf2.js","/assets/models-page-CZ_j-JFe.js","/assets/models-page-DCMgfW9U.css","/assets/pdf-export-eEi_O73_.js","/assets/pdf-input-BlrBp-oa.js","/assets/pdf.worker.min-wgc6bjNh.mjs","/assets/runtime-Jg5t-PhK.js","/assets/source-CBkpBijo.js","/assets/transformers.web-Cyg6ssfE.js","/assets/upscaler--FcqI4c0.js","/assets/vanta.topology.min-CCtFhbmu.js","/assets/worker-DYSz7Krg.js","/coi-serviceworker.js","/icons/apple-touch-icon.png","/icons/icon-192.png","/icons/icon-512.png","/icons/icon.svg","/icons/maskable-192.png","/icons/maskable-512.png","/","/manifest.share-target.json","/manifest.webmanifest","/share-target-sw.js"];
const BUILD = "mvs8r006-868c588e89";
const RUNTIME_VERSION = "af8566b7f3";

const SHELL_PREFIX = 'toolbox-shell-';
const SHELL_CACHE = SHELL_PREFIX + BUILD;
const RUNTIME_PREFIX = 'toolbox-runtime-';
const RUNTIME_CACHE = RUNTIME_PREFIX + RUNTIME_VERSION;
/** Same-origin paths cached on first use (large / not precached). Model
 *  weights under /models/ are never cached here. */
const RUNTIME_PATHS = ['/ort/', '/ffmpeg/', '/assets/'];

let coepCredentialless = false;
if (typeof window === 'undefined') {
  const precacheSet = new Set(PRECACHE);

  self.addEventListener('install', (event) => {
    self.skipWaiting();
    if (!PRECACHE.length) return;
    event.waitUntil(
      caches
        .open(SHELL_CACHE)
        .then((c) => c.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' }))))
        // Never fail the install: header injection matters more than offline.
        .catch((err) => console.warn('[sw] precache failed', err)),
    );
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      (async () => {
        if (PRECACHE.length) {
          const names = await caches.keys();
          // Keep the current shell + the newest previous one (an open tab of
          // the previous build may still lazy-load its chunks), drop the rest.
          const shells = names
            .filter((n) => n.startsWith(SHELL_PREFIX) && n !== SHELL_CACHE)
            .sort()
            .reverse();
          await Promise.all(shells.slice(1).map((n) => caches.delete(n)));
          await Promise.all(
            names
              .filter((n) => n.startsWith(RUNTIME_PREFIX) && n !== RUNTIME_CACHE)
              .map((n) => caches.delete(n)),
          );
        }
        await self.clients.claim();
      })(),
    );
  });

  self.addEventListener('message', (ev) => {
    if (!ev.data) {
      return;
    } else if (ev.data.type === 'deregister') {
      self.registration
        .unregister()
        .then(() => self.clients.matchAll())
        .then((clients) => {
          clients.forEach((client) => client.navigate(client.url));
        });
    } else if (ev.data.type === 'coepCredentialless') {
      coepCredentialless = ev.data.value;
    }
  });

  /** Re-serve a response with COOP/COEP (+CORP) so the page is isolated. */
  const withIsolation = (response) => {
    if (!response || response.status === 0) return response;
    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Embedder-Policy', coepCredentialless ? 'credentialless' : 'require-corp');
    if (!coepCredentialless) headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  };

  const offline = () =>
    new Response('Offline and not cached.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' },
    });

  async function cacheFirst(request, cacheName, store) {
    const cache = await caches.open(cacheName);
    const hit = await cache.match(request, { ignoreSearch: true, ignoreVary: true });
    if (hit) return hit;
    const res = await fetch(request);
    if (store && res.ok && res.status === 200 && !request.headers.has('range')) {
      cache.put(request, res.clone()).catch(() => {});
    }
    return res;
  }

  async function navigate(request) {
    try {
      return await fetch(request);
    } catch (err) {
      const shell =
        (await caches.match('/', { cacheName: SHELL_CACHE, ignoreVary: true })) ??
        (await caches.match('/index.html', { cacheName: SHELL_CACHE, ignoreVary: true }));
      if (shell) return shell;
      throw err;
    }
  }

  self.addEventListener('fetch', function (event) {
    const r = event.request;
    if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') {
      return;
    }
    const url = new URL(r.url);
    const sameOrigin = url.origin === self.location.origin;
    const caching = PRECACHE.length > 0 && sameOrigin && r.method === 'GET';

    let pending;
    if (caching && r.mode === 'navigate') {
      pending = navigate(r);
    } else if (caching && precacheSet.has(url.pathname)) {
      pending = cacheFirst(r, SHELL_CACHE, false);
    } else if (caching && RUNTIME_PATHS.some((p) => url.pathname.startsWith(p))) {
      pending = cacheFirst(r, RUNTIME_CACHE, true);
    } else {
      const request =
        coepCredentialless && r.mode === 'no-cors' ? new Request(r, { credentials: 'omit' }) : r;
      pending = caching
        ? fetch(request).catch(async (err) => (await caches.match(r, { ignoreVary: true })) ?? Promise.reject(err))
        : fetch(request);
    }

    event.respondWith(
      pending.then(withIsolation).catch((e) => {
        console.error(e);
        return offline();
      }),
    );
  });
} else {
  (() => {
    // You can customize the behavior of this script through a global `coi` variable.
    const coi = {
      shouldRegister: () => true,
      shouldDeregister: () => false,
      coepCredentialless: () => !(window.chrome || window.netscape),
      doReload: () => window.location.reload(),
      quiet: false,
      ...window.coi,
    };

    const n = navigator;
    const isBuild = PRECACHE.length > 0;

    if (n.serviceWorker && n.serviceWorker.controller) {
      n.serviceWorker.controller.postMessage({
        type: 'coepCredentialless',
        value: coi.coepCredentialless(),
      });

      if (coi.shouldDeregister()) {
        n.serviceWorker.controller.postMessage({ type: 'deregister' });
      }
    }

    // Register when the page still needs COOP/COEP (static host), or in a
    // production build for offline / install support. If the browser has no
    // notion of crossOriginIsolated, only the PWA reason applies.
    const needsIsolation = window.crossOriginIsolated === false;
    if ((!needsIsolation && !isBuild) || !coi.shouldRegister()) return;

    if (!window.isSecureContext) {
      !coi.quiet && console.log('COOP/COEP Service Worker not registered, a secure context is required.');
      return;
    }

    // In some environments (e.g. Chrome incognito mode) this won't be available
    if (!n.serviceWorker) return;

    // Reload once the worker controls the page — only needed when the headers
    // come from the worker (otherwise the page is already isolated).
    let reloading = false;
    const reload = () => {
      if (reloading) return;
      reloading = true;
      !coi.quiet && console.log('Reloading page to make use of COOP/COEP Service Worker.');
      coi.doReload();
    };
    const reloadWhenActive = (worker) => {
      if (!needsIsolation || !worker) return;
      if (worker.state === 'activated') return reload();
      worker.addEventListener('statechange', () => {
        if (worker.state === 'activated') reload();
      });
    };

    n.serviceWorker.register(window.document.currentScript.src).then(
      (registration) => {
        !coi.quiet && console.log('COOP/COEP Service Worker registered', registration.scope);

        registration.addEventListener('updatefound', () => {
          reloadWhenActive(registration.installing);
        });

        // If the registration is active, but it's not controlling the page
        if (registration.active && !n.serviceWorker.controller) {
          reloadWhenActive(registration.active);
        } else if (registration.installing || registration.waiting) {
          reloadWhenActive(registration.installing || registration.waiting);
        }
      },
      (err) => {
        !coi.quiet && console.error('COOP/COEP Service Worker failed to register:', err);
      },
    );
  })();
}
