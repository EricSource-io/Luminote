import React, { useRef, useState, useEffect } from 'react';
import TextArea from './TextArea.jsx';

function Canvas() {
  const canvasRef = useRef(null);
  const [textAreas, setTextAreas] = useState([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleDoubleClick = (event) => {
      const clickX = event.clientX - canvasRef.current.offsetLeft;
      const clickY = event.clientY - canvasRef.current.offsetTop;

      // Check if the click is inside an existing TextArea
      const isInsideExistingTextArea = textAreas.some(
        (area) =>
          clickX >= area.x &&
          clickX <= area.x + area.width &&
          clickY >= area.y &&
          clickY <= area.y + area.height
      );

      if (!isInsideExistingTextArea) {
        // Create a new TextArea at the click position
        const newTextArea = {
            left: clickX,
            top: clickY,
            width: 150, 
          };

        setTextAreas((prevTextAreas) => [...prevTextAreas, newTextArea]);
      }
    };

    // Attach the double-click event listener to the canvas
    const canvasElement = canvasRef.current;
    canvasElement.addEventListener('dblclick', handleDoubleClick);

    // Cleanup the event listener when the component is unmounted
    return () => {
      canvasElement.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [textAreas]);

  return (
    <div className='canvas' ref={canvasRef}>
      {textAreas.map((area, index) => (
        <TextArea key={index} initialArea={area} />
      ))}
    </div>
  );
}

export default Canvas;
