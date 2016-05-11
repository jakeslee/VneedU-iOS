import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    ListView,
    ScrollView,
    InteractionManager,
    TouchableOpacity,
    RefreshControl,
    AlertIOS,
    Image,
    Modal,
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import { Base, cdn_process, avatar_process } from '../Common/Base';
import CommentItem from '../Component/CommentItem';
import NavigatorBar from '../Component/NavigatorBar';
import Loading from '../Component/Loading';
import { BorderStyles, ButtonStyles, NavigatorStyles, ImageStyles, ContentStyles } from '../Common/Styles';
import {
    load_req_detail,
    clr_req_detail,
} from '../Redux/Actions/RequirementAction';

import {
    post_comment,
} from '../Redux/Actions/CommentAction';

import {
    add_new_order
} from '../Redux/Actions/OrderAction';

class RequirementDetail extends Component {
    constructor(props) {
        super(props);

        this.isSigned = (this.props.currentUser.user || {}).hasOwnProperty('id');
        this._onRefresh = this._onRefresh.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderComments = this._renderComments.bind(this);
        this._renderImages = this._renderImages.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }
    
    componentDidMount() {
        if (this.props.id !== this.props.requirement.content.id) {
            this.props.dispatch(clr_req_detail());
        }
        InteractionManager.runAfterInteractions(() => {
            this._onRefresh();
        });
    }
    
    _onRefresh() {
        console.log('on refresh: ', this.props.id);
        this.props.dispatch(load_req_detail(this.props.id));
    }
    
    _renderKeywords(rowData) {
        return (
            <View style={styles.keywords}>
                <Text style={{fontSize: 11, color: '#FFF', fontWeight: '300'}}>
                    {rowData.keyword}
                </Text>
            </View>
        )
    }
    
    _renderImages(rowData) {
        let image = {uri: cdn_process(this.props.app.cdn_config, rowData.url)};
        console.log(image)
        return (
            <View style={{borderWidth: 0.5, borderColor: '#E1E1E1', margin: 2}}>
                <Image style={styles.images} source={image} />
            </View>
        )
    }
    
    _renderComments(rowData) {
        return <CommentItem rowData={rowData} app={this.props.app}/>;
    }
    
