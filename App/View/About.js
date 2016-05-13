import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    StatusBar,
    ScrollView,
    PixelRatio,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import { Base } from '../Common/Base';
import { BorderStyles, ButtonStyles } from '../Common/Styles';
import NavigatorBar from '../Component/NavigatorBar';

export default class About extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <NavigatorBar title='关于威尼优' {...this.props} />
                <ScrollView bounces={false}>
                    <Image source={require('../Resources/Images/bgImg/about.png')} 
                        style={{alignItems: 'center', justifyContent: 'flex-end', width: Base.width, height: Base.height,
                        resizeMode: 'stretch'}}>
                        <Text style={{borderColor: '#979797', borderRadius: 5, borderWidth: 1 / PixelRatio.get(), textAlign: 'center', color: '#979797', width: 65}}>
                            v1.0.0
                        </Text>
                        <TouchableOpacity style={{marginTop: 150, marginBottom: 170}}>
                            <Text style={{fontSize: 20, color: '#303030'}}>
                                检查更新
                            </Text>
                        </TouchableOpacity>
                    </Image>
                </ScrollView>
            </View>
        )
    }
}
