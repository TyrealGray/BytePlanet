const cacheName = 'byteplanet-v1';

const staticAssets = [
	'./',
	'./assets/css/images/arrow.svg',
	'./assets/css/images/bars.svg',
	'./assets/css/images/close.svg',
	'./assets/css/font-awesome.min.css',
	'./assets/css/main.css',
	'./assets/js/main.js',
	'./assets/js/skel.min.js',
	'./assets/js/jquery-3.1.1.js',
	'./assets/css/main.css',
	'./index.html',
	'./dist/manifest.json',
	'./dist/home.bundle.js'
];

self.addEventListener('install', async e => {
	const cache = await caches.open(cacheName);
	await  cache.addAll(staticAssets);
	return self.skipWaiting();
});

self.addEventListener('activate', e => {
	self.clients.claim();
});

self.addEventListener('fetch', async e => {
	const req = e.request;
	const url = new URL(req.url);

	if( url .origin === location.origin){
		e.respondWith(cacheFirst(req));
	}
	else {
		e.respondWith(networkAndCache(req));
	}
});

async function cacheFirst(req){
	const cache = await caches.open(cacheName);
	const cached = await  cache.match(req);
	return cached || fetch(req);
}

async function networkAndCache(req){
	const cache = await caches.open(cacheName);
	try{
		const fresh = await fetch(req);
		await cache.put(req, fresh.clone());
		return fresh;
	} catch (e) {
		const cached = await cache.match(req);
		return cached;
	}
}