class StoreMain {
    constructor() {
        this.bottomSheetOpen = false;
    }

    getBottomSheetOpen() {
        return this.bottomSheetOpen;
    }

    setBottomSheetOpen(newSheetState) {
        this.bottomSheetOpen = newSheetState;
    }
}

export default StoreMain;
