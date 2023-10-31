import React from 'react';
import '../styles/notePage.css';

function NotePage () {
    return (
        <div className='notePage'>
            <input className='textInput' id='noteTitle' defaultValue={'Note'}/>
        </div>
        );
}

export default NotePage;