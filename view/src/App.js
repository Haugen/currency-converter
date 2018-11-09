import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Currency from './components/Currency/Currency';

class App extends Component {
  state = {
    currencies: null,
    exchangeValues: null,
    error: false,
    errorMEssage: ''
  };

  componentDidMount() {
    axios
      .get('/currency')
      .then(response => {
        this.setState({
          currencies: response.data,
          exchangeValues: response.data.rates
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMEssage: error.message
        });
      });
  }

  onInputChange = event => {
    const currency = event.target.id;
    const value = event.target.value;

    this.setState(
      oldState => {
        return {
          exchangeValues: {
            ...oldState.exchangeValues,
            [currency]: Number(value)
          }
        };
      },
      () => this.handleConversion(currency, value)
    );
  };

  handleConversion = (currentCurrency, currentValue) => {
    const rates = { ...this.state.currencies.rates };
    const exchangesValues = { ...this.state.exchangeValues };

    for (let [currency] of Object.entries(exchangesValues)) {
      if (currency !== currentCurrency) {
        exchangesValues[currency] =
          (rates[currency] / rates[currentCurrency]) * currentValue;
      }
    }

    this.setState({
      exchangeValues: exchangesValues
    });

    console.log('rates:', rates);
    console.log('exchanges values:', exchangesValues);
    console.log('currency:', currentCurrency);
    console.log('value:', currentValue);
    console.log(this.state);
  };

  render() {
    let render = 'Loading...';
    if (this.state.error) {
      render = this.state.errorMEssage;
    }
    if (this.state.exchangeValues) {
      render = [];
      for (let [currency, rate] of Object.entries(this.state.exchangeValues)) {
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
        {render}
      </div>
    );
  }
}

export default App;
