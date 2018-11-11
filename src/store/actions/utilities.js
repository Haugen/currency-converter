import * as actionTypes from './actionTypes';
import { NR_OF_DECIMALS } from '../../utility/constants';

export const handleInputChange = (event, currenciesData, activeCurrencies) => {
  return dispatch => {
    const targetCurrency = event.target.id;
    const targetvalue = event.target.value;

    if (!isNaN(Number(targetvalue))) {
      dispatch(
        handleConversion(
          targetCurrency,
          Number(targetvalue),
          currenciesData,
          activeCurrencies
        )
      );
    }
  };
};

const handleConversion = (
  targetCurrency,
  targetValue,
  currenciesData,
  activeCurrencies
) => {
  const rates = { ...currenciesData.rates };
  let exchangesValues = {};

  for (let currency of Object.values(activeCurrencies)) {
    if (currency.currency !== targetCurrency) {
      exchangesValues[currency.currency] = {
        currency: currency.currency,
        rate: rates[currency.currency],
        value: Number(
          (
            (rates[currency.currency] / rates[targetCurrency]) *
            targetValue
          ).toFixed(NR_OF_DECIMALS)
        )
      };
    } else {
      exchangesValues[currency.currency] = {
        currency: targetCurrency,
        rate: rates[targetCurrency],
        value: Number(targetValue)
      };
    }
  }

  return {
    type: actionTypes.UPDATE_CURRENCY_DISPLAY,
    newValues: exchangesValues
  };
};

export const addActiveCurrency = (currency, activeCurrencies) => {
  let newCurrencyValue;

  if (activeCurrencies && Object.values(activeCurrencies)[0] !== undefined) {
    let compareCurrency = Object.values(activeCurrencies)[0];
    newCurrencyValue =
      (currency.rate / compareCurrency.rate) * compareCurrency.value;
  } else {
    newCurrencyValue = currency.rate;
  }

  let newCurrency = {
    ...currency,
    value: Number(newCurrencyValue.toFixed(NR_OF_DECIMALS))
  };

  return {
    type: actionTypes.ADD_ACTIVE_CURRENCY,
    currency: newCurrency
  };
};

export const removeActiveCurrency = (currency, activeCurrencies) => {
  let newCurrencies = { ...activeCurrencies };
  delete newCurrencies[currency];

  return {
    type: actionTypes.REMOVE_ACTIVE_CURRENCY,
    newCurrencies
  };
};
