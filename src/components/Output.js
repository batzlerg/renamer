import React from 'react';
import './css/Output.css';

function Output(props) {
  return (
    <div className="after">
      <label htmlFor="after">Output</label>
      <input type="text" name="after" value={props.value}/>
    </div>
  );
}

export default Output;
