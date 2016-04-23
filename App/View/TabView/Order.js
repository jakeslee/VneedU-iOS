import React, {
    Component,
    StyleSheet,
    ScrollView,
    ListView,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

const ORDER_STATUS = ['订单已提交', '订单已确定', '订单已完成'];

export default class Order extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        
        var test = [];
        for (var i = 0;i < 6;++i) {
            test.push({
                id: "754v87v4w547389",
                creator_id: "8345frhi597b",
                user_id: "8345frhi597c",
                creator: {
                    id: "8345frhi597b",
                    name: "威神",
                    avatar: require('../../Resources/Images/avatar.png'),
                },
                user: {
                    id: "8345frhi597c",
                    name: "Jakes Lee",
                    avatar: require('../../Resources/Images/avatar.png'),
                },
                title: "帮忙写代码",
                status: 0,
                u_judged: 0,
                c_judged: 0,
                datetime: '2016-3-19 10:11',
            })
        }
        test[2].status = 2;
        
        this.state = {
            dataSource: dataSource.cloneWithRows(test),
            currentUser: '8345frhi597c',
        }
    }
    
    _orderStatus(data) {
        if (data.status == 2) {
            if (this.state.currentUser == data.user_id) {
                return data.u_judged == 0 ? '订单待评价' : ORDER_STATUS[2];
            } else if (this.state.currentUser == data.creator_id) {
                return data.c_judged == 0 ? '订单待评价' : ORDER_STATUS[2];
            }
        }
        return ORDER_STATUS[data.status];
    }
    
    _renderRow(rowData) {
        let os = this._orderStatus(rowData);
        
        return (
            <View style={styles.itemArea}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12, color: '#454545', flex: 1}} >{os} - {rowData.datetime}</Text>
                    <Icon name='trash' size={20} color='#454545' />
                </View>
                <View style={{flexDirection: 'row', marginTop: 10,}}>
                    <Image style={{height: 37, width: 37}} source={rowData.creator.avatar} />
                    <View style={{marginLeft: 10, }}>
                        <Text style={styles.rqUserTitle}>{rowData.creator.name}</Text>
                        <Text style={{fontSize: 13, fontWeight: '400'}}>{rowData.title}</Text>
                    </View>
                </View>
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
    
    render() {
        return (
            <View style={{flex: 1}}>
                <ListView 
                    style={{paddingTop: 8,}}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}/>
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
})
