import { createSlice } from '@reduxjs/toolkit';

const defaultFontStyle = {
    isBold: false,
    isItalic: false,
    isUnderline: false,
};

const initialState_1 = {
    fontStyles: {...defaultFontStyle},
    fontColor: '#000000',
    lastUpdated: null, 
    applyLastStyle: null 
}

const initialState = {
    styles: {
        bold: false,
        italic: false,
        underline: false,
    },
    fontColor: '#000000',
    lastUpdated: null, // (BOLD, ITALIC, ...)
    applyLastStyle: null // DATETIME
};

const fontStylesSlice = createSlice({
    name: 'fontStyles',
    initialState,
    reducers: {
        toggleFontStyle: (state, action) => {
            const {style, value} = action.payload;
            state.styles[style] = value;
            state.lastUpdated = style?.toUpperCase();
        },
        applyFontStyle: (state) => {
            state.applyLastStyle = Date.now();
        },
        setFontColor: () =>{

        },
        applyFontColor: (state, action) => {
            console.log('test');
            const {color} = action.payload;
            state.fontColor = color || '#000000';
        },
    },
});

export const { toggleFontStyle, applyFontStyle, applyFontColor } = fontStylesSlice.actions;
export default fontStylesSlice.reducer;