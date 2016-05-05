import {
    combineReducers
} from 'redux';

import app from './app';
import currentUser from './currentUser';
import requirement from './requirement';

export default combineReducers({
    app,
    currentUser,
    requirement,
});
