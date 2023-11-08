const axios = require("axios");
const { JSDOM } = require("jsdom");
const validator = require("validator");

const retrieveInsigts = async (url) => {
  // Define a set of common stop words to filter out

  const stopWords = {
    a: true,
    an: true,
    and: true,
    the: true,
    in: true,
    for: true,
    on: true,
    to: true,
    with: true,
    at: true,
    by: true,
    is: true,
    of: true,
    it: true,
    as: true,
    I: true,
    you: true,
    he: true,
    she: true,
    we: true,
    they: true,
    that: true,
    this: true,
    there: true,
    those: true,
  };

  try {
    // Check if the URL is incorrect or has an invalid protocol
    if (
      !validator.isURL(url) ||
      validator.isURL(url, { protocols: ["ftp"], require_protocol: true })
    )
      return {
        isError: true,
        message: "data not found/Incorrect URL",
        statusCode: 400,
      };

    // add protocol if url does not have one.
    const IsURLContainsProtocol = validator.isURL(url, {
      require_protocol: true,
    });
    if (!IsURLContainsProtocol) {
      url = "http://" + url;
    }

    // Make an HTTP GET request to the URL
    const response = await axios.get(url);

    // Get the status code from response
    const statusCode = response.status;

    // Handle cases where the status code is not 200
    if (response.status !== 200) {
      return {
        isError: true,
        message: "Failed to fetch web page",
        statusCode: statusCode,
      };
    }

    // Parse the HTML response using JSDOM
    const html = response.data;
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Extract the web links from 'a' elements
    const webLinks = [];
    document.querySelectorAll("a").forEach((element) => {
      const link = element.getAttribute("href");
      if (link && !webLinks.includes(link)) {
        webLinks.push(link);
      }
    });

    // Extract the media links from 'img' elements
    const mediaLinks = [];
    document.querySelectorAll("img").forEach((element) => {
      const imgUrl = element.getAttribute("src");
      if (imgUrl && !mediaLinks.includes(imgUrl)) {
        mediaLinks.push(imgUrl);
      }
    });

    // Extract textContent from the HTML
    const text = document.body.textContent;

    // Extract and filter words from the text, removing stop words and non-alphabetic characters
    const words = text
      .split(/\s+/)
      .filter((word) => word.match(/^[a-zA-Z]+$/))
      .filter((word) => !stopWords[word.toLowerCase()]);

    return {
      isError: false,
      mediaLinks: mediaLinks,
      webLinks: webLinks,
      wordCount: words.length,
      statusCode: statusCode,
    };
  } catch (error) {
    // Handle Errors
    if (error.code === "ENOTFOUND") {
      return {
        isError: true,
        message: "Url Not found",
        statusCode: 404,
      };
    }

    console.log("Error fetching the web page => ", error);
    return {
      isError: true,
      message: "Something went wrong, Please try again later",
      statusCode: 500,
    };
  }
};

module.exports = { retrieveInsigts };
