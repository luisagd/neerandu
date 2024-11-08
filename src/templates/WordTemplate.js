import "../styles/font.css";
import "../styles/autoComplete.css";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import icon from "../images/luisagdlogo.svg";
import SearchBar from "../components/SearchBar";

export const Head = ({ location, params, data, pageContext }) => {
	const { wordData } = pageContext;
	let desc = "";
	for (let i = 0; i < wordData.meaning.length; i++) {
		desc = desc + (i + 1).toString() + "- " + wordData.meaning[i].translation + " ";
	}
	return (
		<>
			<title>{wordData.word} | Traducción | Diccionario Guarani | Ñe’ẽrandu</title>
			<meta name="description" content={`${desc}`} />
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
};
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
	return (
		<>
			<div>
				<main className=" min-h-screen text-center">
					{/* <Navbar /> */}
					<header className=" mt-10 flex flex-col items-center text-center text-5xl md:text-7xl lg:text-8xl md:font-semibold lg:font-mono lg:mt-72">
						<p className="">Ñe’ẽrandu</p>
					</header>
					<SearchBar />
					<div className="SearchResults flex flex-col lg:px-80">
						{
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
						}
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
};

export default WordTemplate;
