import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currency from './components/Currency/Currency';
import './utility/date-format';

const BASE_URL = 'http://data.fixer.io/api/';
const API_KEY = '2448320e1602d59da4e8a5d506254879';
// const BASE_CURRENCY = 'USD'; // Can't change base currency with my current plan.
const CURRENCIES = ['USD', 'SEK', 'ARS', 'COP'];

const MINUTES_BETWEEN_UPDATES = 120;

const FIREBASE_BASE_URL = 'https://currency-converter-70cf6.firebaseio.com';

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
    // Using dummy data idential to the API response to not waste API calls.

    // Reset potential errors.
    this.setState({
      error: false,
      errorMEssage: ''
    });

    // Fetch data from Firebase.
    this.fetchDataFromFirebase();
  }

  fetchNewDataFromFixer = () => {
    axios
      .get(
        `${BASE_URL}latest?access_key=${API_KEY}&symbols=${CURRENCIES.join(
          ','
        )}`
      )
      .then(response => {
        this.saveDataToFirebase(response.data);
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
  };

  fetchDataFromFirebase = () => {
    axios
      .get(FIREBASE_BASE_URL + '/currency-data.json')
      .then(response => {
        const currencyData = response.data ? response.data : null;

        if (currencyData) {
          const minutesSinceLastFetch =
            (Date.now() - currencyData.timestamp * 1000) / 1000 / 60;

          if (minutesSinceLastFetch < MINUTES_BETWEEN_UPDATES) {
            // If the data is not old, update the state with the data.
            this.setState({
              currenciesData: currencyData,
              convertedValues: currencyData.rates
            });
          } else {
            // If the data is old (more than one hour?) fetch new data from fixer.io.
            this.fetchNewDataFromFixer();
          }
        } else {
          // This will only if the Firebase database is empty or returns something else
          // than an object.
          this.fetchNewDataFromFixer();
        }
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMEssage: error.message
        });
      });
  };

  saveDataToFirebase = data => {
    axios
      .put(FIREBASE_BASE_URL + '/currency-data.json', data)
      .then(response => {
        console.log('Fetched new data!');
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMEssage: error.message
        });
      });
  };

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
        Last updated:{' '}
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
