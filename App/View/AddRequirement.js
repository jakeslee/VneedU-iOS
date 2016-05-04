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
    Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImagePickerManager } from 'NativeModules';

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
            images: [],
            imagesDs: dataSource.cloneWithRows([]),
        }
        
        this.REF_CONST = {
            scroll: 'scroll',
            keywords: 'keywords',
            address: 'address',
        }
    }
    
    _setAsSpot(rowId) {
        var images_t = this.state.images.slice();
        var images = images_t.map((val, index)=>{
            if (index != rowId && val.isSpot != false)
                return Object.assign({}, val, {
                    isSpot: false,
                });
            if (index == rowId)
                return Object.assign({}, val, {
                    isSpot: true,
                });
            return val;
        });

        this.setState({
            images: images,
            imagesDs: this.state.imagesDs.cloneWithRows(images),
        });
    }
    
    _renderImages(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this._setAsSpot.bind(this, rowID)}>
                <View style={[BorderStyles.imageAround, {margin: 2}]}>
                    <Image style={styles.images} source={rowData.image}/>
                    {rowData.isSpot &&
                    <View style={styles.imagesTag}>
                        <Text style={{color: '#FFF', flex: 1, textAlign: 'center'}}>主图</Text>
                    </View>}
                </View>
            </TouchableOpacity>
        )
    }
    
    _renderFooter() {
        return (
            <TouchableOpacity onPress={()=> this._selectImage()}>
                <View style={[BorderStyles.imageAround, {margin: 2}]}>
                    <Image style={styles.images} source={require('../Resources/Images/bgImg/add-image.jpg')} />
                </View>
            </TouchableOpacity>
        )
    }
    
    _selectImage() {
        var options = {
            title: '选择照片', // specify null or empty string to remove the title
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
            chooseFromLibraryButtonTitle: '从相册中选择', // specify null or empty string to remove this button
            cameraType: '返回', // 'front' or 'back'
            mediaType: 'photo', // 'photo' or 'video'
            maxWidth: 325, // photos only
            maxHeight: 325, // photos only
            aspectX: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
            aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
            quality: 0.5, // 0 to 1, photos only
            angle: 0, // android only, photos only
            allowsEditing: true, // Built in functionality to resize/reposition the image after selection
            noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
            storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
                skipBackup: true, // ios only - image will NOT be backed up to icloud
                path: 'images',
            }
        };

        /**
        * The first arg will be the options object for customization, the second is
        * your callback which sends object: response.
        *
        * See the README for info about the response
        */

        ImagePickerManager.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can display the image using either data:
                //const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                var source;
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }
                console.log(source);
                let images = [ ...this.state.images, {
                    image: source,
                    isSpot: this.state.images.length === 0,
                }];
                
                this.setState({
                    images: images,
                    imagesDs: this.state.imagesDs.cloneWithRows(images),
                });
            }
        });
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
                                <TextInput multiline={true} placeholder='描述一下你的需求' style={{height: 90, fontSize: 14,}}/>
                            </View>
                            <ListView 
                                enableEmptySections={true}
                                bounces={false}
                                dataSource={this.state.imagesDs}
                                renderRow={this._renderImages.bind(this)}
                                renderFooter={this._renderFooter.bind(this)}
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
