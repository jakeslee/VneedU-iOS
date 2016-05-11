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
        items: [],
        dataSource: dataSource.cloneWithRows([]),
    },
}

export default function reducer(state = initialState, action = {}) {
    switch(action.type) {
        
        default: 
            return state;
    }
}
