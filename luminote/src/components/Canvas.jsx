import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyTextStyle } from '../utils/textEditingUtils';
import { toggleTextStyle } from '../redux/reducers/textStylesReducers';
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

  // Function to handle changes in the editor content
  const onChange = (newState) => {
    setEditorState(newState);
  };

  // Function to handle key commands (e.g., Ctrl + B for bold)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      // !!! Remove when 'determineTextStyle' is implementet
      dispatch(toggleTextStyle({ style: command, value: !textStyles[command] }));
      return 'handled';
    }
    return 'not-handled';
  };

  const determineTextStyle = () => {
    
    // Creates a endless loop :C 

    const currentStyle = editorState.getCurrentInlineStyle();
    Object.keys(textStyles).forEach((style) => {
      if (style == 'lastStyleUpdated') return;
      const isStyleActive = currentStyle.has(style);
      if (textStyles[style] !== isStyleActive) {
        dispatch(toggleTextStyle({ style, value: isStyleActive }));
      } 
    });

  }


  useEffect(() => {
   // determineTextStyle();
  }, [editorState]);

  useEffect(() => {
    const applyStyles = () => {
      const style = textStyles['lastUpdatedStyle'];
      if (style) onChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    // Call the applyStyles function when textStyles change
    applyStyles();
  }, [textStyles]);

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
