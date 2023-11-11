import React from 'react';
import { Link } from 'react-router-dom';

function Topbar () {
    return (
        <div className='topbar'>
            <button className='text-button'>Home</button>
            <button className='text-button'>Insert</button>
            <button className='text-button'>Draw</button>
            <button className='text-button'>View</button>
        </div>);
}

export default Topbar;