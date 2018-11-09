import React from 'react';

const Currency = props => {
  return (
    <>
      <div className="field">
        <h5 className="is-size-5">
          <strong>{props.name}</strong>
        </h5>
        <input
          className="input is-primary is-size-4"
          onChange={props.handleChange}
          id={props.name}
          type="text"
          value={props.rate}
        />
      </div>
    </>
  );
};

export default Currency;
