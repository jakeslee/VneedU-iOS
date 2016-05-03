const COMMON_ERRORS = {
    1000: '请求的资源不存在',
}

const REQUIREMENT_ERRORS = {
    2000: '分类ID不存在',
    2001: '必填字段不可为空',
    2002: '不能重复赞',
    2003: '需求不存在',
    2004: '该需求的状态无法创建订单',
    2005: '价格必须大于0',
    2006: '支付方式不正确',
};

const FILE_ERRORS = {
    3000: '用户文件ID错误或文件不存在',
    3001: '不允许上传的类型',
    3002: '上传的文件过大',
    3003: '检索的文件类型不被允许',
};

const USER_ERRORS = {
    4000: '手机号必须提供',
    4001: '手机号已被注册',
    4002: '密码不能为空',
    4003: '密码长度不符合要求',
    4004: '手机号错误',
    4005: '该操作不允许',
    4006: '验证码错误',
    4007: '标识已存在',
    4008: '保存失败',
};

const AUTH_ERRORS = {
    5000: '用户授权失效',
    5001: '用户未授权',
    5002: '操作不允许',
    5003: '请求头授权字段错误',
    5004: 'TOKEN错误',
    5005: '授权密码错误',
};

export function getErrorsMessage(code) {
    console.log(code, code/1000)
    switch (parseInt(code/1000)) {
        default:
        case 1: return COMMON_ERRORS[code];
        case 2: return REQUIREMENT_ERRORS[code];
        case 3: return FILE_ERRORS[code];
        case 4: return USER_ERRORS[code];
        case 5: return AUTH_ERRORS[code];
    }
}
