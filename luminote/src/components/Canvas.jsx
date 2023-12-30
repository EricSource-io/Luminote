import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyTextStyle, toggleTextStyle } from '../redux/reducers/textStylesReducers';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

function Canvas () {

  const canvasRef = useRef(null);
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const textStyles = useSelector((state) => state.textStyles);

  // State for managing the editor content
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const updateTextStyles = (newState) => {
    // Dispatch the action to update the Redux store
    const currentStyle = newState.getCurrentInlineStyle();
    Object.keys(textStyles.styles).forEach((style) => {
      const isActive = currentStyle.has(style.toUpperCase());
      dispatch(toggleTextStyle({ style, value: isActive }));
    });
  };

  // Function to handle changes in the editor content
  const onChange = (newState) => {
    setEditorState(newState);
    updateTextStyles(newState);
  };

  // Function to handle key commands (e.g., Ctrl + B for bold)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      dispatch(toggleTextStyle({ style: command, value: !textStyles.styles[command] }));
      dispatch(applyTextStyle());
      return 'handled';
    }
    return 'not-handled';
  };



  useEffect(() => {
    // Apply text style
    const style = textStyles.lastUpdated;
    if (style) onChange(RichUtils.toggleInlineStyle(editorState, style));
  }, [textStyles.applyLastStyle]);

  return (
    <div className='canvas' ref={canvasRef} >
      <Editor
        ref={editorRef}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
      />
    </div>
  );
}

export default Canvas;
