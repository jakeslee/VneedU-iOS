import React from "react";
import {ListView} from "react-native";
import Types from '../../Constants/ActionTypes';

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
let requirementInitial = {
    isFetching: false,
    isLoadingTail: false,
    page: 1,
    max_pages: 1,
    items: [],
    dataSource: dataSource.cloneWithRows([]),
};
let initialState = {
    isPosting: false,
    requirementDetail: {
        isFetching: false,
        content: {},
        keywords: dataSource.cloneWithRows([]),
        images: dataSource.cloneWithRows([]),
    },
};
['latest', 'build', 'edu', 'driving', 'buying', 'buying', 'medicine', 'gift', 'working', 'part-time']
.forEach((key)=> initialState[key] = Object.assign({}, requirementInitial));

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case Types.REQUEST_REQUIREMENT:
            return {
                ...state,
                [action.category]: Object.assign({}, state[action.category], {
                    isFetching: action.value,
                })
            }
        case Types.REQUEST_REQ_APPEND:
            return {
                ...state,
                [action.category]: Object.assign({}, state[action.category], {
                    isLoadingTail: action.value,
                })
            }
        case Types.REQUEST_REQ_DETAIL:
            return {
                ...state,
                requirementDetail: Object.assign({}, state.requirementDetail, {
                    isFetching: true,
                })
            }
        case Types.REQUEST_REQ_ADDING:
            return {
                ...state,
                isPosting: action.isPosting,
            }
        case Types.RECV_REQ_DETAIL:
            return {
                ...state,
                requirementDetail: Object.assign({}, state.requirementDetail, {
                    isFetching: false,
                    content: action.content,
                    keywords: state.requirementDetail.keywords.cloneWithRows(action.content.keywords),
                    images: state.requirementDetail.images.cloneWithRows(action.content.images),
                })
            }
        case Types.LOAD_REQUIREMENT:
            return {
                ...state,
                [action.category]: load_requiremt(state[action.category], action),
            }
        case Types.LOAD_REQUIREMENT_APPEND:
            return {
                ...state,
                [action.category]: load_requiremt(state[action.category], action, true),
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
        case Types.CLR_REQ_DETAIL:
            return {
                ...state,
                requirementDetail: Object.assign({}, state.requirementDetail, initialState.requirementDetail)
            }
        default:
            return state;
    }
}

function load_requiremt(state, action, append = false) {
    // 若获取到的新数据为空，则只清除拉取状态
    if (action.items.length === 0)
        return Object.assign({}, state, {
            isFetching: false,
            isLoadingTail: false,
        });
    
    var items;
    if (append) {
        items = [
            ...state.items,
            ...action.items,
        ]
    } else {
        items = [
            ...action.items,
        ];
        state.items.forEach((v)=> {
            if (items.indexOf(v) != -1)
                items.push(v);
        })
    }
    
    return Object.assign({}, state, {
        isFetching: false,
        isLoadingTail: false,
        page: action.page,
        items: items,
        dataSource: dataSource.cloneWithRows(items),
    });
}
