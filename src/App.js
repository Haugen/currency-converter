import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';

import Currency from './components/Currency/Currency';
import './utility/date-format';
import * as actionCreators from './store/actions/index';

class App extends Component {
  componentDidMount() {
    /**
     * Trying to fetch data from Firebase. It will go through the following:
     * * If there is no data, fetch from Fixer, save in Firebase and update state.
     * * If it's old, fetch from Fixer, save in Firebase and update state.
     * * If it's recent, fetch from Firebase and update state.
     */
    this.props.tryFetchDataFromFirebase();
  }

  render() {
    let convertedValues = this.props.convertedValues || null;
    let currenciesData = this.props.currenciesData || null;
    let lastUpdated = null;
    // Start with loading while waiting for the API calls.
    let render = <div style={{ textAlign: 'center' }}>Loading...</div>;

    // If there is an error, display the error message.
    if (this.props.error) {
      render = this.props.errorMessage;
    }

    // If the state has been updated with currency values, prepare them for display.
    if (convertedValues && !this.props.error) {
      lastUpdated = new Date(currenciesData.timestamp * 1000).format('G:i');
      render = [];
      for (let [currency, rate] of Object.entries(convertedValues)) {
        render.push(
          <Currency
            key={currency}
            name={currency}
            rate={rate}
            handleChange={event =>
              this.props.onInputChange(event, currenciesData, convertedValues)
            }
          />
        );
      }
    }

    return (
      <>
        <div className="App section">
          <h1 className="is-size-1">Currency Converter</h1>
          {lastUpdated ? 'Exchange rates last updated ' + lastUpdated : null}
        </div>
        <div className="section">{render}</div>
      </>
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
      dispatch(actionCreators.tryFetchDataFromFirebase()),
    onInputChange: (event, currenciesData, convertedValues) =>
      dispatch(
        actionCreators.handleInputChange(event, currenciesData, convertedValues)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
