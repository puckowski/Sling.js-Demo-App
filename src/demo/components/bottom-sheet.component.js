class BottomSheetComponent {

    constructor() {

    }

    closeBottomSheet() {
        let state = s.getState();
        state.setBottomSheetOpen(false);
        s.setState(state);
        s.route('');
    }

    view() {
        let state = s.getState();

        return s.markup('div', {
            attrs: {
                id: 'divBottomSheet',
                ...state.getBottomSheetOpen() === false && { class: 'bottom-sheet' },
                ...state.getBottomSheetOpen() === true && { class: 'bottom-sheet open' },
            },
            children: [
                s.markup('div', {
                    attrs: {
                        class: 'bottom-sheet-controls'
                    },
                    children: [
                        s.markup('i', {
                            attrs: {
                                class: 'fa fa-close',
                                onclick: this.closeBottomSheet
                            }
                        })
                    ]
                }),
                s.markup('div', {
                    attrs: {
                        id: 'divSheetContent',
                        class: 'bottom-sheet-content'
                    }
                })
            ]
        })
    }
}

export default BottomSheetComponent;