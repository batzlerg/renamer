import React from 'react';
import TransformRow from './TransformRow';
import AddRemoveButton from './AddRemoveButton';
import '../styles/RowContainer.css';

function TransformRowContainer(props) {
  return (
    <div className="rowContainer">
      <div>
        <h2>Transformations</h2>
        <p>Add changes that will be applied to your text</p>
      </div>
      <div>
        { props.transformations.map((t, i, a) => <>
          <TransformRow
            key={i}
            showRemoveButton={props.transformations.length > 1}
            onRemoveTransformation={() => props.onRemoveTransformation(i)}
            onUpdateTransformation={update => props.onUpdateTransformation(i, update)}
            {...t}
          />
          { i < a.length - 1 && <hr/> }
        </>)}
      </div>
      <AddRemoveButton
        type="add"
        onClick={props.onAddTransformation}
        text="Add a transformation"
      />
    </div>
  );
}

export default TransformRowContainer;
