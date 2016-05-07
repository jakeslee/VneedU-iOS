import React, {
    ListView,
} from 'react-native';
import Types from '../../Constants/ActionTypes';

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
let requirementInitial = {
    isFetching: false,
    page: 1,
    items: [],
    dataSource: dataSource.cloneWithRows([]),
};
let initialState = {isPosting: false,};
['latest', 'build', 'edu', 'driving', 'buying', 'buying', 'medicine', 'gift', 'working', 'part-time']
.forEach((key)=> initialState[key] = Object.assign({}, requirementInitial));

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case Types.REQUEST_REQUIREMENT:
            return {
                ...state,
                [action.category]: Object.assign({}, state[action.category], {
                    isFetching: true,
                })
            }
        case Types.REQUEST_REQ_ADDING:
            return {
                ...state,
                isPosting: action.isPosting,
            }
        case Types.LOAD_REQUIREMENT:
            return {
                ...state,
                [action.category]: load_requiremt(state[action.category], action),
            }
        case Types.INSERT_REQUIRMENT:
            var items = (state[action.category].items || []).slice();
            items.unshift(action.item);
            return {
                ...state,
                [action.category]: {
                    ...state[action.category],
                    items: items,
                    dataSource: (state[action.category].dataSource || dataSource).cloneWithRows(items),
                }
            }
        default:
            return state;
    }
}

function load_requiremt(state, action) {
    return {
        isFetching: false,
        page: action.page,
        items: [
            action.items,
            ...state.items,
        ],
        dataSource: dataSource.cloneWithRows(action.items),
    }
}
