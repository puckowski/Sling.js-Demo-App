import { getState, markup, setState } from '../../js/sling.min'

class GridComponent {

    constructor() {
        this.initialDraw = false;
    }

    slOnInit() {
        const state = getState();
        if (state.getInitialGridDraw()) {
            this.initialDraw = true;
            state.setInitialGridDraw(false);
            setState(state);
        }
    }

    view() {
        const initialDraw = this.initialDraw;
        this.initialDraw = false;

        return markup('div', {
            attrs: {
                id: 'divGrid',
                style: 'height: calc(100% - 56px);width:100%;',
                class: 'ag-theme-balham',
                ...initialDraw === false && { sluseexisting: true },
            }
        });
    }
}

export default GridComponent;