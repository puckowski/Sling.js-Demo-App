import { BehaviorSubject } from '../../js/sling-reactive.min';

class StoreMain {

    constructor() {
        this.bottomSheetSubject = BehaviorSubject(false);
        this.sidenavSubject = BehaviorSubject(false);
        this.exportSubject = BehaviorSubject(false);
        this.selectedRow = null;
        this.gridOptions = null;
        this.skipColumnHeaders = false;
        this.gridService = null;
        this.benchTime = new Date();
    }

    getBenchTime() {
        return this.benchTime;
    }
    
    getGridService() {
        return this.gridService;
    }

    setGridService(newService) {
        this.gridService = newService;
    }

    getSkipColumnHeaders() {
        return this.skipColumnHeaders;
    }

    setSkipColumnHeaders(newState) {
        this.skipColumnHeaders = newState;
    }

    getExportSubject() {
        return this.exportSubject;
    }

    setExportOpen(newState) {
        this.exportSubject.next(newState);
    }

    getExportOpen() {
        return this.exportSubject.getData() === true;
    }

    getSidenavSubject() {
        return this.sidenavSubject;
    }

    setSidenavOpen(newState) {
        this.sidenavSubject.next(newState);
    }

    getSidenavOpen() {
        return this.sidenavSubject.getData() === true;
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
