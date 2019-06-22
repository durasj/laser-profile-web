import { API_URL } from "./index";
import { renewToken } from "./renewToken";

async function createRequest(endpoint, accessToken, data) {
    let response;
    try {
        response = await window.fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(data),
        });
    } catch (e) {
        throw new Error(`Error: ${e.message}`);
    }

    return response;
}

export async function create(endpoint, data) {
    let accessToken = localStorage.getItem('accessToken');

    let response = await createRequest(endpoint, accessToken, data);

    if (response.status === 401) {
        // We try to renew the token
        accessToken = await renewToken();
        response = await createRequest(endpoint, accessToken, data);
    }

    if (response.status !== 200) {
        throw new Error(`Error creating: "${response.statusText}".`);
    }
}
