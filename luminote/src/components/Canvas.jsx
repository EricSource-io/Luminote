import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyTextStyle } from '../utils/textEditingUtils';

function Canvas () {
  const canvasRef = useRef(null);

  const dispatch = useDispatch();
  const textStyles = useSelector((state) => state.textStyles);


  useEffect(() => {
    applyTextStyle('bold'); // Does not work as it should...
  }, [textStyles]);


  return (
    <div className='canvas' ref={canvasRef}>
      <div className='note-edit' contentEditable>
        {/* Text content goes here */}
      </div>
    </div>
  );
}

export default Canvas;
