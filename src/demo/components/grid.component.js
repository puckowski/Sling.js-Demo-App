class GridComponent {

    constructor() {

    }

    view() {
        return s.markup('div', {
            attrs: {
                id: 'divGrid',
                style: 'height: calc(100% - 56px);width:100%;',
                class: 'ag-theme-balham'
            }
        });
    }
}

export default GridComponent;