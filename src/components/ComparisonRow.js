import React from 'react';
import { Input, Output } from './TextBox';
import AddRemoveButton from './AddRemoveButton';
import '../styles/ComparisonRow.css';

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
  const hasInputValue = props.inputValue && props.inputValue !== '';
  return (
    <div className="comparisonRow">
      <div className='comparisonInputs'>
        <Input
          value={props.inputValue}
          onInputChange={props.onInputChange}
        />
        { hasInputValue &&
          <Output value={props.outputValue} />
        }
      </div>
      {removeButton}
    </div>
  );
};

export default ComparisonRow;
