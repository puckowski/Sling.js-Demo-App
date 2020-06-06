import { markup, textNode } from '../../js/sling.min'

class AboutAppComponent {

    constructor() {

    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divSheetContent'
            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'padding:0px 1rem;'
                    },
                    children: [
                        textNode('This is a demo SPA created using the Sling.js JavaScript framework by Daniel Puckowski.'),
                        markup('br'),
                        textNode('Using Sling.js version ' + s.version),
                        markup('br'),
                        markup('a', {
                            attrs: {
                                href: 'https://github.com/puckowski/Sling.js',
                                target: '_blank'
                            },
                            children: [
                                textNode('Sling.js on GitHub')
                            ]
                        })
                    ]
                })
            ]
        });
    }

}

export default AboutAppComponent;