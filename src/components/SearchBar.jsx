import React, { useEffect } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";

const wordlist = require("../json/wordlist.json");

var autoCompleteJS;
export default function SearchBar() {
	const diacritics = ["’", "ñ", "ã", "ẽ", "ĩ", "õ", "ũ", "á", "é", "í", "ó", "ú", "ý"];
	if (typeof window !== `undefined`) {
		var url = new URL(window.location.href);
	}
	useEffect(() => {
		// 👇️ only runs once
		autoCompleteJS = new autoComplete({
			placeHolder: "Buscar palabra...",
			data: {
				src: wordlist,
			},
			resultItem: {
				highlight: true,
			},
			resultList: {
				tabSelect: true,
			},
			diacritics: true,
			selector: "#query",
			searchEngine: "strict",
			wrapper: true,
			submit: true,
			events: {
				list: {},
			},
		});
		autoCompleteJS.input.addEventListener("selection", function (event) {
			const feedback = event.detail;
			autoCompleteJS.input.blur();
			// Prepare User's Selected Value
			const selection = feedback.selection.value;
			// Render selected choice to selection div
			document.getElementById("query").innerHTML = selection;
			// Replace Input value with the selected value
			autoCompleteJS.input.value = selection;
			const query = document.getElementById("query").value;
			console.log("query: " + query);
			window.location.href = "/diccionario/" + query;
			console.log("feed" + feedback);
		});
	}, []); // 👈️ empty dependencies array
	return (
		<div className="SearchResults flex flex-col lg:px-80">
			<div className="my-5 px-16">
				{diacritics.map((char) => (
					<button
						className="border w-7 lg:w-10 py-1 border-blue-500 text-white bg-blue-600 m-1 text-lg lg:text-2xl rounded"
						onClick={() => {
							document.getElementById("query").value = document.getElementById("query").value + char;
							document.getElementById("query")?.focus();
							autoCompleteJS.open();
						}}
					>
						{char}
					</button>
				))}
			</div>
			<div className="flex space-x-5 justify-center items-center">
				<form
					className="w-2/3 lg:w-1/2"
					onSubmit={(event) => {
						event.preventDefault();
						autoCompleteJS.close();
						const query = event.currentTarget.elements.query.value;
						console.log("custom querys: " + query);
						// window.history.replaceState(null, null, url); // or pushState
						if (wordlist.includes(query)) {
							window.location.href = "/diccionario/" + query;
						} else {
							url = new URL("error", window.location.origin);
							url.searchParams.set("q", query);
							if (window.location.pathname.includes("error")) window.history.pushState(null, null, url);
							else window.location.href = url.href;
						}
					}}
				>
					<label className="block mb-1 font-bold" htmlFor="query"></label>
					<input
						className="w-full text-black p-1 mb-3 border border-r-4 border-black xl:h-12"
						type="search"
						dir="ltr"
						id="query"
						spellCheck="false"
						autoCorrect="off"
						autoComplete="off"
						autoCapitalize="off"
					/>
				</form>
			</div>
		</div>
	);
}
