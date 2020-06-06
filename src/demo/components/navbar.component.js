import { route, getRouteSegments } from '../../js/sling-router.min'
import { markup, getState, textNode, setState } from '../../js/sling.min'
import { Observable } from '../../js/sling-reactive.min'

class NavbarComponent {

    constructor() {
        this.route = '';
    }

    slOnInit() {
       let routeObservable = Observable(getRouteSegments());
       routeObservable.subscribe(function(arr) {
            if (arr.length > 0) {
                this.route = arr[0];
            }
            else {
                this.route = '';
            }
       }.bind(this));
    }

    navigate(routeString) {
        route(routeString);

        switch(routeString) {
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

    view() {
        return markup('div', {
            attrs: {
                id: 'divNavbar'
            }, 
            children: [
                markup('nav', {
                    attrs: {
                        class: 'navbar navbar-expand-lg navbar-light bg-light'
                    },
                    children: [
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
                                id: 'navbarNavAltMarkup'
                            },
                            children: [
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
                            ]
                        })
                    ]
                })
            ]
        });
    }
}

export default NavbarComponent;