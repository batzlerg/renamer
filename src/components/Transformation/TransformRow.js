import React from 'react';
import AddRemoveButton from '../AddRemoveButton';
import CONSTS from '../../constants';
import './TransformRow.css';

function TransformRow(props) {
  const onUpdateText = e => props.onUpdateTransformation(
    { text: e.target.value },
  );
  const onUpdateType = e => props.onUpdateTransformation(
    { type: e.target.value },
  );
  let removeButton;
  // ensure there's at least one transformation showing
  // todo: break out into RemovableRow wrapper component
  if (props.showRemoveButton) {
    removeButton = (
      <AddRemoveButton
        type="remove"
        className="removeTransformation"
        onClick={props.onRemoveTransformation}
      />
    );
  }
  return (
    <div className="transformRow">
      { removeButton }
      <input type="text" name="transformText" onChange={onUpdateText}/>
      <select value={props.type} onChange={onUpdateType}>
        { CONSTS.TRANSFORM_TYPES.map(t =>
          <option value={t} key={t}>{t.toUpperCase()}</option>
        )}
      </select>
    </div>
  );
}

export default TransformRow;
