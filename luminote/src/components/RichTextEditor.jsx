import React, { useRef, useEffect, useState } from 'react';

export function RichTextEditor ({ initialContent, onContentChange }) {
    const editorRef = useRef();
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        if (editorRef.current) {
            // Set initial content
            editorRef.current.innerHTML = initialContent;
        }
    }, [initialContent]);

    useEffect(() => {
        if (!editorRef.current) {
            return;
        }

        function handleContentChange () {
            const newContent = editorRef.current.innerHTML;
            setContent(newContent);

            if (onContentChange) {
                onContentChange(newContent);
            }
        }

        editorRef.current.addEventListener('input', handleContentChange);

        return () => {
            editorRef.current.removeEventListener('input', handleContentChange);
        };
    }, [onContentChange]);

    return (
        <div
            ref={editorRef}
            contentEditable={true}
            style={{ height: '500px', width: '500px', border: '1px solid #ccc' }}
        />
    );
}
