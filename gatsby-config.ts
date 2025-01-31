import type { GatsbyConfig } from "gatsby";

if (process.env.DEVELOPMENT === "TRUE") {
	process.env.NODE_ENV = "development";
}
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
	siteMetadata: {
		title: `neerandu`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: ["gatsby-plugin-postcss"],
};
module.exports = {
	flags: {
		DEV_SSR: true,
	},
};
export default config;
