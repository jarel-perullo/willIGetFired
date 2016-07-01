const CACHE_NAME = 'willIGetFired-2';

const urlsToCache = [
  'https://will-i-get-fired-2.firebaseio.com/messages.json',
	'/app.js',
	'/style.css',
	'/',
	'/images/FIRED--logo.png',
	'/images/favicon-96x96.png',
	'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.0/mustache.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://code.jquery.com/jquery-1.11.1.js',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/fonts/roboto/Roboto-Regular.ttf',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/fonts/roboto/Roboto-Regular.woff',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/fonts/roboto/Roboto-Regular.woff2',
	'https://fonts.gstatic.com/s/materialicons/v16/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2',
	'/firebase.js'
];

self.addEventListener('install', event => {
	console.log('[SW] Install');
	
	// event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

// self.addEventListener('fetch', function (event) {
// 	event.respondWith(
// 		caches.match(event.request).then(res => {
// 			if (res) {
// 				console.log('FROM CACHE:', res.url);
// 				return res;
// 			}
// 			
// 			console.log('NOT FROM CACHE', event.request.url);
// 			
// 			return fetch(event.request)
// 		})
// 	);
// });
