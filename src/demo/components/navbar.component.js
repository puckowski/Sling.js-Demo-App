class NavbarComponent {

    constructor() {

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
                                                class: 'nav-item nav-link active',
                                                href: '#'
                                            },
                                            children: [
                                                s.textNode('Home')
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