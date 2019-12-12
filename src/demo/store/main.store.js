class StoreMain {
    constructor() {
        this.bottomSheetOpen = false;
    }

    getBottomSheetOpen() {
        return this.bottomSheetOpen;
    }

    setBottomSheetOpen(newSheetState) {
        this.bottomSheetOpen = newSheetState;

        if (newSheetState) {
            let partSupply = s.route('part-supply');
            s.autoUpdate('divSheetContent', partSupply);  
        }
    }
}

export default StoreMain;
