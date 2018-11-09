import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currenciesData: null,
  convertedValues: null,
  error: false,
  errorMEssage: '',
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_FROM_FIREBASE_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_DATA_FROM_FIREBASE_SUCCESS:
    case actionTypes.FETCH_DATA_FROM_FIXER_SUCCESS:
      return {
        ...state,
        currenciesData: action.currencyData,
        convertedValues: action.currencyData.rates,
        loading: false
      };
    case actionTypes.FETCH_DATA_FROM_FIREBASE_FAIL:
    case actionTypes.FETCH_DATA_FROM_FIXER_FAIL:
      return {
        ...state,
        error: true,
        errorMessage: action.errorMessage,
        loading: false
      };
    case actionTypes.FETCH_DATA_FROM_FIXER_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
