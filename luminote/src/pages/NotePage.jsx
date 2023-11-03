import React from 'react';
import '../styles/notePage.css';
import Canvas from '../components/Canvas.jsx';

function NotePage () {
    return (
        <div className='note-page'>
            <input className='text-input' id='note-title' defaultValue={'Note'}/>
            <Canvas/>
        </div>
        );
}

export default NotePage;