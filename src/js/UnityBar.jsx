import React, { Component } from 'react';
import { arrayOf, bool, func, node, string } from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import {
    accessPropType,
    customActionPropType,
    customMenuOptionPropType,
    UnityBarAccess,
    UnityBarThemes,
    isDevelopment,
    pwdAppConfig,
    PARCEL_VIEWER,
    RETROFIT_MAP,
    CREDITS_EXPLORER,
} from './constants';

import '../sass/pwd-unity-bar.scss';

import AppSwitcher from './AppSwitcher';
import AppActions from './AppActions';
import PWDLogo from './PWDLogo';
import SVGIcons from './SVGIcons';

class UnityBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appSwitcherOpen: false,
            authenticatedActionsOpen: false,
            searchBoxExpanded: false,
        };
        this.openAppSwitcher = this.openAppSwitcher.bind(this);
        this.closeAppSwitcher = this.closeAppSwitcher.bind(this);
        this.openAuthenticatedActions = this.openAuthenticatedActions.bind(
            this,
        );
        this.closeAuthenticatedActions = this.closeAuthenticatedActions.bind(
            this,
        );
        this.contractSearchBox = this.contractSearchBox.bind(this);
        this.expandSearchBox = this.expandSearchBox.bind(this);
        this.closeAllElements = this.closeAllElements.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.clearSearchBoxValue = this.clearSearchBoxValue.bind(this);
        this.handleAppNameClick = this.handleAppNameClick.bind(this);
    }

    clearSearchBoxValue() {
        const { searchChangeHandler } = this.props;
        searchChangeHandler('');
    }

    handleClickOutside() {
        this.closeAllElements();
    }

    handleSearchBoxChange({ target: { value } }) {
        const { searchChangeHandler } = this.props;
        searchChangeHandler(value);
    }

    closeAllElements() {
        this.setState({
            appSwitcherOpen: false,
            authenticatedActionsOpen: false,
            searchBoxExpanded: false,
        });
    }

    openAppSwitcher() {
        this.setState({
            appSwitcherOpen: true,
            authenticatedActionsOpen: false,
            searchBoxExpanded: false,
        });
    }

    closeAppSwitcher() {
        this.setState({ appSwitcherOpen: false });
    }

    openAuthenticatedActions() {
        this.setState({
            appSwitcherOpen: false,
            authenticatedActionsOpen: true,
            searchBoxExpanded: false,
        });
    }

    closeAuthenticatedActions() {
        this.setState({ authenticatedActionsOpen: false });
    }

    expandSearchBox() {
        this.setState({
            appSwitcherOpen: false,
            authenticatedActionsOpen: false,
            searchBoxExpanded: true,
        });
    }

    contractSearchBox() {
        const { searchBoxValue } = this.props;
        if (!searchBoxValue) {
            this.setState({ searchBoxExpanded: false });
        }
    }

    handleAppNameClick() {
        const { appNameClickHandler } = this.props;

        return this.setState(
            state =>
                Object.assign({}, state, {
                    appSwitcherOpen: false,
                    authenticatedActionsOpen: false,
                    searchBoxExpanded: false,
                }),
            appNameClickHandler,
        );
    }

    render() {
        const {
            currentAppName,
            appNameClickHandler,
            theme,
            access,
            hasLogo,
            hasSearch,
            searchPlaceholder,
            searchSubmitHandler,
            searchBoxValue,
            isSearching,
            searchingIndicator,
            hasMapAction,
            mapActionHandler,
            mapActionTitle,
            hasHelpAction,
            helpActionHandler,
            helpActionTitle,
            customActions,
            authenticated,
            hasSettings,
            settingsUrl,
            settingsHandler,
            signOutHandler,
            customMenuOptions,
            parcelViewerUrl,
            creditsExplorerUrl,
            retrofitMapUrl,
            retrofitCampaignUrl,
            showParcelViewerLink,
            showCreditsExplorerLink,
            showRetrofitMapLink,
            showRetrofitCampaignLink,
            currentPath,
        } = this.props;

        const {
            appSwitcherOpen,
            authenticatedActionsOpen,
            searchBoxExpanded,
        } = this.state;

        const appConfig = pwdAppConfig.map(config => {
            switch (config.appName) {
                case PARCEL_VIEWER:
                    return Object.assign({}, config, {
                        appUrl: parcelViewerUrl,
                        isVisible: showParcelViewerLink,
                    });
                case RETROFIT_MAP:
                    return Object.assign({}, config, {
                        appUrl: retrofitMapUrl,
                        isVisible: showRetrofitMapLink,
                    });
                case CREDITS_EXPLORER:
                    return Object.assign({}, config, {
                        appUrl: creditsExplorerUrl,
                        secondAppUrl: retrofitCampaignUrl,
                        isVisible: showCreditsExplorerLink,
                        secondAppIsVisible: showRetrofitCampaignLink,
                    });
                default:
                    return config;
            }
        });

        const pwdLogo = hasLogo ? <PWDLogo /> : null;

        const unityBarTheme = (() => {
            if (access === UnityBarAccess.Internal) {
                return UnityBarThemes.Internal;
            }
            switch (theme) {
                case 'blue':
                    return UnityBarThemes.Blue;
                case 'white':
                    return UnityBarThemes.White;
                case 'custom':
                    throw new Error(`Invalid UnityBar theme: 'custom' theme not
                        yet implemented.`);
                default:
                    throw new Error(`Invalid UnityBar theme: ${theme}.`);
            }
        })();

        const wrappedMapActionHandler = () => {
            if (mapActionHandler) {
                this.closeAllElements();
                mapActionHandler();
            }
        };

        const wrappedHelpActionHandler = () => {
            if (helpActionHandler) {
                this.closeAllElements();
                helpActionHandler();
            }
        };

        const wrappedSettingsHandler = () => {
            if (settingsHandler) {
                this.closeAllElements();
                settingsHandler();
            }
        };

        const wrappedSignOutHandler = () => {
            if (signOutHandler) {
                this.closeAllElements();
                signOutHandler();
            }
        };

        const wrappedSearchSubmitHandler = () => {
            if (searchSubmitHandler) {
                searchSubmitHandler(searchBoxValue);
            }
        };

        return (
            <header className={`pwd-unity-bar ${unityBarTheme}`}>
                <AppSwitcher
                    appSwitcherOpen={appSwitcherOpen}
                    openAppSwitcher={this.openAppSwitcher}
                    closeAppSwitcher={this.closeAppSwitcher}
                    currentAppName={currentAppName}
                    appNameClickHandler={
                        appNameClickHandler ? this.handleAppNameClick : null
                    }
                    appConfig={appConfig}
                />
                {pwdLogo}
                <AppActions
                    authenticated={authenticated}
                    authenticatedActionsOpen={authenticatedActionsOpen}
                    openAuthenticatedActions={this.openAuthenticatedActions}
                    closeAuthenticatedActions={this.closeAuthenticatedActions}
                    hasSearch={hasSearch}
                    searchPlaceholder={searchPlaceholder}
                    searchSubmitHandler={wrappedSearchSubmitHandler}
                    isSearching={isSearching}
                    searchingIndicator={searchingIndicator}
                    hasMapAction={hasMapAction}
                    mapActionHandler={wrappedMapActionHandler}
                    mapActionTitle={mapActionTitle}
                    hasHelpAction={hasHelpAction}
                    helpActionHandler={wrappedHelpActionHandler}
                    helpActionTitle={helpActionTitle}
                    customActions={customActions}
                    hasSettings={hasSettings}
                    settingsUrl={settingsUrl}
                    settingsHandler={wrappedSettingsHandler}
                    signOutHandler={wrappedSignOutHandler}
                    customMenuOptions={customMenuOptions}
                    searchBoxExpanded={searchBoxExpanded}
                    expandSearchBox={this.expandSearchBox}
                    contractSearchBox={this.contractSearchBox}
                    closeAllElements={this.closeAllElements}
                    searchBoxValue={searchBoxValue}
                    handleSearchBoxChange={this.handleSearchBoxChange}
                    currentPath={currentPath}
                />
                <SVGIcons />
            </header>
        );
    }
}

