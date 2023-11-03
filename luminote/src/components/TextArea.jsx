import React, { useRef } from 'react';

const ResizableTextarea = () => {
  const resizableTextareaRef = useRef(null);
  const minTextareaWidth = 100;

  const handleMouseDown = (e) => {
    const initialMouseX = e.clientX;
    const initialWidth = resizableTextareaRef.current.clientWidth;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - initialMouseX;
      const newWidth = initialWidth + deltaX;

      if (newWidth >= minTextareaWidth) {
        resizableTextareaRef.current.style.width = newWidth + 'px';
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='textarea' >
      <div className='resize-handle' onMouseDown={handleMouseDown}/>
      <div className='textarea-input' ref={resizableTextareaRef} contentEditable/>
    </div>
  );
};

export default ResizableTextarea;
