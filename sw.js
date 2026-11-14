/* ========================================================================
   📲 Service worker (PWA) — រក្សាទុក «ឯកសារកម្មវិធី» ក្នុងឧបករណ៍ ដើម្បីបើកលឿន និងពេលអ៊ីនធឺណិតខ្សោយ
   ❗ មិនប៉ះទិន្នន័យ៖ មិនរក្សាទុក Firestore / Firebase Auth / Google Drive (ឆ្លងកាត់ផ្ទាល់ទៅអ៊ីនធឺណិត)
   - HTML៖ ទាញពីអ៊ីនធឺណិតជានិច្ច (មានកំណែថ្មីភ្លាម) · ដាច់អ៊ីនធឺណិត ឬយឺតជាង ៣.៥ វិនាទី → ប្រើកំណែចុងក្រោយក្នុងឧបករណ៍
     (មិនគិត ?e= / ?t= ដើម្បីកុំឱ្យ Refresh ទំព័រប្រឡង/តេស្តជាប់គាំងពេលអ៊ីនធឺណិតខ្សោយ)
   - JS/CSS មាន ?v=៖ ប្រើពីឧបករណ៍ (កំណែប្ដូរ = URL ថ្មី) · លុបកំណែចាស់ដោយស្វ័យប្រវត្តិ
   - CDN (KaTeX · Firebase SDK · ពុម្ពអក្សរ)៖ URL មានលេខកំណែ → ប្រើពីឧបករណ៍
   - រូប/ពុម្ពអក្សរក្នុងគម្រោង៖ ប្រើពីឧបករណ៍ ហើយធ្វើបច្ចុប្បន្នភាពនៅពីក្រោយ
   បិទ PWA បន្ទាន់៖ បើក index.html?nosw (លុប service worker + cache)
   ======================================================================== */
var C = "ngs-app-v34";
var HTML_WAIT = 3500;
var CDN = /^(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.gstatic\.com)$/;
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function put(req, res) {
  if (!res || !(res.ok || res.type === "opaque")) return;
  var copy = res.clone(), u = new URL(req.url);
  caches.open(C).then(function (c) {
    /* លុបកំណែចាស់នៃឯកសារដដែល (ឧ. exam.js កំណែ 22 ពេលមានកំណែ 23) */
    if (u.search) c.keys().then(function (ks) { ks.forEach(function (k) { var x = new URL(k.url); if (x.origin === u.origin && x.pathname === u.pathname && x.search !== u.search) c.delete(k); }); });
    c.put(req, copy);
  });
}
/* HTML៖ Network-first ដែលមានម៉ោងកំណត់ · យឺត → ច្បាប់ក្នុងឧបករណ៍ (ផ្ទុកពីបណ្ដាញនៅតែបន្តនៅពីក្រោយ ដើម្បីទុកលើកក្រោយ)
   គ្មានច្បាប់ក្នុងឧបករណ៍ → រង់ចាំបណ្ដាញ · ដាច់ទាំងស្រុង → ច្បាប់ណាមួយ (មិនគិត query) → index.html → error */
function htmlFirst(r) {
  var cached = function () {
    return caches.match(r, { ignoreSearch: true }).then(function (m) { return m || caches.match(r); });
  };
  return new Promise(function (resolve) {
    var done = false, finish = function (x) { if (!done && x) { done = true; resolve(x); } };
    var net = fetch(r).then(function (res) { put(r, res); return res; });
    var t = setTimeout(function () { cached().then(finish); }, HTML_WAIT);
    net.then(function (res) { clearTimeout(t); finish(res); }, function () {
      clearTimeout(t);
      cached().then(function (m) {
        if (m) return finish(m);
        return caches.match(new URL("index.html", self.registration.scope).href).then(function (i) { finish(i || Response.error()); });
      });
    });
  });
}
self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET") return;
  var u = new URL(r.url), same = u.origin === self.location.origin;
  var fbSdk = u.hostname === "www.gstatic.com" && /^\/firebasejs\/\d/.test(u.pathname);
  if (!same && !CDN.test(u.hostname) && !fbSdk) return;          /* Firestore · Auth · Drive · Google Fonts CSS → មិនប៉ះ */
  if (same && /\/sw\.js$/.test(u.pathname)) return;
  var html = r.mode === "navigate" || /\.html?$/.test(u.pathname) || /\/$/.test(u.pathname);
  if (html) { e.respondWith(htmlFirst(r)); return; }
  if (!same || /[?&]v=/.test(u.search)) {                          /* មានលេខកំណែ → មិនប្ដូរ */
    e.respondWith(caches.match(r).then(function (m) { return m || fetch(r).then(function (res) { put(r, res); return res; }); }));
    return;
  }
  e.respondWith(caches.match(r).then(function (m) {                 /* រូប · ពុម្ពអក្សរ · manifest */
    var net = fetch(r).then(function (res) { put(r, res); return res; }).catch(function () { return m || Response.error(); });
    return m || net;
  }));
});
