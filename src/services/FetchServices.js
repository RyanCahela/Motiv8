const axios = require('axios');

const FetchServices = {
  getBackgroundImageUrls(count) {
    return axios.get(`https://api.unsplash.com/photos/random?count=${count}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
      }
    })
    .catch(err => {throw new Error(err)});
  }
}

module.exports = FetchServices;