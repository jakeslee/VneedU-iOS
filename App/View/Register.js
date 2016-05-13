import React, {Component} from "react";
import {StyleSheet, TextInput, StatusBar, TouchableOpacity, Image, View, Text} from "react-native";
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { Base } from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, InputStyles } from '../Common/Styles';

import {
    user_register
} from '../Redux/Actions/UserAction';

class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: props.username || '13221067448',
            password: props.password || '1234',
        }
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <NavigatorBar title='注册' {...this.props} />
                <Spinner visible={this.props.currentUser.isFetching}/>
                <View style={{flex: 1, backgroundColor: '#F6F6F6', paddingTop: 10}}>
                    <TextInput style={InputStyles.input} value={this.state.username} onChangeText={(v)=> this.setState({username:v})}
                        placeholder='手机号' placeholderTextColor='#4D4D4D'/>
                    <View style={BorderStyles.top}>
                        <TextInput style={InputStyles.input} value={this.state.password}  onChangeText={(v)=> this.setState({password:v})}
                            placeholder='密码' placeholderTextColor='#4D4D4D' secureTextEntry={true}
                            onSubmitEditing={()=> this.props.dispatch(user_register(this.state.username, this.state.password))}/>
                    </View>
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}
                            onPress={()=> this.props.dispatch(user_register(this.state.username, this.state.password))}>
                            <Text style={ButtonStyles.primaryBtnText}>注册</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{textAlign: 'center', color: '#8F8F8F'}}>注册代表同意<Text style={{color: '#6069CF'}}>《用户服务协议》</Text></Text>
                </View>
            </View>
        )
    }
}

export default connect(({currentUser})=>({currentUser}))(Register);
