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
import Base from '../Common/Base';
import CommentItem from '../Component/CommentItem';
import RequirementItem from '../Component/RequirementItem';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ImageStyles } from '../Common/Styles';
import { navigatorColor } from '../Common/Color';

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2)=> r1 !== r2,
        });
        
        var commentsDs = new ListView.DataSource({
            rowHasChanged: (r1, r2)=> r1 !== r2,
        });
        
        var test = [];
        for (var i = 0; i < 2 ; ++i)
            test.push({
                title: '帮忙搬家具',
                description: '最近新购入了一些家具，但是厂家不提供搬家服务，得自己搬。家具有点多，希望请些人来帮忙。',
                publisher: {
                    id: '[UUID]',
                    name: 'Jakes Lee',
                    avatar: require('../Resources/Images/avatar.png'),
                },
                category: {
                    id: '[UUID]',
                    name: '施工',
                    type: 'build',
                },
                area: '贵阳',
                price: '10000',
                payMethod: 2,
                image: null,
                nice: 9,
                datetime: '2016-4-21 9:00',
                images: [],
                comments: 0,
            });
        
        var test_comments = [];
        for (var i = 0;i < 2;++i) {
            test_comments.push({
                id: "456tygf56",
                content: "好",
                area: "贵阳",
                score: 5,
                avatar: require('../Resources/Images/avatar.png'),
                datetime: '2016-4-11 20:11',
            });
        }
        
        this.state = {
            dataSource: dataSource.cloneWithRows(test),
            commentsDs: commentsDs.cloneWithRows(test_comments),
        }
    }
    
    _renderRow(rowData) {
        return (
            <RequirementItem {...rowData} style={{marginBottom: 0}}/>
        )
    }
    
    _renderComment(rowData) {
        return <CommentItem rowData={rowData} />;
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <NavigatorBar {...this.props}/>
                <View style={{flex: 1, }}>
                    <ScrollView bounces={false} automaticallyAdjustContentInsets={false} style={{flex: 1}}>
                        {/* head start */}
                        <View style={styles.headStyle}>
                            <View style={[ImageStyles.avatarRound(56), {marginBottom: 10}]}>
                                <Image style={{width: 54, height: 54}} source={require('../Resources/Images/avatar.png')}/>
                            </View>
                            <Text style={{color: '#FFF', fontSize: 16}}>
                                Jakes Lee
                            </Text>
                        </View>
                        {/* head end */}
                        {/* score start */}
                        <View style={[BorderStyles.bottom, {flexDirection: 'row', backgroundColor: '#FFF', }]}>
                            <View style={{paddingVertical: 15, flex: 1}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                                    <Image style={{width: 18}} source={require('../Resources/Images/Lv.png')}/>
                                    <Text style={{color: '#F5A623'}}>14</Text>
                                </View>
                                <Text style={styles.userInfoLevelText}>
                                    等级
                                </Text>
                            </View>
                            <View style={{paddingVertical: 15, flex: 1,borderLeftColor: '#BDBDBD', borderLeftWidth: 0.5, }}>
                                <Text style={{textAlign: 'center', color: '#F17C30', fontSize: 16}}>
                                    1200<Text style={{fontSize: 13}}>分</Text>
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
                                    用户未补充
                                </Text>
                            </View>
                        </View>
                        {/* user info end */}
                        {/* 用户发布 start */}
                        <View style={[BorderStyles.top, styles.userArea]}>
                            <Text style={[styles.areaTitle, ]}>用户发布</Text>
                            <ListView 
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow}/>
                        </View>
                        {/* 用户发布 end */}
                        {/* 用户评价 start */}
                        <View style={[BorderStyles.topAndBottom, styles.userArea, {marginBottom: 10}]}>
                            <Text style={[styles.areaTitle,]}>用户评价</Text>
                            <ListView 
                                dataSource={this.state.commentsDs}
                                renderRow={this._renderComment}/>
                        </View>
                        {/* 用户评价 end */}
                    </ScrollView>
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
});
