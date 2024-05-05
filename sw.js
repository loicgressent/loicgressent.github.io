if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js', { scope: './' }).then(function(reg) {
		console.log('Registration succeeded. Scope is ' + reg.scope);
		}).catch(function(error) {
		console.log('Registration failed with ' + error);
	});
};

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll([
				'/index.php',
				'/cv20.pdf',
				'/cms/siriusstore.html',
				'/cms/wordpress.html',
				'/config/bdd.php',
				'/config/outils.php',
				'/images/',
				'/style/',
				'/webdesign/',
				'/.htaccess',
				'/jquery-3.5.1.min.js',
				'/mentionlégales.html',

			]);
		})
	);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then((r) => {
			console.log('[Service Worker] Récupération de la ressource: '+e.request.url);
			return r || fetch(e.request).then((response) => {
                return caches.open('v1').then((cache) => {
					console.log('[Service Worker] Mise en cache de la nouvelle ressource: '+e.request.url);
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
	);
});