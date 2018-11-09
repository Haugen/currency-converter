import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Currency from './components/Currency/Currency';
import './utility/date-format';
import * as firebaseActions from './store/actions/firebase';

class App extends Component {
  componentDidMount() {
    /**
     * Trying to fetch data from Firebase.
     * If there is none, fetch from Fixer, save in Firebase and update state.
     * If it's old, fetch from Fixer, save in Firebase and update state.
     * If it's recent, fetch from Firebase and update state.
     */
    this.props.tryFetchDataFromFirebase();
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
    // Start with loading while waiting for the API calls.
    let render = 'Loading...';

    // If there is an error, display the error message.
    if (this.props.error) {
      render = this.props.errorMessage;
    }

    // If the state has been updated with currency values, prepare them for display.
    if (this.props.convertedValues) {
      render = [];
      for (let [currency, rate] of Object.entries(this.props.convertedValues)) {
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
        {this.props.currenciesData
          ? new Date(this.props.currenciesData.timestamp * 1000).format(
              'F j, Y G:i:s'
            )
          : null}
        {render}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currenciesData: state.currenciesData,
    convertedValues: state.convertedValues,
    error: state.error,
    errorMessage: state.errorMessage,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryFetchDataFromFirebase: () =>
      dispatch(firebaseActions.tryFetchDataFromFirebase())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
