import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import createHistory from 'history/createBrowserHistory'

const locationHelper = locationHelperBuilder({});
const browserHistory = createHistory()

export const UserIsAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsAuthenticated',

    allowRedirectBack: true,
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || '/login',
    authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
        auth.isLoaded && !auth.isEmpty,

});

export const UserIsNotAuthenticated = connectedRouterRedirect({
    wrapperDisplayName: 'UserIsNotAuthenticated',

    allowRedirectBack: false,
    redirectPath: (state, ownProps) =>
        locationHelper.getRedirectQueryParam(ownProps) || '/',
    authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
        !auth.isLoaded || isInitializing === true,
    authenticatedSelector: ({ firebase: { auth } }) =>
        auth.isLoaded && auth.isEmpty,

});