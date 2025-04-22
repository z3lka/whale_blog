const { DateTime } = require("luxon");
const stripHtml = require("striptags");

module.exports = function (eleventyConfig) {
  // Copy `src/styles.css` to output
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });

  // Example filter for reading time (if you want to compute it)
  eleventyConfig.addFilter("readTime", (text) =>
    Math.ceil(text.split(/\s+/).length / 200)
  );

  eleventyConfig.addFilter("excerpt", (content, words = 50) => {
    if (!content) return "";
    // remove markup then trim white‑space
    const text = stripHtml(content).replace(/\s+/g, " ").trim();

    const wordArray = text.split(" ").slice(0, words);
    return wordArray.join(" ") + (wordArray.length >= words ? "…" : "");
  });

  eleventyConfig.addFilter("date", (dateObj, format = "dd-MM-yyyy") => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat(
      format
    );
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};
