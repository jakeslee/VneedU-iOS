import {
    combineReducers
} from 'redux';

import app from './app';
import currentUser from './currentUser';
import requirement from './requirement';
import comments from './comments';
import orders from './orders';

export default combineReducers({
    app,
    currentUser,
    requirement,
    comments,
    orders,
});
