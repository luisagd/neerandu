import fuzzysort from "fuzzysort";
const dictionary = require("./json/diccionario.json");

const fetchData = (word) => {
  word = word.toLowerCase().replaceAll("'", "’").replaceAll("´", "’");
  const result = fuzzysort.go(word, dictionary, { key: "word", limit: 5 });
  return result;
};
export function onRequest(context) {
    let res = new Response(fetchData(context.params.word))
    return res.json()
  }