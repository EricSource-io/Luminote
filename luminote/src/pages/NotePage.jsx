import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout.jsx';
import Canvas from '../components/Canvas.jsx';
import '../styles/notePage.css';

import { getNoteById } from '../utils/database.js';

function NotePage () {
    const { notebookId, noteId } = useParams();
    const note = getNoteById(notebookId, noteId);
 
    return (
        <Layout>
            <div className='note-page'>
                <input className='text-input' id='note-title' value={note.title} />
                <Canvas />
            </div>
        </Layout>
    );
}

export default NotePage;