import React, {
    Component,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    Image,
    Modal,
    Picker,
    View,
    Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/Ionicons';
import { Base, scrollTools } from '../Common/Base';
import CommentItem from '../Component/CommentItem';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, NavigatorStyles, ImageStyles, ContentStyles } from '../Common/Styles';

export default class AddRequirement extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        
        this.state = {
            dataSource: dataSource,
            images: dataSource.cloneWithRows([
                require('../Resources/Images/bgImg/test-2.png'), 
                require('../Resources/Images/bgImg/test-1.png')
            ]),
        }
        
        this.REF_CONST = {
            scroll: 'scroll',
            keywords: 'keywords',
            address: 'address',
        }
    }
    
    _renderImages(rowData, sectionID, rowID) {
        return (
            <View style={[BorderStyles.imageAround, {margin: 2}]}>
                <Image style={styles.images} source={rowData} />
                {rowID != 0 ? null :
                <View style={styles.imagesTag}>
                    <Text style={{color: '#FFF', flex: 1, textAlign: 'center'}}>主图</Text>
                </View>}
            </View>
        )
    }
    
    _renderFooter() {
        return (
            <TouchableOpacity>
                <View style={[BorderStyles.imageAround, {margin: 2}]}>
                    <Image style={styles.images} source={require('../Resources/Images/bgImg/add-image.jpg')} />
                </View>
            </TouchableOpacity>
        )
    }
    
    render() {
        return (
            <View style={NavigatorStyles.navigatorContainer}>
                <NavigatorBar title='添加需求' {...this.props}/>
                <View style={{flex: 1}}>
                    <KeyboardAwareScrollView ref={this.REF_CONST.scroll} bounces={false} automaticallyAdjustContentInsets={false}>
                        {/* 需求内容 start */}
                        <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', flexDirection: 'column', padding: 10}]}>
                            <TextInput style={{height: 32}} placeholder='标题' placeholderTextColor='#989898'/>
                            
                            <View style={[BorderStyles.top, {flex: 1}]}>
                                <TextInput multiline={true} placeholder='描述一下你的需求' style={{height: 90}}/>
                            </View>
                            <ListView 
                                bounces={false}
                                dataSource={this.state.images}
                                renderRow={this._renderImages}
                                renderFooter={this._renderFooter}
                                contentContainerStyle={styles.imageContainer}/>
                            <View style={{flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                <Icon name="location" color='#9489E2' size={22}/>
                                <TextInput ref={this.REF_CONST.address}
                                    style={{height: 20, flex: 1, marginLeft: 5, marginTop: 3}} placeholder='输入交易地址'
                                    onFocus={scrollTools.scrollToInput.bind(this, this.REF_CONST.address, this.REF_CONST.scroll)}
                                    onBlur={scrollTools.scrollBack.bind(this, this.REF_CONST.address, this.REF_CONST.scroll)}/>
                            </View>
                        </View>
                        {/* 需求内容 end */}
                        {/* 分类内容 start */}
                        <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', flexDirection: 'column', paddingHorizontal: 10, marginTop: 4}]}>
                            <View style={styles.textArea}>
                                <Text style={styles.textStyle}>
                                    价格
                                </Text>
                                <Text style={styles.textValue}>
                                    ￥ 0.00
                                </Text>
                            </View>
                            <View style={styles.textArea}>
                                <Text style={styles.textStyle}>
                                    分类
                                </Text>
                                <Text style={styles.textValue}>
                                    请选择分类
                                </Text>
                            </View>
                            <View style={[styles.textArea, {borderBottomWidth: 0}]}>
                                <Text style={styles.textStyle}>
                                    关键字
                                </Text>
                                <TextInput style={{height: 20, color: '#5D5D5B', flex: 1, fontSize: 16}} 
                                    placeholder='请输入关键字，方便其它用户找到' ref={this.REF_CONST.keywords}
                                    onFocus={scrollTools.scrollToInput.bind(this, this.REF_CONST.keywords, this.REF_CONST.scroll)}
                                    onBlur={scrollTools.scrollBack.bind(this, this.REF_CONST.keywords, this.REF_CONST.scroll)}/>
                            </View>
                        </View>
                        {/* 分类内容 end */}
                        <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                            <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}>
                                <Text style={ButtonStyles.primaryBtnText}>确认发布</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    imagesTag: {
        position: 'absolute', 
        left: 0, 
        bottom: 0, 
        right: 0, 
        backgroundColor: 'rgba(54, 209, 126, .67)', 
        paddingVertical: 2, 
        flexDirection: 'column', 
        width: 110/375 * Base.width
    },
    textStyle: {
        width: 60, 
        color: '#5D5D5B', 
        fontSize: 16
    },
    textArea: {
        flexDirection: 'row', 
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E1DFDF',
    },
    textValue: {
        color: '#5D5D5B', 
        fontSize: 16
    },
});
