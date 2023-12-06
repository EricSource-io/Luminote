import React, { useRef, useState, useEffect } from 'react';


function Canvas () {
  const canvasRef = useRef(null);

  return (
    <div className='canvas' ref={canvasRef}>
      <div className='note-edit' contentEditable>
        Mergesort is a popular and efficient sorting algorithm that follows the divide-and-conquer paradigm. <br />
        It was invented by John von Neumann in 1945 and has since become a standard sorting <br />
        algorithm due to its stable performance and reliability.<br />
        The basic idea behind mergesort is to divide the unsorted list into n sub-lists, <br />
        each containing one element (trivially sorted), <br />
        and then repeatedly merge sub-lists to produce new sorted <br />
        sub-lists until there is only one sub-list remaining, which is the sorted list.<br />
        <br />
        The algorithm consists of two main steps:<br />
        <br />
        1. Divide: The unsorted list is divided into two halves recursively until each sub-list contains only one element.<br />
        <br />
        2. Merge: The sorted sub-lists are merged back together in a pairwise fashion to produce new sorted sub-lists until<br />
        only one sub-list remains, which is the fully sorted list.<br />
        <br />
        One key advantage of mergesort is its stability. <br />
        Stability in sorting algorithms means that when two elements have equal keys, <br />
        their relative order in the sorted output is the same as in the original input. Mergesort<br />
        achieves stability through its careful merging process.<br />
        <br />
        The time complexity of mergesort is O(n log n), <br />
        making it an efficient algorithm for large datasets. <br />
        The space complexity, however, is O(n), as it requires additional space for the merging process.<br />
        This makes mergesort less memory-efficient compared to some in-place sorting algorithms. <br />
        There are variations of mergesort, such as bottom-up mergesort, which optimizes space usage.<br />
        <br />
        In summary, mergesort is a reliable and efficient sorting algorithm with a time complexity of O(n log n) <br />
        and stable performance. It is often used in scenarios where a stable and predictable sorting algorithm is needed,<br />
        and the available memory space allows for the additional space complexity.
      </div>
    </div>
  );
}

export default Canvas;
