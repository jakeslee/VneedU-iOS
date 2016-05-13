import {ListView} from "react-native";
import Types from '../../Constants/ActionTypes';

var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});

let initialState = {
    isFetching: false,
    content: {},
    requirements: {
        isFetching: false,
        items: [],
        dataSource: dataSource.cloneWithRows([]),
    },
    judgements: {
        isFetching: false,
        isPosting: false,
        items: [],
        dataSource: dataSource.cloneWithRows([]),
    },
}

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        case Types.REQUEST_OTHER_USER:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case Types.RECV_OTHER_USER: 
            return {
                ...state,
                isFetching: false,
                content: action.content,
            }
        case Types.REQUEST_USER_REQ:
            return {
                ...state,
                requirements: Object.assign({}, state.requirements, {
                    isFetching: action.isFetching,
                })
            }
        case Types.RECV_USER_REQ:
            return {
                ...state,
                requirements: Object.assign({}, state.requirements, {
                    isFetching: false,
                    items: action.items,
                    dataSource: state.requirements.dataSource.cloneWithRows(action.items),
                })
            }
        case Types.REQUEST_USER_JUDGE:
            return {
                ...state,
                judgements: Object.assign({}, state.judgements, {
                    isFetching: action.isFetching,
                })
            }
        case Types.RECV_USER_JUDGE:
            return {
                ...state,
                judgements: Object.assign({}, state.judgements, {
                    isFetching: false,
                    items: action.items,
                    dataSource: state.judgements.dataSource.cloneWithRows(action.items),
                })
            }
        case Types.REQUEST_POST_JUDGEMENT:
            return {
                ...state,
                judgements: Object.assign({}, state.judgements, {
                    isPosting: action.isPosting,
                })
            }
        default: 
            return state;
    }
}
