import React from 'react';
import AddRemoveButton from './AddRemoveButton';
import CONSTS from '../constants';
import './css/Transformation.css';

function Transformation(props) {
  const onUpdateText = e => props.onUpdateTransformation(
    { text: e.target.value },
  );
  const onUpdateType = e => props.onUpdateTransformation(
    { type: e.target.value },
  );
  let removeButton;
  // ensure there's at least one transformation showing
  // todo: break out into RemovableRow wrapper component
  if (props.index > 0) {
    removeButton = (
      <AddRemoveButton
        type="remove"
        className="removeTransformation"
        onClick={props.onRemoveTransformation}
      />
    );
  }
  return (
    <div className="transformation">
      { removeButton }
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
