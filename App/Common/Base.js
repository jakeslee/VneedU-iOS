
import {Dimensions} from 'react-native';

import API from '../Constants/API';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const Base = {
    width,
    height,
}

export function cdn_process(cdn_config, url = '') {
    let matches = url.match(/(.+):\//);

    if (!matches) {
        console.warn('URL is illegal!');
        return url;
    }
    
    let proto = matches[0],
        bucket = matches[1];
    let baseUrl = `http://${cdn_config[bucket]}`;

    if (typeof baseUrl === 'array') {
        baseUrl = baseUrl[parseInt((Math.random() * 10) % baseUrl.length)];
    }
    return url.replace(proto, baseUrl);
}

export function avatar_process(avatar, cdn_config) {
    var avatar_tmp = require('../Resources/Images/defaultAvatar.jpg');
    if (avatar) {
        if (cdn_config.cdn_enable) {
            avatar_tmp = { uri: cdn_process(cdn_config, avatar) };
        } else {
            let av = avatar.replace(/.*:\//, '');
            avatar_tmp = { uri: `${API.API_ROOT}/static${av}` };
        }
            
    }
    return avatar_tmp;
}

