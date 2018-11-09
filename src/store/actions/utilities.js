import * as actionTypes from './actionTypes';

export const handleInputChange = (event, currenciesData, convertedValues) => {
  return dispatch => {
    const targetCurrency = event.target.id;
    const targetvalue = event.target.value;

    if (!isNaN(Number(targetvalue))) {
      dispatch(
        handleConversion(
          targetCurrency,
          Number(targetvalue),
          currenciesData,
          convertedValues
        )
      );
    }
  };
};

const handleConversion = (
  targetCurrency,
  targetValue,
  currenciesData,
  convertedValues
) => {
  const rates = { ...currenciesData.rates };
  const exchangesValues = { ...convertedValues };

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
