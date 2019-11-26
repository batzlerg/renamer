import React from 'react';
import TransformRow from './TransformRow';
import AddRemoveButton from '../AddRemoveButton';
import './TransformRowContainer.css';

function TransformRowContainer(props) {
  return (
    <div className="transformRowContainer">
      <div className="header">
        <h2>Transformations</h2>
        <p>Add changes that will be applied to your text</p>
      </div>
      <div className="rows">
        { props.transformations.map((t, i) =>
          <TransformRow
            key={i}
            showRemoveButton={i > 0}
            onRemoveTransformation={() => props.onRemoveTransformation(i)}
            onUpdateTransformation={update => props.onUpdateTransformation(i, update)}
            {...t}
          />
        )}
      </div>
      <AddRemoveButton
        type="add"
        onClick={props.onAddTransformation}
        text="Add a transformation"
        className="addTransformation"
      />
    </div>
  );
}

export default TransformRowContainer;
