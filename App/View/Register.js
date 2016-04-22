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
import Icon from 'react-native-vector-icons/Ionicons';

import Base from '../Common/Base';
import { navigatorColor } from '../Common/Color';
import { BorderStyles, ButtonStyles } from '../Common/Styles';

export default class Register extends Component {
    constructor(pros) {
        super(pros);
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.navigatorBar}>
                    <TouchableOpacity onPress={()=> this.props.navigator.pop()} style={{flexDirection: 'row'}}>
                        <Icon name='chevron-left' color='#FFF' size={20} />
                        <Text style={{color: '#FFF', fontSize: 18, marginLeft: 10, }}>注册</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, backgroundColor: '#F6F6F6', paddingTop: 10}}>
                    <TextInput style={styles.input} 
                        placeholder='手机号' placeholderTextColor='#4D4D4D'/>
                    <View style={BorderStyles.top}>
                        <TextInput style={styles.input}
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

const styles = StyleSheet.create({
    navigatorBar: {
        backgroundColor: navigatorColor.backgroundColor, 
        paddingTop: 30, 
        paddingLeft: 20, 
        paddingBottom: 10, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 48, 
        backgroundColor: '#FFF', 
        paddingLeft: 20
    },
});
