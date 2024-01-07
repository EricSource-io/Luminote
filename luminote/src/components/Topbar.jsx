import React, { useState, useEffect } from 'react';
import {
    IconoirProvider, Bell, MoreHoriz, Enlarge, PasteClipboard, Bold, Italic, Underline, Edit, EditPencil, Text, NavArrowDown
} from 'iconoir-react';
import FontSelector from './FontSelector';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFontStyle, applyFontStyle, applyFontColor } from '../redux/reducers/fontStylesReducers';
import "../styles/topbar.css";

const COLORS = [
    "#ffffff", "#f9f9f9", "#f2f2f2", "#e5e5e5", "#d9d9d9",
    "#cccccc", "#bfbfbf", "#b3b3b3", "#a6a6a6", "#999999",
    "#8c8c8c", "#808080", "#737373", "#666666", "#595959",
    "#4d4d4d", "#404040", "#333333", "#262626", "#1a1a1a",
    "#0d0d0d", "#000000", "#ffebcd", "#ffdab9", "#ffc0cb",
    "#ffa07a", "#ff8c00", "#ff7f50", "#ff6347", "#ff4500",
    "#ff0000", "#dc143c", "#b22222", "#8b0000", "#800000",
    "#8b4513", "#a52a2a", "#d2691e", "#cd853f", "#a0522d"
];

function Topbar () {

    // Redux
    const dispatch = useDispatch();
    const fontStylesState = useSelector((state) => state.fontStyles);

    // States
    const [boldActive, setBoldActive] = useState(false);
    const [italicActive, setItalicActive] = useState(false);
    const [underlineActive, setUnderlineActive] = useState(false);
    const [fontColor, setFontColor] = useState('#000000');

    // State to track the active tab
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        // Update button states when textStyles.styles change
        setBoldActive(fontStylesState.styles.bold);
        setItalicActive(fontStylesState.styles.italic);
        setUnderlineActive(fontStylesState.styles.underline);
        setFontColor(fontStylesState.fontColor);
    }, [fontStylesState.styles]);

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
                        // Apply Color to ...
                        // Toggle the visibility of the color picker dialog
                        setShowColorPicker(false);
                    }

                    const openColorDialog = (e) => {
                        e.preventDefault();
                        // Toggle the visibility of the color picker dialog
                        setShowColorPicker(!showColorPicker);
                    }

                    const ColorPickerDialog = () => {
                        const Color = ({ color }) => {
                            const onClick = (e) => {
                                e.preventDefault();
                                setFontColor(color);
                                dispatch(applyFontColor({ color }));
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
                                        <Color color='darkred' />
                                        <Color color='red' />
                                        <Color color='orange' />
                                        <Color color='yellow' />
                                        <Color color='lightgreen' />
                                        <Color color='green' />
                                        <Color color='lightblue' />
                                        <Color color='blue' />
                                        <Color color='darkblue' />
                                        <Color color='darkviolet' />
                                    </div>
                                </div>
                                <div className='standard-colors'>
                                    <p>Standard Colors</p>
                                    <div className='color-container'>
                                        {COLORS.map((color, index) => (
                                            <Color key={index} color={color} />
                                        ))}
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
                                    <FontColorButton colorState={fontColor} />
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