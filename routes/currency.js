var express = require('express');
var router = express.Router();
var axios = require('axios');

const BASE_URL = 'http://data.fixer.io/api/';
const API_KEY = process.env.API_KEY;
const BASE_CURRENCY = 'USD'; // Can't change base currency with my current plan.
const CURRENCIES = ['USD', 'SEK', 'ARS', 'COP'];

/* GET currencies. */
router.get('/', function(req, res, next) {
  axios
    .get(
      `${BASE_URL}latest?access_key=${API_KEY}&symbols=${CURRENCIES.join(',')}`
    )
    .then(response => res.json(response.data));
});

module.exports = router;
