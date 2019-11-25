import React from 'react';
import Input from './Input';
import Output from './Output';
import AddRemoveButton from '../AddRemoveButton';
import './ComparisonRow.css';

function ComparisonRow(props) {
  let removeButton;
  if (props.showRemoveButton) {
    removeButton = (
      <AddRemoveButton
        type="remove"
        className="remove"
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
