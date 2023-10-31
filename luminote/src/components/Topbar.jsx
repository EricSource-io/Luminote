import React from 'react';
import { Link } from 'react-router-dom';

function Topbar () {
    return (
        <div className='topbar'>
            <input type='button' value='Home' className='text-button' />
            <input type='button' value='Insert' className='text-button' />
            <input type='button' value='Draw' className='text-button' />
            <input type='button' value='View' className='text-button' />
        </div>);
}

export default Topbar;