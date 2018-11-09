import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currency from './components/Currency/Currency';
import './utility/date-format';

class App extends Component {
  // state = {
  //   currenciesData: null,
  //   convertedValues: null,
  //   error: false,
  //   errorMEssage: ''
  // };

  // Dummy state to not waste API calls while developing.
  state = {
    currenciesData: {
      base: 'EUR',
      date: '2018-11-09',
      rates: {
        USD: 1.136557,
        SEK: 10.251864,
        ARS: 40.313287,
        COP: 3581.859595
      },
      success: true,
      timestamp: 1541723646
    },
    convertedValues: {
      USD: 1.136557,
      SEK: 10.251864,
      ARS: 40.313287,
      COP: 3581.859595
    },
    error: false,
    errorMEssage: ''
  };

  /**
   * On mount, fetch the currency data from the backend and store it in the state.
   */
  componentDidMount() {
    // Using dummy data idential to the API response to not waste API calls.
    // axios
    //   .get('/currency')
    //   .then(response => {
    //     this.setState({
    //       currenciesData: response.data,
    //       convertedValues: response.data.rates
    //     });
    //   })
    //   .catch(error => {
    //     this.setState({
    //       error: true,
    //       errorMEssage: error.message
    //     });
    //   });
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

    if (!isNaN(Number(targetvalue))) {
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
    }
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
        exchangesValues[currency] = (
          (rates[currency] / rates[targetCurrency]) *
          targetValue
        ).toFixed(2);
      }
    }

    this.setState({
      convertedValues: exchangesValues
    });
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
        <h1>Currencies</h1>
        {this.state.currenciesData
          ? new Date(this.state.currenciesData.timestamp * 1000).format(
              'F j, Y G:i:s'
            )
          : null}
        {render}
      </div>
    );
  }
}

export default App;
