addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
  })
  
  async function handleRequest(request) {
    console.log(request.url);
    console.log(JSON.stringify(request.headers));
    const iPos = request.url.indexOf('.dev/') + 5;
    const proxyUrl = request.url.substr(iPos);
    console.log(proxyUrl);
    const resp = await fetch(proxyUrl, {
        headers: request.headers
    });
    const headers = {};
    for (var pair of resp.headers.entries()) {
      headers[pair[0]] = pair[1];
    }
    const text = await resp.text();
    return new Response(text, {
      headers:{
        ...headers,
        'Access-Control-Allow-Origin': '*',
      }
    });
  }