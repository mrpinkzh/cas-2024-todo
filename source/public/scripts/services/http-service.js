class HttpService {
    async ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        const response = await fetch(url, {
            method,
            headers: fetchHeaders, body: JSON.stringify(data)
        })
        return response.json();
    }

    async get(url, data, headers) {
        return this.ajax('get', url, data, headers);
    }

    async post(url, data, headers) {
        return this.ajax('post', url, data, headers);
    }
}

const httpService = new HttpService();
export default httpService;