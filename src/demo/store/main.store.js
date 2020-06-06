import { BehaviorSubject } from '../../js/sling-reactive.min';

class StoreMain {

    constructor() {
        this.bottomSheetSubject = BehaviorSubject(false);
        this.selectedRow = null;
        this.gridOptions = null;
    }

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
