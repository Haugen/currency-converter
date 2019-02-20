import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import * as actionCreators from '../../store/actions/index';
import Currency from '../Currency/Currency';

class ActiveCurrencies extends React.Component {
  render() {
    let activeCurrencies;

    if (this.props.activeCurrencies) {
      activeCurrencies = [];
      for (let currency of Object.values(this.props.activeCurrencies)) {
        activeCurrencies.push(
          <CSSTransition
            key={currency.currency}
            timeout={300}
            classNames={{
              enter: '',
              enterActive: 'fade-in',
              exit: '',
              exitActive: 'fade-out'
            }}
          >
            <div className="currency">
              <Currency
                name={currency.currency}
                value={currency.value}
                removeCurrency={() =>
                  this.props.removeActiveCurrency(
                    currency.currency,
                    this.props.activeCurrencies
                  )
                }
                handleChange={event =>
                  this.props.onInputChange(
                    event,
                    this.props.currenciesData,
                    this.props.activeCurrencies
                  )
                }
              />
            </div>
          </CSSTransition>
        );
      }
    } else {
      activeCurrencies = 'Add currencies above to get started.';
    }

    return (
      <>
        <TransitionGroup component={null}>{activeCurrencies}</TransitionGroup>
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
      ),
    removeActiveCurrency: (currency, activeCurrencies) =>
      dispatch(actionCreators.removeActiveCurrency(currency, activeCurrencies))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveCurrencies);
