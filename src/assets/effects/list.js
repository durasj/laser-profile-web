import { API_URL } from "./index";

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
    const refreshToken = localStorage.getItem('refreshToken');
    let accessToken = localStorage.getItem('accessToken');

    let response = await listRequest(endpoint, accessToken);

    if (response.status === 401) {
        // We try to renew the token
        let renewResponse;
        try {
            renewResponse = await window.fetch(`${API_URL}/token`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`,
                },
            });
        } catch (e) {
            throw new Error(`Error: ${e.message}`);
        }

        if (renewResponse.status !== 200) {
            throw new Error('Error renewing the session. Please try to log out and log in.');
        }

        accessToken = (await renewResponse.json()).token;
        localStorage.setItem('accessToken', accessToken);

        response = await listRequest(endpoint, accessToken);
    }

    if (response.status !== 200) {
        throw new Error('Error getting the list of data.');
    }

    return (await response.json());
}
