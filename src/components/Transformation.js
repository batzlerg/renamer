import React from 'react';
import CONSTS from '../constants';
import './css/Transformation.css';

function Transformation(props) {
  const onUpdateText = e => props.onUpdateTransformation(
    props.index,
    { text: e.target.value },
  );
  const onUpdateType = e => props.onUpdateTransformation(
    props.index,
    { type: e.target.value },
  );
  return (
    <div className="transformation">
      <span
        className="removeTransformation"
        onClick={ () => props.onRemoveTransformation(props.index) }
      >
        (-)
      </span>
      <input type="text" name="transformationText" onChange={onUpdateText}/>
      <select value={props.type} onChange={onUpdateType}>
        { CONSTS.TRANSFORM_TYPES.map(t =>
          <option value={t} key={t}>{t.toUpperCase()}</option>
        )}
      </select>
    </div>
  );
}

export default Transformation;
