
import {Dimensions} from 'react-native';

import API from '../Constants/API';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const Base = {
    width,
    height,
}

export function avatar_process(avatar, cdnRoot) {
    var avatar_tmp = require('../Resources/Images/defaultAvatar.jpg');
    if (avatar) {
        if (cdnRoot) {
            avatar_tmp = `${cdnRoot}/${avatar}`;
        }
        avatar_tmp = `${API.API_ROOT}/static/${avatar}`;
    }
    return avatar_tmp;
}

