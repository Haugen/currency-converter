import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';

import AddCurrency from './components/AddCurrency/AddCurrency';
import LastUpdated from './components/LastUpdated/LastUpdated';
import * as actionCreators from './store/actions/index';
import ActiveCurrencies from './components/ActiveCurrencies/ActiveCurrencies';
import Footer from './components/Footer/Footer';

class App extends Component {
  componentDidMount() {
    this.props.tryFetchDataFromFirebase();
  }

  render() {
    let rates, timestamp;

    if (this.props.currenciesData) {
      rates = this.props.currenciesData.rates;
      timestamp = this.props.currenciesData.timestamp;
    }

    return (
      <>
        {this.props.loading ? null : (
          <div className="App">
            <div className="section">
              <h1>Currency Converter</h1>
              <LastUpdated timestamp={timestamp} />
              <p>
                Using Euro as base rate. Add more currencies below and update
                the values in the textfields to instantly compare two or more
                currencies.
              </p>
              <AddCurrency currencies={rates} />
              <ActiveCurrencies />
              <Footer />
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currenciesData: state.currenciesData,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryFetchDataFromFirebase: () =>
      dispatch(actionCreators.tryFetchDataFromFirebase())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
