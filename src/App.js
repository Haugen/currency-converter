import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';

import AddCurrency from './components/AddCurrency/AddCurrency';
import LastUpdated from './components/LastUpdated/LastUpdated';
import './utility/date-format';
import * as actionCreators from './store/actions/index';
import ActiveCurrencies from './components/ActiveCurrencies/ActiveCurrencies';

class App extends Component {
  componentDidMount() {
    this.props.tryFetchDataFromFirebase();
  }

  render() {
    const rates = this.props.currenciesData
      ? this.props.currenciesData.rates
      : null;

    return (
      <>
        <div className="App section">
          <h1 className="is-size-1">Currency Converter</h1>
          <LastUpdated />
          <AddCurrency currencies={rates} />
        </div>
        <div className="App section">
          <ActiveCurrencies />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currenciesData: state.currenciesData
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
