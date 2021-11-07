addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
  })
  
  async function handleRequest(request) {
    console.log(request.url);
    const resp = await fetch(request.url);
    const text = await resp.text();
    console.log(text);
    return new Response(text, {
      headers:{
        "content-type": "text/html; charset=utf-8"
      }
    });
    //return new Response("Hello world")
  }