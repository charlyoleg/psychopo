// .eleventy.js

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/fables_de_jean_de_la_fontaine");
  eleventyConfig.addPassthroughCopy("src/drawings");
  eleventyConfig.addPassthroughCopy({"src/favi":"/"});
  eleventyConfig.setPugOptions({ pretty: true });
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist"
    }
  };
};

