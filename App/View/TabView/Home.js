import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    StatusBar,
    ListView,
    RefreshControl,
    TouchableOpacity,
    InteractionManager,
    View,
    Text,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Loading from '../../Component/Loading';
import RequirementItem from '../../Component/RequirementItem';
import { load_new_requirements } from '../../Redux/Actions/RequirementAction';

export default class Home extends Component {
    constructor(props) {
        super(props);
        
        this._onRefresh = this._onRefresh.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
    }
    
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this._onRefresh();
        });
    }
    
    _renderHeader() {
        return (
            <View>
                {/* Category area start */}
                <View style={styles.contentArea}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.typeBtn} 
                            onPress={()=> Actions.category_filter({category: 'build'})}>
                            <Image style={[styles.btnIcon, ]} 
                            source={require('../../Resources/Images/category-icons/under-const.png')} />
                            <Text style={styles.btnText}>施工</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeBtn}
                            onPress={()=> Actions.category_filter({category: 'edu'})}>
                            <Image style={[styles.btnIcon, ]} 
                                source={require('../../Resources/Images/category-icons/edu.png')} />
                            <Text style={styles.btnText}>家教</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeBtn}
                            onPress={()=> Actions.category_filter({category: 'part-time'})}>
                            <Image style={[styles.btnIcon, ]} 
                                source={require('../../Resources/Images/category-icons/clock.png')} />
                            <Text style={styles.btnText}>钟点工</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeBtn}
                            onPress={()=> Actions.category_filter({category: 'driving'})}>
                            <Image style={[styles.btnIcon, ]} 
                                source={require('../../Resources/Images/category-icons/car.png')} />
                            <Text style={styles.btnText}>代驾</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <TouchableOpacity style={styles.typeBtn} 
                            onPress={()=> Actions.category_filter({category: 'buying'})}>
                            <Image style={[styles.btnIcon, ]} 
                            source={require('../../Resources/Images/category-icons/shop-cart.png')} />
                            <Text style={styles.btnText}>代购</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeBtn}
                            onPress={()=> Actions.category_filter({category: 'medicine'})}>
                            <Image style={[styles.btnIcon, ]} 
                                source={require('../../Resources/Images/category-icons/MedCar.png')} />
                            <Text style={styles.btnText}>送药上门</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeBtn}
                            onPress={()=> Actions.category_filter({category: 'gift'})}>
                            <Image style={[styles.btnIcon, ]} 
                                source={require('../../Resources/Images/category-icons/gift.png')} />
                            <Text style={styles.btnText}>送礼</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.typeBtn}
                            onPress={()=> Actions.category_filter({category: 'working'})}>
                            <Image style={[styles.btnIcon, ]} 
                                source={require('../../Resources/Images/category-icons/working.png')} />
                            <Text style={styles.btnText}>代班</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Category area end */}
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
                {/* Requirements area start */}
                <View style={styles.requirementArea}>
                    <Text style={styles.rqAreaTitle}>
                        最新需求
                    </Text>
                </View>
            </View>
        )
    }
    
    _renderRow(rowData) {
        return (
            <RequirementItem {...rowData}/>
        )
    }
    
    _onRefresh() {
        console.log('on refresh');
        this.props.dispatch(load_new_requirements('latest', 1));
    }
    
    _onEndReached() {
        console.log('reached end');

        if (!this.props.entity.requirement.latest.isLoadingTail) {
            this.props.dispatch(load_new_requirements('latest', this.props.entity.requirement.latest.page + 1, true));
        }
    }
    
    render() {
        return (
            <View style={{flex: 1,}}>
                <ListView style={styles.contentContainer} 
                        dataSource={this.props.entity.requirement.latest.dataSource}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.entity.requirement.latest.isFetching}
                                onRefresh={this._onRefresh}
                                tintColor="#ff0000" 
                                title="Loading..."
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"/>
                        }
                        enableEmptySections={true}
                        renderHeader={this._renderHeader.bind(this)}
                        renderRow={this._renderRow.bind(this)}
                        onEndReached={()=> {
                            if (this.props.entity.requirement.latest.items.length >= 9)
                                this._onEndReached();
                        }}
                        onEndReachedThreshold={-60}
                        contentContainerStyle={{paddingVertical: 8}} 
                        automaticallyAdjustContentInsets={false} 
                        renderFooter={()=>{
                            if (this.props.entity.requirement.latest.isLoadingTail ||
                                (this.props.entity.requirement.latest.isFetching && 
                                this.props.entity.requirement.latest.items.length == 0))
                                return <Loading style={{marginVertical: 20}} />;
                        }}>
                    {/* Requirements area end */}
                </ListView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'column',
        marginBottom: 48,
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
    // Requirements area
    requirementArea: {
        borderTopColor: '#d8d8d8', 
        borderTopWidth: 0.5, 
        marginTop: 4,
    },
    rqAreaTitle: {
        backgroundColor:'#FFF', 
        color: '#4A4A4A', 
        paddingLeft: 10, 
        paddingTop: 7, 
        paddingBottom: 7, 
        fontSize: 12,
    },
});
