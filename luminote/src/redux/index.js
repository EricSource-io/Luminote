import { combineReducers } from 'redux';
import tempReducer from './reducers/tempReducer';
import textStylesReducer from './reducers/textStylesReducers';

const rootReducer = combineReducers({
    temp: tempReducer,
    textStyles: textStylesReducer
});

export default rootReducer;
