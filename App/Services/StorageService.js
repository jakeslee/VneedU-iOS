import {
    AsyncStorage
} from 'react-native';

export function loadFromStorage(item) {
    return AsyncStorage.getItem(item);
}

export function saveToStorage(key, value) {
    return AsyncStorage.setItem(key, value);
}

export function removeFromStorage(key) {
    return AsyncStorage.removeItem(key);
}
