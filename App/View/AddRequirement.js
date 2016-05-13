import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    ListView,
    ActivityIndicatorIOS,
    TouchableOpacity,
    Image,
    Picker,
    View,
    Text,
    Platform,
    AlertIOS,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImagePickerManager } from 'NativeModules';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalBox from 'react-native-modalbox';
import AlphabetListView from 'react-native-alphabetlistview';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Base, scrollTools } from '../Common/Base';
import CommentItem from '../Component/CommentItem';
import NavigatorBar from '../Component/NavigatorBar';
import { BorderStyles, ButtonStyles, NavigatorStyles, ImageStyles, ContentStyles } from '../Common/Styles';
import { uploadFileAsync } from '../Services/FileService';
import { post_requirement, request_post } from '../Redux/Actions/RequirementAction';
import { Area } from '../Constants/AreaData';
import { getErrorsMessage } from '../Constants/Errors';

class AddRequirement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categrory: 'part-time',
            currentCate: null,
            currentArea: null,
            title: '',
            desc: '',
            price: '',
            address: '',
            keywords: '',
            images: [],
            imagesDs: dataSource.cloneWithRows([]),
            spotImg: -1,
            area_model: false,
        };
        
        this.REF_CONST = {
            scroll: 'scroll',
            keywords: 'keywords',
            address: 'address',
            price: 'price',
        };

        this.CATE_CONST = {
            build: '施工',
            edu: '家教',
            'part-time': '钟点工',
            driving: '代驾',
            buying: '代购',
            medicine: '送药上门',
            gift: '送礼',
            working: '代班',
        }
    }
    
    _renderImages(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={()=> this.setState({spotImg: rowID})}>
                <View style={[BorderStyles.imageAround, {margin: 2}]}>
                    <Image style={styles.images} source={rowData.image}/>
                    {rowID == this.state.spotImg &&
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

                let images = [ ...this.state.images, {
                    image: source,
                }];
                
                this.setState({
                    images: images,
                    spotImg: this.state.images.length === 0 ? 0 : this.state.spotImg,
                    imagesDs: this.state.imagesDs.cloneWithRows(images),
                });
            }
        });
    }
    
    kaiche() {
        if (this.props.requirement.isPosting)
            return;
        if (this.state.title.length < 4) {
            AlertIOS.alert('错误', '标题必须至少4个字符!');
            return;
        } else if (this.state.address.length < 3) {
            AlertIOS.alert('错误', '地址必须提供!');
            return;
        } else if (!this.state.currentArea || this.state.currentArea.length < 2) {
            AlertIOS.alert('错误', '地区必须提供!');
            return;
        } else if (!this.state.currentCate) {
            AlertIOS.alert('错误', '分类必须选择!');
            return;
        }
        
        this.props.dispatch(request_post(true));
        
        let files = this.state.images.map((v)=> {
            let path = v.image.uri;
            return {
                name: 'files',
                filename: path.slice(path.lastIndexOf('/') + 1),
                filepath: path,
            }
        });
        
        var images, hotSpot;
        
        if (files.length == 0) {
            this._dispatchPostReq();
        } else {
            uploadFileAsync(files, this.props.currentUser.user.token).then((response) => JSON.parse(response.data))
            .then((json)=> {
                if (json.error != 0) {
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
                } else {
                    let retData = json.retData;
                    images = retData.files.map((v)=> v.userfile_id);
                    hotSpot = this.state.spotImg != -1 ? retData.files[this.state.spotImg].userfile_id : undefined;
                    this._dispatchPostReq(images, hotSpot)
                }
            });
        }
    }
    
    _dispatchPostReq(images = [], hotSpot) {
        let value = {
            title: this.state.title,
            price: parseInt(parseFloat(this.state.price.length == 0 ? 0 : this.state.price.length) * 100),
            payMethod: 0,
            address: this.state.address,
            area: this.state.currentArea,
            category: this.state.categrory,
            keywords: this.state.keywords,
            description: this.state.desc,
            images: JSON.stringify(images),
        };
        if (typeof hotSpot !== 'undefined')
            value['image'] = hotSpot;

        this.props.dispatch(post_requirement(value, this.state.categrory, this.props.currentUser.user));
    }
    
    _onOpenOfAreaModal() {
        var t = setTimeout(()=> {
            this.setState({area_model: true});
            clearTimeout(t);
        }, 190); 
    }
    
    render() {
        return (
            <View style={NavigatorStyles.navigatorContainer}>
                <NavigatorBar title='添加需求' {...this.props}/>
                <Spinner visible={this.props.requirement.isPosting}/>
                <View style={{flex: 1}}>
                    <KeyboardAwareScrollView ref={this.REF_CONST.scroll} bounces={false} automaticallyAdjustContentInsets={false}>
                        {/* 需求内容 start */}
                        <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', flexDirection: 'column', padding: 10}]}>
                            <TextInput style={{height: 32}} placeholder='标题' placeholderTextColor='#989898'
                                value={this.state.title} onChangeText={(v)=> this.setState({title: v})}
                                returnKeyType = {"next"} onSubmitEditing={(event) => { 
                                    this.refs.desc.focus(); 
                                }}/>
                            <View style={[BorderStyles.top, {flex: 1}]}>
                                <TextInput multiline={true} placeholder='描述一下你的需求' style={{height: 90, fontSize: 16,}}
                                    value={this.state.desc} onChangeText={(v)=> this.setState({desc: v})} ref='desc'/>
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
                                    value={this.state.address} onChangeText={(v)=> this.setState({address: v})}
                                    style={{height: 20, flex: 1, marginLeft: 8, marginTop: 3}} placeholder='输入交易地址'
                                    onFocus={scrollTools.scrollToInput.bind(this, this.REF_CONST.address, this.REF_CONST.scroll)}
                                    onBlur={scrollTools.scrollBack.bind(this, this.REF_CONST.address, this.REF_CONST.scroll)}
                                    returnKeyType = {"next"} onSubmitEditing={(event) => { 
                                        this.refs[this.REF_CONST.price].focus(); 
                                    }}/>
                            </View>
                        </View>
                        {/* 需求内容 end */}
                        {/* 分类内容 start */}
                        <View style={[BorderStyles.topAndBottom, {backgroundColor: '#FFF', flexDirection: 'column', paddingHorizontal: 10, marginTop: 4}]}>
                            <View style={[styles.textArea, {alignItems: 'center'}]}>
                                <Text style={styles.textStyle}>
                                    价格
                                </Text>
                                <View style={{flexDirection: 'row', flex: 1}}>
                                    <Text style={styles.textValue}>￥ </Text>
                                    <TextInput style={[styles.textValue, {height: 20, flex: 1}]} placeholder='0.00' placeholderTextColor='#989898'
                                        keyboardType='decimal-pad' ref={this.REF_CONST.price}
                                        value={this.state.price} onChangeText={(v)=> this.setState({price: v})}
                                        onFocus={scrollTools.scrollToInput.bind(this, this.REF_CONST.price, this.REF_CONST.scroll)}
                                        onBlur={scrollTools.scrollBack.bind(this, this.REF_CONST.price, this.REF_CONST.scroll)}
                                        returnKeyType = {"next"} onSubmitEditing={(event) => { 
                                            this.refs[this.REF_CONST.keywords].focus(); 
                                        }}/>
                                </View>
                            </View>
                            <View style={styles.textArea}>
                                <Text style={styles.textStyle}>
                                    分类
                                </Text>
                                <TouchableOpacity onPress={()=> this.refs.cate_model.open()} style={{flex:1, flexDirection: 'row'}}>
                                    <Text style={styles.textValue}>
                                        {this.state.currentCate || '请选择分类'}
                                    </Text>
                                    <Text style={[styles.textValue, styles.upIconStyle]}>
                                        <Icon name='chevron-up'/>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textArea}>
                                <Text style={styles.textStyle}>
                                    地区
                                </Text>
                                <TouchableOpacity onPress={()=> this.refs.area_model.open()} style={{flex:1, flexDirection: 'row'}}>
                                    <Text style={styles.textValue}>
                                        {this.state.currentArea || '请选择所在地区'}
                                    </Text>
                                    <Text style={[styles.textValue, styles.upIconStyle]}>
                                        <Icon name='chevron-up'/>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.textArea, {borderBottomWidth: 0}]}>
                                <Text style={styles.textStyle}>
                                    关键字
                                </Text>
                                <TextInput style={{height: 20, color: '#5D5D5B', flex: 1, fontSize: 16}} 
                                    value={this.state.keywords} onChangeText={(v)=> this.setState({keywords: v})}
                                    placeholder='请输入关键字，方便其它用户找到' ref={this.REF_CONST.keywords}
                                    onFocus={scrollTools.scrollToInput.bind(this, this.REF_CONST.keywords, this.REF_CONST.scroll)}
                                    onBlur={scrollTools.scrollBack.bind(this, this.REF_CONST.keywords, this.REF_CONST.scroll)}/>
                            </View>
                        </View>
                        {/* 分类内容 end */}
                        <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                            <TouchableOpacity style={[ButtonStyles.primaryBtn, this.props.requirement.isPosting && {backgroundColor: '#e4e4e4'}
                                , {width: Base.width * 0.9, }]}
                                onPress={this.kaiche.bind(this)}>
                                <Text style={[ButtonStyles.primaryBtnText, ]}>确认发布</Text>
                            </TouchableOpacity>
                        </View>
                        {this.props.requirement.isPosting &&
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicatorIOS animating={true} size="large"/>
                        </View>}
                    </KeyboardAwareScrollView>
                    <ModalBox ref='cate_model' position='bottom' style={[styles.modal, {height: 260}]}
                        swipeToClose={false} onClosed={()=> this.setState({currentCate: this.CATE_CONST[this.state.categrory]})}>
                        <Text style={styles.text}>请选择分类</Text>
                        <Picker
                            style={{alignSelf:'stretch', backgroundColor:'white'}}
                            selectedValue={this.state.categrory}
                            onValueChange={(v) => this.setState({categrory: v})}>
                            <Picker.Item label="施工" value="build" />
                            <Picker.Item label="家教" value="edu" />
                            <Picker.Item label="钟点工" value="part-time" />
                            <Picker.Item label="代驾" value="driving" />
                            <Picker.Item label="代购" value="buying" />
                            <Picker.Item label="送药上门" value="medicine" />
                            <Picker.Item label="送礼" value="gift" />
                            <Picker.Item label="代班" value="working" />
                        </Picker>
                    </ModalBox>
                    <ModalBox ref='area_model' position='bottom' style={[styles.modal, {alignSelf:'stretch'}]}
                        swipeArea={100} onOpened={this._onOpenOfAreaModal.bind(this)}
                        swipeToClose={true} onClosed={()=> this.setState({area: this.state.currentArea, area_model: false})}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={[styles.textValue, {textAlign: 'center'}]}>
                                <Icon name='drag'/>
                            </Text>
                            <Text style={[styles.text, {flex: 1, paddingTop: 0}]}>请选择所在地区</Text>
                        </View>
                        { this.state.area_model ?
                        <AlphabetListView
                            style={{alignSelf:'stretch'}}
                            data={Area}
                            cell={Cell}
                            cellHeight={30}
                            useDynamicHeights={true}
                            enableEmptySections={true}
                            sectionListItem={SectionItem}
                            sectionHeader={SectionHeader}
                            sectionHeaderHeight={22.5}
                            onCellSelect={(item)=> {
                                this.setState({currentArea: item});
                                this.refs.area_model.close();
                            }}/>:
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicatorIOS animating={true} size="large"/>
                        </View>}
                    </ModalBox>
                </View>
                
            </View>
        )
    }
}

