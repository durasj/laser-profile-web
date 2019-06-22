export function getLogged() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
}
