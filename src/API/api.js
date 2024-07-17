const BASE_URL = 'http://localhost:8080';

const apiCall = async (endpoint, method = 'GET', body = null, headers = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export default apiCall;
