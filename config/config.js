import { ENV } from '../utils/util';

let config = {};

if (process.env.REACT_APP_ENV === ENV.PRODUCTION.KEY) {
  config = require('./config.prod.js'); // eslint-disable-line global-require
} else if (process.env.REACT_APP_ENV === ENV.DEVELOPMENT.KEY) {
  config = require('./config.dev.js'); // eslint-disable-line global-require
} else {
  config = require('./config.prod.js'); // eslint-disable-line global-require
}

export default config = {
  debugMode: config.config.debugMode,
  api_key: config.config.api_key,
  serverURL: config.config.serverURL,
};
