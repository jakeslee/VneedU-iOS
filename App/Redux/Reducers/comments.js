import Types from '../../Constants/ActionTypes';
import {ListView} from "react-native";

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
let initialState = {
    isFetching: false,
    isPosting: false,
    page: 1,
    max_pages: 1,
    items: [],
    dataSource: dataSource.cloneWithRows([]),
};

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case Types.REQUEST_REQ_DISCUSSIONS:
            return {
                ...state,
                isFetching: true,
            }
        case Types.RECV_DISCUSSIONS:
            let items = action.data;
            state.items.forEach((v)=> {
                if (items.indexOf(v) != -1)
                    items.push(v);
            })
            return {
                ...state,
                isFetching: false,
                page: action.page,
                max_pages: action.max_pages,
                items: items,
                dataSource: state.dataSource.cloneWithRows(items),
            }
        case Types.REQUEST_POST_DISCUSSION:
            return {
                ...state,
                isPosting: true,
            }
        case Types.CLR_DISCUSSIONS:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
