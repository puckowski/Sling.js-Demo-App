import { getState, markup, setState, textNode } from '../../js/sling.min'

class ExportDialogComponent {

    constructor() {

    }

    toggleDialog() {
        let state = getState();
        state.setExportOpen(!state.getExportOpen());
        setState(state);
    }

    exportData() {
        let state = getState();
        let gridService = state.getGridService();
        gridService.exportData();
    }

    toggleSkipHeaders(event) {
        let state = getState();
        state.setSkipColumnHeaders(event.target.checked);
        setState(state);
    }

    changeDelimiter(event) {
        let state = getState();
        state.setExportDelimiter(event.target.value);
        setState(state);
    }

    view() {
        let state = getState();
        const currentDelimiter = state.getExportDelimiter();

        return markup('div', {
            attrs: {
                id: 'divExport',
                ...state.getExportOpen() === false && { class: 'dialog-export' },
                ...state.getExportOpen() === true && { class: 'dialog-export dialog-export-open' },
            },
            children: [
                markup('div', {
                    attrs: {
                        class: 'dialog-header'
                    },
                    children: [
                        markup('h3', {
                            children: [
                                textNode('Export Grid Data')
                            ]
                        })
                    ]
                }),
                markup('div', {
                    attrs: {
                        class: 'bottom-sheet-controls'
                    },
                    children: [
                        markup('i', {
                            attrs: {
                                class: 'fa fa-close',
                                onclick: this.toggleDialog
                            }
                        })
                    ]
                }),
                markup('div', {
                    attrs: {

                    },
                    children: [
                        markup('div', {
                            attrs: {
                                style: 'display: block;'
                            },
                            children: [
                                markup('input', {
                                    attrs: {
                                        type: 'checkbox',
                                        name: 'skipColumnHeaders',
                                        style: 'margin-right: 0.5rem;',
                                        onchange: this.toggleSkipHeaders
                                    }
                                }),
                                markup('label', {
                                    attrs: {
                                        for: 'skipColumnHeaders'
                                    },
                                    children: [
                                        textNode('Skip Column Headers')
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
                                        for: 'exportDelimiter',
                                        style: 'margin-right: 0.5rem;'
                                    },
                                    children: [
                                        textNode('Column Delimiter')
                                    ]
                                }),
                                markup('select', {
                                    attrs: {
                                        name: 'exportDelimiter',
                                        onchange: this.changeDelimiter.bind(this)
                                    },
                                    children: [
                                        markup('option', {
                                            attrs: {
                                                value: ',',
                                                ...currentDelimiter === ',' && { 'selected': true }
                                            },
                                            children: [
                                                textNode('Comma')
                                            ]
                                        }),
                                        markup('option', {
                                            attrs: {
                                                value: '|',
                                                ...currentDelimiter === '|' && { 'selected': true }
                                            },
                                            children: [
                                                textNode('Pipe')
                                            ]
                                        })
                                    ]
                                }),
                                
                            ]
                        }),
                        markup('div', {
                            attrs: {
                                style: 'display: block;'
                            },
                            children: [
                                markup('button', {
                                    attrs: {
                                        style: 'width: 100%;',
                                        onclick: this.exportData.bind(this),
                                        class: 'pure-button'
                                    },
                                    children: [
                                        textNode('Export')
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

export default ExportDialogComponent;