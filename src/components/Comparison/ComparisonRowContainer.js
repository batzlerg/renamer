import React from 'react';
import ComparisonRow from './ComparisonRow';
import AddRemoveButton from '../AddRemoveButton';
import './ComparisonRowContainer.css';

function ComparisonRowContainer(props) {
  return (
    <div className="comparisonRowContainer">
      <div className="header">
        <h2>Comparisons</h2>
        <p>Enter text to see how it will be transformed</p>
      </div>
      { props.comparisons.map((c, i) =>
        <ComparisonRow
          key={i}
          showRemoveButton={i > 0}
          outputValue={c.outputValue}
          onRemoveComparison={() => props.onRemoveComparison(i)}
          onInputChange={value => props.onUpdateComparison(i, value)}
        />
      )}
      <AddRemoveButton
        type="add"
        onClick={props.onAddComparison}
        text="Add a comparison"
      />
    </div>
  );
}

export default ComparisonRowContainer;
