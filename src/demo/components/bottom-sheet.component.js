import { markup, getState, setState, route, getRouteSegments } from '../../js/sling.min'

class BottomSheetComponent {

    constructor() {
        this.oldSheetState = false;
    }

    slOnInit() {
        getState().getBottomSheetSubject().clearSubscriptions();
        getState().getBottomSheetSubject().subscribe(function (newSheetState) {
            if (newSheetState !== this.oldSheetState) {
                let segments = getRouteSegments();

                switch (segments[0]) {
                    case 'part-supply': {
                        route('part-supply/' + getState().getSelectedRow().partNumber);

                        break;
                    }
                    case 'about': {
                        route('about');

                        break;
                    }
                }

                this.oldSheetState = newSheetState;
            }
        }.bind(this));
    }

    closeBottomSheet() {
        let state = getState();
        route('');
        state.setBottomSheetOpen(false);
        setState(state);
    }

    view() {
        let state = getState();

        return markup('div', {
            attrs: {
                id: 'divBottomSheet',
                ...state.getBottomSheetOpen() === false && { class: 'bottom-sheet' },
                ...state.getBottomSheetOpen() === true && { class: 'bottom-sheet open' },
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
                                onclick: this.closeBottomSheet
                            }
                        })
                    ]
                }),
                markup('div', {
                    attrs: {
                        id: 'divSheetContent',
                        class: 'bottom-sheet-content',
                        sluseexisting: 'true'
                    }
                })
            ]
        })
    }
}

export default BottomSheetComponent;