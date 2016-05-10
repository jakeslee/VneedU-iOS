export const API_ROOT = 'http://192.168.32.223:8080';

export const API_FREFIX = '/api/v1.0';

export default {
    API_ROOT,
    API_FREFIX,
    REGIST_USER: `${API_FREFIX}/user`,
    LOGIN: `${API_FREFIX}/user/authorization`,
    PASSWORD: `${API_FREFIX}/user/password`,
    REQUIREMENT: `${API_FREFIX}/requirement`,
    LATEST_REQUIEMENT: `${API_FREFIX}/requirement/latest`,
    UPLOAD:  `${API_FREFIX}/file/upload`,
    RACE_UP: `${API_FREFIX}/requirement/nice`,
    POST_REQ_DISCUSSION: `${API_FREFIX}/requirement/discussion`,
    REQUIREMENT_DISCUSSIONS: `${API_FREFIX}/requirement/discussions`,
    REQUIREMENT_SEARCH: `${API_FREFIX}/requirement/search`,
    ORDER: `${API_FREFIX}/order`,
}
