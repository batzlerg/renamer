import React, { useState } from 'react';
import CONSTS from '../constants';
import '../styles/ShellCommand.css';

function ShellCommand(props) {
  const [ path, setPath ] = useState('[[path to directory]]');
  const [ shellType, setShellType ] = useState('BASH');
  let commands = [];

  function pushTransforms() {
    // loop over transformations to pipe to transformer utility
    for (let t of props.transformations) {
      commands.push(CONSTS[`${shellType}_TRANSFORMS`][t.type](
        t.text,
        t.insert || ''
      ));
    }
  };

  switch (shellType) {
    case 'POWERSHELL':
      commands.push(`Get-ChildItem -Path ${path} `);
      commands.push(`| Rename-Item -NewName { $_.Name `);
      pushTransforms();
      commands.push(`}`);
      break;
    default: // covers case 'BASH'
      commands.push(`for f in ${path}/*; do mv "$f" "$(echo $f | `);
      commands.push('awk \'{');
      pushTransforms();
      commands.push('}1\'')
      commands.push(')"; done');
      break;
  }

  return (
    <div className="rowContainer">
      <div>
        <h2>Shell Output</h2>
        <p>Paste into any {shellType} shell to rename files</p>
      </div>
      <div className='shellCommand'>
        <p>{ commands.reduce((acc, curr) => `${acc} ${curr}`) }</p>
      </div>
      <div className="options">
        <select
          name="shellSelect"
          onChange={e => setShellType(e.target.value)}
        >
          <option value="BASH">BASH (Mac/Linux)</option>
          <option value="POWERSHELL">POWERSHELL (Windows)</option>
        </select>
        <span className="path">
          <label htmlFor="pathInput">Path:</label>
          <input
            type="text"
            name="pathInput"
            id="pathInput"
            value={path}
            onChange={e => setPath(e.target.value)}
          />
        </span>
      </div>
    </div>
  );
}

export default ShellCommand;
