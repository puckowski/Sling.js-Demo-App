class AboutAppComponent {

    constructor() {

    }

    view() {
        return s.markup('div', {
            attrs: {
                id: 'divSheetContent'
            },
            children: [
                s.markup('div', {
                    attrs: {
                        style: 'padding:0px 1rem;'
                    },
                    children: [
                        s.textNode('This is a demo SPA created using the Sling.js JavaScript framework by Daniel Puckowski.'),
                        s.markup('br'),
                        s.textNode('Using Sling.js version ' + s.version),
                        s.markup('br'),
                        s.markup('a', {
                            attrs: {
                                href: 'https://github.com/puckowski/Sling.js',
                                target: '_blank'
                            },
                            children: [
                                s.textNode('Sling.js on GitHub')
                            ]
                        })
                    ]
                })
            ]
        });
    }

}

export default AboutAppComponent;