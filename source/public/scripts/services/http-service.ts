class HttpService {
    async get(url) {
        const response = await fetch(url, this.#requestInit('GET'))
        return response.json();
    }

    async post(url, data): Promise<number> {
        const response = await fetch(url, this.#requestInit('POST', data))
        return response.status;
    }

    async put(url, data) {
        const response = await fetch(url, this.#requestInit('PUT', data))
        return response.status;
    }

    async delete(url): Promise<number> {
        const response = await fetch(url, this.#requestInit('DELETE'))
        return response.status;
    }

    #requestInit(method: string, data = null) {
        return { method: method, body: data === null ? undefined : JSON.stringify(data), headers: this.#fetchHeaders() };
    }

    #fetchHeaders() {
        return new Headers({'content-type': 'application/json'});
    }
}

const httpService = new HttpService();
export default httpService;