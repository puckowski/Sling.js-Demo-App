import { markup } from '../../js/sling.min'
import BottomSheetComponent from './bottom-sheet.component';
import ExportDialogComponent from './export-dialog.component';
import GridComponent from './grid.component';
import SidenavComponent from './sidenav.component';

class HomeComponent {

    constructor() {
        this.bottomSheetComp = new BottomSheetComponent();
        this.gridComp = new GridComponent();
    }

    slOnInit() {
        this.bottomSheetComp.slOnInit();
        this.gridComp.slOnInit();
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet'
            },
            children: [
                this.gridComp.view(),
                new SidenavComponent().view(),
                this.bottomSheetComp.view(),
                new ExportDialogComponent().view()
            ]
        });
    }

}

export default HomeComponent;