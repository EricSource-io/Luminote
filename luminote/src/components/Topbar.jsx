import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IconoirProvider, Bell, MoreHoriz, Enlarge, PasteClipboard, Bold, Italic, Underline, Edit, EditPencil
} from 'iconoir-react';
import FontSelector from './FontSelector';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTextStyle } from '../redux/reducers/textStylesReducers';

function Topbar () {

    const dispatch = useDispatch();
    const textStyles = useSelector((state) => state.textStyles);

    // State to track the active tab
    const [activeTab, setActiveTab] = useState('home');

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleTextStyleToggle = (style) => {
        const newTextStyleValue = !textStyles[style];
        dispatch(toggleTextStyle({ style, value: newTextStyleValue }));
    };

    // Function to render content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                const StyleButton = ({ icon, style }) => {
                    return (
                        <button className={`icon-button ${textStyles[style] ? 'active' : ''}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleTextStyleToggle(style)
                            }}>
                            {icon}
                        </button>
                    );
                };
                return (
                    <>
                        <PasteClipboard />
                        <div className='font-settings'>
                            <div className='input-section'>
                                <FontSelector />
                                <input className='font-size' value={'14'} onMouseDown={(e) => {
                                    /*.canvas>Editor selected text should stay selected when clicking the font-size input*/}} />
                            </div>
                            <div className='action-section'>
                                <IconoirProvider
                                    iconProps={{
                                        strokeWidth: 1.5,
                                        width: '1.5rem',
                                        height: '1.5rem',
                                    }}
                                >
                                    <StyleButton icon={<Bold strokeWidth={2} />}style='bold'/>
                                    <StyleButton icon={<Italic />} style='italic'/>
                                    <StyleButton icon={<Underline />} style='underline'/>
                                    
                                    <button className='icon-button'>
                                        <EditPencil /> color
                                    </button>
                                </IconoirProvider>
                            </div>
                        </div>
                    </>
                );
            case 'insert':
                return (
                    <></>
                );
            case 'draw':
                return (
                    <>
                        <button className=''>Pen</button>
                    </>

                );
            case 'view':
                return (
                    <></>
                );
            default:
                return null;
        }
    };

    return (
        <div className='topbar'>
            {/* Topbar header */}
            <div className='topbar-header'>
                <div className='topbar-left'>
                    {/* Navigation buttons */}
                    <button className={`text-button ${activeTab === 'home' ? 'selected' : ''}`} onClick={() => handleTabChange('home')}>
                        Home
                    </button>
                    <button className={`text-button ${activeTab === 'insert' ? 'selected' : ''}`} onClick={() => handleTabChange('insert')}>
                        Insert
                    </button>
                    <button className={`text-button ${activeTab === 'draw' ? 'selected' : ''}`} onClick={() => handleTabChange('draw')}>
                        Draw
                    </button>
                    <button className={`text-button ${activeTab === 'view' ? 'selected' : ''}`} onClick={() => handleTabChange('view')}>
                        View
                    </button>
                </div>
                <div className='topbar-right'>
                    {/* Icon buttons on the right */}
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
            {/* Topbar content */}
            <div className='topbar-content'>
                <div className='topbar-content'>{renderContent()}</div>
            </div>

        </div>);
}

export default Topbar;