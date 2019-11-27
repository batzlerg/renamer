import React from 'react';
import CONSTS from '../../constants';
import './ShellCommand.css';

function ShellCommand(props) {
  console.log(CONSTS);
  let commands = [];
  // iterator declaration
  if (props.renameDirectoryFiles) {
    commands.push(`for f in [[directory]]*; do mv \"$f\" \"$(echo $f | `);
  }
  commands.push('awk \'{');
  // loop over transformations to pipe to sed
  for (let t of props.transformations) {
    console.log(t);
    commands.push(CONSTS.BASH_TRANSFORMS[t.type](
      t.text,
      t.insert || '' // todo: change to ||
    ).command);
  }
  commands.push('}1\'')
  if (props.renameDirectoryFiles) {
    commands.push(')\"; done');
  }

  return (
    <div className='shellCommand'>
      <p>{ commands.reduce((acc, curr) => `${acc} ${curr}`) }</p>
    </div>
  );
}

export default ShellCommand;
