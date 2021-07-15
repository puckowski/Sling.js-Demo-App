import 'bootstrap';

import { setState, mount, addRoute, route, getState, getRoute } from './js/sling.min'

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

const demoAuthGuard = (proposedRoute) => {
    const state = getState();
    const authService = state.getAuthenticationService();
    return authService.getIsAuthenticated();
}

const onInitialRoute = () => {
    const state = getState();
    if (state.getIsInitialRoute()) {
        route('');
    }
}

addRoute('part-supply/:partNumber', { component: new PartSupplyComponent(), root: 'divSheetContent', onBeforeRoute: onInitialRoute, authGuard: demoAuthGuard, authFail: { route: 'login', params: {} } });
addRoute('about', { component: new AboutAppComponent(), root: 'divSheetContent', authGuard: demoAuthGuard, onBeforeRoute: onInitialRoute, authFail: { route: 'login', params: {} } });
addRoute('', { component: new HomeComponent(), root: 'divRouterOutlet', authGuard: demoAuthGuard, authFail: { route: 'login', params: {} } });
addRoute('login', { component: new LoginComponent(), root: 'divRouterOutlet' });

route(getRoute());
