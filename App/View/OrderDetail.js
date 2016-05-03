import React, {
    Component,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Base } from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, NavigatorStyles } from '../Common/Styles';

let aa = Base.width/6;

export default class OrderDetail extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            status: 2,
        }
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
        return (
            <View style={NavigatorStyles.navigatorContainer}>
                <NavigatorBar title='订单详情' {...this.props}/>
                <View style={{flex: 1}}>
                    <ScrollView bounces={false} automaticallyAdjustContentInsets={false} style={{paddingTop: 5}}>
                        {/* 订单状态 start */}
                        <View style={[BorderStyles.topAndBottom, styles.contentArea, {marginTop: 0}]}>
                            <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
                                <Image style={{width: 39, height: 39, marginLeft: 20}} source={require('../Resources/Images/orderIcon/Order_Icon.png')} />
                                <View style={{marginLeft: 10}}>
                                    <Text style={{fontSize: 18, marginBottom: 4}}>订单已完成</Text>
                                    <Text style={{color: '#5D5D5D', fontSize: 12,}}>对方已收到订单信息</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'column' }}>
                                <View style={styles.line} />
                            
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={[styles.indicatorText, this.state.status == 0 && styles.indicatorTextActive]}>
                                        订单已提交
                                    </Text>
                                    <Text style={[styles.indicatorText, this.state.status == 1 && styles.indicatorTextActive]}>对方已确定</Text>
                                    <Text style={[styles.indicatorText, this.state.status == 2 && styles.indicatorTextActive]}>已完成</Text>
                                </View>
                                {this._renderIndicator(this.state.status)}
                            </View>
                        </View>
                        {/* 订单状态 end */}
                        {/* 关联需求 start */}
                        <View style={[BorderStyles.topAndBottom, styles.contentArea]}>
                            <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
                                <Image style={{width: 20, height: 20}} source={require('../Resources/Images/avatar.png')} />
                                <Text style={{flex: 1, marginLeft: 5}}>
                                    威神
                                </Text>
                                <Text style={{color: '#545353', fontSize: 12}}>
                                    2016-10-11 11:24
                                </Text>
                            </View>
                            <Text style={{color: '#545353', fontSize: 16}}>
                                帮忙写代码
                            </Text>
                            <Text style={{textAlign: 'right', color: '#EB5706'}}>
                                合计 ￥12300
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
                                    订单号：102039398393949112342
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    联系人：刘先生
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    联系电话：18666666666
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    交易地址：贵州大学北区图书馆
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top]}>
                                <Text style={styles.propertyItemText}>
                                    下单时间：2016-03-21 12:24
                                </Text>
                            </View>
                            <View style={[styles.propertyItem, BorderStyles.top, {justifyContent: 'flex-end'}]}>
                                <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                                    <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: 70, paddingVertical: 8}]}
                                        onPress={()=> this.props.navigator.push({name: 'judgement'})}>
                                        <Text style={ButtonStyles.primaryBtnText}>评价</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* 交易方式 end */}
                    </ScrollView>
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
