import { NativeModules } from 'react-native';
const RNUploader = NativeModules.RNUploader;
import API from '../Constants/API';

export function uploadFileAsync(files = [], token = '') {
    var obj = {
        url: `${API.API_ROOT}${API.UPLOAD}`,
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
            'Accept': 'application/json',
            Authorization: 'token ' + token,
        },
        files: files,
    };
    return new Promise(function(resolve, reject) {
        RNUploader.upload(obj, (err, response) => {
            if (err) return reject(err);
            resolve(response);
        });
    });
}
