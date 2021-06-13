import { markup, innerText, version } from '../../js/sling.min'

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
                        markup('span', {
                            children: [
                                innerText('This is a demo SPA created using the Sling.js JavaScript framework by Daniel Puckowski.')
                            ]
                        }),
                        markup('br'),
                        markup('span', {
                            children: [
                                innerText('Using Sling.js version ' + version())
                            ]
                        }),
                        markup('br'),
                        markup('a', {
                            attrs: {
                                href: 'https://github.com/puckowski/Sling.js',
                                target: '_blank'
                            },
                            children: [
                                innerText('Sling.js on GitHub')
                            ]
                        })
                    ]
                })
            ]
        });
    }

}

export default AboutAppComponent;