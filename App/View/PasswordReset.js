import React, {Component} from "react";
import {StyleSheet, TextInput, StatusBar, TouchableOpacity, AlertIOS, Image, View, Text} from "react-native";
import { Base } from '../Common/Base';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, InputStyles } from '../Common/Styles';
import { modify_password } from '../Redux/Actions/UserAction';

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            password: '123456',
            password_r: '123456',
        }
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar title='修改密码' {...this.props} />
                <Spinner visible={this.props.currentUser.uploading}/>
                <View style={{marginTop: 10}}>
                    <TextInput style={InputStyles.input} value={this.state.password} onChangeText={(v)=> this.setState({password: v})}
                        placeholder='新密码' placeholderTextColor='#4D4D4D' secureTextEntry={true}/>
                    <View style={BorderStyles.top}>
                        <TextInput style={InputStyles.input}
                            value={this.state.password_r} onChangeText={(v)=> this.setState({password_r: v})}
                            placeholder='新密码确认' placeholderTextColor='#4D4D4D' secureTextEntry={true}/>
                    </View>
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}
                            onPress={()=> {
                                if (this.state.password === this.state.password_r) {
                                    if (this.state.password.length >= 6)
                                        this.props.dispatch(modify_password(this.props.currentUser.user, this.state.password));
                                    else
                                        AlertIOS.alert('错误', '密码长度不得少于6！');
                                } else {
                                    AlertIOS.alert('错误', '两次密码不一致！');
                                }
                            }}>
                            <Text style={ButtonStyles.primaryBtnText}>确认修改</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(({currentUser})=>({currentUser}))(PasswordReset);
