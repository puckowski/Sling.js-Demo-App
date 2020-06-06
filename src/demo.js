import 'bootstrap';

import { setState, mount } from './js/sling.min'
import { addRoute, initialize } from './js/sling-router.min';
import { initializeChangeDetector } from './js/sling-change.min';

import NavbarComponent from './demo/components/navbar.component.js';
import GridComponent from './demo/components/grid.component.js';
import BottomSheetComponent from './demo/components/bottom-sheet.component.js';
import StoreMain from './demo/store/main.store.js';
import PartSupplyComponent from './demo/components/part-supply.component.js';
import GridService from './demo/services/grid.service.js';
import AboutAppComponent from './demo/components/about-app.component.js';

initializeChangeDetector();

let state = new StoreMain();
setState(state);

let compNavbar = new NavbarComponent();
mount('divNavbar', compNavbar);

let compGrid = new GridComponent();
mount('divGrid', compGrid, s.CHANGE_DETECTOR_DETACHED);

let compBottomSheet = new BottomSheetComponent();
mount('divBottomSheet', compBottomSheet);

let gridService = new GridService();
gridService.init();

addRoute('part-supply/:partNumber', { component: new PartSupplyComponent(), root: 'divSheetContent' });
addRoute('about', { component: new AboutAppComponent(), root: 'divSheetContent' });
addRoute('', { root: 'divSheetContent' });