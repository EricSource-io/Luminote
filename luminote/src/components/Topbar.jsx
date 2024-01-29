import React, { useState, useEffect } from 'react';
import {
    IconoirProvider, Bell, MoreHoriz, Enlarge, PasteClipboard, Bold, Italic, Underline, Edit, EditPencil, Text, NavArrowDown
} from 'iconoir-react';
import FontSelector from './FontSelector';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFontStyle, applyFontStyle, applyFontColor, setFontColor } from '../redux/reducers/fontStylesReducers';
import { fontStyleMap, defaultFontColors } from '../utils/fontEditingUtils';
import "../styles/topbar.css";

function Topbar () {

    // Redux
    const dispatch = useDispatch();
    const fontStylesState = useSelector((state) => state.fontStyles);

    // States
    const [boldActive, setBoldActive] = useState(false);
    const [italicActive, setItalicActive] = useState(false);
    const [underlineActive, setUnderlineActive] = useState(false);
    const [fontColorState, setFontColorState] = useState('#000000');

    // State to track the active tab
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        // Update button states when textStyles.styles change
        setBoldActive(fontStylesState.styles.bold);
        setItalicActive(fontStylesState.styles.italic);
        setUnderlineActive(fontStylesState.styles.underline);
    }, [fontStylesState.styles]);

    useEffect(() => {
        setFontColorState(fontStyleMap[fontStylesState.fontColor].color);
    }, [fontStylesState.fontColor]);

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleFontStyleToggle = (style) => {
        const newFontStyleValue = !fontStylesState.styles[style];
        dispatch(toggleFontStyle({ style, value: newFontStyleValue }));
        dispatch(applyFontStyle());
    };

    // Function to render content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'home':

                const StyleButton = ({ icon, style, activeState }) => {
                    return (
                        <button className={`icon-button ${activeState ? 'active' : ''}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleFontStyleToggle(style)
                            }}>
                            {icon}
                        </button>
                    );
                };

                const FontColorButton = ({ colorState }) => {
                    const [showColorPicker, setShowColorPicker] = useState(false);

                    const applyColor = (e) => {
                        e.preventDefault();

                        // Toggle the visibility of the color picker dialog
                        setShowColorPicker(false);
                    }

                    const openColorDialog = (e) => {
                        e.preventDefault();
                        // Toggle the visibility of the color picker dialog
                        setShowColorPicker(!showColorPicker);
                    }

                    const ColorPickerDialog = () => {
                        const Color = ({ colorKey }) => {
                            const color = fontStyleMap[colorKey].color;
                            const onClick = (e) => {
                                e.preventDefault();
                                setFontColorState(color);
                                dispatch(setFontColor({ colorKey }));
                                dispatch(applyFontColor());
                                // Toggle the visibility of the color picker dialog
                                setShowColorPicker(!showColorPicker);
                            }
                            return (<button onMouseDown={onClick} className='color'
                                style={{ backgroundColor: color }} />);
                        };

                        return (
                            <div className='color-picker-dialog'>
                                <div className='header'>
                                    <p>Font Color</p>
                                </div>
                                <div className='theme-colors'>
                                    <p>Theme Colors</p>
                                    <div className='color-container'>
                                        {defaultFontColors.map((key, index) => (
                                            <Color key={index} colorKey={key} />
                                        ))}
                                    </div>
                                </div>
                                <div className='standard-colors'>
                                    <p>Standard Colors</p>
                                    <div className='color-container'>

                                    </div>
                                </div>
                                <div className='more-colors'>
                                    More Colors (Color Picker)
                                </div>
                            </div>);
                    };

                    return (
                        <div>
                            <div className='font-color-container'>
                                <div className='font-color-buttons'>
                                    <button className='icon-button' onMouseDown={applyColor}>
                                        <div className='color-preview' style={{ backgroundColor: colorState }} />
                                        <Text />
                                    </button>
                                    <button className='expand-button' onMouseDown={openColorDialog}><NavArrowDown width='1.2rem' /></button>
                                </div>
                            </div>
                            {showColorPicker && <ColorPickerDialog />}
                        </div>
                    );
                };

                return (
                    <>
                        <PasteClipboard />
                        <div className='font-settings'>
                            <div className='input-section'>
                                <FontSelector />
                                <input className='font-size' value={'14'} onMouseDown={(e) => {
                                    /*.canvas>Editor selected text should stay selected when clicking the font-size input*/
                                }} />
                            </div>
                            <div className='action-section'>
                                <IconoirProvider
                                    iconProps={{
                                        strokeWidth: 1.5,
                                        width: '1.5rem',
                                        height: '1.5rem',
                                    }}
                                >
                                    <StyleButton icon={<Bold strokeWidth={2} />} style='bold' activeState={boldActive} />
                                    <StyleButton icon={<Italic />} style='italic' activeState={italicActive} />
                                    <StyleButton icon={<Underline />} style='underline' activeState={underlineActive} />
                                    <FontColorButton colorState={fontColorState} />
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