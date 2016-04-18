'use strict';

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


export default class Home extends Component {
    
    render() {
        return (
            <View style={{flex: 1,}}>
                <ScrollView style={styles.contentContainer} 
                            contentContainerStyle={{paddingVertical: 8}} 
                            automaticallyAdjustContentInsets={false} >
                    <View style={styles.contentArea}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                source={require('../../../App/Resources/Images/category-icons/under-const.png')} />
                                <Text style={styles.btnText}>施工</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                    source={require('../../../App/Resources/Images/category-icons/edu.png')} />
                                <Text style={styles.btnText}>家教</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                    source={require('../../../App/Resources/Images/category-icons/clock.png')} />
                                <Text style={styles.btnText}>钟点工</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                    source={require('../../../App/Resources/Images/category-icons/car.png')} />
                                <Text style={styles.btnText}>代驾</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                source={require('../../../App/Resources/Images/category-icons/shop-cart.png')} />
                                <Text style={styles.btnText}>代购</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                    source={require('../../../App/Resources/Images/category-icons/MedCar.png')} />
                                <Text style={styles.btnText}>送药上门</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                    source={require('../../../App/Resources/Images/category-icons/gift.png')} />
                                <Text style={styles.btnText}>送礼</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.typeBtn}>
                                <Image style={[styles.btnIcon, ]} 
                                    source={require('../../../App/Resources/Images/category-icons/working.png')} />
                                <Text style={styles.btnText}>代班</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* Ads area start */}
                    <View style={[styles.contentArea, styles.adsArea]}>
                        <View style={[styles.adsItem, styles.adsItemRBorder]}>
                            <View style={styles.adsItemDetail}>
                                <Text style={styles.adsItemTitle}>注册奖励</Text>
                                <Text style={styles.adsItemSubtitle}>新用户注册即送积分</Text>
                            </View>
                            <Image style={{flex: 1, width: 47, height: 47}} source={require('../../Resources/Images/ads/ads-2.png')} />
                        </View>
                        <View style={styles.adsItem}>
                            <View style={styles.adsItemDetail}>
                                <Text style={styles.adsItemTitle}>邀请福利</Text>
                                <Text style={styles.adsItemSubtitle}>邀请帮手提升排名</Text>
                            </View>
                            <Image style={{flex: 1, width: 47, height: 47}} source={require('../../Resources/Images/ads/ads-1.png')} />
                        </View>
                    </View>
                    {/* Ads area end */}
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
    },
    contentArea: {
        backgroundColor: '#FFF',
        borderTopColor: '#d8d8d8',
        borderBottomColor: '#d8d8d8',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        padding: 10,
    },
    
    typeBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIcon: {
        width: 45,
        height: 45,
        padding: 2,
        marginBottom: 4,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 12,
    },
    // Ads area
    adsArea: {
        marginTop: 4, 
        flexDirection: 'row', 
        padding: 0,
    },
    adsItem: {
        flexDirection: 'row', 
        flex: 1, 
        padding: 10, 
        alignItems: 'center',
    },
    adsItemRBorder: {
        borderRightColor: '#BDBDBD', 
        borderRightWidth: 0.5
    },
    adsItemDetail: {
        flexDirection: 'column', 
        flex: 2,
    },
    adsItemTitle: {
        color: '#037AFF', 
        fontSize: 17
    },
    adsItemSubtitle: {
        color: '#929292', 
        fontSize: 12, 
        marginTop: 8
    },
});