class SectionHeader extends Component {
    render() {
        return (
            <View style={{backgroundColor: '#ccc'}}>
                <Text style={styles.sectionTextStyle}>{this.props.title}</Text>
            </View>
        );
    };
}

class SectionItem extends Component {
    render() {
        return (
            <Text style={{color:'#f00'}}>{this.props.title}</Text>
        );
    };
}

class Cell extends Component {
    render() {
        return (
            <TouchableOpacity onPress={()=> this.props.onSelect(this.props.item)}>
                <View style={{height: 35, justifyContent: 'center'}}>
                    <Text style={{fontSize: 16, paddingLeft: 10}}>{this.props.item}</Text>
                </View>
            </TouchableOpacity>
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
    upIconStyle: {
        flex: 1, 
        textAlign: 'right', 
        paddingRight: 160, 
        alignItems: 'center', 
        paddingTop: 2
    },
    textStyle: {
        width: 60, 
        color: '#5D5D5B', 
        fontSize: 16
    },
    sectionTextStyle: {
        textAlign:'center',
        color:'#fff',
        fontWeight:'700',
        fontSize:16
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
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "black",
        fontSize: 18,
        paddingVertical: 10,
    }
});

export default connect(({currentUser, requirement})=> ({currentUser, requirement}))(AddRequirement);
