import React, { useRef, useState, useEffect } from 'react';

const ResizableTextarea = ({initialArea}) => {
  const resizableTextareaRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const minTextareaWidth = 100;
  const [isHovered, setIsHovered] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedStyle, setCopiedStyle] = useState({});

  useEffect(() => {
    const canvasElement = document.querySelector('.canvas');
    if (canvasElement) {
      const { width, height, left, top } = canvasElement.getBoundingClientRect();
      setCanvasDimensions({ width, height, left, top });
    }
    if (initialArea) {
      resizableTextareaRef.current.style.left = `${initialArea.left}px`;
      resizableTextareaRef.current.style.top = `${initialArea.top}px`;
      resizableTextareaRef.current.style.width = `${initialArea.width}px`;

    }
  }, [initialArea]);

  const handleMouseDown = (e, action) => {
    e.preventDefault(); // Prevents text selection during drag
    setIsHovered(true);

    // Blur the textarea to lose focus
    resizableTextareaRef.current.querySelector('.textarea-input').blur();

    if (action === 'drag') {
      const initialMouseX = e.clientX;
      const initialMouseY = e.clientY;

      const canvasOffset = {
        left: canvasDimensions.left || 0,
        top: canvasDimensions.top || 0
      }

      const dragOffset = {
        x: initialMouseX - resizableTextareaRef.current.getBoundingClientRect().left + canvasOffset.left,
        y: initialMouseY - resizableTextareaRef.current.getBoundingClientRect().top + canvasOffset.top
      }

      const handleMouseMove = (e) => {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        // Calculate the maximum allowable position based on the canvas size
        const maxX = canvasDimensions.width - resizableTextareaRef.current.clientWidth;
        const maxY = canvasDimensions.height - resizableTextareaRef.current.clientHeight;


        // Update the position within the canvas boundaries
        const newLeft = Math.min(Math.max(0, newX), maxX);
        const newTop = Math.min(Math.max(0, newY), maxY);

        resizableTextareaRef.current.style.left = `${newLeft}px`;
        resizableTextareaRef.current.style.top = `${newTop}px`;

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

      {/* Copy */}
      {isDragging && (
        <div
          className='textarea gray-copie active'
          style={{
            left: resizableTextareaRef.current ? resizableTextareaRef.current.style.left : '0px',
            top: resizableTextareaRef.current ? resizableTextareaRef.current.style.top : '0px',
            width: resizableTextareaRef.current.style.width,
          }}
        >
          <div className='drag-handle' />
          <div className='resize-and-input'>
            <div
              className='resize-handle'
            />
            <div className='textarea-input' style={{ whiteSpace: 'pre-line' }}>
              {copiedStyle.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResizableTextarea;
