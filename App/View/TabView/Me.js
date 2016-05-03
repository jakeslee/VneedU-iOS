import React, {
    StatusBar,
    Component,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import { BorderStyles, ButtonStyles, ImageStyles } from '../../Common/Styles';
import { Base, avatar_process } from '../../Common/Base';
import { user_logout } from '../../Redux/Actions/UserAction';

export default class Me extends Component {
    render() {
        StatusBar.setBarStyle('light-content', true);
        let avatar = avatar_process(this.props.entity.currentUser.user.avatar, this.props.app.cdn_config);
        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#36D17D', paddingTop: 30,}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                        <Text style={{color: '#FFF', fontSize: 18, flex: 1}}>我的</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name='ios-bell' size={25} color='#FFF'/>
                            <TouchableOpacity onPress={()=> Actions.setting({app: this.props.app})}  style={{marginLeft: 10}}>
                                <Icon name='gear-a' size={25} color='#FFF'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView automaticallyAdjustContentInsets={false} bounces={false} style={{marginBottom: 45}}>
                    {/* Head start */}
                    <View style={{backgroundColor: '#36D17D', paddingBottom: 30}}>
                        <View style={styles.userInfo}>
                            <View style={[ImageStyles.avatarRound(55), {marginRight: 20}]}>
                                <Image style={ImageStyles.avatarRound(54)} source={avatar} />
                            </View>
                            
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={{color: '#FFF', fontSize: 18, fontWeight: '500'}}>
                                    {this.props.entity.currentUser.user.name}
                                </Text>
                                <Text style={{color: '#FFF', marginVertical: 3,}}>
                                    @{this.props.entity.currentUser.user.atId}
                                </Text>
                                <Text style={{color: '#FFF'}}>
                                    {this.props.entity.currentUser.user.phone}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* Head end */}
                    {/* score start */}
                    <View style={[BorderStyles.bottom, {flexDirection: 'row', backgroundColor: '#FFF', }]}>
                        <View style={{paddingVertical: 15, flex: 1}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                                <Image style={{width: 18}} source={require('../../Resources/Images/Lv.png')}/>
                                <Text style={{color: '#F5A623'}}>{this.props.entity.currentUser.user.level || 0}</Text>
                            </View>
                            <Text style={styles.userInfoLevelText}>
                                我的等级
                            </Text>
                        </View>
                        <View style={{paddingVertical: 15, flex: 1,borderLeftColor: '#BDBDBD', borderLeftWidth: 0.5, }}>
                            <Text style={{textAlign: 'center', color: '#F17C30', fontSize: 16}}>
                                {this.props.entity.currentUser.user.score || 0}<Text style={{fontSize: 13}}>分</Text>
                            </Text>
                            <Text style={styles.userInfoLevelText}>
                                我的积分
                            </Text>
                        </View>
                    </View>
                    {/* score end */}
                    {/* user info start */}
                    <View style={[BorderStyles.topAndBottom, styles.userArea]}>
                        <Text style={styles.areaTitle}>用户简介</Text>
                        <View style={[{flexDirection: 'row', padding: 12}, BorderStyles.top]}>
                            <Text style={{color: '#313131', flex: 1}}>
                                {this.props.entity.currentUser.user.profile || '用户未补充'}
                            </Text>
                            <TouchableOpacity onPress={()=> Actions.info_modify({ currentUser: this.props.entity.currentUser})} >
                                <Text style={{color: '#7C69E0'}}>修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* user info end */}
                    {/* user related start */}
                    <View style={[BorderStyles.topAndBottom, styles.userArea]}>
                        <Text style={styles.areaTitle}>帐号绑定</Text>
                        <View style={[styles.propertyItem, BorderStyles.top]}>
                            <Text style={styles.propertyItemIcon}>
                                <Icon name='iphone' size={24} color='#3378F3'/>
                            </Text>
                            <Text style={styles.propertyItemText}>
                                手机
                            </Text>
                            <Text style={{color: '#5F5F5F'}}>{this.props.entity.currentUser.user.phone || '未绑定'}</Text>
                        </View>
                        <View style={[styles.propertyItem, BorderStyles.top]}>
                            <Text style={styles.propertyItemIcon}>
                                <Icon name='email' size={22} color='#3378F3'/>
                            </Text>
                            <Text style={styles.propertyItemText}>
                                邮箱
                            </Text>
                            <Text style={{color: '#5F5F5F'}}>{this.props.entity.currentUser.user.email || '未绑定'}</Text>
                        </View>
                    </View>
                    {/* user related end */}
                    {/* user security start */}
                    <View style={[BorderStyles.topAndBottom, styles.userArea]}>
                        <Text style={styles.areaTitle}>安全设置</Text>
                        <View style={[{flexDirection: 'row', padding: 12}, BorderStyles.top]}>
                            <Text style={{color: '#313131', flex: 1}}>
                                登录密码
                            </Text>
                            <TouchableOpacity onPress={()=> Actions.password_reset(...this.props)} >
                                <Text style={{color: '#7C69E0'}}>修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* user security end */}
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}
                            onPress={()=> this.props.dispatch(user_logout())}>
                            <Text style={ButtonStyles.primaryBtnText}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row', 
        marginTop: 10, 
        marginHorizontal: 30, 
        alignItems: 'center'
    },
    userInfoLevelText: {
        textAlign: 'center', 
        marginTop: 5, 
        fontSize: 12, 
        color: '#5F5F5F'
    },
    userArea: {
        backgroundColor: '#FFF', 
        marginTop: 4, 
        flexDirection: 'column'
    },
    areaTitle: {
        padding: 12, 
        fontSize: 14, 
        color: '#5D5D5D'
    },
    propertyItem: {
        flexDirection: 'row', 
        paddingHorizontal: 14, 
        paddingVertical: 8, 
        alignItems: 'center'
    },
    propertyItemIcon: {
        width: 20, 
        textAlign: 'center'
    },
    propertyItemText: {
        color: '#313131', 
        flex: 1, 
        marginLeft: 10, 
        marginBottom: 4
    },
})
