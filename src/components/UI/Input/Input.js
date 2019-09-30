import React from 'react';
import Datetime from 'react-datetime';
import './Input.css';

const input = props => {
  let inputElem = null;
  switch (props.elemType) {
    case 'dateinput':
      inputElem = (
        <Datetime
          dateFormat="DD/MM/YYYY"
          timeFormat="HH:mm:ss"
          value={props.value}
          onChange={props.changed}
          inputProps={{ ...props.elemAttr }}
        />
      );
      break;
    case 'select':
      inputElem = (
        <select value={props.value} onChange={props.changed}>
          {props.elemAttr.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElem = (
        <input
          {...props.elemAttr}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return <div>{inputElem}</div>;
};

export default input;
