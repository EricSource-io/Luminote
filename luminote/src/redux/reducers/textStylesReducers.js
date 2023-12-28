import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bold: false,
    italic: false,
    underline: false,
    lastUpdatedStyle: null,
};

const textStylesSlice = createSlice({
    name: 'textStyles',
    initialState,
    reducers: {
        toggleTextStyle: (state, action) => {
            const {style, value} = action.payload;
            state[style] = value;
            state.lastUpdatedStyle = style.toUpperCase();
        },
    },
});

export const { toggleTextStyle } = textStylesSlice.actions;
export default textStylesSlice.reducer;