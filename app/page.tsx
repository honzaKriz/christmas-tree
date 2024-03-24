import { CSSProperties } from 'react';

const ChristmasTree = () => {
  const createTopLevel = () => {
    let pattern = '';
    pattern += '  *  \n';
    pattern += ' * * \n';
    pattern += '** **\n';
    return pattern;
  };

  const topLevelPattern = createTopLevel();

  const centerStyle: CSSProperties = {
    textAlign: 'center',
    fontFamily: 'monospace',
  };

  return (
    <div>
      <pre style={centerStyle}>{topLevelPattern}</pre>
    </div>
  );
};

export default ChristmasTree;
