import React, {
    Component,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Base from '../Common/Base';
import { BorderStyles, ButtonStyles } from '../Common/Styles';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <Image source={require('../Resources/Images/bgImg/Header.png')} style={styles.logoImg}>
                    <Icon name='chevron-left' color='#FFF' size={20} />
                </Image>
                <View style={{backgroundColor: '#F6F6F6', flex: 1, paddingTop: 10}}>
                    <TextInput style={styles.input} 
                        placeholder='手机号' placeholderTextColor='#4D4D4D'/>
                    <View style={BorderStyles.top}>
                        <TextInput style={styles.input}
                            placeholder='密码' placeholderTextColor='#4D4D4D' secureTextEntry={true}/>
                    </View>
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}>
                            <Text style={ButtonStyles.primaryBtnText}>登录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                        <Text style={{color: '#3D8EFA', flex: 1}}>忘记密码</Text>
                        <Text style={{color: '#3D8EFA'}}>注册</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoImg: {
        width: Base.width, 
        paddingTop: 30, 
        paddingLeft: 20
    },
    input: {
        height: 48, 
        backgroundColor: '#FFF', 
        paddingLeft: 20
    },
});
