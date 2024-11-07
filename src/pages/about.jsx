import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About() {
	return (
		<div>
			<main className=" min-h-screen">
				<Navbar />
				<div className="px-10 lg:w-[1200px] m-auto">
					<h1 className="">Sobre esta página:</h1>
					<p className=" mt-4 bg-white p-3 lg:p-10 font-source-sans">
						Esta es una página dedicada a la preservación digital de la lengua Guaraní.
					</p>
				</div>
			</main>
			<Footer />
		</div>
	);
}
