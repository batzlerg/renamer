import React from 'react';
import './TextBox.css';

function Input(props) {
  return (
    <div className="textBox">
      <label htmlFor="before">Input</label>
      <input type="text" name="before" onChange={props.onInputChange}/>
    </div>
  );
}

function Output(props) {
  return (
    <div className="textBox">
      <label htmlFor="after">Output</label>
      <input type="text" name="after" value={props.value} readOnly/>
    </div>
  );
}

export { Input, Output };
