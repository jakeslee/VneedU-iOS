export const API_ROOT = 'http://192.168.32.223:8080';

export const API_FREFIX = '/api/v1.0';

export default {
    API_ROOT,
    API_FREFIX,
    REGIST_USER: `${API_FREFIX}/user`,
    LOGIN: `${API_FREFIX}/user/authorization`,
    PASSWORD: `${API_FREFIX}/user/password`,
    REQUIREMENT: `${API_FREFIX}/requirement`,
    USER_REQUIREMENTS: `${API_FREFIX}/user/requirements`,
    USER_JUDGEMENTS:  `${API_FREFIX}/user/judgements`,
    LATEST_REQUIEMENT: `${API_FREFIX}/requirement/latest`,
    UPLOAD:  `${API_FREFIX}/file/upload`,
    RACE_UP: `${API_FREFIX}/requirement/nice`,
    POST_REQ_DISCUSSION: `${API_FREFIX}/requirement/discussion`,
    REQUIREMENT_DISCUSSIONS: `${API_FREFIX}/requirement/discussions`,
    REQUIREMENT_SEARCH: `${API_FREFIX}/requirement/search`,
    ORDER: `${API_FREFIX}/order`,
    ORDERS: `${API_FREFIX}/orders`,
    ORDER_CANCEL: `${API_FREFIX}/order/cancel`,
    ORDER_CHECK: `${API_FREFIX}/order/check`,
    ORDER_FINISHED: `${API_FREFIX}/order/finished`,
    ORDER_JUDGEMENT: `${API_FREFIX}/order/judgement`,
}
