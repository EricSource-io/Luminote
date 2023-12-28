import React, { useState } from 'react';
import { Editor, EditorState, RichUtils} from 'draft-js';

// EditorTest component
function EditorTest () {
    // State for managing the editor content
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    
    // Function to handle changes in the editor content
    const onChange = (newState) => {
        setEditorState(newState);
    }

    // Function to handle key commands (e.g., Ctrl + B for bold)
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    
    // Function to toggle inline styles (e.g., bold, italic)
    const handleToggleStyle = (style) => {
        onChange(RichUtils.toggleInlineStyle(editorState, style));
    };
    
    // StyleButton component for rendering style toggle buttons
    const StyleButton = ({ label, style }) => (
        <button onMouseDown={(e) => {
            e.preventDefault();
            handleToggleStyle(style);
        }}>{label}</button>
    );
    
    // Render the EditorTest component
    return (
        <div>
            <StyleButton label="Bold" style="BOLD" />
            <StyleButton label="Italic" style="ITALIC" />
            <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={onChange} />

        </div>);
}

export default EditorTest;
