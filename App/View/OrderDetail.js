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
import Base from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles } from '../Common/Styles';

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
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar title='订单详情' />
                <View style={{flex: 1, paddingTop: 10}}>
                    <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', paddingBottom: 20}]}>
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
    }
});
