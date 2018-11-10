import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class ActiveCurrencies extends React.Component {
  render() {
    return (
      <>
        <p>Active currencies:</p>
      </>
    );
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
