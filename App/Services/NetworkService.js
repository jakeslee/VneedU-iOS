
/* @flow */
function makeParams(params) {
    var formData = new FormData();
    
    for (var k in params) {
        formData.append(k, params[k]);
    }
    return formData;
}

export function get(url, params = {}, headers = {}) {
    let queries = Object.keys(params).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
    
    return fetch(`${url}?${queries}`, {
        method: 'GET',
        headers: headers,
    });
}

export function post(url, params, headers = {}) {
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: makeParams(params),
    });
}

export function put(url, params, headers = {}) {
    return fetch(url, {
        method: 'PUT',
        headers: headers,
        body: makeParams(params),
    });
}

export function Delete(url, { params, headers } = {}) {
    return fetch(url, {
        method: 'DELETE',
        headers: headers || {},
        body: makeParams(params || {}),
    });
}
