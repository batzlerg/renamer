import React from 'react';
import TransformRow from './TransformRow';
import './TransformRowContainer.css';

function TransformRowContainer(props) {
  return (
    <div className="transformRowContainer">
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
  );
}

export default TransformRowContainer;
