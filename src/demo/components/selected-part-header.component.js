class SelectedPartHeaderComponent {

    constructor() {

    }

    view() {
        let state = s.getState();

        return s.markup('div', {
            attrs: {

            },
            children: [
                s.markup('div', {
                    attrs: {
                        style: 'padding:0px 1rem;font-size:24px;'
                    },
                    children: [
                        s.textNode(state.getSelectedRow().partNumber + ' - ' + state.getSelectedRow().nomenclature)
                    ]
                })
            ]
        })
    }
}

export default SelectedPartHeaderComponent;