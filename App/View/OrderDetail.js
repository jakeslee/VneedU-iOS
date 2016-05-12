import React, {Component} from "react";
import {
    StyleSheet, 
    TextInput, 
    ScrollView, 
    TouchableOpacity, 
    InteractionManager,
    Image, 
    View, 
    Text,
    AlertIOS,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Loading from '../Component/Loading';
import { Base, avatar_process } from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, NavigatorStyles, ImageStyles } from '../Common/Styles';
import {
    do_cancel_order,
    do_check_order,
    do_finished_order,
    load_order_detail,
    clr_order_detail,
} from '../Redux/Actions/OrderAction';

let aa = Base.width/6;

/*
    creator 发起需求 -> 用户创建订单 -> 需求锁定、订单状态为0
    creator 确认订单 -> 需求关闭 -> 订单状态为1
    creator 确认需求完成 -> 订单状态为2 允许评价
*/
const STATUS_CHOICE = [
    [// Creator of req
        ['订单未确认', '请确认订单'],
        ['订单已确认', '等待对方完成需求'], // 发起者确定需求是否完成
        ['订单已完成', '双方已经达成协定'],
    ],[// Creator of order
        ['订单已提交', '等待确认'],
        ['订单已确认', '请按要求完成需求'],
        ['订单已完成', '双方已经达成协定'],
    ]
]

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        this._onRefresh = this._onRefresh.bind(this);
    }
    
    componentDidMount() {
        if (this.props.oid !== this.props.detail.content.id) {
            this.props.dispatch(clr_order_detail());
        }
    }
    
    _onRefresh() {
        this.props.dispatch(load_order_detail(rowData.id, this.props.currentUser.user));
    }
    
    _renderIndicator(value) {
        let checked = [require('../Resources/Images/orderIcon/circle-checked.jpg'), 14],
            unchecked = [require('../Resources/Images/orderIcon/circle-unchecked.png'), 6.67],
            one = value == 0 ? checked : unchecked,
            two = value == 1 ? checked : unchecked,
            three = value == 2 ? checked : unchecked;
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                <Image source={one[0]} style={{width: one[1], height: one[1]}} />
                <Image source={two[0]} style={{width: two[1], height: two[1]}} />
                <Image source={three[0]} style={{width: three[1], height: three[1]}} />
            </View>
        )
    }
    
    render() {
        let cur_uid = this.props.currentUser.user.id;
        // 需求发起者为0， 订单创建者为1
        let cur = cur_uid == this.props.detail.content.userId ? 0:1;
        
        console.log(cur, cur_uid, this.props.detail.content.userId, this.props.detail.content.creatorId);
        
        return (
            <View style={NavigatorStyles.navigatorContainer}>
                <NavigatorBar title='订单详情' {...this.props}/>
                <View style={{flex: 1}}>
                    {!this.props.detail.content.hasOwnProperty('id') ? <Loading />:
                    <ScrollView bounces={false} automaticallyAdjustContentInsets={false} style={{paddingTop: 5}}>
                        {/* 订单状态 start */}
                        <View style={[BorderStyles.topAndBottom, styles.contentArea, {marginTop: 0}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
                                <Image style={{width: 39, height: 39, marginLeft: 20}} source={require('../Resources/Images/orderIcon/Order_Icon.png')} />
                                <View style={{marginLeft: 10}}>
                                    <Text style={{fontSize: 18, marginBottom: 4}}>{STATUS_CHOICE[cur][this.props.detail.content.status][0]}</Text>
                                    <Text style={{color: '#5D5D5D', fontSize: 12,}}>{STATUS_CHOICE[cur][this.props.detail.content.status][1]}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'column' }}>
                                <View style={styles.line} />
                            
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={[styles.indicatorText, this.props.detail.content.status == 0 && styles.indicatorTextActive]}>
                                        {STATUS_CHOICE[cur][0][0]}
                                    </Text>
                                    <Text style={[styles.indicatorText, this.props.detail.content.status == 1 && styles.indicatorTextActive]}>
                                        {STATUS_CHOICE[cur][1][0]}
                                    </Text>
                                    <Text style={[styles.indicatorText, this.props.detail.content.status == 2 && styles.indicatorTextActive]}>
                                        {STATUS_CHOICE[cur][2][0]}
                                    </Text>
                                </View>
                                {this._renderIndicator(this.props.detail.content.status)}
                            </View>
                        </View>
                        {/* 订单状态 end */}
                        {/* 关联需求 start */}
                        <View style={[BorderStyles.topAndBottom, styles.contentArea]}>
                            <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
                                <View style={[ImageStyles.avatarRound(20), {width: 20}]}>
                                    <Image style={ImageStyles.avatarRound(20)} 
                                        source={avatar_process(this.props.detail.content.creator.avatar, this.props.app.cdn_config)} />
                                </View>
                                <Text style={{flex: 1, marginLeft: 5}}>
                                    {this.props.detail.content.creator.name}
                                </Text>
                                <Text style={{color: '#545353', fontSize: 12}}>
                                    {this.props.detail.content.requirement.datetime}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={()=> {
                                    Actions.requirement_detail({id: this.props.detail.content.requirement.id})
                                }}>
                                <Text style={{color: '#4DA7F4', fontSize: 18, paddingLeft: 5}}>
                                    {this.props.detail.content.title}
                                </Text>
                            </TouchableOpacity>
                            <Text style={{textAlign: 'right', color: '#EB5706'}}>
                                合计 ￥{this.props.detail.content.requirement.price/100}
                            </Text>
                        </View>
                        {/* 关联需求 end */}
                        {/* 交易方式 start */}
                        <View style={[BorderStyles.topAndBottom, styles.contentArea, {padding: 0}]}>
                            <Text style={styles.areaTitle}>交易方式</Text>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    当面交易
                                </Text>
                            </View>
                        </View>
                        {/* 交易方式 end */}
                        {/* 交易方式 start */}
                        <View style={[BorderStyles.topAndBottom, styles.contentArea, {padding: 0, marginBottom: 10}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.areaTitle}>订单详情</Text>
                                <Text style={styles.areaSubtitle}>
                                    订单号：{this.props.detail.content.orderNo}
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    联系人：{cur_uid != this.props.detail.content.userId ? 
                                            this.props.detail.content.user.name : this.props.detail.content.creator.name}
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    联系电话：{cur_uid != this.props.detail.content.userId ? 
                                            this.props.detail.content.user.phone : this.props.detail.content.creator.phone}
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    交易地址：{this.props.detail.content.requirement.address}
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    下单时间：{this.props.detail.content.datetime}
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top, {justifyContent: 'flex-end'}]}>
                                {this.props.detail.content.status == 2 && 
                                this.props.detail.content[cur == 0 ? 'uJudged' : 'cJudged'] == 0 && 
                                <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                                    <TouchableOpacity style={[ButtonStyles.primaryBtn, {paddingVertical: 8, paddingHorizontal: 10}]}
                                        onPress={()=> Actions.judgement({order: this.props.detail.content, cur})}>
                                        <Text style={ButtonStyles.primaryBtnText}>评价</Text>
                                    </TouchableOpacity>
                                </View>}
                                {this.props.detail.content.status == 0 && cur == 1 && 
                                <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                                    <TouchableOpacity style={[ButtonStyles.dangerBtn, {paddingVertical: 8, paddingHorizontal: 10}]}
                                        onPress={()=> {
                                            AlertIOS.alert('提示', '你确定想取消订单吗？', [
                                                {text: '取消', onPress: () => console.log('Canceled!')},
                                                {text: '确定', onPress: () => 
                                                    this.props.dispatch(do_cancel_order(this.props.oid, this.props.currentUser.user))},
                                            ])
                                        }}>
                                        <Text style={ButtonStyles.primaryBtnText}>取消订单</Text>
                                    </TouchableOpacity>
                                </View>}
                                {this.props.detail.content.status == 0 && cur == 0 && 
                                <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                                    <TouchableOpacity style={[ButtonStyles.primaryBtn, {paddingVertical: 8, paddingHorizontal: 10}]}
                                        onPress={()=> {
                                            AlertIOS.alert('提示', '你想确认订单吗？', [
                                                {text: '取消', onPress: () => console.log('Canceled!')},
                                                {text: '确定', onPress: () => 
                                                    this.props.dispatch(do_check_order(this.props.oid, this.props.currentUser.user))},
                                            ])
                                        }}>
                                        <Text style={ButtonStyles.primaryBtnText}>确认订单</Text>
                                    </TouchableOpacity>
                                </View>}
                                {this.props.detail.content.status == 1 && cur == 0 && 
                                <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                                    <TouchableOpacity style={[ButtonStyles.primaryBtn, {paddingVertical: 8, paddingHorizontal: 10}]}
                                        onPress={()=> {
                                            AlertIOS.alert('提示', '对方是否已经完成你的需求吗？', [
                                                {text: '取消', onPress: () => console.log('Canceled!')},
                                                {text: '确定', onPress: () => 
                                                    this.props.dispatch(do_finished_order(this.props.oid, this.props.currentUser.user))},
                                            ])
                                        }}>
                                        <Text style={ButtonStyles.primaryBtnText}>确认需求完成</Text>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                        </View>
                        {/* 交易方式 end */}
                    </ScrollView>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    line: {
        position: 'absolute', 
        borderTopColor: '#DDD', 
        borderTopWidth: 1, 
        bottom: 7, 
        left: aa, 
        right: aa
    },
    indicatorText: {
        flex: 1, 
        marginBottom: 5, 
        fontSize: 11,
        color: '#5D5D5D', 
        textAlign: 'center'
    },
    indicatorTextActive: {
        color: '#4DA7F4',
    },
    contentArea: {
        backgroundColor: '#FFF', 
        marginTop: 4, 
        padding: 10
    },
    areaTitle: {
        padding: 12, 
        fontSize: 14, 
        color: '#5D5D5D'
    },
    areaSubtitle: {
        color: '#5A5A5A', 
        fontSize: 10, 
        textAlign: 'right', 
        paddingRight: 12, 
        flex: 1
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
        color: 'rgba(0,0,0,.69)', 
        flex: 1, 
        paddingVertical: 4
    },
});

export default connect(({orders, app, currentUser})=> ({
    detail: orders.detail,
    currentUser,
    app,
}))(OrderDetail);
