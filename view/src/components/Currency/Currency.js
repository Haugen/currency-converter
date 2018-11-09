import React from 'react';

const Currency = props => {
  return (
    <>
      <div className="currency">
        <h5>{props.name}</h5>
        <input
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
