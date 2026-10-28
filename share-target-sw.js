/* Web Share Target receiver for TOOL/BOX — meant to be pulled into the PWA
 * service worker with:
 *
 *     importScripts('./share-target-sw.js');
 *
 * It answers the POST that the OS share sheet sends to `./share-target`
 * (see manifest.share-target.json), parks the shared files in Cache Storage
 * under "toolbox-share-target", and redirects to `./?share-target=1`. The page
 * (src/shell/shell-ux.ts → consumeLaunchFiles) then reads the files back,
 * deletes them, and routes them into a tool exactly like a paste/drop. Text /
 * URL shares are forwarded as query params. Nothing ever leaves the device.
 */
/* eslint-disable */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'POST' || !url.pathname.endsWith('/share-target')) return;
  event.respondWith(
    (async () => {
      const form = await event.request.formData();
      const cache = await caches.open('toolbox-share-target');
      let i = 0;
      for (const value of form.getAll('files')) {
        if (!(value instanceof File)) continue;
        await cache.put(
          new Request(`./__share/${Date.now()}-${i++}`),
          new Response(value, {
            headers: {
              'content-type': value.type || 'application/octet-stream',
              'x-filename': encodeURIComponent(value.name || 'shared'),
            },
          }),
        );
      }
      const target = new URL('./', url);
      target.searchParams.set('share-target', '1');
      for (const k of ['title', 'text', 'url']) {
        const v = form.get(k);
        if (typeof v === 'string' && v) target.searchParams.set(k, v);
      }
      return Response.redirect(target.href, 303);
    })(),
  );
});
