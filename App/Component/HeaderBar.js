import React, { Component } from 'react';
import {
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import { Base, avatar_process } from '../Common/Base';
import { ImageStyles } from '../Common/Styles';
import API from '../Constants/API';
import {
    set_tabbar
} from '../Redux/Actions/AppAction';

export default class HeaderBar extends Component {
    turnToMe(logined = false) {
        if (!logined) {
            Actions.login();
        } else {
            this.props.dispatch(set_tabbar('me', false));
        }
    }
    
    render() {
        let avatar = avatar_process(this.props.entity.currentUser.user.avatar, this.props.app.cdn_config);
        let logined = (this.props.entity.currentUser.user || {}).hasOwnProperty('id');
        return (
            <View style={styles.barContainer}>
                <StatusBar 
                    animated={false}
                    barStyle='default'/>
                <View style={[styles.barItem, {flex: 3,  marginLeft: 5}]}>
                    <TouchableOpacity onPress={this.turnToMe.bind(this, logined)}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[ImageStyles.avatarRound(37), {width: 37}]}>
                                <Image source={avatar} style={ImageStyles.avatarRound(37)}/>
                            </View>
                            <View style={{flex:2, marginLeft: 4, marginTop: 10, marginBottom: 10, flexDirection: 'row'}}>
                                <Text>
                                    {logined ? this.props.entity.currentUser.user.name : '未登录'}
                                </Text>
                                {logined &&
                                <View style={{marginLeft: 4, flexDirection: 'row'}}>
                                    <Image source={require('../../App/Resources/Images/Lv.png')} />
                                    <Text style={styles.levelText}>
                                        {this.props.entity.currentUser.user.level || 0}
                                    </Text>
                                </View>}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.barItem, {marginBottom: 4}]}>
                    <Text style={{textAlign: 'center', fontSize: 15 }}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={[styles.barItem, {flex: 3, flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4}]}>
                    <TouchableOpacity onPress={()=> Actions.search()}>
                        <Icon style={styles.btnIcon} name="ios-search" color="#929292" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => 
                        logined ? Actions.add_requirement({
                            currentUser: this.props.entity.currentUser,
                            requirement: this.props.entity.requirement,
                        }) : Actions.login()
                    }>
                        <Icon style={styles.btnIcon} name="ios-plus-outline" color="#929292" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.setting({app: this.props.app})}>
                        <Icon style={styles.btnIcon} name="gear-a" color="#929292" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barContainer: {
        height: 56,
        width: Base.width,
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: 0.5,
    },
    barItem: {
        flexDirection: 'column',
    },
    levelText: {
        color: '#F5A623',
    },
    btnIcon: {
        width: 20,
        fontSize: 23,
        marginRight: 8,
    }
})
