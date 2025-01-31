import React, { useEffect } from "react";
import autoComplete from "@tarekraafat/autocomplete.js";
import wordlist_gn from "../json/wordlist_gn.json";
import wordlist_es from "../json/wordlist_es.json";

var autoCompleteJS;
export default function SearchBar({ func }) {
	const diacritics = ["’", "ñ", "ã", "ẽ", "ĩ", "õ", "ũ", "á", "é", "í", "ó", "ú", "ý"];
	var url;
	if (typeof window !== `undefined`) {
		url = new URL(window.location.href);
	}
	const use_query = (query) => {
		if (wordlist_gn.includes(query)) {
			//TODO: Fix the preference of gn over es
			window.location.href = "/diccionario/" + query;
		} else if (wordlist_es.includes(query)) {
			url = new URL("/diccionario/", window.location.origin);
			url.searchParams.set("q", query);

			// window.location.href = url.href;
			console.log(window.location.pathname);
			if (window.location.pathname == "/diccionario/") {
				window.history.pushState(null, null, url); // or pushState
				if (typeof func !== `undefined`) {
					console.log(typeof func);
					func();
				}
			} else {
				window.location.href = url.href;
			}

			// fetchData(query);
		} else {
			url = new URL("error", window.location.origin);
			url.searchParams.set("q", query);
			if (window.location.pathname.includes("error")) window.history.pushState(null, null, url);
			else window.location.href = url.href;
		}
		//TODO: Fix issue when going from /diccionario/... to /?q=... (it's not loading. probably due to pushState)
	};
	useEffect(() => {
		// 👇️ only runs once
		let wordlist = wordlist_gn.concat(wordlist_es);
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
			use_query(query);
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
					// className="w-2/3 lg:w-1/2"
					className="grow"
					onSubmit={(event) => {
						event.preventDefault();
						autoCompleteJS.close();
						const query = event.currentTarget.elements.query.value;
						console.log("custom querys: " + query);
						// window.history.replaceState(null, null, url); // or pushState
						use_query(query);
					}}
				>
					<label className="block mb-1 font-bold">
						<input
							className="w-full text-black p-1 border border-blue-300 rounded-3xl h-12 max-w-80 lg:max-w-[40rem]"
							type="search"
							dir="ltr"
							id="query"
							spellCheck="false"
							autoCorrect="off"
							autoComplete="off"
							autoCapitalize="off"
						/>
					</label>
				</form>
			</div>
		</div>
	);
}
