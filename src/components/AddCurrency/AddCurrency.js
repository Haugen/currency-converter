import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import { currencyMap } from '../../utility/currencyMap';

class AddCurrency extends React.Component {
  state = {
    currentTargetCurrency: null
  };

  addCurrency = event => {
    // Strip out the first three characters which are the currency code.
    let target = this.state.currentTargetCurrency.substring(0, 3);
    let targetRate = this.props.allCurrencies.rates[target];

    // Just return if the target is not a valid currency or already active.
    if (
      target === 'Select currency' ||
      target === null ||
      (this.props.activeCurrencies && target in this.props.activeCurrencies)
    ) {
      return;
    }

    this.props.addCurrency(
      { currency: target, rate: targetRate },
      this.props.activeCurrencies
    );
  };

  handleSelectChange = event => {
    this.setState({ currentTargetCurrency: event.target.value });
  };

  render() {
    let currencies = [
      <option key="empty" id="empty">
        Select currency
      </option>
    ];
    if (this.props.currencies) {
      for (let [currency] of Object.entries(this.props.currencies)) {
        currencies.push(
          <option key={currency} id={currency}>
            {currency} - {currencyMap[currency]}
          </option>
        );
      }
    }

    return (
      <div className="add-currencies">
        <select
          className="select is-info is-medium"
          onChange={this.handleSelectChange}
        >
          {currencies}
        </select>
        <button className="button is-info is-medium" onClick={this.addCurrency}>
          Add currency
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allCurrencies: state.currenciesData,
    activeCurrencies: state.activeCurrencies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCurrency: (currency, activeCurrencies) =>
      dispatch(actionCreators.addActiveCurrency(currency, activeCurrencies))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCurrency);
