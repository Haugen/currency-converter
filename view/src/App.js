import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currency from './components/Currency/Currency';

class App extends Component {
  state = {
    currenciesData: null,
    convertedValues: null,
    error: false,
    errorMEssage: ''
  };

  /**
   * On mount, fetch the currency data from the backend and store it in the state.
   */
  componentDidMount() {
    axios
      .get('/currency')
      .then(response => {
        this.setState({
          currenciesData: response.data,
          convertedValues: response.data.rates
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMEssage: error.message
        });
      });
  }

  /**
   * Each time an input field is changed, update the state values and then pass them
   * on for conversion.
   *
   * @TODO We update the state two times. First in this function, then in handleConversion.
   * This could be done with just one update.
   */
  onInputChange = event => {
    const targetCurrency = event.target.id;
    const targetvalue = event.target.value;

    this.setState(
      oldState => {
        return {
          convertedValues: {
            ...oldState.convertedValues,
            [targetCurrency]: Number(targetvalue)
          }
        };
      },
      () => this.handleConversion(targetCurrency, targetvalue)
    );
  };

  /**
   * Handles conversion. Takes as input a currency and a value, then updates the
   * other currencies with their corresponding converted values based on the exchange
   * rate.
   */
  handleConversion = (targetCurrency, targetValue) => {
    const rates = { ...this.state.currenciesData.rates };
    const exchangesValues = { ...this.state.convertedValues };

    // Update all currencies based on the target one.
    for (let [currency] of Object.entries(exchangesValues)) {
      if (currency !== targetCurrency) {
        exchangesValues[currency] =
          (rates[currency] / rates[targetCurrency]) * targetValue;
      }
    }

    this.setState({
      convertedValues: exchangesValues
    });

    console.log('rates:', rates);
    console.log('exchanges values:', exchangesValues);
    console.log('currency:', targetCurrency);
    console.log('value:', targetValue);
    console.log(this.state);
  };

  render() {
    // Start with loading while waiting for the API call.
    let render = 'Loading...';

    // If there is an error, display the error message.
    if (this.state.error) {
      render = this.state.errorMEssage;
    }

    // If the state has been updated with currency values, prepare them for display.
    if (this.state.convertedValues) {
      render = [];
      for (let [currency, rate] of Object.entries(this.state.convertedValues)) {
        render.push(
          <Currency
            key={currency}
            name={currency}
            rate={rate}
            handleChange={this.onInputChange}
          />
        );
      }
    }

    return (
      <div className="App">
        <h1>currenciesData</h1>
        {render}
      </div>
    );
  }
}

export default App;
