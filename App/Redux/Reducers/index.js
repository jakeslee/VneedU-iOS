import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { filter } from '../../Common/Base';
import Types from '../../Constants/ActionTypes';
import app from './app';
import currentUser from './currentUser';
import requirement from './requirement';
import comments from './comments';
import orders from './orders';
import user from './user';

export default reduceReducers(
    combineReducers({
        app,
        currentUser,
        requirement,
        comments,
        orders,
        user,
    }),
    (state, action)=> {
        switch(action.type) {
            case Types.GLOBAL_SET_STATE:
                let {app, currentUser, comments, requirement, orders, user} = action.state;
                
                let requirements = {};
                for (let prop in requirement) {
                    requirements[prop] = filter(requirement[prop], ['isFetching', 'isLoadingTail']);
                }
                
                return {
                    app: {
                        ...state.currentUser,
                        ...filter(app, ['scene']),
                    },
                    currentUser: {
                        ...state.currentUser,
                        ...filter(currentUser),
                    },
                    orders: typeof orders.items === 'undefined' ? state.orders : {
                        ...state.orders,
                        items: orders.items,
                        dataSource: state.orders.dataSource.cloneWithRows(orders.items),
                    },
                    requirement: typeof requirement.items === 'undefined' ? state.requirement : {
                        ...state.requirement,
                        ...requirements,
                    },
                };
            default:
                return state;
        }
    }
);
