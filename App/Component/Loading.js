import React, { Component, PropTypes } from 'react';
import {View, Text, ActivityIndicatorIOS} from "react-native";
export default class Loading extends Component {
    static propTypes = {
        title: PropTypes.string,
        style: PropTypes.object,
    }
    
    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', height: 80, ...this.props.style}}>
                <ActivityIndicatorIOS animating={true} size="large"/>
                <Text style={{color: '#bbb', marginTop: 10,}}>
                    正在加载
                </Text>
            </View>
        )
    }
}
