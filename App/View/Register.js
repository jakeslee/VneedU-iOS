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

import Base from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, InputStyles } from '../Common/Styles';

export default class Register extends Component {
    constructor(pros) {
        super(pros);
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <NavigatorBar title='注册' {...this.props} />
                <View style={{flex: 1, backgroundColor: '#F6F6F6', paddingTop: 10}}>
                    <TextInput style={InputStyles.input} 
                        placeholder='手机号' placeholderTextColor='#4D4D4D'/>
                    <View style={BorderStyles.top}>
                        <TextInput style={InputStyles.input}
                            placeholder='密码' placeholderTextColor='#4D4D4D' secureTextEntry={true}/>
                    </View>
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}>
                            <Text style={ButtonStyles.primaryBtnText}>注册</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{textAlign: 'center', color: '#8F8F8F'}}>注册代表同意<Text style={{color: '#6069CF'}}>《用户服务协议》</Text></Text>
                </View>
            </View>
        )
    }
}
