import 'bootstrap';

import { Grid } from '../node_modules/ag-grid-community/dist/ag-grid-community.min.noStyle.js';

import NavbarComponent from './demo/components/navbar.component.js';
import GridComponent from './demo/components/grid.component.js';
import BottomSheetComponent from './demo/components/bottom-sheet.component.js';
import StoreMain from './demo/store/main.store.js';
import PartSupplyComponent from './demo/components/part-supply.component.js';

let state = new StoreMain();
s.setState(state);

let compNavbar = new NavbarComponent();
s.mount('divNavbar', compNavbar);

let compGrid = new GridComponent();
s.mount('divGrid', compGrid);

let compBottomSheet = new BottomSheetComponent();
s.mount('divBottomSheet', compBottomSheet);

s.autoUpdate('divBottomSheet', compBottomSheet);

var columnDefs = [
    { headerName: 'Nomenclature', field: 'nomenclature' },
    { headerName: 'MRP Type', field: 'mrpType' },
    { headerName: 'Unit Cost New', field: 'unitCostNew' },
    { headerName: 'Unit Cost Used', field: 'unitCostUsed' },
    { headerName: 'Repairable', field: 'repairable' },
    { headerName: 'Lead Time', field: 'leadTime' },
    { headerName: 'Available Quantity', field: 'availableQuantity' },
    { headerName: 'Totla Quantity', field: 'totalQuantity' },
    { headerName: 'Shop Required Quantity', field: 'shopRequiredQuantity' },
    { headerName: 'Bonded Quantity', field: 'bondedQuantity' },
    { headerName: 'Forecast Quantity 90 Days', field: 'forcastQuantity90Days' },
    { headerName: 'Reorder Point', field: 'reorderPoint' },
    { headerName: 'Supplier Code', field: 'supplierCode' },
    { headerName: 'Supplier Name', field: 'supplierName' },
    { headerName: 'Part Health', field: 'partHealth' },
];

var gridOptions = {
    defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true
    },
    columnDefs: columnDefs,
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

    let state = s.getState();
    state.setBottomSheetOpen(true);
    s.setState(state);
}

document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#divGrid');
    new Grid(gridDiv, gridOptions);

    s.get('https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/puckowski/Sling.js-Demo-App/master/src/assets/json/home-main-grid-data.json')
        .then(resp => {
            var httpResult = JSON.parse(resp.response);
            gridOptions.api.setRowData(httpResult);
        });

    autoSizeAll(false);
});

s.addRoute('part-supply', { component: new PartSupplyComponent(), root: 'divSheetContent' });
s.addRoute('', { component: null, root: 'divSheetContent' });