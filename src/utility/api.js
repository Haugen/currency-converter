import axios from 'axios';

const BASE_URL = 'http://data.fixer.io/api/';
const API_KEY = '2448320e1602d59da4e8a5d506254879';
// const BASE_CURRENCY = 'USD'; // Can't change base currency with my current plan.
const CURRENCIES = ['USD', 'SEK', 'ARS', 'COP'];

const MINUTES_BETWEEN_UPDATES = 120;

const FIREBASE_BASE_URL = 'https://currency-converter-70cf6.firebaseio.com';

export const api = {};
