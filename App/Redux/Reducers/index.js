import {
    combineReducers
} from 'redux';

import app from './app';
import currentUser from './currentUser';

console.log(app, currentUser)

export default combineReducers({
    app,
    currentUser,
});
