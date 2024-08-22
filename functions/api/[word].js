import fuzzysort from "fuzzysort";
const dictionary = require("./json/diccionario.json");

const fetchData = (word) => {
  word = word.toLowerCase().replaceAll("'", "’").replaceAll("´", "’");
  const result = fuzzysort.go(word, dictionary, { key: "word", limit: 5 });
  return result;
};
export function onRequest(context) {
  let data;
  try {data = fetchData(context.params.word);}catch(err){
    console.log(err);
  }
    return new Response.json(data)
  }