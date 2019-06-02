const API_URL = 'http://localhost:8080/api';

export async function login(email, password) {
    const response = await window.fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (response.status === 401) {
        throw new Error('Wrong email or password.');
    }

    if (response.status !== 200) {
        throw new Error('Something went wrong. Please try it again.');
    }

    const refreshToken = (await response.json()).token;
    localStorage.setItem('refreshToken', refreshToken);

    const tokenResponse = await window.fetch(`${API_URL}/token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        },
    });

    if (tokenResponse.status !== 200) {
        throw new Error('Something went wrong. Please try it again.');
    }

    const data = await tokenResponse.json();
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data.user;
}
