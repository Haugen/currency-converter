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
    case actionTypes.FETCH_DATA_FROM_FIXER_START:
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
        error: false,
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
    case actionTypes.UPDATE_CURRENCY_DISPLAY:
      return {
        ...state,
        convertedValues: action.newValues
      };
    default:
      return state;
  }
};

export default reducer;
