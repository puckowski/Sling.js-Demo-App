class BottomSheetComponent {

    constructor() {

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

                    },
                    children: [
                        
                    ]
                })
            ]
        })
    }
}

export default BottomSheetComponent;