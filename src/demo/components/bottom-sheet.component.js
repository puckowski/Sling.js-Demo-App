class BottomSheetComponent {

    constructor() {
        this.oldSheetState = false;
    }

    slOnInit() {
        s.getState().getBottomSheetSubject().subscribe(function(newSheetState) {
            if (newSheetState !== this.oldSheetState) {
                let segments = s.getRouteSegments();

                switch(segments[0]) {
                    case 'part-supply': {
                        let partSupply = s.route('part-supply/' + s.getState().getSelectedRow().partNumber);
                        s.autoUpdate('divSheetContent', partSupply); 

                        break;
                    }
                    case 'about': {
                        let about = s.route('about');
                        s.autoUpdate('divSheetContent', about); 

                        break;
                    }
                }
                
                this.oldSheetState = newSheetState;
            }
        }.bind(this));
    }

    closeBottomSheet() {
        let state = s.getState();
        s.route('');
        state.setBottomSheetOpen(false);
        s.setState(state);
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