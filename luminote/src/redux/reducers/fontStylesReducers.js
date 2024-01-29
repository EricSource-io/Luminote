import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    styles: {
        bold: false,
        italic: false,
        underline: false,
    },
    fontColor: 'FONT_COLOR_DEFAULT',
    lastColorTimestamp: null, // DATETIME
    lastStyleTimestamp: null, // DATETIME
    lastUpdated: null, // (BOLD, ITALIC, ...)
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
            state.lastStyleTimestamp = Date.now();
        },
        setFontColor: (state, action) => {
            const {colorKey} = action.payload;
            state.fontColor= colorKey || 'FONT_COLOR_DEFAULT';
        },
        applyFontColor: (state) => {
            state.lastColorTimestamp = Date.now();
        },

    },
});

export const { toggleFontStyle, applyFontStyle, applyFontColor, setFontColor } = fontStylesSlice.actions;
export default fontStylesSlice.reducer;