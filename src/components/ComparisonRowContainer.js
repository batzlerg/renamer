import React from 'react';
import ComparisonRow from './ComparisonRow';
import AddRemoveButton from './AddRemoveButton';
import '../styles/RowContainer.css';

function ComparisonRowContainer(props) {
  return (
    <div className="rowContainer">
      <div>
        <h2>Comparisons</h2>
        <p>Enter text to see how it will be transformed</p>
      </div>
      <div>
        { props.comparisons.map((c, i, a) => <>
          <ComparisonRow
            key={i}
            showRemoveButton={props.comparisons.length > 1}
            outputValue={c.outputValue}
            onRemoveComparison={() => props.onRemoveComparison(i)}
            onInputChange={value => props.onUpdateComparison(i, value)}
          />
          { i < a.length - 1 && <hr/> }
        </>)}
      </div>
      <AddRemoveButton
        type="add"
        onClick={props.onAddComparison}
        text="Add a comparison"
      />
    </div>
  );
}

export default ComparisonRowContainer;
