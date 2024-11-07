import React, { useState, useEffect } from "react";
import "../styles/font.css";
import "../styles/autoComplete.css";

import { useLocation } from "@gatsbyjs/reach-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import autoComplete from "@tarekraafat/autocomplete.js";
import icon from "../images/luisagdlogo.svg";

const diacritics = ["’", "ñ", "ã", "ẽ", "ĩ", "õ", "ũ", "á", "é", "í", "ó", "ú", "ý"];

const wordlist = require("../json/wordlist.json");

var autoCompleteJS;

export function Head() {
	return (
		<>
			<title>Ñe’ẽrandu: Diccionario Guaraniss</title>
			<meta name="description" content="Ñe’ẽrandu: El mejor diccionario online - traductor a guaraní y español." />
			<html lang="es" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
				rel="stylesheet"
			/>

			<link rel="icon" type="image/x-icon" href={icon} />
		</>
	);
}
function BoldedText({ text, shouldBeBold }) {
	const textArray = text.split(RegExp(shouldBeBold, "ig"));
	return (
		<span>
			{textArray.map((item, index) => (
				<React.Fragment key={index}>
					{item}
					{index !== textArray.length - 1 && <b>{shouldBeBold}</b>}
				</React.Fragment>
			))}
		</span>
	);
}

const WordTemplate = ({ pageContext }) => {
	const { wordData } = pageContext;
	const location = useLocation();

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
			window.location.href = "/diccionario/"+query;

			console.log("feed" + feedback);
		});
	}, []); // 👈️ empty dependencies array
	return (
		<>
			<div>
				<main className=" min-h-screen text-center">
					{/* <Navbar /> */}
					<header className=" mt-10 flex flex-col items-center text-center  text-5xl md:text-6xl lg:text-8xl lg:font-semibold lg:font-mono lg:mt-72">
						<p className="">Ñe’ẽrandu</p>
					</header>
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
									console.log("custom query: " + query);
									url.searchParams.set("q", query);
									window.history.replaceState(null, null, url); // or pushState
									window.location.href = "/diccionario/"+query;

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
						{(
							<div className="px-10 lg:px-80uy text-left">
								<p className="text-3xl lg:text-7xl  font-montserrat">{wordData.word}</p>
								<ol>
									{wordData.meaning.map((meaning) => (
										<li className="mb-2">
											<p className="text-blue-600 text-xl lg:text-3xl">{meaning.type}</p>
											<p className="lg:text-xl">{meaning.translation}</p>
										</li>
									))}
								</ol>

								{wordData.example && wordData.example[0] && wordData.example[0][0] && (
									<div>
										<h1 className="text-xl lg:text-3xl">Ejemplos:</h1>
										<ol>
											{wordData.example.map((example) => (
												<li className="mb-2 text-sm lg:text-base text-gray-700  font-montserrat">
													<p className="text-gray-700 ">
														<BoldedText text={example[0]} shouldBeBold={wordData.word} />
													</p>
													<p className="text-blue-600">
														<BoldedText text={example[1]} shouldBeBold={wordData.word} />
													</p>
												</li>
											))}
										</ol>
									</div>
								)}
							</div>
						)}
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default WordTemplate;