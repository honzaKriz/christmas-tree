'use client';

import React, { useState } from 'react';
import ErrorMessages from './ErrorMessages';

const ChristmasTree = () => {
  const [input, setInput] = useState('');
  const [levels, setNumOfLevels] = useState<number | null>(0);
  const [isChain, setIsChain] = useState(true);

  const createLevels = () => {
    if (!levels) return { branchPattern: '', trunkPattern: '' };

    let branchPattern = '';
    let trunkPattern = '';
    branchPattern += '  *  \n';
    branchPattern += ' * * \n';
    branchPattern += '** **\n';

    let gap = 3;

    for (let level = 2; level <= levels; level++) {
      let rows = level + 1;
      for (let row = 1; row < rows; row++) {
        if (isChain) {
          let preGap = ' '.repeat((row - 1) * 4);
          let postGap = ' '.repeat(gap + (row - 1) * 2 - preGap.length - 1);
          branchPattern += `*${preGap}*${postGap}*\n`;
        } else {
          let spaces = ' '.repeat(gap + (row - 1) * 2);
          branchPattern += `*${spaces}*\n`;
        }
      }

      let starCount = level + 1;
      let gapWidth = gap;

      if (level === levels) {
        starCount += levels / 2;
        gapWidth = levels;
      }

      let branchWidth =
        '*'.repeat(starCount) + ' '.repeat(gapWidth) + '*'.repeat(starCount);
      branchPattern += `${branchWidth}\n`;

      gap += 2;
    }

    for (let level = 0; level < levels; level++) {
      let trunk = '*' + ' '.repeat(levels) + '*' + '\n';
      trunkPattern += trunk;
    }
    let trunkBase = '*'.repeat(levels + 2);
    trunkPattern += trunkBase;

    return { branchPattern, trunkPattern };
  };

  const { branchPattern, trunkPattern } = createLevels();

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
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-lg font-bold mt-8 text-center text-amber-500 text-4xl'>
            {levels > 1
              ? `Here is your Christmas tree with ${levels} branches!`
              : `Here is the tinniest Christmas tree with only ${1} branch!`}
          </h1>
          <button
            onClick={() => setIsChain((prevState) => !prevState)}
            className={`${
              isChain ? 'bg-green-400' : 'bg-gray-300'
            } rounded-full flex items-center justify-center mx-auto mt-4`}
          >
            <img
              src='chain.png'
              alt='Christmas chain toggle button'
              className='w-12 h-12 object-contain rounded-full'
            />
          </button>
          <div>
            <pre className='text-center mt-8 text-green-600'>
              <pre className='text-center text-amber-500'>*</pre>
              {branchPattern}
            </pre>
            <pre className='text-center text-amber-950'>{trunkPattern}</pre>
          </div>
          <button
            className='w-20 h-20 rounded-full fixed bottom-4 right-4 flex items-center justify-center p-0 border-none'
            style={{ backgroundColor: 'transparent' }}
            onClick={() => setNumOfLevels(0)}
          >
            <img
              src='back.png'
              alt='Back button'
              className='w-full h-full object-contain rounded-full'
            />
          </button>
        </div>
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
