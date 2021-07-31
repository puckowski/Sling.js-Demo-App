import { Grid } from '../../../node_modules/ag-grid-community/dist/ag-grid-community.min.noStyle.js';
import { setState, getState, route, getRouteSegments } from '../../js/sling.min';
import { slGet } from '../../js/sling-xhr.min';
import { Stream } from '../../js/sling-reactive.min';

class GridService {

    constructor() {
        this.gridOptions = null;

        this.CELL_STYLE_MAP_PART_HEALTH = new Map([
            ['Good', 'rgba(0,255,0,0.5)'],
            ['Review', 'rgba(0,255,0,0.3)'],
            ['Attention', 'rgba(255,255,0,0.5)'],
            ['Poor', 'rgba(255,0,0,0.5)']
        ]);

        this.COLUMN_DEFINITIONS = [
            { headerName: 'Part Number', field: 'partNumber' },
            { headerName: 'Nomenclature', field: 'nomenclature' },
            { headerName: 'MRP Type', field: 'mrpType' },
            { headerName: 'Unit Cost New', field: 'unitCostNew' },
            { headerName: 'Unit Cost Used', field: 'unitCostUsed' },
            { headerName: 'Repairable', field: 'repairable' },
            { headerName: 'Lead Time', field: 'leadTime' },
            {
                headerName: 'Available Quantity', field: 'availableQuantity',
                cellStyle: function (params) {
                    const backgroundColorString = this.getAvailableQuantityCellColor(params.value);

                    return { backgroundColor: backgroundColorString };
                }.bind(this)
            },
            { headerName: 'Total Quantity', field: 'totalQuantity' },
            { headerName: 'Shop Required Quantity', field: 'shopRequiredQuantity' },
            { headerName: 'Bonded Quantity', field: 'bondedQuantity' },
            { headerName: 'Forecast Quantity 90 Days', field: 'forcastQuantity90Days' },
            { headerName: 'Reorder Point', field: 'reorderPoint' },
            { headerName: 'Supplier Code', field: 'supplierCode' },
            { headerName: 'Supplier Name', field: 'supplierName' },
            {
                headerName: 'Part Health', field: 'partHealth',
                cellStyle: function (params) {
                    const backgroundColorString = this.getPartHealthCellColor(params.value);

                    return { backgroundColor: backgroundColorString };
                }.bind(this)
            },
        ];
    }

    init() {
        const state = getState();
        state.setIsInitialRoute(false);
        setState(state);

        this.gridOptions = {
            defaultColDef: {
                resizable: true,
                sortable: true,
                filter: true
            },
            columnDefs: this.COLUMN_DEFINITIONS,
            rowSelection: 'single',
            onSelectionChanged: this.onSelectionChanged.bind(this)
        };

        let gridDiv = document.querySelector('#divGrid');

        if (gridDiv) {
            new Grid(gridDiv, this.gridOptions);

            let newState = getState();
            newState.setGridOptions(this.gridOptions)
            setState(newState);

            let gridDataStream = this.getMainGridDataStream();

            slGet('assets/json/home-main-grid-data.json')
                .then(resp => {
                    var httpResult = JSON.parse(resp.response);
                    gridDataStream.from(httpResult);
                    this.gridOptions.api.setRowData(gridDataStream.getData());

                    this.navigateToRouteIfNeeded();
                });

            this.autoSizeAll(false);
        }
    }

    getMainGridDataStream() {
        let gridDataStream = Stream();
        gridDataStream.transform(function (arr) {
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

        let state = getState();
        state.setSelectedRow(selectedRows);
        route('part-supply/' + selectedRows[0].partNumber);
        state.setBottomSheetOpen(true);
        setState(state);
    }

    navigateToRouteIfNeeded() {
        if (getRouteSegments().length > 0) {
            let state = getState();
            let urlSegments = getRouteSegments();

            state.getGridOptions().api.forEachNode(function (rowNode) {
                if (rowNode.data.partNumber === urlSegments[1]) {
                    state.setSelectedRow([rowNode.data]);
                    setState(state);
                }
            });

            state.setBottomSheetOpen(true);
            setState(state);
        }
    }

    getExportParams() {
        let state = getState();

        return {
            skipHeader: state.getSkipColumnHeaders(),
            columnSeparator: state.getExportDelimiter()
        };
    }

    exportData() {
        this.gridOptions.api.exportDataAsCsv(this.getExportParams());
    }

    getPartHealthCellColor(partHealthString) {
        if (this.CELL_STYLE_MAP_PART_HEALTH.has(partHealthString) === true) {
            return this.CELL_STYLE_MAP_PART_HEALTH.get(partHealthString);
        } else {
            return 'rgba(255,255,255,0)';
        }
    }

    getAvailableQuantityCellColor(partAvailableQuantity) {
        if (partAvailableQuantity < 0) {
            return 'rgba(255,0,0,0.5)';
        } else if (partAvailableQuantity > 0) {
            return 'rgba(0,255,0,0.5)';
        } else {
            return 'rgba(255,255,0,0.5)';
        }
    }
}

export default GridService;