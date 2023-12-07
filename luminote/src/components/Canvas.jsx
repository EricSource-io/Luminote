import React, { useRef, useEffect, useState } from 'react';

function Canvas () {
  const canvasRef = useRef(null);



  const applyStyle = (styleClasses) => {
    //https://stackforgeeks.com/blog/execcommand-is-now-obsolete-whats-the-alternative
  };

  return (
    <div className='canvas' ref={canvasRef}>
      <div className='text-editing-buttons'>
        { /* <button onClick={() => applyStyle('bold')}>Bold</button>
        <button onClick={() => applyStyle('color-red')}>Red Color</button>
  <button onClick={() => applyStyle('color-blue')}>Blue Color</button>*/}
      </div>
      <div className='note-edit' contentEditable>
        {/* Text content goes here */}
      </div>
    </div>
  );
}

export default Canvas;
