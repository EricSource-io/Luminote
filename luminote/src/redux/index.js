import { combineReducers } from 'redux';
import tempReducer from './tempReducer';

const rootReducer = combineReducers({
    temp: tempReducer,
});

export default rootReducer;
