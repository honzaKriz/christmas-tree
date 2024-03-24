'use client';

import React, { useState } from 'react';

const ChristmasTree = () => {
  // temporary declaration of levels locally for testing purposes only, DELETE AFTER USER INPUT IMPLEMENTATION
  const [input, setInput] = useState('');
  const [levels, setNumOfLevels] = useState<number | null>(0);

  const createLevels = () => {
    if (!levels) return;

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

  const submit = () => {
    const numLevels = parseInt(input, 10);
    if (!isNaN(numLevels) && numLevels > 0) {
      setNumOfLevels(numLevels);
    }
  };

  return (
    <>
      {levels ? (
        <div>
          <pre className='text-center'>{treePattern}</pre>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <div className='flex flex-col items-center space-y-4 border-4 rounded border-lime-800 p-4'>
            <span>
              How many branches do you want your Christmas tree to have?
            </span>
            <input
              type='number'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Enter a number'
              className='text-black w-48'
            />
            <button
              onClick={submit}
              className='w-48 border-2 rounded border-lime-400'
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChristmasTree;
