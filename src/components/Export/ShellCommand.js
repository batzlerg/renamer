import React, { useState } from 'react';
import CONSTS from '../../constants';
import './ShellCommand.css';

function ShellCommand(props) {
  const [ isDirectoryRename, setIsDirectoryRename ] = useState(false);
  let commands = [];
  // iterator declaration
  if (isDirectoryRename) {
    commands.push(`for f in [[directory]]*; do mv \"$f\" \"$(echo $f | `);
  }
  commands.push('awk \'{');
  // loop over transformations to pipe to sed
  for (let t of props.transformations) {
    commands.push(CONSTS.BASH_TRANSFORMS[t.type](
      t.text,
      t.insert || '' // todo: change to ||
    ));
  }
  commands.push('}1\'')
  if (isDirectoryRename) {
    commands.push(')\"; done');
  }

  return (
    <>
      <div className="header">
        <h2>Shell Output</h2>
        <p>Copy/paste to any BASH shell to perform transformations</p>
      </div>
      <div className="directoryCheckboxWrapper">
        <input
          type="checkbox"
          name="isDirectoryRename"
          id="isDirectoryRename"
          className="directoryCheckbox"
          checked={isDirectoryRename}
          onChange={e => setIsDirectoryRename(e.target.checked)}
        />
        <label htmlFor="isDirectoryRename">Rename files in a directory</label>
      </div>
      <div className='shellCommand'>
        <p>{ commands.reduce((acc, curr) => `${acc} ${curr}`) }</p>
      </div>
    </>
  );
}

export default ShellCommand;
