import React, {Component} from "react";
import {StyleSheet, TextInput, StatusBar, TouchableOpacity, Image, View, Text} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import { Base } from '../Common/Base';
import { BorderStyles, ButtonStyles } from '../Common/Styles';

import {
    user_login
} from '../Redux/Actions/UserAction';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: props.username || '13221061445',
            password: props.password || '1234',
        }
    }
    
    componentDidMount() {
        StatusBar.setBarStyle('light-content', false);
    }
    
    componentWillUnmount() {
        StatusBar.setBarStyle('default', false);
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <Image source={require('../Resources/Images/bgImg/Header.png')} style={styles.logoImg}>
                    <TouchableOpacity onPress={()=> { Actions.pop();StatusBar.setBarStyle('default', true);}} style={{backgroundColor: 'transparent'}}>
                        <Icon name='chevron-left' color='#FFF' size={20} />
                    </TouchableOpacity>
                </Image>
                
                <View style={{backgroundColor: '#F6F6F6', flex: 1, paddingTop: 10}}>
                    <TextInput style={styles.input} value={this.state.username} onChangeText={(v)=> this.setState({username:v})}
                        placeholder='手机号' placeholderTextColor='#4D4D4D'/>
                    <View style={BorderStyles.top}>
                        <TextInput style={styles.input} value={this.state.password} onChangeText={(v)=> this.setState({password:v})}
                            placeholder='密码' placeholderTextColor='#4D4D4D' secureTextEntry={true}/>
                    </View>
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}
                            onPress={()=> {
                                this.props.dispatch(user_login(this.state.username, this.state.password));
                            }}>
                            <Text style={ButtonStyles.primaryBtnText}>登录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                        <Text style={{color: '#3D8EFA', flex: 1}}>忘记密码</Text>
                        <TouchableOpacity onPress={Actions.register}>
                            <Text style={{color: '#3D8EFA'}}>注册</Text>
                        </TouchableOpacity>
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

export default connect(({currentUser})=>({currentUser}))(Login);
