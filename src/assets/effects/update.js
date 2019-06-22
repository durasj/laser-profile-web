import { API_URL } from "./index";
import { renewToken } from "./renewToken";

async function updateRequest(endpoint, accessToken, id, data) {
    let response;
    try {
        response = await window.fetch(`${API_URL}/${endpoint}/${id}`, {
            method: 'PATCH',
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

export async function update(endpoint, id, data) {
    let accessToken = localStorage.getItem('accessToken');

    let response = await updateRequest(endpoint, accessToken, id, data);

    if (response.status === 401) {
        // We try to renew the token
        accessToken = await renewToken();
        response = await updateRequest(endpoint, accessToken, id, data);
    }

    if (response.status !== 200) {
        throw new Error(`Error creating: "${response.statusText}".`);
    }
}
