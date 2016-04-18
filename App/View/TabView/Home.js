'use strict';

import React, {
    Component,
    StyleSheet,
    View,
    Text,
} from 'react-native'

import HeaderBar from '../../Component/HeaderBar';

export default class Home extends Component {
    
    render() {
        return (
            <View>
                <HeaderBar />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
});
