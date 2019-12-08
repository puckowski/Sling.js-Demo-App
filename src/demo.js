import 'bootstrap';

import { Grid } from '../node_modules/ag-grid-community/dist/ag-grid-community.min.noStyle.js';

import NavbarComponent from './demo/components/navbar.component.js';
import GridComponent from './demo/components/grid.component.js';

let compNavbar = new NavbarComponent();
s.mount('divNavbar', compNavbar);

let compGrid = new GridComponent();
s.mount('divGrid', compGrid);

var columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" }
];

var rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
];

var gridOptions = {
    defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
    },
    columnDefs: columnDefs,
    rowData: rowData,
    rowSelection: 'single',
    onSelectionChanged: onSelectionChanged
};

function autoSizeAll(skipHeader) {
    var allColumnIds = [];
    gridOptions.columnApi.getAllColumns().forEach(function (column) {
        allColumnIds.push(column.colId);
    });

    gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
}

function onSelectionChanged() {
    var selectedRows = gridOptions.api.getSelectedRows();

    console.log(selectedRows);
}

document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#divGrid');
    new Grid(gridDiv, gridOptions);

    s.request('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json', 'GET', {
    }).then(resp => {
        var httpResult = JSON.parse(resp.response);
        gridOptions.api.setRowData(httpResult);
    });

    autoSizeAll(false);
});
