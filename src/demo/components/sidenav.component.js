import { getState, markup, setState, innerText } from '../../js/sling.min'

class SidenavComponent {

    constructor() {

    }

    toggleSidenav() {
        let state = getState();
        state.setSidenavOpen(!state.getSidenavOpen());
        setState(state);
    }

    toggleExport() {
        let state = getState();
        state.setExportOpen(!state.getExportOpen());
        setState(state);
    }

    view() {
        let state = getState();

        return markup('div', {
            attrs: {
                id: 'divSidenav',
                ...state.getSidenavOpen() === false && { class: 'sidenav' },
                ...state.getSidenavOpen() === true && { class: 'sidenav sidenav-open' },
            },
            children: [
                markup('div', {
                    attrs: {
                        class: 'bottom-sheet-controls'
                    },
                    children: [
                        markup('i', {
                            attrs: {
                                class: 'fa fa-close',
                                onclick: this.toggleSidenav
                            }
                        })
                    ]
                }),
                markup('div', {
                    attrs: {
                        class: 'sidenav-content'
                    }, 
                    children: [
                        markup('button', {
                            attrs: {
                                style: 'width: 100%;',
                                onclick: this.toggleExport,
                                class: 'pure-button'
                            },
                            children: [
                                innerText('Export Data')
                            ] 
                        })
                    ]
                })
            ]
        });
    }

}

export default SidenavComponent;