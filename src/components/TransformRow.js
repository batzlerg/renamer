import React from 'react';
import AddRemoveButton from './AddRemoveButton';
import CONSTS from '../constants';
import '../styles/TransformRow.css';

function TransformRow(props) {
  const onUpdateText = e => props.onUpdateTransformation({
    text: e.target.value
  });
  const onUpdateInsert = e => props.onUpdateTransformation({
    insert: e.target.value
  });
  const onUpdateType = e => props.onUpdateTransformation({
    type: e.target.value
  });
  let removeButton;
  // ensure there's at least one transformation showing
  if (props.showRemoveButton) {
    removeButton = (
      <AddRemoveButton
        type="remove"
        className="removeTransformation"
        onClick={props.onRemoveTransformation}
      />
    );
  }
  const hasInsert = "insert" in props;
  const wrapperClass = `transformInputs
    ${props.showRemoveButton ? 'withRemove' : ''}
    ${hasInsert ? 'withInsert' : ''}`;
  return (
    <div className="transformRow">
      <div className={wrapperClass}>
        <input
          type="text"
          name="transformText"
          value={props.text}
          onChange={onUpdateText}
          placeholder="string to match (case sensitive)"
        />
        { hasInsert &&
          <input
            type="text"
            name="transformInsert"
            value={props.insert}
            onChange={onUpdateInsert}
            placeholder="modifier"
          />
        }
        <select value={props.type} onChange={onUpdateType}>
          { CONSTS.TRANSFORM_TYPES.map(t =>
            <option value={t} key={t}>{t}</option>
          )}
        </select>
      </div>
      { removeButton }
    </div>
  );
}

export default TransformRow;
