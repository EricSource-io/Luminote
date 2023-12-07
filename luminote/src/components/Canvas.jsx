import React, { useRef, useEffect, useState } from 'react';

function Canvas() {
  // Ref to the contentEditable div
  const canvasRef = useRef(null);

  // State to keep track of the selected range
  const [selectedRange, setSelectedRange] = useState(null);

  // Function to handle the "Bold" button click
  const handleBoldClick = () => {
    applyStyle('fontWeight', 'bold');
  };

  // Function to handle color change buttons
  const handleColorChange = (color) => {
    applyStyle('color', color);
  };

  // Function to apply styles to the selected range
  const applyStyle = (style, value) => {
    if (!selectedRange) return;

    // Create a new span element with the specified style
    const span = document.createElement('span');
    span.style[style] = value;

    // Create a new range and surround the contents with the span
    const newRange = selectedRange.cloneRange();
    newRange.surroundContents(span);

    // Remove the original selection
    selectedRange.deleteContents();

    // Insert the new range with the styled span
    selectedRange.insertNode(span);

    // Clear the selection
    setSelectedRange(null);
  };

  // Function to handle selection change events
  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      // Update the selectedRange state with the current selection range
      setSelectedRange(selection.getRangeAt(0));
    }
  };

  // Effect to add event listeners for selection change events
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.addEventListener('mouseup', handleSelectionChange);
      canvas.addEventListener('keyup', handleSelectionChange);

      // Cleanup: Remove event listeners when the component unmounts
      return () => {
        canvas.removeEventListener('mouseup', handleSelectionChange);
        canvas.removeEventListener('keyup', handleSelectionChange);
      };
    }
  }, []);

  // JSX structure for the Canvas component
  return (
    <div className='canvas' ref={canvasRef}>
      <div className='text-editing-buttons'>
        {/* Button to apply bold style */}
        <button onClick={handleBoldClick}>Bold</button>

        {/* Buttons to change text color */}
        <button onClick={() => handleColorChange('red')}>Red Color</button>
        <button onClick={() => handleColorChange('blue')}>Blue Color</button>
      </div>

      {/* Editable div for text content */}
      <div className='note-edit' contentEditable>
        {/* Text content goes here */}
      </div>
    </div>
  );
}

export default Canvas;
