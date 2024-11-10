import React, { useState, useEffect } from "react";
import icon from "../images/luisagdlogo.svg";
import Footer from "../components/Footer";
import { useLocation } from "@gatsbyjs/reach-router";
import fuzzysort from "fuzzysort";
import SearchBar from "../components/SearchBar";
import wordlist_gn from "../json/wordlist_gn.json";
import wordlist_es from "../json/wordlist_es.json";

export function Head() {
	return (
		<>
			<title>Ñe’ẽrandu: Diccionario Guarani</title>
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

const wordlist = require("../json/wordlist.json");
function findSimilarWords(n) {
	let similarWords = [];
	fuzzysort.go(n, wordlist, { limit: 5 }).forEach((item) => {
		similarWords.push(item.target);
		console.log(item.target);
	});
	return similarWords;
}

function Error() {
	const location = useLocation();
	var url;
	if (typeof window !== `undefined`) {
		url = new URL(window.location.href);
	}
	const queryParams = new URLSearchParams(location.search);
	const word = queryParams.get("q");
	if (word === "" || word === "/" || word === null) {
		console.log("ERR - URL word: " + word);
		if (typeof window !== "undefined") window.location.href = "/404";
	}
	let similarWords = findSimilarWords(word);
	return (
		<div>
			<main className=" min-h-screen text-center">
				{/* <Navbar /> */}
				<header className=" mt-10 flex flex-col items-center text-center  text-5xl md:text-6xl lg:text-8xl lg:font-semibold lg:font-mono lg:mt-72">
					<a href="/">Ñe’ẽrandu</a>
				</header>
				<SearchBar />
				<div>
					Palabra no encontrada. Quisás querrás haber escrito una de las siguientes palabras:
					<ul className="list-none items-start">
						{similarWords.map((query) => (
							<li className="mb-2 px-10 lg:px-80 text-left">
								<p
									className="text-xl lg:text-3xl  font-montserrat cursor-pointer"
									onClick={() => {
										if (wordlist_gn.includes(query)) {
											//TODO: Fix the preference of gn over es
											window.location.href = "/diccionario/" + query;
										} else if (wordlist_es.includes(query)) {
											url = new URL("/", window.location.origin);
											url.searchParams.set("q", query);
											window.history.replaceState(null, null, url); // or pushState
											// fetchData(query);
										} else {
											url = new URL("error", window.location.origin);
											url.searchParams.set("q", query);
											if (window.location.pathname.includes("error")) window.history.pushState(null, null, url);
											else window.location.href = url.href;
										}
									}}
								>
									{query}
								</p>
							</li>
						))}
					</ul>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Error;
