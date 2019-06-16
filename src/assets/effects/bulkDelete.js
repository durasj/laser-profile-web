import { API_URL } from "./index";
import { renewToken } from "./renewToken";

async function deleteRequest(endpoint, accessToken, id) {
    let response;
    try {
        response = await window.fetch(`${API_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
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

export async function bulkDelete(endpoint, ids) {
    let accessToken = localStorage.getItem('accessToken');

    for (const id of ids) {
        let response = await deleteRequest(endpoint, accessToken, id);

        if (response.status === 401) {
            // We try to renew the token
            accessToken = await renewToken();
            response = await deleteRequest(endpoint, accessToken, id);
        }

        if (response.status !== 200) {
            throw new Error('Error deleting.');
        }
    }
}
