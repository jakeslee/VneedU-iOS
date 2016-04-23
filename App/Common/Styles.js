import {
    StyleSheet
} from 'react-native';

import { border } from './Variables';
import { navigatorColor } from './Color';

const topBorderStyle = {
    borderTopColor: '#d8d8d8', 
        borderTopWidth: border.width,
};

const bottomBorderStyle = {
    borderBottomColor: '#d8d8d8', 
    borderBottomWidth: border.width,
}

export const BorderStyles = StyleSheet.create({
    top: topBorderStyle,
    bottom: bottomBorderStyle,
    topAndBottom: Object.assign({}, topBorderStyle, bottomBorderStyle),
});

export const ButtonStyles = StyleSheet.create({
    itemBtnArea: {
        marginTop: 10, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    primaryBtn: {
        backgroundColor: '#6AD072', 
        borderRadius: 2, 
        paddingVertical: 10
    },
    primaryBtnText: {
        textAlign: 'center', 
        color: '#FFF',
    },
});

export const InputStyles = StyleSheet.create({
    input: {
        height: 48, 
        backgroundColor: '#FFF', 
        paddingLeft: 20
    },
});

export const NavigatorStyles = StyleSheet.create({
    navigatorBar: {
        backgroundColor: navigatorColor.backgroundColor, 
        paddingTop: 30, 
        paddingLeft: 20, 
        paddingBottom: 10, 
        flexDirection: 'row',
        alignItems: 'center',
    }
});
