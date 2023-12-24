import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bold: false,
    italic: false,
    underline: false,
};

const textStylesSlice = createSlice({
    name: 'textStyles',
    initialState,
    reducers: {
        toggleTextStyle: (state, action) => {
            const {style, value} = action.payload;
            state[style] = value;
        },
    },
});

export const { toggleTextStyle } = textStylesSlice.actions;
export default textStylesSlice.reducer;