UnityBar.propTypes = {
    currentAppName: string.isRequired,
    appNameClickHandler: func,
    theme: string,
    access: accessPropType,
    hasLogo: bool,
    hasSearch: bool,
    searchPlaceholder: string,
    searchChangeHandler: func,
    searchSubmitHandler: func,
    searchBoxValue: string,
    isSearching: bool,
    searchingIndicator: node,
    hasMapAction: bool,
    mapActionHandler: func,
    mapActionTitle: string,
    hasHelpAction: bool,
    helpActionHandler: func,
    helpActionTitle: string,
    customActions: arrayOf(customActionPropType),
    authenticated: bool,
    hasSettings: bool,
    settingsUrl: string,
    settingsHandler: func,
    signOutHandler: func,
    customMenuOptions: arrayOf(customMenuOptionPropType),
    parcelViewerUrl: string,
    creditsExplorerUrl: string,
    retrofitMapUrl: string,
    retrofitCampaignUrl: string,
    showParcelViewerLink: bool,
    showCreditsExplorerLink: bool,
    showRetrofitMapLink: bool,
    showRetrofitCampaignLink: bool,
    currentPath: string,
};

UnityBar.defaultProps = {
    appNameClickHandler: null,
    theme: 'blue',
    access: 'public',
    hasLogo: true,
    hasSearch: true,
    searchPlaceholder: 'Search',
    searchChangeHandler(text) {
        if (isDevelopment) {
            window.console.log('changed text ->', text);
        }
    },
    searchSubmitHandler(submission) {
        if (isDevelopment) {
            window.console.log('submitted ->', submission);
        }
    },
    searchBoxValue: '',
    isSearching: false,
    searchingIndicator: null,
    hasMapAction: true,
    mapActionTitle: 'Map',
    hasHelpAction: true,
    helpActionTitle: 'Help',
    authenticated: false,
    hasSettings: false,
    signOutHandler() {
        if (isDevelopment) {
            window.console.log('You signed out!');
        }
    },
    parcelViewerUrl: '',
    creditsExplorerUrl: '',
    retrofitMapUrl: '',
    retrofitCampaignUrl: '',
    showParcelViewerLink: true,
    showCreditsExplorerLink: true,
    showRetrofitMapLink: true,
    showRetrofitCampaignLink: true,
    mapActionHandler: () => null,
    helpActionHandler: () => null,
    customActions: [],
    settingsUrl: '',
    settingsHandler: () => null,
    customMenuOptions: [],
    currentPath: '',
};

export default onClickOutside(UnityBar);
