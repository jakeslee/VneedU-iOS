
import React from "react";
import ReactNative from 'react-native';
import {Dimensions} from "react-native";

import API from '../Constants/API';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const Base = {
    width,
    height,
}

export function cdn_process(cdn_config, url = '') {
    let matches = (typeof url.match === 'function') ? url.match(/(.+):\//) : false;

    if (!matches) {
        console.warn('URL is illegal!');
        return url;
    }
    
    let proto = matches[0],
        bucket = matches[1];
    let baseUrl = cdn_config[bucket];

    if (baseUrl instanceof Array) {
        baseUrl = 'http://' + baseUrl[parseInt((Math.random() * 10) % baseUrl.length)];
    } else {
        baseUrl = 'http://' + baseUrl;
    }
    return url.replace(proto, baseUrl);
}

export function avatar_process(avatar, cdn_config) {
    var avatar_tmp = require('../Resources/Images/defaultAvatar.jpg');
    if (avatar) {
        if (cdn_config.cdn_enable) {
            let processed = cdn_process(cdn_config, avatar);
            avatar_tmp = processed == avatar ? avatar_tmp : { uri: cdn_process(cdn_config, avatar) };
        } else {
            let av = avatar.replace(/.*:\//, '');
            avatar_tmp = { uri: `${API.API_ROOT}/static${av}` };
        }
            
    }
    return avatar_tmp;
}

export let scrollTools = {
    scrollToInput: function(refName, scroll, event) {
        let node = ReactNative.findNodeHandle(this.refs[refName]);

        let extraHeight = 70;
        var t = setTimeout(()=> {
            this.refs[scroll].scrollToFocusedInput(event, node, extraHeight);
            clearTimeout(t);
        }, 100);
        
    },
    scrollBack: function(refName, scroll, event) {
        let node = ReactNative.findNodeHandle(this.refs[refName]);
        this.refs[scroll].scrollToFocusedInput(event, node, 0);
    }
}

