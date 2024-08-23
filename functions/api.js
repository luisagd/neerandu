import fuzzysort from "fuzzysort";
const dictionary = require("./json/diccionario.json");


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

export function onRequest(context) {
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
    const url = new URL(context.request.url)
    let query = url.searchParams.get("q");

    let res = new Response(fetchData(query));
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res
  }