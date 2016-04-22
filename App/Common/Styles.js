import {
    StyleSheet
} from 'react-native';

import { border } from './Variables';

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
