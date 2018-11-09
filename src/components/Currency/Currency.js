import React from 'react';

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

export default Currency;
