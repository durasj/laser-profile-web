import { API_URL } from "./index";
import { renewToken } from "./renewToken";

async function listRequest(endpoint, accessToken) {
    let response;
    try {
        response = await window.fetch(`${API_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
    } catch (e) {
        throw new Error(`Error: ${e.message}`);
    }

    return response;
}

export async function list(endpoint) {
    let accessToken = localStorage.getItem('accessToken');

    let response = await listRequest(endpoint, accessToken);

    if (response.status === 401) {
        // We try to renew the token
        accessToken = await renewToken();
        response = await listRequest(endpoint, accessToken);
    }

    if (response.status !== 200) {
        throw new Error('Error getting the list of data.');
    }

    return (await response.json());
}
