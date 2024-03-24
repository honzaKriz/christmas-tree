import React, { CSSProperties } from 'react';

const ChristmasTree = () => {
  // temporary declaration of levels locally for testing purposes only, DELETE AFTER USER INPUT IMPLEMENTATION
  const levels = 4;

  const createLevels = () => {
    let pattern = '';
    pattern += '  *  \n';
    pattern += ' * * \n';
    pattern += '** **\n';

    let gap = 3;

    for (let level = 2; level <= levels; level++) {
      let rows = level + 1;
      for (let row = 1; row < rows; row++) {
        let spaces = ' '.repeat(gap + (row - 1) * 2);
        pattern += `*${spaces}*\n`;
      }

      let branchWidth =
        '*'.repeat(level + 1) + ' '.repeat(gap) + '*'.repeat(level + 1);
      pattern += `${branchWidth}\n`;

      gap += 2;
    }

    return pattern;
  };

  const treePattern = createLevels();

  const centerStyle: CSSProperties = {
    textAlign: 'center',
    fontFamily: 'monospace',
  };

  return (
    <div>
      <pre style={centerStyle}>{treePattern}</pre>
    </div>
  );
};

export default ChristmasTree;
