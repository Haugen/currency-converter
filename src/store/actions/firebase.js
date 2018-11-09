import axios from 'axios';

import * as actionTypes from './actionTypes';
import { tryFetchDataFromFixer } from './fixer';

const MINUTES_BETWEEN_UPDATES = 120;
const FIREBASE_BASE_URL = 'https://currency-converter-70cf6.firebaseio.com';

export const saveDataToFirebase = data => {
  return dispatch => {
    axios.put(FIREBASE_BASE_URL + '/currency-data.json', data).catch(error => {
      dispatch(fetchDataFromFirebaseFail(error));
    });
  };
};

const fetchDataFromFirebaseStart = () => {
  return {
    type: actionTypes.FETCH_DATA_FROM_FIREBASE_START
  };
};

const fetchDataFromFirebaseSuccess = currencyData => {
  return {
    type: actionTypes.FETCH_DATA_FROM_FIREBASE_SUCCESS,
    currencyData: currencyData
  };
};

const fetchDataFromFirebaseFail = error => {
  return {
    type: actionTypes.FETCH_DATA_FROM_FIREBASE_FAIL,
    errorMessage: error.message
  };
};

export const tryFetchDataFromFirebase = () => {
  return dispatch => {
    dispatch(fetchDataFromFirebaseStart());

    axios
      .get(FIREBASE_BASE_URL + '/currency-data.json')
      .then(response => {
        const currencyData = response.data ? response.data : null;

        if (currencyData) {
          const minutesSinceLastFetch =
            (Date.now() - currencyData.timestamp * 1000) / 1000 / 60;

          if (minutesSinceLastFetch < MINUTES_BETWEEN_UPDATES) {
            // If the data is not old, update the state with the data.
            dispatch(fetchDataFromFirebaseSuccess(currencyData));
          } else {
            // If the data is old (more than one hour?) fetch new data from fixer.io.
            dispatch(tryFetchDataFromFixer());
          }
        } else {
          // This will only if the Firebase database is empty or returns something else
          // than an object.
          dispatch(tryFetchDataFromFixer());
        }
      })
      .catch(error => {
        dispatch(fetchDataFromFirebaseFail(error));
      });
  };
};
