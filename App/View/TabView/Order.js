import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ListView,
    RefreshControl,
    TouchableOpacity,
    InteractionManager,
    View,
    Text,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/EvilIcons';
import Loading from '../../Component/Loading';
import { avatar_process } from '../../Common/Base';
import { BorderStyles, ButtonStyles, ImageStyles } from '../../Common/Styles';

import {
    load_user_orders,
    load_order_detail,
} from '../../Redux/Actions/OrderAction';

const ORDER_STATUS = ['订单已提交', '订单已确定', '订单已完成'];

class Order extends Component {
    constructor(props) {
        super(props);
        
        this._onRefresh = this._onRefresh.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }
    
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._onRefresh();
        });
    }
    
    _orderStatus(data) {
        if (data.status == 2) {
            if (this.props.currentUser == data.user_id) {
                return data.u_judged == 0 ? '订单待评价' : ORDER_STATUS[2];
            } else if (this.props.currentUser == data.creator_id) {
                return data.c_judged == 0 ? '订单待评价' : ORDER_STATUS[2];
            }
        }
        return ORDER_STATUS[data.status];
    }
    
    _onRefresh() {
        this.props.dispatch(load_user_orders(this.props.currentUser.user, 1));
    }
    
    _renderRow(rowData) {
        let os = this._orderStatus(rowData);
        
        return (
            <View style={styles.itemArea}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#454545', flex: 1}} >{os} - {rowData.datetime}</Text>
                    <Icon name='trash' size={20} color='#454545' />
                </View>
                <TouchableOpacity style={{marginTop: 10, }} onPress={()=> {
                    this.props.dispatch(load_order_detail(rowData));
                    Actions.order_detail({oid: rowData.id});
                }} >
                    <View style={{flexDirection: 'row', }}>
                        <View style={ImageStyles.avatarRound(37)}>
                            <Image style={ImageStyles.avatarRound(37)} 
                                source={avatar_process(rowData.creator.avatar, this.props.app.cdn_config)} />
                        </View>
                        <View style={{marginLeft: 10, }}>
                            <Text style={styles.rqUserTitle}>{rowData.creator.name}</Text>
                            <Text style={{fontSize: 13, fontWeight: '400'}}>{rowData.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {os != '订单待评价' ? null : 
                <View style={styles.itemBtnArea} >
                    <TouchableOpacity style={[styles.primaryBtn, {width: 70, }]}
                        onPress={()=> this.props.navigator.push({name: 'judgement'})}>
                        <Text style={styles.primaryBtnText}>评价</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        )
    }
    
    _renderFooter() {
        if (this.props.orders.items.length == 0 && this.props.orders.isFetching == false) {
            return (
                <View style={styles.withOutComment}>
                    <Text style={{color: '#bbb'}}>
                        当前你还没有订单，赶紧去下个单吧~
                    </Text>
                </View>
            )
        } else if (this.props.orders.isFetching) {
            return (
                <View style={styles.withOutComment}>
                    <Loading />
                </View>
            )
        }
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                { this.props.orders.items.length == 0 && this.props.orders.items.isFetching ?
                <Loading style={{flex: 1}} />:
                <ListView 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.orders.isFetching}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000" 
                            title="Loading..."
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"/>
                    }
                    enableEmptySections={true}
                    style={{paddingTop: 8,}}
                    dataSource={this.props.orders.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter}/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemArea: {
        backgroundColor: '#FFF', 
        padding: 10, 
        borderTopColor: '#d8d8d8', 
        borderTopWidth: 0.5, 
        marginBottom: 4, 
        borderBottomColor: '#d8d8d8', 
        borderBottomWidth: 0.5,
    },
    rqUserTitle: {
        fontSize: 15, 
        marginBottom: 4, 
        color: '#037AFF'
    },
    itemBtnArea: {
        marginTop: 10, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    primaryBtn: {
        backgroundColor: '#6AD072', 
        borderRadius: 2, 
        paddingVertical: 6
    },
    primaryBtnText: {
        textAlign: 'center', 
        color: '#FFF',
    },
    withOutComment: {
        height: 100, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }
})

export default connect(({orders, currentUser, app})=> ({
    orders,
    currentUser,
    app,
}))(Order);
