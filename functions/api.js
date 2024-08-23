import fuzzysort from "fuzzysort";




export async function onRequest(context) {

  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': 'http://localhost:80',
      }
    });
  }
    const url = new URL(context.request.url);
    const url_dict = url.protocol+url.host+'/json/diccionario.json';
    console.log(url_dict)
    const resp = await context.env.ASSETS.fetch(url_dict);
    const dictionary = await resp.json();
    const fetchData = (word) => {
      word = word.toLowerCase().replaceAll("'", "’").replaceAll("´", "’");
      const result = fuzzysort.go(word, dictionary, { key: "word", limit: 5 });
      let results = []
      for (let i = 0; i < result.length; i++) {
        results.push(result[i].obj);
        //{"word":result[i].obj.word, "meaning": result[i].obj.meaning} 
      }
      return JSON.stringify(result);
    };

    let query = url.searchParams.get("q");

    let res = new Response(fetchData(query));
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res
  }