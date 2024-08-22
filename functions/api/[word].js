import fuzzysort from "fuzzysort";
const dictionary = require("./json/diccionario.json");

const fetchData = (word) => {
  word = word.toLowerCase().replaceAll("'", "’").replaceAll("´", "’");
  const result = fuzzysort.go(word, dictionary, { key: "word", limit: 5 });
  return result;
};
export function onRequest(context) {
    return new Response.json(fetchData(context.params.word))
  }