const base = require('./base');

module.exports = Object.assign({}, base, {
  __ENV: 'production',
  API_BASE_URL: 'http://sandc.co.il/',
  SITE_BASE_URL: 'http://sandc.co.il/index.html'
});
