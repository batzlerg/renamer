import React from 'react';
import '../styles/AddRemoveButton.css';

function AddRemoveButton(props) {
  let buttonSymbol;
  switch (props.type) {
    case 'add':
      buttonSymbol = '➕';
      break;
    case 'remove':
      buttonSymbol = '❌';
      break;
    default:
      throw new Error(
        'AddRemoveButton must have type prop specified as \'add\' or \'remove\''
      );
  }
  const className = props.className
    ? `addRemoveWrapper ${props.className}`
    : 'addRemoveWrapper';
  const display = props.text
    ? <span className='text'>{props.text}</span>
    : <span className='button'>{buttonSymbol}</span>;
  return (
    <div className={className}>
      <span className='addRemoveButton' onClick={props.onClick}>
        {display}
      </span>
    </div>
  );
}

export default AddRemoveButton;
