import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    ListView,
    PixelRatio,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Base, avatar_process } from '../Common/Base';
import Loading from '../Component/Loading';9
import CommentItem from '../Component/CommentItem';
import RequirementItem from '../Component/RequirementItem';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ImageStyles } from '../Common/Styles';
import { navigatorColor } from '../Common/Color';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        
        this._renderRow = this._renderRow.bind(this);
        this._renderComment = this._renderComment.bind(this);
    }
    
    _renderRow(rowData) {
        return (
            <RequirementItem {...rowData} style={{marginBottom: 0}}/>
        )
    }
    
    _renderComment(rowData) {
        return <CommentItem rowData={rowData} app={this.props.app}/>;
    }
    
    _renderFooter(isReq = true) {
        let list = this.props.user[isReq? 'requirements' : 'judgements']
        let c = list.items.length == 0;
        if (c && list.isFetching == false)
            return (
                <View style={styles.withOutComment}>
                    <Text style={{color: '#bbb'}}>
                        此项暂无数据~
                    </Text>
                </View>
            )
        else if (list.isFetching)
            return (
                <View style={styles.withOutComment}>
                    <Loading />
                </View>
            )
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar {...this.props}/>
                <View style={{flex: 1, }}>
                    {this.props.user.isFetching ? <Loading /> :
                    <ScrollView bounces={false} automaticallyAdjustContentInsets={false} style={{flex: 1}}>
                        {/* head start */}
                        <View style={styles.headStyle}>
                            <View style={[ImageStyles.avatarRound(56), {marginBottom: 10}]}>
                                <View style={ImageStyles.avatarRound(54)}>
                                    <Image style={{width: 54, height: 54}} 
                                        source={avatar_process(this.props.user.content.avatar, this.props.app.cdn_config)}/>
                                </View>
                            </View>
                            <Text style={{color: '#FFF', fontSize: 16}}>
                                {this.props.user.content.name}
                            </Text>
                        </View>
                        {/* head end */}
                        {/* score start */}
                        <View style={[BorderStyles.bottom, {flexDirection: 'row', backgroundColor: '#FFF', }]}>
                            <View style={{paddingVertical: 15, flex: 1}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                                    <Image style={{width: 18}} source={require('../Resources/Images/Lv.png')}/>
                                    <Text style={{color: '#F5A623'}}>{this.props.user.content.level || 0}</Text>
                                </View>
                                <Text style={styles.userInfoLevelText}>
                                    等级
                                </Text>
                            </View>
                            <View style={{paddingVertical: 15, flex: 1,borderLeftColor: '#BDBDBD', borderLeftWidth: 1/PixelRatio.get(), }}>
                                <Text style={{textAlign: 'center', color: '#F17C30', fontSize: 16}}>
                                    {this.props.user.content.score || 0}<Text style={{fontSize: 13}}>分</Text>
                                </Text>
                                <Text style={styles.userInfoLevelText}>
                                    积分
                                </Text>
                            </View>
                        </View>
                        {/* score end */}
                        {/* user info start */}
                        <View style={[BorderStyles.topAndBottom, styles.userArea]}>
                            <Text style={styles.areaTitle}>用户简介</Text>
                            <View style={[{flexDirection: 'row', padding: 12}, BorderStyles.top]}>
                                <Text style={{color: '#313131', flex: 1}}>
                                    {this.props.user.content.profile || '用户未补充'}
                                </Text>
                            </View>
                        </View>
                        {/* user info end */}
                        {/* 用户发布 start */}
                        <View style={[BorderStyles.top, styles.userArea]}>
                            <Text style={[styles.areaTitle, ]}>用户发布</Text>
                            <ListView 
                                enableEmptySections={true}
                                dataSource={this.props.user.requirements.dataSource}
                                renderRow={this._renderRow}
                                renderFooter={this._renderFooter.bind(this)}/>
                        </View>
                        {/* 用户发布 end */}
                        {/* 用户评价 start */}
                        <View style={[BorderStyles.topAndBottom, styles.userArea, {marginBottom: 10}]}>
                            <Text style={[styles.areaTitle,]}>用户评价</Text>
                            <ListView 
                                enableEmptySections={true}
                                dataSource={this.props.user.judgements.dataSource}
                                renderRow={this._renderComment}
                                renderFooter={this._renderFooter.bind(this, false)}/>
                        </View>
                        {/* 用户评价 end */}
                    </ScrollView>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headStyle: {
        backgroundColor: navigatorColor.backgroundColor, 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: 20,
    },
    userInfoLevelText: {
        textAlign: 'center', 
        marginTop: 5, 
        fontSize: 12, 
        color: '#5F5F5F'
    },
    userArea: {
        backgroundColor: '#FFF', 
        marginTop: 4, 
        flexDirection: 'column'
    },
    areaTitle: {
        padding: 12, 
        fontSize: 14, 
        color: '#5D5D5D'
    },
    withOutComment: {
        height: 100, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FFF'
    },
});

export default connect(({app, currentUser, user})=>({
    app,
    user,
    currentUser,
}))(UserInfo);
