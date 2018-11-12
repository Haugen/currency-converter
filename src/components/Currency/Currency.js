import React from 'react';
import PropTypes from 'prop-types';

const Currency = props => {
  return (
    <>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          {props.name === 'EUR' ? null : (
            <i
              onClick={props.removeCurrency}
              className="delete-icon fas fa-times button is-danger is-rounded is-outlined"
            />
          )}
          <span className="label">{props.name}</span>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input
                className="input is-primary is-medium"
                onChange={props.handleChange}
                id={props.name}
                type="text"
                value={props.value}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

Currency.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  removeCurrency: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default Currency;
