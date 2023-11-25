import React from 'react';
import { Link } from 'react-router-dom';
import {
    IconoirProvider, Bell, MoreHoriz, Enlarge, PasteClipboard, Bold, Italic, Underline
} from 'iconoir-react';
function Topbar () {
    const HomeContent = (<>
        <PasteClipboard />
        <div className='font-settings'>
            <div className='input-section'>
                <input className='font-name' value={'Calibri'} />
                <input className='font-size' value={'14'} />
            </div>
            <div className='action-section'>
                <IconoirProvider
                    iconProps={{
                        strokeWidth: 1.5,
                        width: '1.5rem',
                        height: '1.5rem',
                    }}
                >
                    <button className='icon-button'> <Bold strokeWidth={2}/></button>
                    <button className='icon-button'> <Italic /></button>
                    <button className='icon-button'> <Underline /></button>
                </IconoirProvider>
            </div>
        </div>

    </>)
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
                {HomeContent}
            </div>

        </div>);
}

export default Topbar;