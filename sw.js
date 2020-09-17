//https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
const xtalLinkPreview = 'xtal-link-preview';
self.addEventListener('fetch', function (event) {
    if (!event.request.headers.has(xtalLinkPreview)) {
        event.respondWith(fetch(event.request));
        return;
    }
    fetch(event.request).then(function (response) {
        console.log('iah');
        return response;
    });
});
