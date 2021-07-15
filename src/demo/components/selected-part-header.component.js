import { markup, getState, textNode } from '../../js/sling.min'

class SelectedPartHeaderComponent {

    constructor() {

    }

    view() {
        let state = getState();
        const selectedRow = state.getSelectedRow();

        return markup('div', {
            attrs: {

            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'padding:0px 1rem;font-size:24px;'
                    },
                    children: [
                        textNode(selectedRow ? selectedRow.partNumber + ' - ' + selectedRow.nomenclature : '')
                    ]
                })
            ]
        })
    }
}

export default SelectedPartHeaderComponent;