import React from 'react';
import './css/Input.css';

function Input(props) {
  return (
    <div className="before">
      <label htmlFor="before">Input</label>
      <input type="text" name="before" onChange={props.onInputChange}/>
    </div>
  );
}

export default Input;
