import React from 'react';
import './css/AddTransformation.css';

function AddTransformation(props) {
  return (
    <span
      className="addTransformation"
      onClick={props.onAddTransformation}
    >
      (+)
    </span>
  );
}

export default AddTransformation;
