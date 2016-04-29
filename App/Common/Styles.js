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
    imageAround: {
        borderWidth: 0.5, 
        borderColor: '#E1E1E1',
        overflow: 'hidden',
    },
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

export const ImageStyles = {
    avatarRound: (radius) => {
        return {
            width: radius, 
            height: radius, 
            borderRadius: radius/2, 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#FFF',
            overflow: 'hidden',
        }
    },
};

export const NavigatorStyles = StyleSheet.create({
    navigatorContainer: {
        flex: 1, 
        backgroundColor: navigatorColor.containerBackground,
    },
    navigatorBar: {
        backgroundColor: navigatorColor.backgroundColor, 
        paddingTop: 30, 
        paddingLeft: 20, 
        paddingBottom: 10, 
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export const ContentStyles = StyleSheet.create({
    propertyArea: {
        backgroundColor: '#FFF', 
        marginTop: 4, 
        flexDirection: 'column',
    },
    propertyTitle: {
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
});
