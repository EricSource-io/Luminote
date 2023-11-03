import React, { useRef, useState, useEffect } from 'react';
import TextArea from './TextArea.jsx';

function Canvas () {

    const [inputText, setInputText] = useState('');


    return (
        <div className='canvas'>
            <TextArea/>
        </div>
    );
}

export default Canvas;
