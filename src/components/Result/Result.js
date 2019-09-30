import React, { memo } from 'react';

const result = props => {
  return (
    <div>
      <p>
        Relative balance for the period is : $
        {parseFloat(props.totalBalance).toFixed(2)}
      </p>
      <p>Number of transactions included is : {props.numberOfTransactions}</p>
    </div>
  );
};

export default memo(result);
