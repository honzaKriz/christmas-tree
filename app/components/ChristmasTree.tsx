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

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numLevels = parseInt(input, 10);
    if (!isNaN(numLevels) && numLevels > 0) {
      setNumOfLevels(numLevels);
    }
  };

  return (
    <>
      {levels ? (
        <>
          <div>
            <pre className='text-center'>{treePattern}</pre>
          </div>
          <button
            className='w-20 h-20 rounded-full fixed bottom-4 right-4 flex items-center justify-center p-0 border-none'
            style={{ backgroundColor: 'transparent' }}
            onClick={() => setNumOfLevels(0)}
          >
            <img
              src='back.png'
              alt='Back'
              className='w-full h-full object-contain rounded-full'
            />
          </button>
        </>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <div className='flex flex-col items-center space-y-4 border-4 rounded border-green-800 p-8 bg-branches backdrop-opacity-10'>
            <form
              className='flex flex-col items-center space-y-4 z-10'
              onSubmit={submit}
            >
              <span className='text-lg font-bold text-slate-200 relative'>
                How many branches do you want your Christmas tree to have?
              </span>
              <input
                type='number'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter a number'
                className='text-black w-48 p-2 rounded relative'
              />
              <button
                type='submit' // Ensure the button submits the form
                className='w-48 border-2 rounded border-green-800 bg-green-950 p-2 font-semibold hover:bg-green-800 hover:text-white transition text-slate-200 relative'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChristmasTree;
