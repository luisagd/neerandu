const path = require("path");
const fs = require("fs");

exports.createPages = async ({ actions }) => {
	const { createPage } = actions;

	// Load the JSON data
	const wordsData = JSON.parse(fs.readFileSync("./scripts/diccionario_gn.json", "utf-8"));

	// Define a template for each word's page
	const wordTemplate = path.resolve(`src/templates/WordTemplate.js`);

	// Create a page for each word
	wordsData.forEach((word) => {
		createPage({
			path: `/diccionario/${word.word}`,
			component: wordTemplate,
			context: {
				wordData: word,
			},
		});
	});
};
