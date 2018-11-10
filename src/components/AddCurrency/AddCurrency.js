import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class AddCurrency extends React.Component {
  state = {
    currentTargetCurrency: null
  };

  addCurrency = event => {
    let target = this.state.currentTargetCurrency;
    let targetRate = this.props.allCurrencies.rates[target];

    if (target === '----' || target === null) return;

    this.props.addCurrency({ currency: target, rate: targetRate });
  };

  handleSelectChange = event => {
    this.setState({ currentTargetCurrency: event.target.value });
  };

  render() {
    let currencies = [
      <option key="empty" id="empty">
        ----
      </option>
    ];
    if (this.props.currencies) {
      for (let [currency] of Object.entries(this.props.currencies)) {
        currencies.push(
          <option key={currency} id={currency}>
            {currency}
          </option>
        );
      }
    }

    return (
      <>
        <div>Add currencies goes here.</div>
        <select onChange={this.handleSelectChange}>{currencies}</select>
        <button onClick={this.addCurrency}>Add</button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    allCurrencies: state.currenciesData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCurrency: currency =>
      dispatch(actionCreators.addActiveCurrency(currency))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCurrency);
