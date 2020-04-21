addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class ElementHandler {
  element(element) {

    if(element.tagName === 'title'){
      element.setInnerContent("Summer 2020 @ Cloudfare")
    }
    if(element.tagName === 'a'){
      element.setAttribute('href', 'https://github.com/simmimourya/')
      element.setInnerContent("Github")
    }
    if(element.tagName === 'h1'){
      element.setInnerContent("Simmi's Octoverse")
    }

    if(element.tagName==='p'){
      element.setInnerContent("Always forward.")
    }

    // if(element.tagName==='description'){ 
    //   element.setInnerContent("Always forward.")
    // }


  }
}


async function handleRequest(request) {
  try {

    const source_url = 'https://cfw-takehome.developers.workers.dev/api/variants';
    const option_variants = await fetch(source_url)
    .then((response) => {return response.json();})
    .then(json => {return json.variants;});

    let pseudorand = Math.floor(Math.random()* 2)
    let request = new Request(option_variants[pseudorand])

    let req_res = await fetch(request)
    req_res = new Response(req_res.body,req_res)

    req_res.headers.set('set-cookie', "id="+pseudorand.toString()+"Expires=1 September 2020,Secure, HttpOnly")

    var HTML_rewriter = new HTMLRewriter()
    HTML_rewriter.on('title', new ElementHandler())
    .on('h1', new ElementHandler())
    .on('p', new ElementHandler())
    // .on('description', new ElementHandler())
    .on('a', new ElementHandler());

    return HTML_rewriter.transform(req_res) //response
  }
  catch(e){
    console.log("exception"+e)
  }
}
