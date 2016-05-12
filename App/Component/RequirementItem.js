import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';

import moment from 'moment';
import localeZh from 'moment/locale/zh-cn';moment.locale('zh-cn', localeZh);
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Base, avatar_process } from '../Common/Base';
import { ImageStyles } from '../Common/Styles';

import {
    load_user
} from '../Redux/Actions/UserAction';

class RequirementItem extends Component {
    render() {
        let avatar = avatar_process(this.props.publisher.avatar, this.props.app.cdn_config);

        return (
            <View style={[styles.rqItemArea, this.props.style && this.props.style]}>
                <View style={styles.rqItemHeader}>
                    <View style={[ImageStyles.avatarRound(37), {width: 37}]}>
                        <Image style={ImageStyles.avatarRound(37)} source={avatar} />
                    </View>
                    <View style={styles.rqItemHeaderUser}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=> {
                                this.props.dispatch(load_user(this.props.publisher.id, this.props.currentUser.user));
                                Actions.user_info({app: this.props.app})
                            }}>
                                <Text style={{color: '#3584F0',}}>{this.props.publisher.name}</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 13,}}>
                                发布了<Text style={{color: '#3584F0',}}>{this.props.category.name}</Text>需求
                            </Text>
                        </View>
                        <Text style={{fontSize: 12, color: '#929292'}}>{moment(this.props.datetime, 'YYYY-MM-DD HH:mm:ss').fromNow()}</Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.rqItemHeaderPrice}>￥{this.props.price}</Text>
                    </View>
                </View>
                <View style={styles.rqItemContent}>
                    <TouchableOpacity onPress={()=> Actions.requirement_detail({id: this.props.id})}>
                        <Text style={styles.rqItemTitle}>{this.props.title}</Text>
                        <Text style={{fontSize: 13,}}>
                            {this.props.description}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rqItemFooter}>
                    <Icon name="location" color='#9489E2' size={20} />
                    <Text style={styles.rqItemFooterFrom}>来自{this.props.area}的用户</Text>
                    <View style={styles.rqItemFooterInteration}>
                        <View style={styles.rqItemFooterItemArea}>
                            <Icon2 name='comment-o' size={13} color='#929292' />
                            <Text style={styles.rqItemFooterItemText}>{this.props.comments > 0 ? this.props.comments : '留言'}</Text>
                        </View>
                        <View style={[styles.rqItemFooterItemArea, {marginRight: 10}]}>
                            <Icon2 name='thumbs-o-up' size={13} color='#929292' />
                            <Text style={styles.rqItemFooterItemText}>{this.props.nice > 0 ? this.props.nice: '赞'}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rqItemArea: {
        backgroundColor: '#FFF', 
        borderBottomColor: '#d8d8d8', 
        borderBottomWidth: 0.5, 
        borderTopColor: '#d8d8d8', 
        borderTopWidth: 0.5, 
        marginBottom: 4,
    },
    rqItemHeader: {
        flexDirection: 'row', 
        padding: 10,
    },
    rqItemHeaderAvatar: {
        width: 37,
        height: 37,
    },
    rqItemHeaderUser: {
        flex: 1, 
        flexDirection: 'column', 
        marginLeft: 10,
        justifyContent: 'center',
    },
    rqItemHeaderPrice: {
        fontSize: 18, 
        color: '#FA1818', 
    },
    rqItemContent: {
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 10
    },
    rqItemTitle: {
        fontSize: 16, 
        fontWeight: '400', 
        paddingBottom: 10
    },
    rqItemFooter: {
        flexDirection: 'row', 
        borderTopColor: '#d8d8d8', 
        borderTopWidth: 0.5, 
        paddingLeft: 10,
        height: 30,
        alignItems: 'center',
    },
    rqItemFooterFrom: {
        paddingLeft: 4, 
        fontSize: 12, 
        color: '#9489E2', 
        flex: 1
    },
    rqItemFooterInteration: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingTop: 3,
    },
    rqItemFooterItemArea: {
        flexDirection: 'row', 
        paddingLeft: 7
    },
    rqItemFooterItemText: {
        color: '#929292', 
        paddingLeft: 2, 
        fontSize: 12
    },
});

export default connect(({app, currentUser})=> ({
    app, 
    currentUser,
}))(RequirementItem);
