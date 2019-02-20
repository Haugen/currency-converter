import axios from 'axios';
import { toast } from 'react-toastify';

import * as actionTypes from './actionTypes';
import { saveDataToFirebase } from './firebase';
import {
  FIXER_API_KEY as API_KEY,
  FIXER_BASE_URL as BASE_URL,
  CURRENCIES
} from '../../utility/constants';

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
  toast.error('Error fetching currencies. Please try again later.');
  return {
    type: actionTypes.FETCH_DATA_FROM_FIXER_FAIL,
    errorMessage: error.message
  };
};

export const tryFetchDataFromFixer = () => {
  return async dispatch => {
    dispatch(fetchDataFromFixerStart());

    try {
      const response = await axios.get(
        `${BASE_URL}latest?access_key=${API_KEY}&symbols=${CURRENCIES.join(
          ','
        )}`
      );
      dispatch(saveDataToFirebase(response.data));
      dispatch(fetchDataFromFixerSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFromFixerFail(error));
    }
  };
};
