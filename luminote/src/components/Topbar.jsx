import React from 'react';
import { Link } from 'react-router-dom';
import {
    IconoirProvider, Bell, MoreHoriz, Enlarge
} from 'iconoir-react';
function Topbar () {
    return (
        <div className='topbar'>
            <div className='topbar-header'>
                <div className='topbar-left'>
                    <button className='text-button selected'>Home</button>
                    <button className='text-button'>Insert</button>
                    <button className='text-button'>Draw</button>
                    <button className='text-button'>View</button>
                </div>
                <div className='topbar-right'>
                    <IconoirProvider
                        iconProps={{
                            strokeWidth: 2,
                            width: '1.3rem',
                            height: '1.3rem',
                        }}
                    >
                        <Bell />
                        <Enlarge />
                        <MoreHoriz />
                    </IconoirProvider>
                </div>
            </div>
            <div className='topbar-content'>
                        
            </div>
            
        </div>);
}

export default Topbar;