import {
    combineReducers
} from 'redux';

import app from './app';
import currentUser from './currentUser';
import requirement from './requirement';
import comments from './comments';

export default combineReducers({
    app,
    currentUser,
    requirement,
    comments,
});
