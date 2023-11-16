import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Initial state here
};

const tempSlice = createSlice({
    name: 'temp',
    initialState,
    reducers: {
        // Define actions and state modifications here
        // For example:
        setExampleData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setTempData } = tempSlice.actions;
export default tempSlice.reducer;