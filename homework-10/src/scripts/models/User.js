export default class User {
    static load() {
        return JSON.parse(window.localStorage.getItem('last-user'));
    }
    
    static save(userData) {
        window.localStorage.setItem('last-user', JSON.stringify(userData));
    }
};
