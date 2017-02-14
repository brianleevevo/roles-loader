const config = require(`./${ process.env.ENV || 'development' }.json`);
export default config;
