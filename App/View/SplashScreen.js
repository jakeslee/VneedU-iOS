import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';

import { Base } from '../Common/Base';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../App/Resources/Images/SplashScreen.jpg')} style={styles.splashImage} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    splashImage: {
        flex: 1,
        height: Base.height,
        width: Base.width,
    }
})

