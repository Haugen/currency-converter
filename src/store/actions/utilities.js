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
  const exchangesValues = { ...activeCurrencies };

  // Update all currencies based on the target one.
  for (let [currency] of Object.entries(exchangesValues)) {
    if (currency !== targetCurrency) {
      exchangesValues[currency] = Number(
        ((rates[currency] / rates[targetCurrency]) * targetValue).toFixed(2)
      );
    } else {
      Number((exchangesValues[currency] = targetValue));
    }
  }

  return {
    type: actionTypes.UPDATE_CURRENCY_DISPLAY,
    newValues: exchangesValues
  };
};
