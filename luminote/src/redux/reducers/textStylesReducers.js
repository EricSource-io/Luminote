import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    styles: {
        bold: false,
        italic: false,
        underline: false,
    },
    
    lastUpdated: null,
    applyLastStyle: null
};

const textStylesSlice = createSlice({
    name: 'textStyles',
    initialState,
    reducers: {
        toggleTextStyle: (state, action) => {
            const {style, value} = action.payload;
            state.styles[style] = value;
            state.lastUpdated = style?.toUpperCase();
        },
        applyTextStyle: (state) => {
            state.applyLastStyle = Date.now();
        }
    },
});

export const { toggleTextStyle, applyTextStyle } = textStylesSlice.actions;
export default textStylesSlice.reducer;