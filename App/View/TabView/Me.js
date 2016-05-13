import React, { Component } from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    ScrollView,
    PixelRatio,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';
import { ImagePickerManager } from 'NativeModules';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { uploadFileAsync } from '../../Services/FileService';
import { BorderStyles, ButtonStyles, ImageStyles } from '../../Common/Styles';
import { Base, avatar_process } from '../../Common/Base';
import { 
    user_logout, 
    request_upload_avatar, 
    do_change_avatar 
} from '../../Redux/Actions/UserAction';

export default class Me extends Component {
    constructor(props) {
        super(props);
        
        this._selectImage = this._selectImage.bind(this);
    }
    
    _selectImage() {
        var options = {
            title: '选择照片', // specify null or empty string to remove the title
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
            chooseFromLibraryButtonTitle: '从相册中选择', // specify null or empty string to remove this button
            cameraType: '返回', // 'front' or 'back'
            mediaType: 'photo', // 'photo' or 'video'
            maxWidth: 108, // photos only
            maxHeight: 108, // photos only
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
                    source = response.uri;
                } else {
                    source = response.uri.replace('file://', '');
                }

                this.props.dispatch(request_upload_avatar());
                uploadFileAsync([{
                    name: 'files',
                    filename: source.slice(source.lastIndexOf('/') + 1),
                    filepath: source,
                }], this.props.entity.currentUser.user.token).then((response)=> JSON.parse(response.data))
                .then((json)=> {
                    if (json.error != 0) {
                        AlertIOS.alert('错误', getErrorsMessage(json.error));
                    } else {
                        let retData = json.retData;
                        images = retData.files.map((v)=> v.userfile_id);
                        console.info('change avatar', images[0]);
                        this.props.dispatch(do_change_avatar(images[0], this.props.entity.currentUser.user));
                    }
                    StatusBar.setBarStyle('light-content');
                })
            }
        });
    }
    
    render() {
        StatusBar.setBarStyle('light-content');
        let avatar = avatar_process(this.props.entity.currentUser.user.avatar, this.props.app.cdn_config);
        return (
            <View style={{flex: 1}}>
                <View style={{backgroundColor: '#36D17D', paddingTop: 20,}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 8}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{color: '#FFF', fontSize: 18, }}>我的</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Icon name='ios-bell' size={25} color='#FFF'/>
                            <TouchableOpacity onPress={()=> Actions.setting({app: this.props.app})}  style={{marginLeft: 10}}>
                                <Icon name='gear-a' size={25} color='#FFF'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView automaticallyAdjustContentInsets={false} bounces={false} style={{marginBottom: 45}}>
                    {/* Head start */}
                    <View style={{backgroundColor: '#36D17D', paddingBottom: 30}}>
                        <View style={styles.userInfo}>
                            <TouchableOpacity style={{marginRight: 20}} onPress={()=> this._selectImage()}>
                                <View style={[ImageStyles.avatarRound(55)]}>
                                    <Image style={ImageStyles.avatarRound(54)} source={avatar} />
                                </View>
                            </TouchableOpacity>
                            
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={{color: '#FFF', fontSize: 18, fontWeight: '500'}}>
                                    {this.props.entity.currentUser.user.name}
                                </Text>
                                <Text style={{color: '#FFF', marginVertical: 3,}}>
                                    @{this.props.entity.currentUser.user.atId}
                                </Text>
                                <Text style={{color: '#FFF'}}>
                                    {this.props.entity.currentUser.user.phone}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* Head end */}
                    {/* score start */}
                    <View style={[BorderStyles.bottom, {flexDirection: 'row', backgroundColor: '#FFF', }]}>
                        <View style={{paddingVertical: 15, flex: 1}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                                <Image style={{width: 18}} source={require('../../Resources/Images/Lv.png')}/>
                                <Text style={{color: '#F5A623'}}>{this.props.entity.currentUser.user.level || 0}</Text>
                            </View>
                            <Text style={styles.userInfoLevelText}>
                                我的等级
                            </Text>
                        </View>
                        <View style={{paddingVertical: 15, flex: 1,borderLeftColor: '#BDBDBD', borderLeftWidth: 1 / PixelRatio.get(), }}>
                            <Text style={{textAlign: 'center', color: '#F17C30', fontSize: 16}}>
                                {this.props.entity.currentUser.user.score || 0}<Text style={{fontSize: 13}}>分</Text>
                            </Text>
                            <Text style={styles.userInfoLevelText}>
                                我的积分
                            </Text>
                        </View>
                    </View>
                    {/* score end */}
                    {/* user info start */}
                    <View style={[BorderStyles.topAndBottom, styles.userArea]}>
                        <Text style={styles.areaTitle}>用户简介</Text>
                        <View style={[{flexDirection: 'row', padding: 12}, BorderStyles.top]}>
                            <Text style={{color: '#313131', flex: 1}}>
                                {this.props.entity.currentUser.user.profile || '用户未补充'}
                            </Text>
                            <TouchableOpacity onPress={()=> Actions.info_modify({ currentUser: this.props.entity.currentUser})} >
                                <Text style={{color: '#7C69E0'}}>修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* user info end */}
                    {/* user related start */}
                    <View style={[BorderStyles.topAndBottom, styles.userArea]}>
                        <Text style={styles.areaTitle}>帐号绑定</Text>
                        <View style={[styles.propertyItem, BorderStyles.top]}>
                            <Text style={styles.propertyItemIcon}>
                                <Icon name='iphone' size={24} color='#3378F3'/>
                            </Text>
                            <Text style={styles.propertyItemText}>
                                手机
                            </Text>
                            <Text style={{color: '#5F5F5F'}}>{this.props.entity.currentUser.user.phone || '未绑定'}</Text>
                        </View>
                        <View style={[styles.propertyItem, BorderStyles.top]}>
                            <Text style={styles.propertyItemIcon}>
                                <Icon name='email' size={22} color='#3378F3'/>
                            </Text>
                            <Text style={styles.propertyItemText}>
                                邮箱
                            </Text>
                            <Text style={{color: '#5F5F5F'}}>{this.props.entity.currentUser.user.email || '未绑定'}</Text>
                        </View>
                    </View>
                    {/* user related end */}
                    {/* user security start */}
                    <View style={[BorderStyles.topAndBottom, styles.userArea]}>
                        <Text style={styles.areaTitle}>安全设置</Text>
                        <View style={[{flexDirection: 'row', padding: 12}, BorderStyles.top]}>
                            <Text style={{color: '#313131', flex: 1}}>
                                登录密码
                            </Text>
                            <TouchableOpacity onPress={()=> Actions.password_reset({currentUser: this.props.entity.currentUser})} >
                                <Text style={{color: '#7C69E0'}}>修改</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* user security end */}
                    <View style={[ButtonStyles.itemBtnArea, {marginBottom: 15}]}>
                        <TouchableOpacity style={[ButtonStyles.primaryBtn, {width: Base.width * 0.9, }]}
                            onPress={()=> this.props.dispatch(user_logout())}>
                            <Text style={ButtonStyles.primaryBtnText}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userInfo: {
        flexDirection: 'row', 
        marginTop: 10, 
        marginHorizontal: 30, 
        alignItems: 'center'
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
    propertyItem: {
        flexDirection: 'row', 
        paddingHorizontal: 14, 
        paddingVertical: 8, 
        alignItems: 'center'
    },
    propertyItemIcon: {
        width: 20, 
        textAlign: 'center'
    },
    propertyItemText: {
        color: '#313131', 
        flex: 1, 
        marginLeft: 10, 
        marginBottom: 4
    },
})
