import React from 'react';
import Transformation from './Transformation';
import './css/Transformations.css';

function Transformations(props) {
  return (
    <div className="transformations">
      { props.transformations.map((t, i) =>
        <Transformation
          key={i}
          index={i}
          onRemoveTransformation={props.onRemoveTransformation}
          onUpdateTransformation={props.onUpdateTransformation}
          {...t}
        />
      )}
    </div>
  );
}

export default Transformations;
