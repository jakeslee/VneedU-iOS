import React, {
    Component,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';

import NavigatorBar from '../Component/NavigatorBar';

export default class Search extends Component {
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar enableSearchBar={true} searchBarText='请输入需求的关键字或名称' 
                    onSubmit={(text)=> console.log(text)} {...this.props} />
            </View>
        )
    }
}
