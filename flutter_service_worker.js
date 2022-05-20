'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "c0150fac71787e6b904d3fcfe7923dfa",
"index.html": "f8081e3e28d47f8fb8ddbc5e5e9efaed",
"/": "f8081e3e28d47f8fb8ddbc5e5e9efaed",
"main.dart.js": "bc87222359725fbeaa4613f0c6770d6f",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "b847582ab35567545f1d27dea1c5d709",
"assets/AssetManifest.json": "d9b30f3b304adf31a9a0220d1fe17fe3",
"assets/NOTICES": "5f3bae83ec93f353aeb57324b8543eb1",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/japx/assets/result/encoding/result-encoding-2.json": "cccd2fe41f1901ea7861461371ce264d",
"assets/packages/japx/assets/result/encoding/result-encoding-3.json": "be623b6dcc64a58afac444b03e455506",
"assets/packages/japx/assets/result/encoding/result-encoding-4.json": "6231d0d52fc7a1d7b659955c0171f6b1",
"assets/packages/japx/assets/result/encoding/result-encoding-5.json": "7cb7c90d0b99ac5ddffef5e25dd74908",
"assets/packages/japx/assets/result/encoding/result-encoding-6.json": "987dfc1e5433e84fe3c02372e2d110e0",
"assets/packages/japx/assets/result/encoding/result-encoding-1.json": "01cffda6a917e72768251261994f72b3",
"assets/packages/japx/assets/result/decoding/result-decoding-7.json": "a21d5fbdfc48c5db620318940c63d0d7",
"assets/packages/japx/assets/result/decoding/result-decoding-6.json": "678691680049093718d31caba25e396d",
"assets/packages/japx/assets/result/decoding/result-decoding-1.json": "a31022ec06e1ce4961ffaa1c083080c1",
"assets/packages/japx/assets/result/decoding/result-decoding-3.json": "f6774c2873136857daa793b475852c90",
"assets/packages/japx/assets/result/decoding/result-decoding-2.json": "345ee60ae3687b2246b05704d22a826e",
"assets/packages/japx/assets/result/decoding/result-decoding-5.json": "42f89286e68cfa4b1bfa22445003ef75",
"assets/packages/japx/assets/result/decoding/result-decoding-4.json": "1c373bcb306955babe35a7e795dfb525",
"assets/packages/japx/assets/encoding/encoding-2.json": "958a69496b050c7456fa323cc5a98126",
"assets/packages/japx/assets/encoding/encoding-3.json": "cdc2341fc4b839f16c1f7ee019650f7c",
"assets/packages/japx/assets/encoding/encoding-4.json": "9c3fddc083ef296f9bf8278cdf89ef26",
"assets/packages/japx/assets/encoding/encoding-5.json": "b3fac26d4ae500ed5e52abf52404b9fb",
"assets/packages/japx/assets/encoding/encoding-6.json": "885f15a24a49b3e630cdfaa092420c96",
"assets/packages/japx/assets/encoding/encoding-1.json": "fbc154f37d1e267ff7e984cc785009a1",
"assets/packages/japx/assets/decoding/decoding-7.json": "6974b2acd02064dc02fd9b752978709d",
"assets/packages/japx/assets/decoding/decoding-6.json": "11c1dbd74ce428415acfbe9ed21f3762",
"assets/packages/japx/assets/decoding/decoding-1.json": "ec37db6334d62a828fcf2ffeb100a472",
"assets/packages/japx/assets/decoding/decoding-3.json": "0de41bb7de3cf478f8f107052b3cc731",
"assets/packages/japx/assets/decoding/decoding-2.json": "4afbb97308df9e2fe9ca11796dd397c3",
"assets/packages/japx/assets/decoding/decoding-5.json": "2b7f5f37ba068670abd442e0d9c18b10",
"assets/packages/japx/assets/decoding/decoding-4.json": "15edfa911900f3c69b35bee38b87270b",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
