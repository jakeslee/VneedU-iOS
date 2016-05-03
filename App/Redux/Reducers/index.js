import {
    combineReducers
} from 'redux';

import app from './app';
import currentUser from './currentUser';

export default combineReducers({
    app,
    currentUser,
});
