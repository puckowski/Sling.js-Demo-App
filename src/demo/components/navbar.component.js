class NavbarComponent {

    constructor() {
        this.route = '';
    }

    slOnInit() {
       let routeObservable = s.Observable(s.getRouteSegments());
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
        s.route(routeString);

        switch(routeString) {
            case 'about': {
                let state = s.getState();
                state.setBottomSheetOpen(true);
                s.setState(state);

                break;
            }
            case '': {
                let state = s.getState();
                state.setBottomSheetOpen(false);
                s.setState(state);
            }
        }

        this.route = routeString;
    }

    view() {
        return s.markup('div', {
            attrs: {
                id: 'divNavbar'
            }, 
            children: [
                s.markup('nav', {
                    attrs: {
                        class: 'navbar navbar-expand-lg navbar-light bg-light'
                    },
                    children: [
                        s.markup('a', {
                            attrs: {
                                class: 'navbar-brand',
                                href: '#'
                            },
                            children: [
                                s.textNode('Demo App')
                            ]
                        }),
                        s.markup('button', {
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
                                s.markup('span', {
                                    attrs: {
                                        class: 'navbar-toggler-icon'
                                    }
                                })
                            ]
                        }),
                        s.markup('div', {
                            attrs: {
                                class: 'collapse navbar-collapse',
                                id: 'navbarNavAltMarkup'
                            },
                            children: [
                                s.markup('div', {
                                    attrs: {
                                        class: 'navbar-nav'
                                    },
                                    children: [
                                        s.markup('a', {
                                            attrs: {
                                                ...this.route === '' && { class: 'nav-item nav-link active' },
                                                ...this.route !== '' && { class: 'nav-item nav-link' },
                                                onclick: this.navigate.bind(this, ''),
                                                style: 'cursor:pointer;'
                                            },
                                            children: [
                                                s.textNode('Home')
                                            ]
                                        }),
                                        s.markup('a', {
                                            attrs: {
                                                ...this.route === 'part-supply' && { class: 'nav-item nav-link active' },
                                                ...this.route !== 'part-supply' && { class: 'nav-item nav-link' },
                                                style: 'cursor:pointer;'
                                            },
                                            children: [
                                                s.textNode('Part Supply')
                                            ]
                                        }),
                                        s.markup('a', {
                                            attrs: {
                                                ...this.route === 'about' && { class: 'nav-item nav-link active' },
                                                ...this.route !== 'about' && { class: 'nav-item nav-link' },
                                                onclick: this.navigate.bind(this, 'about'),
                                                style: 'cursor:pointer;'
                                            },
                                            children: [
                                                s.textNode('About')
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