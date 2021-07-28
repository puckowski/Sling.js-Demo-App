import { getState } from "../../js/sling.min";

const COOKIE_AUTHENTICATION_DATA = 'cookieAuthData';

class AuthenticationService {

    constructor() {

    }

    getIsAuthenticated() {
        const state = getState();
        const authService = state.getAuthenticationService();
        const authObj = authService.getAuthenticationCookie();

        if (authObj !== null && authObj !== undefined && authObj !== '') {
            return true;
        }

        return false;
    }

    getAuthenticationCookie() {
        return this.getCookie(COOKIE_AUTHENTICATION_DATA);
    }

    setAuthenticationCookie(authObj) {
        if (typeof authObj === 'string') {
            this.setCookie(COOKIE_AUTHENTICATION_DATA, authObj, 31);
        } else {
            this.setCookie(COOKIE_AUTHENTICATION_DATA, JSON.stringify(authObj), 31);
        }
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    getCookie(cname) {
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
}

export default AuthenticationService;
