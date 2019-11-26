import React from 'react';
import './AddRemoveButton.css';

function AddRemoveButton(props) {
  let buttonSymbol;
  switch (props.type) {
    case 'add':
      buttonSymbol = '\u2295';
      break;
    case 'remove':
      buttonSymbol = '\u2296';
      break;
    default:
      throw new Error(
        'AddRemoveButton must have type prop specified as \'add\' or \'remove\''
      );
  }
  const className = props.className
    ? `addRemoveWrapper ${props.className}`
    : 'addRemoveWrapper';
  return (
    <div className={className}>
      <span className='addRemoveButton' onClick={props.onClick}>
        <span className='button'>{buttonSymbol}</span>
        {props.text && props.text}
      </span>
    </div>
  );
}

export default AddRemoveButton;
