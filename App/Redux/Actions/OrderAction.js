import {
    AlertIOS
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Types from '../../Constants/ActionTypes';

import {
    add_order,
    get_order,
    get_orders,
    create_order,
    cancel_order,
    check_order,
    finished_order,
} from '../../Services/OrderService'

import {
    load_req_detail
} from './RequirementAction';

import { getErrorsMessage } from '../../Constants/Errors';


function request_orders(append = false) {
    return {
        type: append ? Types.REQUEST_ORDERS : Types.REQUEST_ORDERS_APPEND,
    }
}

function request_order_add(isPosting = true) {
    return {
        type: Types.REQUEST_ORDER_ADD,
        isPosting,
    }
}

function request_order_detail() {
    return {
        type: Types.REQUEST_ORDER_DETAIL,
    }
}

function recv_orders(items, page, max_pages, append = false) {
    return {
        type: append ? Types.RECV_ORDERS_APPEND : Types.RECV_ORDERS,
        items,
        page,
        max_pages,
    }
}

function recv_order(content) {
    return {
        type: Types.RECV_ORDER_DETAIL,
        content,
    }
}

export function load_user_orders(current_user, page = 1) {
    return (dispatch)=> {
        dispatch(request_orders(page != 1));
        return get_orders(current_user.id, current_user.token, page, {
            expand: 'creator',
        }).then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(recv_orders(
                        json.retData.orders, json.retData.page.page, json.retData.page.max_pages, page != 1));
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            })
    }
}

export function load_order_detail(oid, current_user) {
    return (dispatch)=> {
        dispatch(request_order_detail())
        return get_order(oid, current_user.token, {
            expand: 'creator, user, requirement',
        }).then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(recv_order(json.retData.order));
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}

export function add_new_order(rid, current_user) {
    return (dispatch)=> {
        dispatch(request_order_add())
        return create_order(rid, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(request_order_add(false));
                    AlertIOS.alert('提示', '添加成功',[
                        {text: '确定', onPress: () => dispatch(load_req_detail(rid))},
                    ])
                    
                } else 
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}

export function do_cancel_order(oid, current_user) {
    return (dispatch)=> {
        dispatch(request_order_add());
        return cancel_order(oid, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(request_order_add(false));
                    Actions.pop();
                    dispatch(load_user_orders(current_user, 1));
                } else
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}

export function do_check_order(oid, current_user) {
    return (dispatch)=> {
        dispatch(request_order_add());
        return check_order(oid, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(request_order_add(false));
                    dispatch(load_order_detail(oid, current_user));
                } else
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}

export function do_finished_order(oid, current_user) {
    return (dispatch)=> {
        dispatch(request_order_add());
        return finished_order(oid, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                if (json.error === 0) {
                    dispatch(request_order_add(false));
                    dispatch(load_order_detail(oid, current_user));
                } else
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            });
    }
}

export function clr_order_detail() {
    return {
        type: Types.CLR_ORDER_DETAIL,
    }
}
