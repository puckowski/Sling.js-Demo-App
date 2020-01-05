import 'bootstrap';

import NavbarComponent from './demo/components/navbar.component.js';
import GridComponent from './demo/components/grid.component.js';
import BottomSheetComponent from './demo/components/bottom-sheet.component.js';
import StoreMain from './demo/store/main.store.js';
import PartSupplyComponent from './demo/components/part-supply.component.js';
import GridService from './demo/services/grid.service.js';
import AboutAppComponent from './demo/components/about-app.component.js';

let state = new StoreMain();
s.setState(state);

let compNavbar = new NavbarComponent();
s.mount('divNavbar', compNavbar);

let compGrid = new GridComponent();
s.mount('divGrid', compGrid, s.CHANGE_DETECTOR_DETACHED);

let compBottomSheet = new BottomSheetComponent();
s.mount('divBottomSheet', compBottomSheet);

let gridService = new GridService();
gridService.init();

s.addRoute('part-supply/:partNumber', { component: new PartSupplyComponent(), root: 'divSheetContent' });
s.addRoute('about', { component: new AboutAppComponent(), root: 'divSheetContent' });
s.addRoute('', { root: 'divSheetContent' });