class StoreMain {

    constructor() {
        //this.bottomSheetOpen = false;
        this.bottomSheetSubject = s.BehaviorSubject(false);
        this.selectedRow = null;
        this.gridOptions = null;
    }

    /*
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
    */

    getBottomSheetSubject() {
        return this.bottomSheetSubject;
    }

    setBottomSheetOpen(newState) {
        this.bottomSheetSubject.next(newState);
    }

    getBottomSheetOpen() {
        return this.bottomSheetSubject.getData() === true;
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
