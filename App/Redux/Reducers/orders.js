import {ListView} from "react-native";
import Types from '../../Constants/ActionTypes';

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});

let initialState = {
    isPosting: false,
    isFetching: true,
    isLoadingTail: false,
    detail: {
        isFetching: false,
        content: {},
    },
    page: 1,
    max_pages: 1,
    items: [],
    dataSource: dataSource.cloneWithRows([]),
}

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case Types.REQUEST_ORDERS:
            return {
                ...state,
                isFetching: action.value,
            }
        case Types.REQUEST_ORDERS_APPEND:
            return {
                ...state,
                isLoadingTail: action.value,
            }
        case Types.RECV_ORDERS:
            return load_orders(state, action)
        case Types.RECV_ORDERS_APPEND:
            return load_orders(state, action, true);
        case Types.REQUEST_ORDER_DETAIL:
            return {
                ...state,
                detail: Object.assign({}, state.detail, {
                    isFetching: action.isFetching,
                })
            }
        case Types.RECV_ORDER_DETAIL:
            return {
                ...state,
                detail: Object.assign({}, state.detail, {
                    isFetching: false,
                    content: action.content,
                })
            }
        case Types.REQUEST_ORDER_ADD:
            return {
                ...state,
                isPosting: action.isPosting,
            }
        case Types.CLR_ORDER_DETAIL:
            return {
                ...state,
                detail: Object.assign({}, initialState.detail)
            }
        default:
            return state;
    }
}

function load_orders(state, action, append = false) {
    var items = [];
    
    if (append) {
        items = [
            ...state.items,
            action.items,
        ];
    } else {
        items = [...action.items];
    }
    
    return {
        ...state,
        isFetching: false,
        isLoadingTail: false,
        page: action.page,
        max_pages: action.max_pages,
        items: items,
        dataSource: dataSource.cloneWithRows(items),
    }
}
