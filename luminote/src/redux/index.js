import { combineReducers } from 'redux';
import tempReducer from './reducers/tempReducer';
import fontStylesReducer from './reducers/fontStylesReducers';

const rootReducer = combineReducers({
    temp: tempReducer,
    fontStyles: fontStylesReducer
});

export default rootReducer;
