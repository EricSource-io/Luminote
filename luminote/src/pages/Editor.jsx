import React, { useState } from 'react';
import '../styles/editor.css'

// EditorTest component
function EditorTest () {
    const [editorContent, setEditorContent] = useState('');

    const handleContentChange = (newContent) => {
      setEditorContent(newContent);
    };
    
    // Render the EditorTest component
    return (
        <div className='editor'>
           
        </div>);
}

export default EditorTest;
