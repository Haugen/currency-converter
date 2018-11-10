import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import Currency from '../Currency/Currency';

class ActiveCurrencies extends React.Component {
  render() {
    let activeCurrencies = null;

    if (this.props.activeCurrencies) {
      activeCurrencies = [];
      for (let currency of Object.values(this.props.activeCurrencies)) {
        activeCurrencies.push(
          <Currency
            key={currency.currency}
            name={currency.currency}
            value={currency.value}
            handleChange={event =>
              this.props.onInputChange(
                event,
                this.props.currenciesData,
                this.props.activeCurrencies
              )
            }
          />
        );
      }
    }

    return <>{activeCurrencies}</>;
  }
}

const mapStateToProps = state => {
  return {
    currenciesData: state.currenciesData,
    activeCurrencies: state.activeCurrencies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: (event, currenciesData, activeCurrencies) =>
      dispatch(
        actionCreators.handleInputChange(
          event,
          currenciesData,
          activeCurrencies
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveCurrencies);
