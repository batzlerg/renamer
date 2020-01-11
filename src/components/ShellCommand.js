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
    <>
      <div className="header">
        <h2>Shell Output</h2>
        <select
          name="shellSelect"
          onChange={e => setShellType(e.target.value)}
        >
          <option value="BASH">BASH (Mac/Linux)</option>
          <option value="POWERSHELL">POWERSHELL (Windows)</option>
        </select>
      </div>
      <div className="directoryPathWrapper">
        <span>
          <label htmlFor="pathInput">Path:</label>
          <input
            type="text"
            name="pathInput"
            id="pathInput"
            className="pathInput"
            value={path}
            onChange={e => setPath(e.target.value)}
          />
        </span>
      </div>
      <div className='shellCommand'>
        <p>{ commands.reduce((acc, curr) => `${acc} ${curr}`) }</p>
      </div>
      <i>(copy/paste to any {shellType} shell to perform transformations)</i>
    </>
  );
}

export default ShellCommand;
