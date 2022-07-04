const { config } = require('dotenv');

let loaded = false;
module.exports = () => {
    let isLoaded = false;
    if (!loaded) {
      config();
      loaded = true;
      isLoaded = true;
    }
    return isLoaded;
}