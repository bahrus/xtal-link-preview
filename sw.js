//https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
const xtalLinkPreview = 'xtal-link-preview';
function filterInitData(data, href) {
    const parser = new DOMParser();
    console.log('got dom parser');
    const htmlDoc = parser.parseFromString(data, "text/html");
    let imageSrc = getMetaContent(htmlDoc, 'name', "twitter:image:src");
    if (!imageSrc)
        imageSrc = getMetaContent(htmlDoc, 'name', "twitter:image");
    if (!imageSrc)
        imageSrc = getMetaContent(htmlDoc, 'property', 'og:image');
    if (!imageSrc) {
        const img = htmlDoc.querySelector('img');
        if (img) {
            imageSrc = img.getAttribute('src');
        }
    }
    if (!imageSrc) {
        const iconLink = htmlDoc.querySelector('link[rel="icon"]');
        if (iconLink) {
            imageSrc = iconLink.getAttribute('href');
        }
    }
    if (imageSrc)
        imageSrc = getAbsPath(imageSrc, href);
    let title;
    let titleEl = htmlDoc.querySelector('title');
    if (titleEl)
        title = titleEl.innerHTML;
    let description = getMetaContent(htmlDoc, 'name', 'description');
    if (!description) {
        description = '';
    }
    else {
        title = title.replace(description, '');
    }
    const viewModel = {
        description,
        imageSrc,
        title
    };
    return viewModel;
}
function getMetaContent(htmlDoc, name, val) {
    let metas = Array.from(htmlDoc.querySelectorAll(`meta[${name} = "${val}"]`));
    let meta = metas.filter(item => item.content);
    if (meta && meta.length > 0)
        return meta[0].content;
    return null;
}
function getAbsPath(imageSrc, href) {
    let newSrc = imageSrc;
    const iPosOfHash = href.indexOf('#');
    if (iPosOfHash > -1)
        href = href.substr(0, iPosOfHash);
    if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data')) {
        if (imageSrc.startsWith('/')) {
            newSrc = href.split('/').slice(0, 3).join('/') + imageSrc;
        }
        else {
            const mid = href.endsWith('/') ? '' : '/';
            if (newSrc.startsWith('/'))
                newSrc.replace('/', '');
            newSrc = href + mid + imageSrc;
        }
    }
    return newSrc;
}
self.addEventListener('fetch', function (event) {
    if (!event.request.headers.has(xtalLinkPreview)) {
        event.respondWith(fetch(event.request));
        return;
    }
    fetch(event.request).then(async (response) => {
        console.log('get text');
        const txt = await response.text();
        console.log('get view model');
        const viewModel = filterInitData(txt, response.url);
        console.log(viewModel);
        return response;
    });
});
