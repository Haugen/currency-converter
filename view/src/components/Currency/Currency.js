import React from 'react';

const Currency = props => {
  return (
    <>
      <div className="currency">
        <h5>{props.name}</h5>
        <p>{props.rate}</p>
      </div>
    </>
  );
};

export default Currency;
