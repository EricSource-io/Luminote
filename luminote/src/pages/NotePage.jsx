import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout.jsx';
import Canvas from '../components/Canvas.jsx';
import '../styles/notePage.css';

import { getNoteById } from '../utils/database.js';

function NotePage () {
    // Destructuring the parameters from the URL
    const { notebookId, noteId } = useParams();

    // State  variables to manage the note data and loading status
    const [note, setNote] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Effect hook to fetch note data when the component mounts
    useEffect(() => {
        // Function to fetch and update note data
        const fetchData = () => {
            // Calling the getNoteById function from the database utility
            const noteData = getNoteById(notebookId, noteId);
            // Updating the state with the fetched note data and setting loading accordingly
            setNote(noteData);
            setIsLoaded(noteData != null);
        };

        // Checking of noteId is available before fetching data
        if (noteId) {
            fetchData();
        }
    }, [notebookId, noteId]);


    // If note is not loaded
    if (!isLoaded) {
        return (
            <Layout>
                <div className='note-page'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', fontSize: '18px', textAlign: 'center' }}>
                        <h3>Silence is golden, but notes are like the confetti of thoughts.<br />
                        Go ahead, break the silence, and let the note-taking fiesta begin!</h3>
                        <br/>
                        <br/>
                        <button >Create a Note!</button>
                    </div>
                    
                </div>
            </Layout>
        );
    }

    // If note is loaded
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