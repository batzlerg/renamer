import React from 'react';
import './AddRemoveButton.css';

function AddRemoveButton(props) {
  let buttonSymbol;
  switch (props.type) {
    case 'add':
      buttonSymbol = '(+)';
      break;
    case 'remove':
      buttonSymbol = '(-)';
      break;
    default:
      throw new Error(
        'AddRemoveButton must have type prop specified as \'add\' or \'remove\''
      );
  }
  const className = props.className
    ? `addRemoveButton ${props.className}`
    : 'addRemoveButton';
  const text = props.text ? `${buttonSymbol} ${props.text}` : buttonSymbol;
  return (
    <span className={className} onClick={props.onClick}>{text}</span>
  );
}

export default AddRemoveButton;
