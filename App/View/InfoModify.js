import React, {
    Component,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import { Base } from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, InputStyles } from '../Common/Styles';
import { modify_user } from '../Redux/Actions/UserAction';

export default class InfoModify extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.currentUser.user;
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar title='信息修改' {...this.props} />
                <View style={{flex: 1}}>
                    <TextInput style={InputStyles.input} onChangeText={(v)=> this.setState({atId: v})}
                        placeholder='用户标识' placeholderTextColor='#4D4D4D' value={this.state.atId}/>
                    <View style={BorderStyles.top}>
                        <TextInput style={InputStyles.input} onChangeText={(v)=> this.setState({name: v})}
                            placeholder='用户昵称' placeholderTextColor='#4D4D4D' value={this.state.name}/>
                    </View>
                    <View style={BorderStyles.top}>
                        <TextInput style={{fontSize: 16, backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, height: 100}}
                            multiline={true} onChangeText={(v)=> this.setState({description: v})}
                            placeholder='用户描述' placeholderTextColor='#4D4D4D' value={this.state.description} onEndEditing={dismissKeyboard}/>
                    </View>
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}
                            onPress={()=> {
                                this.props.dispatch(modify_user(this.props.currentUser.user, this.state));
                            }}>
                            <Text style={ButtonStyles.primaryBtnText}>确认修改</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
