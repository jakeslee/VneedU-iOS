import React, {
    Component,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { BorderStyles, ButtonStyles } from '../../Common/Styles';
import Base from '../../Common/Base';

export default class Me extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#36D17D', paddingTop: 30,}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                        <Text style={{color: '#FFF', fontSize: 18, flex: 1}}>我的</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name='ios-bell' size={22} color='#FFF'/>
                            <TouchableOpacity onPress={()=> this.props.navigator.push({name: 'setting'})}  style={{marginLeft: 10}}>
                                <Icon name='gear-a' size={22} color='#FFF'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView automaticallyAdjustContentInsets={false} bounces={false} style={{marginBottom: 45}}>
                    {/* Head start */}
                    <View style={{backgroundColor: '#36D17D', paddingBottom: 30}}>
                        <View style={styles.userInfo}>
                            <Image style={{width: 54, height: 54, marginRight: 20, }} source={require('../../Resources/Images/avatar.png')} />
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={{color: '#FFF', fontSize: 18, fontWeight: '500'}}>
                                    Jakes Lee
                                </Text>
                                <Text style={{color: '#FFF', marginVertical: 3,}}>
                                    @jakeslee
                                </Text>
                                <Text style={{color: '#FFF'}}>
                                    13221061445
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
                                <Text style={{color: '#F5A623'}}>14</Text>
                            </View>
                            <Text style={styles.userInfoLevelText}>
                                我的等级
                            </Text>
                        </View>
                        <View style={{paddingVertical: 15, flex: 1,borderLeftColor: '#BDBDBD', borderLeftWidth: 0.5, }}>
                            <Text style={{textAlign: 'center', color: '#F17C30', fontSize: 16}}>
                                1200<Text style={{fontSize: 13}}>分</Text>
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
                                用户未补充
                            </Text>
                            <TouchableOpacity onPress={()=> this.props.navigator.push({name: 'info_modify'})} >
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
                            <Text style={{color: '#5F5F5F'}}>13221061445</Text>
                        </View>
                        <View style={[styles.propertyItem, BorderStyles.top]}>
                            <Text style={styles.propertyItemIcon}>
                                <Icon name='email' size={22} color='#3378F3'/>
                            </Text>
                            <Text style={styles.propertyItemText}>
                                邮箱
                            </Text>
                            <Text style={{color: '#5F5F5F'}}>jakeslee66@gmail.com</Text>
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
                            <TouchableOpacity onPress={()=> this.props.navigator.push({name: 'password_reset'})} >
                                <Text style={{color: '#7C69E0'}}>修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* user security end */}
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}>
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
