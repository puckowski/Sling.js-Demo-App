import { markup, getState, textNode, setState, route, getRouteSegments, detectChanges } from '../../js/sling.min'
import { Observable } from '../../js/sling-reactive.min'

class NavbarComponent {

    constructor() {
        this.route = '';
    }

    applyNavbarClassesForHome() {
        document.querySelectorAll('.nav-item').forEach((node, index) => {
            switch (node.textNode) {
                case 'Home': {
                    node.classList.add('active');

                    break;
                }
                default: {
                    node.classList.remove('active');

                    break;
                }
            }
        });
    }

    applyNavbarClassesForRoute(arr) {
        document.querySelectorAll('.nav-item').forEach((node, index) => {
            switch (node.textNode) {
                case 'Part Supply': {
                    if (arr[0] === 'part-supply') {
                        node.classList.add('active');
                    }
                    else {
                        node.classList.remove('active');
                    }

                    break;
                }
                case 'About': {
                    if (arr[0] === 'about') {
                        node.classList.add('active');
                    }
                    else {
                        node.classList.remove('active');
                    }

                    break;
                }
                case 'Home': {
                    node.classList.remove('active');

                    break;
                }
            }
        });
    }

    slOnInit() {
        let routeObservable = Observable(getRouteSegments());
        routeObservable.subscribe(function (arr) {
            if (arr.length > 0) {
                this.route = arr[0];

                this.applyNavbarClassesForRoute(arr);
            }
            else {
                this.route = '';

                this.applyNavbarClassesForHome();
            }
        }.bind(this));
    }

    navigate(routeString) {
        route(routeString);

        switch (routeString) {
            case 'about': {
                let state = getState();
                state.setBottomSheetOpen(true);
                setState(state);

                break;
            }
            case '': {
                let state = getState();
                state.setBottomSheetOpen(false);
                setState(state);
            }
        }

        this.route = routeString;
    }

    toggleSidenav() {
        const routeSegments = getRouteSegments();

        if (routeSegments && routeSegments[0] !== 'login') {
            let state = getState();
            state.setSidenavOpen(!state.getSidenavOpen());
            setState(state);
            detectChanges();
        }
    }

    isLoginRoute() {
        const routeSegments = getRouteSegments();

        if (routeSegments && routeSegments[0] === 'login') {
            return true;
        } else {
            return false;
        }
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divNavbar',
            },
            children: [
                markup('nav', {
                    attrs: {
                        class: 'navbar navbar-expand-lg navbar-light bg-light'
                    },
                    children: [
                        ...(this.isLoginRoute() === false ? [
                            markup('i', {
                                attrs: {
                                    style: 'padding: 0px 0.5rem;cursor: pointer;',
                                    class: 'fa fa-bars',
                                    onclick: this.toggleSidenav
                                }
                            })
                        ] : []),
                        markup('a', {
                            attrs: {
                                class: 'navbar-brand',
                                href: '#'
                            },
                            children: [
                                textNode('Demo App')
                            ]
                        }),
                        markup('button', {
                            attrs: {
                                class: 'navbar-toggler',
                                type: 'button',
                                "data-toggle": 'collapse',
                                "data-target": '#navbarNavAltMarkup',
                                "aria-controls": 'navbarNavAltMarkup',
                                "aria-expanded": 'false',
                                "aria-label": 'Toggle navigation'
                            },
                            children: [
                                markup('span', {
                                    attrs: {
                                        class: 'navbar-toggler-icon'
                                    }
                                })
                            ]
                        }),
                        markup('div', {
                            attrs: {
                                class: 'collapse navbar-collapse',
                                id: 'navbarNavAltMarkup',
                                slNoChanges: 'true'
                            },
                            children: [
                                ...(this.isLoginRoute() === false ? [
                                    markup('div', {
                                        attrs: {
                                            class: 'navbar-nav'
                                        },
                                        children: [
                                            markup('a', {
                                                attrs: {
                                                    ...this.route === '' && { class: 'nav-item nav-link active' },
                                                    ...this.route !== '' && { class: 'nav-item nav-link' },
                                                    onclick: this.navigate.bind(this, ''),
                                                    style: 'cursor:pointer;'
                                                },
                                                children: [
                                                    textNode('Home')
                                                ]
                                            }),
                                            markup('a', {
                                                attrs: {
                                                    ...this.route === 'part-supply' && { class: 'nav-item nav-link active' },
                                                    ...this.route !== 'part-supply' && { class: 'nav-item nav-link' },
                                                    style: 'cursor:pointer;'
                                                },
                                                children: [
                                                    textNode('Part Supply')
                                                ]
                                            }),
                                            markup('a', {
                                                attrs: {
                                                    ...this.route === 'about' && { class: 'nav-item nav-link active' },
                                                    ...this.route !== 'about' && { class: 'nav-item nav-link' },
                                                    onclick: this.navigate.bind(this, 'about'),
                                                    style: 'cursor:pointer;'
                                                },
                                                children: [
                                                    textNode('About')
                                                ]
                                            })
                                        ]
                                    })
                                ] : []),
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default NavbarComponent;