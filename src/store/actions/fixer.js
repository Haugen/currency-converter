import axios from 'axios';

import * as actionTypes from './actionTypes';
import { saveDataToFirebase } from './firebase';

const BASE_URL = 'http://data.fixer.io/api/';
const API_KEY = process.env.REACT_APP_FIXER_API_KEY;
const CURRENCIES = ['USD', 'SEK', 'ARS', 'COP', 'NOK'];

const fetchDataFromFixerStart = () => {
  return {
    type: actionTypes.FETCH_DATA_FROM_FIXER_START
  };
};

const fetchDataFromFixerSuccess = currencyData => {
  return {
    type: actionTypes.FETCH_DATA_FROM_FIXER_SUCCESS,
    currencyData
  };
};

const fetchDataFromFixerFail = error => {
  return {
    type: actionTypes.FETCH_DATA_FROM_FIXER_FAIL,
    errorMessage: error.message
  };
};

export const tryFetchDataFromFixer = () => {
  return dispatch => {
    dispatch(fetchDataFromFixerStart());

    axios
      .get(
        `${BASE_URL}latest?access_key=${API_KEY}&symbols=${CURRENCIES.join(
          ','
        )}`
      )
      .then(response => {
        dispatch(saveDataToFirebase(response.data));
        dispatch(fetchDataFromFixerSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataFromFixerFail(error));
      });
  };
};
