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

  // Set initial editor content from HTML
  useEffect(() => {
    const html = '<p>Test <strong>&nbsp;123 Test </strong><em>Hello </em><u><strong>HoHo</strong></u></p>';
    const contentState = stateFromHTML(html);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  useEffect(() => {
    // Apply font color
    const color = fontStylesState.fontColor | '#00000';
    // finish this shit... :P 
  }, [fontStylesState.fontColor]);


  const test = (e) => {

    // To apply the font color to all subsequent text typed 
    // collasped selection

    e.preventDefault();
    const color = '#03ff2';

    const selectionState = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();

    // todo: remove old inline color

    const contentWithColor = Modifier.applyInlineStyle(editorState, currentContent, color);

    const newEditorState = EditorState.push(editorState, contentWithColor,'change-inline-style');
    setEditorState(newEditorState);

  };

  return (
    <div className='canvas' ref={canvasRef} >
      <button onMouseDown={test}>toggleColorTest</button>
      <Editor
        ref={editorRef}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default Canvas;
