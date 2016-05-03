
function makeParams(params = {}) {
    return Object.keys(params).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&');
}

export function get(url, params = {}, headers = {}) {
    let queries = makeParams(params);
    
    return fetch(`${url}?${queries}`, {
        method: 'GET',
        headers: headers,
    });
}

export function post(url, params, headers = {}) {
    return fetch(url, {
        method: 'POST',
        headers: Object.assign({}, headers, {
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: makeParams(params),
    });
}

export function put(url, params, headers = {}) {
    return fetch(url, {
        method: 'PUT',
        headers: Object.assign({}, headers, {
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: makeParams(params),
    });
}

export function Delete(url, { params, headers } = {}) {
    return fetch(url, {
        method: 'DELETE',
        headers: Object.assign({}, headers, {
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: makeParams(params || {}),
    });
}
