addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
})


async function handleRequest(request) {
  console.log(request.url);
  const reqHeaders = {};
  for(var pair of request.headers.entries()){
      reqHeaders[pair[0]] = pair[1];
  }
  console.log(reqHeaders);
  const searchStr = 'bahrus.workers.dev/';
  const iPos = request.url.indexOf(searchStr);
  let proxyUrl = request.url.substr(iPos  + 19);
  if(!proxyUrl.startsWith('https://')){
      const referer = reqHeaders.referer;
      if(referer){
          const iPos2 = referer.indexOf(searchStr);
          if(iPos2 === -1){
              console.log('could not parse')
          }else{

              proxyUrl = referer.substr(iPos2 + 19) + '/' + proxyUrl;
          }
      }else{
          console.log('no referer');
      }
  }
  console.log(proxyUrl);
  try{
      const resp = await fetch(proxyUrl, {
          headers: {
              //...reqHeaders
          }
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
  }catch(e){
      console.error(e);
  }

}
//https://wispy-shadow-4e58.bahrus.workers.dev/vendor/MyFontsWebfontsKit.css
//https://wispy-shadow-4e58.bahrus.workers.dev/https://onsen.io