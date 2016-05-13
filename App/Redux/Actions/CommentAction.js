import {
    AlertIOS
} from 'react-native';
import {
    post_req_discussion,
    fetch_req_discussions,
} from '../../Services/RequirementService';
import Types from '../../Constants/ActionTypes';
import { getErrorsMessage } from '../../Constants/Errors';

function request_discussions(isFetching = true) {
    return {
        type: Types.REQUEST_REQ_DISCUSSIONS,
        isFetching,
    }
}

function recv_discussions(data, page, max_pages) {
    return {
        type: Types.RECV_DISCUSSIONS,
        data,
        page,
        max_pages,
    }
}

function request_post_discussion(isPosting = true) {
    return {
        type: Types.REQUEST_POST_DISCUSSION,
        isPosting,
    }
}

export function clr_discussions() {
    return {
        type: Types.CLR_REQ_DETAIL,
    }
}

export function load_discussions(rid) {
    return (dispatch)=> {
        dispatch(request_discussions());
        return fetch_req_discussions(rid, {
            expand: 'sender'
        }).then((response)=> response.json())
            .then((json)=> {
                dispatch(request_discussions(false));
                if (json.error === 0) {
                    dispatch(recv_discussions(
                        json.retData.discussions, json.retData.page.page, json.retData.page.max_pages));
                } else
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            }).catch((reason)=> {
                console.log(reason);
                dispatch(request_discussions(false));
                AlertIOS.alert('错误', '操作失败');
            });
    }
}

export function post_comment(rid, value, current_user) {
    return (dispatch)=> {
        dispatch(request_post_discussion());
        return post_req_discussion(rid, value, current_user.token)
            .then((response)=> response.json())
            .then((json)=> {
                dispatch(request_post_discussion(false));
                if (json.error === 0) {
                    AlertIOS.alert('提示', '添加成功！', [
                        {text: '确定', onPress: () => {
                            dispatch(load_discussions(rid));
                        }}
                    ])
                } else
                    AlertIOS.alert('错误', getErrorsMessage(json.error));
            }).catch((reason)=> {
                console.log(reason);
                dispatch(request_post_discussion(false));
                AlertIOS.alert('错误', '操作失败');
            });
    }
}
