s.request = function (url, method, options = {}) {

    // Create the XHR request
    var request = new XMLHttpRequest();

    // Return it as a Promise
    return new Promise(function (resolve, reject) {

        // Setup our listener to process compeleted requests
        request.onreadystatechange = function () {

            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            } else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }

        };

        // Setup our HTTP request
        request.open(method || 'GET', url, true);
        request.setRequestHeader('Content-Type', options.contentType || 'application/json');
        request.timeout = options.timeout || 0;
        request.withCredentials = options.withCredentials || false;

        // Set request headers
        if (options.header) {
            for (let [k, v] of Object.entries(options.headers)) {
                request.setRequestHeader(k, v);
            }
        }

        // Send the request
        if (options.body) {
            request.send(options.body);
        } else {
            request.send();
        }
    });
}

const requestWithBody = (url, method, bodyObj = {}) => {
    let options = { body: bodyObj };
    return s.request(url, method, options);
}

s.get = (url, bodyObj = {}) => {
    return requestWithBody(url, 'GET', bodyObj);
}

s.post = (url, bodyObj = {}) => {
    return requestWithBody(url, 'POST', bodyObj);
}

s.put = (url, bodyObj = {}) => {
    return requestWithBody(url, 'PUT', bodyObj);
}

s.patch = (url, bodyObj = {}) => {
    return requestWithBody(url, 'PATCH', bodyObj);
}

s.delete = (url, bodyObj = {}) => {
    return requestWithBody(url, 'DELETE', bodyObj);
}
