const core = require('@actions/core');
const axios = require('axios').default;

async function run() {
  try {
    const query = core.getInput('query', {required: true});
    const limit = core.getInput('limit', {required: false, });
    const lang = core.getInput('lang', {required: false});
    const rating = core.getInput('rating', {required: false});

    // eslint-disable-next-line no-await-in-loop
    const searchForGifResponse = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_TOKEN}&q=${query}&limit=${limit}&offset=0&rating=${rating}&lang=${lang}`
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

    return core.setOutput('url', gifUrl)
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
