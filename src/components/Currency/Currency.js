import React from 'react';
import PropTypes from 'prop-types';

const Currency = props => {
  return (
    <>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{props.name}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input
                className="input is-primary is-medium"
                onChange={props.handleChange}
                id={props.name}
                type="text"
                value={props.rate}
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
  rate: PropTypes.number.isRequired
};

export default Currency;
