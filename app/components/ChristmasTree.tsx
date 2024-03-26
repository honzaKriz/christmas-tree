'use client';

import React, { useState } from 'react';
// importing various validation error messages from a separate file
import ErrorMessages from './ErrorMessages';

const ChristmasTree = () => {
  // states for input field, number of branches, and the christmas chain
  const [input, setInput] = useState('');
  const [levels, setNumOfLevels] = useState<number | null>(0);
  const [isChain, setIsChain] = useState(false);

  // function responsible for returning the tree pattern
  const createLevels = () => {
    // if the levels is ever empty, return empty strings - this case should never occur, but with TypeScript, levels cannot remain 'possibly null'
    if (!levels) return { branchPattern: '', trunkPattern: '' };

    // initiate separate branch and trunk pattern
    // the separation is later used for applying different colors to each part
    let branchPattern = '';
    let trunkPattern = '';

    // manually create the first level because that's the minimum value anyway
    branchPattern += '  *  \n';
    branchPattern += ' * * \n';
    branchPattern += '** **\n';

    // number of spaces on the first row
    let gap = 3;

    // nested loop for generating a string for each level and each row within it, increasing the gap between asterisks
    for (let level = 2; level <= levels; level++) {
      let rows = level + 1;
      for (let row = 1; row < rows; row++) {
        // if the chain is on, generate a slightly different pattern for each row
        if (isChain) {
          let preGap = ' '.repeat((row - 1) * 4);
          let postGap = ' '.repeat(gap + (row - 1) * 2 - preGap.length - 1);
          branchPattern += `*${preGap}*${postGap}*\n`;
        } else {
          let spaces = ' '.repeat(gap + (row - 1) * 2);
          branchPattern += `*${spaces}*\n`;
        }
      }

      // logic for the last row in each level
      let starCount = level + 1;
      let gapWidth = gap;

      // if it is the last level on the whole tree, increase the starCount, narrow the gap width
      if (level === levels) {
        starCount += levels / 2;
        gapWidth = levels;
      }

      let branchWidth =
        '*'.repeat(starCount) + ' '.repeat(gapWidth) + '*'.repeat(starCount);
      branchPattern += `${branchWidth}\n`;

      gap += 2;
    }

    // separate loop for rendering the trunk
    for (let level = 0; level < levels; level++) {
      let trunk = '*' + ' '.repeat(levels) + '*' + '\n';
      trunkPattern += trunk;
    }
    let trunkBase = '*'.repeat(levels + 2);
    trunkPattern += trunkBase;

    return { branchPattern, trunkPattern };
  };

  // destructuring the returned values from the createLevels() function so they can be used in the JSX
  const { branchPattern, trunkPattern } = createLevels();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    // the input field is wrapped in a form component to quickly enable input submit with the 'Enter' key when the input is in focus, the next line prevents the form default behavior which would cause a page reload
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

    // when the submit button is clicked or the Enter key is hit, the value of the 'input' state sets the number of levels (branches) which is then passed to the createLevels() function
    setNumOfLevels(numLevels);
  };

  // JSX that is returned and rendered onto the DOM as HTML
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
