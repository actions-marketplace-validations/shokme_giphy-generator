const core = require('@actions/core');
const axios = require('axios').default;

async function run() {
  try {
    const limit = 25;

    // eslint-disable-next-line no-await-in-loop
    const searchForGifResponse = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_TOKEN}&q=coffee%20time&limit=${limit}&offset=0&lang=en`
    );

    core.debug('Successfully queried GIPHY');

    // Get the ID, title, and GIF URL for the GIF from the response
    const gifIndex = Math.ceil(Math.random() * limit);

    core.debug(`gifIndex picked is: ${gifIndex}`);

    const {
      images: {
        original: {url: gifUrl}
      }
    } = searchForGifResponse.data.data[gifIndex];

    return gifUrl
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
