import React from 'react';
import { Input, Output } from './TextBox';
import AddRemoveButton from '../AddRemoveButton';
import './ComparisonRow.css';

function ComparisonRow(props) {
  let removeButton;
  if (props.showRemoveButton) {
    removeButton = (
      <AddRemoveButton
        type="remove"
        className="removeComparison"
        onClick={props.onRemoveComparison}
      />
    );
  }
  return (
    <div className="comparisonRow">
      <div className='comparisonInputs'>
        <Input onInputChange={props.onInputChange}/>
        <Output value={props.outputValue} />
      </div>
      {removeButton}
    </div>
  );
};

export default ComparisonRow;
