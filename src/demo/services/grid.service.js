import { Grid } from '../../../node_modules/ag-grid-community/dist/ag-grid-community.min.noStyle.js';

const COLUMN_DEFINITIONS = [
    { headerName: 'Part Number', field: 'partNumber' },
    { headerName: 'Nomenclature', field: 'nomenclature' },
    { headerName: 'MRP Type', field: 'mrpType' },
    { headerName: 'Unit Cost New', field: 'unitCostNew' },
    { headerName: 'Unit Cost Used', field: 'unitCostUsed' },
    { headerName: 'Repairable', field: 'repairable' },
    { headerName: 'Lead Time', field: 'leadTime' },
    { headerName: 'Available Quantity', field: 'availableQuantity' },
    { headerName: 'Total Quantity', field: 'totalQuantity' },
    { headerName: 'Shop Required Quantity', field: 'shopRequiredQuantity' },
    { headerName: 'Bonded Quantity', field: 'bondedQuantity' },
    { headerName: 'Forecast Quantity 90 Days', field: 'forcastQuantity90Days' },
    { headerName: 'Reorder Point', field: 'reorderPoint' },
    { headerName: 'Supplier Code', field: 'supplierCode' },
    { headerName: 'Supplier Name', field: 'supplierName' },
    { headerName: 'Part Health', field: 'partHealth' },
];

class GridService {

    constructor() {
        this.gridOptions = null;
    }

    init() {
        this.gridOptions = {
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true
            },
            columnDefs: COLUMN_DEFINITIONS,
            rowSelection: 'single',
            onSelectionChanged: this.onSelectionChanged.bind(this)
        };

        document.addEventListener('DOMContentLoaded', function() {
            let gridDiv = document.querySelector('#divGrid');
            new Grid(gridDiv, this.gridOptions);
    
            let newState = s.getState();
            newState.setGridOptions(this.gridOptions)
            s.setState(newState);
    
            let gridDataStream = this.getMainGridDataStream();

            s.get('assets/json/home-main-grid-data.json')
                .then(resp => {
                    var httpResult = JSON.parse(resp.response);
                    gridDataStream.from(httpResult);
                    this.gridOptions.api.setRowData(gridDataStream.getData());
    
                    this.navigateToRouteIfNeeded();
                });
    
            this.autoSizeAll(false);
        }.bind(this));
    }

    getMainGridDataStream() {
        let gridDataStream = s.Stream();
            gridDataStream.transform(function(arr) {
                return arr.map(val => {
                    if (val.unitCostNew)
                        val.unitCostNew = '$' + val.unitCostNew;
                    
                    if (val.unitCostUsed)
                        val.unitCostUsed = '$' + val.unitCostUsed;

                    return val;
                });
            });
        
        return gridDataStream;
    }

    autoSizeAll(skipHeader) {
        let allColumnIds = [];
        this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });

        this.gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }

    onSelectionChanged() {
        let selectedRows = this.gridOptions.api.getSelectedRows();

        let state = s.getState();
        state.setSelectedRow(selectedRows);
        s.route('part-supply/' + selectedRows[0].partNumber);
        state.setBottomSheetOpen(true);
        s.setState(state);
    }

    navigateToRouteIfNeeded() {
        if (s.getRouteSegments().length > 0) {
            let state = s.getState();
            let urlSegments = s.getRouteSegments();

            state.getGridOptions().api.forEachNode(function (rowNode) {
                if (rowNode.data.partNumber === urlSegments[1]) {
                    state.setSelectedRow([rowNode.data]);
                    s.setState(state);
                }
            });

            state.setBottomSheetOpen(true);
            s.setState(state);
        }
    }
}

export default GridService;