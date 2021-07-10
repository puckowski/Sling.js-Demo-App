import 'bootstrap';

import { setState, mount, addRoute, route } from './js/sling.min'

import NavbarComponent from './demo/components/navbar.component.js';
import StoreMain from './demo/store/main.store.js';
import PartSupplyComponent from './demo/components/part-supply.component.js';
import AboutAppComponent from './demo/components/about-app.component.js';
import HomeComponent from './demo/components/home.component';
import LoginComponent from './demo/components/login.component';

let state = new StoreMain();
setState(state);

let compNavbar = new NavbarComponent();
mount('divNavbar', compNavbar);

addRoute('part-supply/:partNumber', { component: new PartSupplyComponent(), root: 'divSheetContent' });
addRoute('about', { component: new AboutAppComponent(), root: 'divSheetContent' });
addRoute('', { component: new HomeComponent(), root: 'divRouterOutlet' });
addRoute('login', { component: new LoginComponent(), root: 'divRouterOutlet' });

route('login');
