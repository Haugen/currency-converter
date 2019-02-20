import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    let rates, timestamp, lastUpdated;

    if (this.props.currenciesData) {
      rates = this.props.currenciesData.rates;
      timestamp = this.props.currenciesData.timestamp;
    }

    if (timestamp) {
      lastUpdated = <LastUpdated timestamp={timestamp} />;
    }

    return (
      <>
        {this.props.loading ? null : (
          <div className="App">
            <div className="section">
              <h1>Currency Converter</h1>
              {lastUpdated}
              <p>
                Using Euro as base rate. Add more currencies below and update
                the values in the textfields to instantly compare two or more
                currencies.
              </p>
              <AddCurrency currencies={rates} />
              <ActiveCurrencies />
              <Footer />
              <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
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
    loading: state.loading,
    error: state.error,
    errorMEssage: state.errorMEssage
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
