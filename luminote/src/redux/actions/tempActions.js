import { setTempData } from '../reducers/tempReducer';

export const updateTempData = (data) => {
    return (dispatch) => {
        dispatch(setTempData(data));
    };
};
