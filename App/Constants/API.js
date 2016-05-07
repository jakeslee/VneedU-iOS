export const API_ROOT = 'http://127.0.0.1:8080';

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
}
