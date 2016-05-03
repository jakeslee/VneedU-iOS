import React, {
    Component,
    StyleSheet,
    TextInput,
    StatusBar,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import { Base } from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, InputStyles } from '../Common/Styles';

export default class PasswordReset extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar title='修改密码' {...this.props} />
                <View style={{marginTop: 10}}>
                    <TextInput style={InputStyles.input} 
                        placeholder='旧密码' placeholderTextColor='#4D4D4D' secureTextEntry={true}/>
                    <View style={BorderStyles.top}>
                        <TextInput style={InputStyles.input}
                            placeholder='新密码' placeholderTextColor='#4D4D4D' secureTextEntry={true}/>
                    </View>
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}>
                            <Text style={ButtonStyles.primaryBtnText}>确认修改</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
