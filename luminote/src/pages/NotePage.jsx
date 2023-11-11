import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout.jsx';
import Canvas from '../components/Canvas.jsx';
import '../styles/notePage.css';

function NotePage () {
    const { notebookId, noteId } = useParams();

    return (
        <Layout>
            <div className='note-page'>
                <input className='text-input' id='note-title' value={noteId} />
                <Canvas />
            </div>
        </Layout>
    );
}

export default NotePage;