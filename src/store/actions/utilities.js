import * as actionTypes from './actionTypes';

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

  // Update all currencies based on the target one.
  for (let currency of Object.values(activeCurrencies)) {
    if (currency.currency !== targetCurrency) {
      exchangesValues[currency.currency] = {
        currency: currency.currency,
        rate: rates[currency.currency],
        value: Number(
          (
            (rates[currency.currency] / rates[targetCurrency]) *
            targetValue
          ).toFixed(2)
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

export const addActiveCurrency = currency => {
  let newCurrency = {
    ...currency,
    value: currency.rate
  };

  return {
    type: actionTypes.ADD_ACTIVE_CURRENCY,
    currency: newCurrency
  };
};

export const removeActiveCurrency = currency => {};
