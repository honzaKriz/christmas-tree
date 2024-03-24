'use client';

import React, { useState } from 'react';
import ErrorMessages from './ErrorMessages';

const ChristmasTree = () => {
  const [input, setInput] = useState('');
  const [levels, setNumOfLevels] = useState<number | null>(0);

  const createLevels = () => {
    if (!levels) return;

    let branchPattern = '';
    let trunkPattern = '';
    branchPattern += '  *  \n';
    branchPattern += ' * * \n';
    branchPattern += '** **\n';

    let gap = 3;

    for (let level = 2; level <= levels; level++) {
      let rows = level + 1;
      for (let row = 1; row < rows; row++) {
        let spaces = ' '.repeat(gap + (row - 1) * 2);
        branchPattern += `*${spaces}*\n`;
      }

      let branchWidth =
        '*'.repeat(level + 1) + ' '.repeat(gap) + '*'.repeat(level + 1);
      branchPattern += `${branchWidth}\n`;

      gap += 2;
    }

    for (let level = 0; level < levels; level++) {
      let trunk = '*' + ' '.repeat(gap - 2) + '*' + '\n';
      trunkPattern += trunk;
    }
    let trunkBase = '*'.repeat(gap);

    trunkPattern += trunkBase;

    branchPattern += trunkPattern;
    return branchPattern;
  };

  const treePattern = createLevels();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') {
      alert(ErrorMessages.message1);
      return;
    }

    const numLevels = parseInt(input, 10);
    if (isNaN(numLevels)) {
      alert(ErrorMessages.message2);
      return;
    }

    if (numLevels < 1) {
      alert(ErrorMessages.message3);
      return;
    }

    if (numLevels > 42) {
      alert(ErrorMessages.message4);
      return;
    }

    setNumOfLevels(numLevels);
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
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter a number between 1 and 24'
                className='text-black w-72 p-2 rounded relative'
              />
              <button
                type='submit'
                className='w-72 border-2 rounded border-green-800 bg-green-950 p-2 font-semibold hover:bg-green-800 hover:text-white transition text-slate-200 relative'
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
