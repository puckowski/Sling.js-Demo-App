import { markup, getState, innerText } from '../../js/sling.min'

class SelectedPartHeaderComponent {

    constructor() {

    }

    view() {
        let state = getState();

        return markup('div', {
            attrs: {

            },
            children: [
                markup('div', {
                    attrs: {
                        style: 'padding:0px 1rem;font-size:24px;'
                    },
                    children: [
                        innerText(state.getSelectedRow().partNumber + ' - ' + state.getSelectedRow().nomenclature)
                    ]
                })
            ]
        })
    }
}

export default SelectedPartHeaderComponent;