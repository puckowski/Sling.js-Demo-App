import { FormControl } from '../../js/sling-reactive.min';
import { getState, markup, route, setState, textNode } from '../../js/sling.min'

class LoginComponent {

    constructor() {
        this.usernameControl = FormControl('');
        this.passwordControl = FormControl('');
        this.usernameMessage = '';
        this.passwordMessage = '';
        this.initializeValidators();
    }

    slOnInit() {
        this.usernameMessage = '';
        this.passwordMessage = '';
        this.usernameControl.setValue('');
        this.passwordControl.setValue('');
        this.usernameControl.setPristine();
        this.passwordControl.setPristine();

        this.loginIfAuthenticated();
    }

    initializeValidators() {
        const hasUsername = (value) => {
            if (value && value !== '') {
                return null;
            } else {
                return { required: 'Username is required' }
            }
        }
        this.usernameControl.setValidators([hasUsername]);

        const hasPassword = (value) => {
            if (value && value !== '') {
                return null;
            } else {
                return { required: 'Password is required' }
            }
        }

        const passwordLength = (value) => {
            if (value && value.length < 5) {
                return { minLength: 'Password must be at least 5 characters' }
            } else {
                return null;
            }
        }

        this.passwordControl.setValidators([hasPassword, passwordLength]);
    }

    updateUsername(event) {
        this.usernameControl.setValue(event.target.value);
    }

    updatePassword(event) {
        this.passwordControl.setValue(event.target.value);
    }

    loginIfAuthenticated() {
        const state = getState();
        const authService = state.getAuthenticationService();

        if (authService.getIsAuthenticated()) {
            s.DETACHED_SET_TIMEOUT(() => {
                this.login();
            }, 0);
        }
    }

    authenticateWithService() {
        const state = getState();
        const authService = state.getAuthenticationService();
        authService.setAuthenticationCookie({ user: 'admin', password: 'password' });
    }

    login() {
        route('');
    }

    onLogin() {
        this.usernameMessage = '';
        this.passwordMessage = '';

        const usernameValid = this.usernameControl.getValid();
        const passwordValid = this.passwordControl.getValid();

        if (usernameValid && passwordValid) {
            this.authenticateWithService();
            this.login();
        }

        if (!usernameValid) {
            const usernameErrors = this.usernameControl.getErrors();
            const firstError = usernameErrors[0];
            const errorKeys = Object.keys(firstError);
            this.usernameMessage = firstError[errorKeys[0]];
        }

        if (!passwordValid) {
            const passwordErrors = this.passwordControl.getErrors();
            const firstError = passwordErrors[0];
            const errorKeys = Object.keys(firstError);
            this.passwordMessage = firstError[errorKeys[0]];
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet',
                class: 'div-login'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'width: 50%;'
                    },
                    children: [
                        markup('div', {
                            attrs: {
                                class: 'dialog-header'
                            },
                            children: [
                                markup('h3', {
                                    children: [
                                        textNode('Welcome')
                                    ]
                                })
                            ]
                        }),
                        markup('div', {
                            attrs: {
                                style: 'display: block;'
                            },
                            children: [
                                markup('label', {
                                    attrs: {
                                        style: 'width:20%;',
                                    },
                                    children: [
                                        textNode('Username:')
                                    ]
                                }),
                                markup('input', {
                                    attrs: {
                                        style: 'width: 80%;',
                                        oninput: this.updateUsername.bind(this)
                                    }
                                })
                            ]
                        }),
                        ...(this.usernameMessage !== '' ? [markup('div', {
                            attrs: {
                                style: 'color: red;text-align: center;'
                            },
                            children: [
                                textNode(this.usernameMessage)
                            ]
                        })] : []),
                        markup('div', {
                            attrs: {
                                style: 'display: block;'
                            },
                            children: [
                                markup('label', {
                                    attrs: {
                                        style: 'width:20%;',
                                    },
                                    children: [
                                        textNode('Password:')
                                    ]
                                }),
                                markup('input', {
                                    attrs: {
                                        style: 'width: 80%;',
                                        oninput: this.updatePassword.bind(this)
                                    }
                                })
                            ]
                        }),
                        ...(this.passwordMessage !== '' ? [markup('div', {
                            attrs: {
                                style: 'color: red;text-align: center;'
                            },
                            children: [
                                textNode(this.passwordMessage)
                            ]
                        })] : []),
                        markup('div', {
                            attrs: {
                                style: 'display: block;'
                            },
                            children: [
                                markup('button', {
                                    attrs: {
                                        style: 'width: 100%;',
                                        onclick: this.onLogin.bind(this),
                                        class: 'pure-button'
                                    },
                                    children: [
                                        textNode('Login')
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    }

}

export default LoginComponent;