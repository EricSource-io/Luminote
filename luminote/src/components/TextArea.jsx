import React, { useRef, useState } from 'react';

const ResizableTextarea = () => {
  const resizableTextareaRef = useRef(null);
  const minTextareaWidth = 100;
  const [isHovered, setIsHovered] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [copiedStyle, setCopiedStyle] = useState({});

  const handleMouseDown = (e, action) => {
    e.preventDefault(); // Prevents text selection during drag
    setIsHovered(true);

    // Blur the textarea to lose focus
    resizableTextareaRef.current.querySelector('.textarea-input').blur();

    if (action === 'drag') {

      const initialMouseX = e.clientX;
      const initialMouseY = e.clientY;

      setDragOffset({
        x: initialMouseX - resizableTextareaRef.current.getBoundingClientRect().left,
        y: initialMouseY - resizableTextareaRef.current.getBoundingClientRect().top,
      });

      const handleMouseMove = (e) => {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        resizableTextareaRef.current.style.left = `${newX}px`;
        resizableTextareaRef.current.style.top = `${newY}px`;
        resizableTextareaRef.current.style.background = 'lightgray';
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        resizableTextareaRef.current.style.background = 'transparent';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      setIsDragging(true);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else if (action === 'resize') {
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
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      setIsResizing(true);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging && !isResizing) {
      setIsHovered(false);
    }
  };

  const handleFocus = () => {
    setIsWriting(true);
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsWriting(false);
    // If not writing, not hovered, not resizing, and not dragging, set isHovered to false
    if (!isHovered && !isResizing && !isDragging) {
      setIsHovered(false);
    }
  };

  const handleInput = (e) => {

    setCopiedStyle({
      width: resizableTextareaRef.current ? resizableTextareaRef.current.style.width : '0px',
      text: e.target.innerText,
    });

  };

  return (
    <>
      {/* Original ResizableTextarea */}
      <div
        className={`textarea ${isHovered || isWriting ? 'active' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={resizableTextareaRef}
      >
        <div
          className={`drag-handle ${isDragging ? 'gray' : ''}`}
          onMouseDown={(e) => handleMouseDown(e, 'drag')}
        />
        <div className='resize-and-input'>
          <div
            className={`resize-handle ${isDragging ? 'gray' : ''}`}
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
          />
          <div
            className='textarea-input'
            contentEditable
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handleInput}
          />
        </div>
      </div>

      {/* Copy*/}
      {isDragging && (
        <div
          className='textarea gray-copie active'
          style={{
            left: resizableTextareaRef.current ? resizableTextareaRef.current.style.left : '0px',
            top: resizableTextareaRef.current ? resizableTextareaRef.current.style.top : '0px',
            width: copiedStyle.width,
          }}
        >
          <div className='drag-handle' onMouseDown={(e) => handleMouseDown(e, 'drag')} />
          <div className='resize-and-input'>
            <div
              className={`resize-handle ${isDragging ? 'gray' : ''}`}
              onMouseDown={(e) => handleMouseDown(e, 'resize')}
            />
            <div className='textarea-input'>
              {copiedStyle.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResizableTextarea;
