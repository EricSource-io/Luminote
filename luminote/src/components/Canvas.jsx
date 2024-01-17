import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { applyFontStyle, toggleFontStyle } from '../redux/reducers/fontStylesReducers';


function Canvas () {
  // Refs
  const canvasRef = useRef(null);
  const editorRef = useRef(null);

  // Redux
  const dispatch = useDispatch();
  const fontStylesState = useSelector((state) => state.fontStyles);

  // Local state for managing the editor content
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // Function to update font styles in the Redux store
  const updateFontStylesInStore = (newEditorState) => {
    const currentStyle = newEditorState.getCurrentInlineStyle();
    Object.keys(fontStylesState.styles).forEach((style) => {
      const isActive = currentStyle.has(style.toUpperCase());
      dispatch(toggleFontStyle({ style, value: isActive }));
    });
  };

  // Function to handle changes in the editor content
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    updateFontStylesInStore(newEditorState);
  };

  // Function to handle key commands (e.g., Ctrl + B for bold)
  const handleKeyCommand = (command) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      dispatch(toggleFontStyle({ style: command, value: !fontStylesState.styles[command] }));
      dispatch(applyFontStyle());
      return 'handled';
    }
    return 'not-handled';
  };

  // Apply font style
  useEffect(() => {
    const styleToUpdate = fontStylesState.lastUpdated;
    if (styleToUpdate) handleEditorChange(RichUtils.toggleInlineStyle(editorState, styleToUpdate));
  }, [fontStylesState.applyLastStyle]);

  const HIGHLIGHT = 'HIGHLIGHT';
  const [styleMap, setStyleMap] = useState({
    [HIGHLIGHT]: { color: '#03ff22' },
  });

  useEffect(() => {
    // Apply font color
    const color = fontStylesState.fontColor;

    setStyleMap({
      ...styleMap,
      [HIGHLIGHT]: { color: color },
    });

    const newState = RichUtils.toggleInlineStyle(editorState, HIGHLIGHT);
    setEditorState(newState);
  }, [fontStylesState.fontColor]);



  // Set initial editor content from HTML
  useEffect(() => {
    const html = '<p>Test <strong>&nbsp;123 Test </strong><em>Hello </em><u><strong>HoHo</strong></u></p>';
    const contentState = stateFromHTML(html);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);


 

  return (
    <div className='canvas' ref={canvasRef} >
      <Editor
        ref={editorRef}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={handleEditorChange}
        customStyleMap={styleMap}
      />
    </div>
  );
}

export default Canvas;
