import 'bootstrap';

import { setState, mount, addRoute } from './js/sling.min'

import NavbarComponent from './demo/components/navbar.component.js';
import GridComponent from './demo/components/grid.component.js';
import BottomSheetComponent from './demo/components/bottom-sheet.component.js';
import StoreMain from './demo/store/main.store.js';
import PartSupplyComponent from './demo/components/part-supply.component.js';
import GridService from './demo/services/grid.service.js';
import AboutAppComponent from './demo/components/about-app.component.js';
import SidenavComponent from './demo/components/sidenav.component';
import ExportDialogComponent from './demo/components/export-dialog.component';

let state = new StoreMain();
setState(state);

let compNavbar = new NavbarComponent();
mount('divNavbar', compNavbar);

let compGrid = new GridComponent();
mount('divGrid', compGrid, s.CHANGE_DETECTOR_DETACHED);

let compBottomSheet = new BottomSheetComponent();
mount('divBottomSheet', compBottomSheet);

let compSidenav = new SidenavComponent();
mount('divSidenav', compSidenav);

let compExport = new ExportDialogComponent();
mount('divExport', compExport);

let gridService = new GridService();
gridService.init();
state.setGridService(gridService);
setState(state);

addRoute('part-supply/:partNumber', { component: new PartSupplyComponent(), root: 'divSheetContent' });
addRoute('about', { component: new AboutAppComponent(), root: 'divSheetContent' });
addRoute('', { root: 'divSheetContent' });