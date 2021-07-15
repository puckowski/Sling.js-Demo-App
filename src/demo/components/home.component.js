import { getState, markup, setState } from '../../js/sling.min'
import GridService from '../services/grid.service';
import BottomSheetComponent from './bottom-sheet.component';
import ExportDialogComponent from './export-dialog.component';
import GridComponent from './grid.component';
import SidenavComponent from './sidenav.component';

class HomeComponent {

    constructor() {
    }

    slAfterInit() {
        const state = getState();
        let gridService = new GridService();
        gridService.init();
        state.setGridService(gridService);
        setState(state);
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