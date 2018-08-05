const base = require('./base');

module.exports = Object.assign({}, base, {
  __ENV: 'staging',
  API_BASE_URL: 'http://localhost:63982/',
  SITE_BASE_URL: 'http://localhost:63982/index.html'
});
