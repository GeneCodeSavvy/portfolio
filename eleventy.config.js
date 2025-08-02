// import path from "node:path";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import relativeLinks from "./_config/relative-links.js";
import { DateTime } from "luxon";

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/assets/favicon");
    eleventyConfig.addPlugin(relativeLinks);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addFilter("postDate", (dateObj) => {
        const isoString = dateObj instanceof Date ? dateObj.toISOString() : dateObj;
        return DateTime.fromISO(isoString).toLocaleString(DateTime.DATE_MED);
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data",
        },
        // Use Nunjucks for templates, HTML for HTML files
        templateFormats: ["njk", "md", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
    };
}
