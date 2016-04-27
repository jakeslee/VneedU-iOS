import React, {
    Component,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Base from '../Common/Base';

export default class HeaderBar extends Component {
    static defaultProps = {
        title: '首页',
    };
    static propTypes = {
        title: React.PropTypes.string,
    };
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.barContainer}>
                <View style={[styles.barItem, {flex: 3,  marginLeft: 5}]}>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{width: 37}}>
                                <Image source={require('../../App/Resources/Images/avatar.png')} />
                            </View>
                            <View style={{flex:2, marginLeft: 4, marginTop: 10, flexDirection: 'row'}}>
                                <Text>
                                    Jakes Lee
                                </Text>
                                <View style={{marginLeft: 4, flexDirection: 'row'}}>
                                    <Image source={require('../../App/Resources/Images/Lv.png')} />
                                    <Text style={styles.levelText}>
                                        17
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.barItem, {marginBottom: 4}]}>
                    <Text style={{textAlign: 'center', fontSize: 15 }}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={[styles.barItem, {flex: 3, flexDirection: 'row', justifyContent: 'flex-end'}]}>
                    <TouchableOpacity onPress={()=> this.props.navigator.push({name: 'search'})}>
                        <Icon style={styles.btnIcon} name="ios-search" color="#929292" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigator.push({name: 'add_requirement'})}>
                        <Icon style={styles.btnIcon} name="ios-plus-outline" color="#929292" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.props.navigator.push({name: 'setting'})}>
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
