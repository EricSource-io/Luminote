import React from 'react';
import { Link } from 'react-router-dom';

function Topbar () {
    return (
        <div className='topbar'>
            <button class='text-button'>Home</button>
            <button class='text-button'>Insert</button>
            <button class='text-button'>Draw</button>
            <button class='text-button'>View</button>
        </div>);
}

export default Topbar;