    _renderHeader() {
        if (!this.props.requirement.content.hasOwnProperty('id'))
            return null;
        let avatar = avatar_process(this.props.requirement.content.publisher.avatar, this.props.app.cdn_config);
        return (
            <View>
                {/* 头部 start */}
                    <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', flexDirection: 'row', padding: 10, alignItems: 'center'}]}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 12}}>
                                <Text style={{color: '#839BF3'}}>
                                    {this.props.requirement.content.category.name}
                                </Text>
                                需求
                            </Text> 
                            <Text style={{fontSize: 18, marginVertical: 5}}>
                                {this.props.requirement.content.title}
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{marginRight: 10, flexDirection: 'row'}}>
                                    <Icon2 name='thumbs-o-up' size={13} color='#929292' />
                                    <Text style={{color: '#929292', fontSize: 12, marginLeft: 2}}>{0 > 0 ? this.props.nice: '赞'}</Text>
                                </View>
                                <Text style={{fontSize: 12, marginRight: 4, color: '#859DF4'}}>
                                    {this.props.requirement.content.publisher.name}
                                </Text>
                                <Text style={{color: '#929292', fontSize: 12}}>
                                · {this.props.requirement.content.datetime}
                                </Text>
                            </View>
                        </View>
                        <View style={[ImageStyles.avatarRound(56), {width: 56}]}>
                            <Image style={ImageStyles.avatarRound(56)} source={avatar}/>
                        </View>
                    </View>
                    {/* 头部 end */}
                    {/* 内容 start */}
                    <View style={[BorderStyles.bottom, {backgroundColor: '#FFF', padding: 10}]}>
                        <ListView 
                            enableEmptySections={true}
                            dataSource={this.props.requirement.keywords}
                            renderRow={this._renderKeywords}
                            contentContainerStyle={styles.keywordsContainer}/>
                        <Text style={{color: '#333333', lineHeight: 18}}>
                            {this.props.requirement.content.description}
                        </Text>
                        <View style={{marginTop: 8, justifyContent: 'center'}}>
                            <ListView 
                                enableEmptySections={true}
                                dataSource={this.props.requirement.images}
                                renderRow={this._renderImages}
                                contentContainerStyle={styles.imageContainer}/>
                        </View>
                    </View>
                    {/* 内容 end */}
                    {/* 交易详情 start */}
                    <View style={[BorderStyles.topAndBottom, ContentStyles.propertyArea]}>
                        <Text style={ContentStyles.propertyTitle}>交易详情</Text>
                        <View style={[{padding: 12}, BorderStyles.top]}>
                            <View style={{height: 22, justifyContent: 'center'}}>
                                <Text style={{color: '#313131'}}>
                                    价格：<Text style={{color: '#FA1818', fontSize: 18}}>￥ {this.props.requirement.content.price}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={[{padding: 12}, BorderStyles.top]}>
                            <View style={{height: 22, justifyContent: 'center'}}>
                                <Text style={{color: '#313131'}}>
                                    交易方式：当面交易
                                </Text>
                            </View>
                        </View>
                        {this.isSigned ?
                        <View style={[ContentStyles.propertyItem, BorderStyles.top, {justifyContent: 'flex-end'}]}>
                            <View style={[ButtonStyles.itemBtnArea, {marginTop: 0}]} >
                                <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: 70, paddingVertical: 8}]}
                                    onPress={()=> AlertIOS.prompt('请输入评论内容', '', [
                                        {text: '取消', onPress: () => console.log('Canceled!')},
                                        {text: '确定', onPress: (v) => {
                                            if (v.length >= 2) {
                                                this.props.dispatch(post_comment(this.props.id, v, this.props.currentUser.user));
                                            } else
                                                AlertIOS.alert('错误', '评论字数不少于2个')
                                        }},
                                    ])}>
                                    <Text style={ButtonStyles.primaryBtnText}>评论</Text>
                                </TouchableOpacity>
                            </View>
                            {this.props.requirement.content.tradeStatus == 0 && this.props.requirement.content.publisherId != this.props.currentUser.user.id &&
                            <View style={[ButtonStyles.itemBtnArea, {marginTop: 0, marginLeft: 12}]} >
                                <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: 70, paddingVertical: 8, backgroundColor: '#d9534f'}]}
                                    onPress={()=> {
                                        if (this.props.requirement.content.publisherId == this.props.currentUser.user.id)
                                            AlertIOS.alert('提示', '无法操作自己发起的需求！');
                                        else
                                            AlertIOS.alert('提示', '你确定要预定吗？', [
                                                {text: '取消', onPress: () => console.log('Canceled!')},
                                                {text: '确定', onPress: () => 
                                                    this.props.dispatch(add_new_order(this.props.id, this.props.currentUser.user))},
                                            ])
                                    }}>
                                    <Text style={ButtonStyles.primaryBtnText}>预定</Text>
                                </TouchableOpacity>
                            </View>}
                        </View>: null}
                    </View>
                    {/* 交易详情 end */}
                    {/* 评价列表 start */}
                    <View style={[BorderStyles.topAndBottom, ContentStyles.propertyArea]}>
                        <Text style={ContentStyles.propertyTitle}>评论</Text>
                    </View>
                    {/* 评价列表 end */}
            </View>
        )
    }
    
    _renderFooter() {
        if (this.props.comments.items.length == 0 && this.props.comments.isFetching == false) {
            return (
                <View style={styles.withOutComment}>
                    <Text style={{color: '#bbb'}}>
                        当前需求还没有讨论，快来抢沙发吧~
                    </Text>
                </View>
            )
        } else if (this.props.comments.isFetching) {
            return (
                <View style={styles.withOutComment}>
                    <Loading />
                </View>
            )
        }
    }
    
    render() {
        return (
            <View style={NavigatorStyles.navigatorContainer}>
                <NavigatorBar title='需求详情' {...this.props}/>
                <View style={{flex: 1}}>
                    { this.props.requirement.content.hasOwnProperty('id') ?
                    <ListView 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.requirement.isFetching}
                                onRefresh={this._onRefresh}
                                tintColor="#ff0000" 
                                title={'Refreshing...'}
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"/>
                        }
                        enableEmptySections={true}
                        automaticallyAdjustContentInsets={false} 
                        style={{paddingTop: 10}}
                        dataSource={this.props.comments.dataSource}
                        renderHeader={this._renderHeader}
                        renderRow={this._renderComments} 
                        renderFooter={this._renderFooter}/>:
                    <Loading style={{flex: 1}} /> }
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
    withOutComment: {
        height: 100, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FFF'
    },
});

export default connect(({requirement, currentUser, app, comments})=> 
    ({requirement: requirement.requirementDetail, 
        currentUser, 
        app,
        comments}))(RequirementDetail);
