import React, { useRef, useState, useEffect } from 'react';


function Canvas () {
  const canvasRef = useRef(null);

  return (
    <div className='canvas' ref={canvasRef}>

    </div>
  );
}

export default Canvas;
