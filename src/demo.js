import 'bootstrap';

import NavbarComponent from './demo/components/navbar.component.js';
import GridComponent from './demo/components/grid.component.js';
import BottomSheetComponent from './demo/components/bottom-sheet.component.js';
import StoreMain from './demo/store/main.store.js';
import PartSupplyComponent from './demo/components/part-supply.component.js';
import GridService from './demo/services/grid.service.js';

let state = new StoreMain();
s.setState(state);

let compNavbar = new NavbarComponent();
s.mount('divNavbar', compNavbar);

let compGrid = new GridComponent();
s.mount('divGrid', compGrid);

let compBottomSheet = new BottomSheetComponent();
s.mount('divBottomSheet', compBottomSheet);

let gridService = new GridService();
gridService.init();

s.autoUpdate('divBottomSheet', compBottomSheet);

s.addRoute('part-supply/:partNumber', { component: new PartSupplyComponent(), root: 'divSheetContent' });
s.addRoute('', { root: 'divSheetContent' });