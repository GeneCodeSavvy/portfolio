// import path from "node:path";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import relativeLinks from "./_config/relative-links.js";

export default function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/assets/favicon");
    eleventyConfig.addPlugin(relativeLinks);
	eleventyConfig.addPlugin(syntaxHighlight);

	return {
		dir: {
			input: "src",
			output: "_site",
			includes: "_includes",
			data: "_data", // For global data, e.g., site.json
		},
		// Use Nunjucks for templates, HTML for HTML files
		templateFormats: ["njk", "md", "html"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: "njk",
	};
}
