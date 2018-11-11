import axios from 'axios';

import * as actionTypes from './actionTypes';
import { tryFetchDataFromFixer } from './fixer';
import {
  MINUTES_BETWEEN_UPDATES,
  FIREBASE_BASE_URL
} from '../../utility/constants';

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
        const currencyData = response.data;

        if (currencyData) {
          const minutesSinceLastFetch =
            (Date.now() - currencyData.timestamp * 1000) / 1000 / 60;

          if (
            // OBS! Adding this now to alwayas keep fetching the data from Firebase in
            // production. This is because Firebase doesn't allow me to fetch new data
            // from Fixer without using https, which is not available in the free plan.
            process.env.NODE_ENV === 'production' ||
            minutesSinceLastFetch < MINUTES_BETWEEN_UPDATES
          ) {
            dispatch(fetchDataFromFirebaseSuccess(currencyData));
          } else {
            dispatch(tryFetchDataFromFixer());
          }
        } else {
          dispatch(tryFetchDataFromFixer());
        }
      })
      .catch(error => {
        dispatch(fetchDataFromFirebaseFail(error));
      });
  };
};
