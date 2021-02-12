const API_URL = 'https://api.github.com';

export default class HttpService {
    static async request({ method = 'GET', path, body }) {
        const url = `${API_URL}${path}`;
    
        const options = {
            method,
            headers: {
                ...(body && {
                    'Content-Type': 'application/json; charset=utf-8',
                }),
            },
            ...(body && {
                    body: JSON.stringify(body),
                }
            ),
        };
    
        return fetch(url, options);
    }
};
