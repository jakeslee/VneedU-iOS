import React, {
    Component,
    StyleSheet,
    TextInput,
    ListView,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import Base from '../Common/Base';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, NavigatorStyles, ImageStyles, ContentStyles } from '../Common/Styles';

export default class RequirementDetail extends Component {
    constructor(props) {
        super(props);
        
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        
        this.state = {
            dataSource: dataSource,
            keywords: dataSource.cloneWithRows(['写代码', '威神']),
            images: dataSource.cloneWithRows([
                require('../Resources/Images/bgImg/test-1.png'), 
                require('../Resources/Images/bgImg/test-2.png'),
                require('../Resources/Images/bgImg/test-3.png'),
                require('../Resources/Images/bgImg/test-3.png'),
                require('../Resources/Images/bgImg/test-3.png'),
            ]),
        }
    }
    
    _renderKeywords(rowData) {
        return (
            <View style={styles.keywords}>
                <Text style={{fontSize: 11, color: '#FFF', fontWeight: '300'}}>
                    {rowData}
                </Text>
            </View>
        )
    }
    
    _renderImages(rowData) {
        return (
            <View style={{borderWidth: 0.5, borderColor: '#E1E1E1', margin: 2}}>
                <Image style={styles.images} source={rowData} />
            </View>
        )
    }
    
    render() {
        return (
            <View style={NavigatorStyles.navigatorContainer}>
                <NavigatorBar title='需求详情' {...this.props}/>
                <View style={{flex: 1}}>
                    <ScrollView automaticallyAdjustContentInsets={false} style={{paddingTop: 10}}>
                        {/* 头部 start */}
                        <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', flexDirection: 'row', padding: 10, alignItems: 'center'}]}>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 12}}>
                                    <Text style={{color: '#839BF3'}}>
                                        施工
                                    </Text>
                                    需求
                                </Text>
                                <Text style={{fontSize: 18, marginVertical: 5}}>
                                    帮忙写代码
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{marginRight: 10, flexDirection: 'row'}}>
                                        <Icon2 name='thumbs-o-up' size={13} color='#929292' />
                                        <Text style={{color: '#929292', fontSize: 12, marginLeft: 2}}>{0 > 0 ? this.props.nice: '赞'}</Text>
                                    </View>
                                    <Text style={{fontSize: 12, marginRight: 4, color: '#859DF4'}}>
                                        威神
                                    </Text>
                                    <Text style={{color: '#929292', fontSize: 12}}>
                                    · 2016年06月18日 22:10
                                    </Text>
                                </View>
                            </View>
                            <View style={ImageStyles.avatarRound(56)}>
                                <Image style={{width: 54, height: 54}} source={require('../Resources/Images/avatar.png')}/>
                            </View>
                        </View>
                        {/* 头部 end */}
                        {/* 内容 start */}
                        <View style={[BorderStyles.bottom, {backgroundColor: '#FFF', padding: 10}]}>
                            <ListView 
                                dataSource={this.state.keywords}
                                renderRow={this._renderKeywords}
                                contentContainerStyle={styles.keywordsContainer}/>
                            <Text style={{color: '#333333', lineHeight: 18}}>
                                最近有一些简单的代码需要同学帮忙写，也不难，就是一些重复性的代码。本V神不喜欢做简单的事情，所以把简单的代码给一个愿意做体力活没尝试过高端技术的同学尝试。
                            </Text>
                            <View style={{marginTop: 8, justifyContent: 'center'}}>
                                <ListView 
                                    dataSource={this.state.images}
                                    renderRow={this._renderImages}
                                    contentContainerStyle={styles.imageContainer}/>
                            </View>
                        </View>
                        {/* 内容 end */}
                        {/* 交易详情 start */}
                        <View style={[BorderStyles.topAndBottom, ContentStyles.propertyArea]}>
                            <Text style={ContentStyles.propertyTitle}>交易详情</Text>
                            <View style={[{padding: 12}, BorderStyles.top]}>
                                <Text style={{color: '#313131', flex: 1}}>
                                    价格：<Text style={{color: '#FA1818', fontSize: 18}}>￥ 1200</Text>
                                </Text>
                            </View>
                            <View style={[{padding: 12}, BorderStyles.top]}>
                                <Text style={{color: '#313131', flex: 1}}>
                                    交易方式：当面交易
                                </Text>
                            </View>
                            <View style={[ContentStyles.propertyItem, BorderStyles.top, {justifyContent: 'flex-end'}]}>
                                <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                                    <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: 70, paddingVertical: 8}]}
                                        onPress={()=> this.props.navigator.push({name: 'judgement'})}>
                                        <Text style={ButtonStyles.primaryBtnText}>评论</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[ButtonStyles.itemBtnArea, {marginTop: 0, marginLeft: 12}]} >
                                    <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: 70, paddingVertical: 8, backgroundColor: '#d9534f'}]}
                                        onPress={()=> this.props.navigator.push({name: 'judgement'})}>
                                        <Text style={ButtonStyles.primaryBtnText}>预定</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* 交易详情 end */}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keywords: {
        paddingHorizontal: 5, 
        height: 18, 
        marginRight: 8, 
        marginBottom: 10, 
        backgroundColor: '#3AA3E9', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    keywordsContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        flexWrap: 'wrap'
    },
    imageContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
        flexWrap: 'wrap'
    },
    images: {
        width: 110/375 * Base.width, 
        height: 110/375 * Base.width
    },
});
