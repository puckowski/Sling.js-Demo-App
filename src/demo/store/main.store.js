class StoreMain {
    constructor() {
        this.bottomSheetOpen = false;
        this.selectedRow = null;
        this.gridOptions = null;
    }

    getBottomSheetOpen() {
        return this.bottomSheetOpen;
    }

    setBottomSheetOpen(newSheetState) {
        this.bottomSheetOpen = newSheetState;

        if (newSheetState) {
            let partSupply = s.route('part-supply/' + this.selectedRow.partNumber);
            s.autoUpdate('divSheetContent', partSupply);  
        }
    }

    getSelectedRow() {
        return this.selectedRow;
    }

    setSelectedRow(selectedRowArray) {
        this.selectedRow = selectedRowArray[0];
    }

    setGridOptions(newGridOptions) {
        this.gridOptions = newGridOptions;
    }

    getGridOptions() {
        return this.gridOptions;
    }
}

export default StoreMain;
