import { markup } from '../../js/sling.min'
import BottomSheetComponent from './bottom-sheet.component';
import ExportDialogComponent from './export-dialog.component';
import GridComponent from './grid.component';
import SidenavComponent from './sidenav.component';

class HomeComponent {

    constructor() {
    }

    view() {
        return markup('div', {
            attrs: {
                id: 'divRouterOutlet'
            },
            children: [
                new GridComponent(),
                new SidenavComponent().view(),
                new BottomSheetComponent(),
                new ExportDialogComponent().view()
            ]
        });
    }

}

export default HomeComponent;