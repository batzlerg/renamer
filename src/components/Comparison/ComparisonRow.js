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
      {removeButton}
      <Input onInputChange={props.onInputChange}/>
      <Output value={props.outputValue} />
    </div>
  );
};

export default ComparisonRow;
