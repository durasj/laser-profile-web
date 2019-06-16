import { API_URL } from "./index";

export async function renewToken() {
    const refreshToken = localStorage.getItem('refreshToken');

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

    const accessToken = (await renewResponse.json()).token;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
}
