import React, { Component } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import {
    accessPropType,
    customActionPropType,
    customMenuOptionPropType,
    UnityBarAccess,
    UnityBarThemes,
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
        this.openAuthenticatedActions = this.openAuthenticatedActions.bind(this);
        this.closeAuthenticatedActions = this.closeAuthenticatedActions.bind(this);
        this.contractSearchBox = this.contractSearchBox.bind(this);
        this.expandSearchBox = this.expandSearchBox.bind(this);
        this.closeAllElements = this.closeAllElements.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.clearSearchBoxValue = this.clearSearchBoxValue.bind(this);
    }

    clearSearchBoxValue() {
        this.props.searchChangeHandler('');
    }

    handleClickOutside() {
        this.closeAllElements();
    }

    handleSearchBoxChange({ target: { value } }) {
        this.props.searchChangeHandler(value);
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
        if (!this.props.searchBoxValue) {
            this.setState({ searchBoxExpanded: false });
        }
    }

    render() {
        const {
            currentAppName,
            theme,
            access,
            hasLogo,
            hasSearch,
            searchPlaceholder,
            searchSelectHandler,
            searchBoxValue,
            hasMapAction,
            mapActionHandler,
            hasHelpAction,
            helpActionHandler,
            customActions,
            authenticated,
            hasSettings,
            settingsUrl,
            settingsHandler,
            signOutHandler,
            customMenuOptions,
        } = this.props;

        const {
            appSwitcherOpen,
            authenticatedActionsOpen,
            searchBoxExpanded,
        } = this.state;

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

        const wrappedSearchSelectHandler = () => {
            if (searchSelectHandler) {
                searchSelectHandler(searchBoxValue);
            }
        };

        return (
            <header className={`pwd-unity-bar ${unityBarTheme}`}>
                <AppSwitcher
                    appSwitcherOpen={appSwitcherOpen}
                    openAppSwitcher={this.openAppSwitcher}
                    closeAppSwitcher={this.closeAppSwitcher}
                    currentAppName={currentAppName}
                />
                {pwdLogo}
                <AppActions
                    authenticated={authenticated}
                    authenticatedActionsOpen={authenticatedActionsOpen}
                    openAuthenticatedActions={this.openAuthenticatedActions}
                    closeAuthenticatedActions={this.closeAuthenticatedActions}
                    hasSearch={hasSearch}
                    searchPlaceholder={searchPlaceholder}
                    searchSelectHandler={wrappedSearchSelectHandler}
                    hasMapAction={hasMapAction}
                    mapActionHandler={wrappedMapActionHandler}
                    hasHelpAction={hasHelpAction}
                    helpActionHandler={wrappedHelpActionHandler}
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
                />
                <SVGIcons />
            </header>
        );
    }
}

UnityBar.propTypes = {
    currentAppName: string.isRequired,
    theme: string,
    access: accessPropType,
    hasLogo: bool,
    hasSearch: bool,
    searchPlaceholder: string,
    searchChangeHandler: func,
    searchSelectHandler: func,
    searchBoxValue: string,
    hasMapAction: bool,
    mapActionHandler: func,
    hasHelpAction: bool,
    helpActionHandler: func,
    customActions: arrayOf(customActionPropType),
    authenticated: bool,
    hasSettings: bool,
    settingsUrl: string,
    settingsHandler: func,
    signOutHandler: func,
    customMenuOptions: arrayOf(customMenuOptionPropType),
};

UnityBar.defaultProps = {
    theme: 'blue',
    access: 'public',
    hasLogo: true,
    hasSearch: true,
    searchPlaceholder: 'Search',
    searchChangeHandler(text) {
        window.console.log('changed text -> ', text);
    },
    searchSelectHandler(selection) {
        window.console.log('made selection -> ', selection);
    },
    searchBoxValue: '',
    hasMapAction: true,
    hasHelpAction: true,
    authenticated: false,
    hasSettings: false,
    signOutHandler() {
        window.console.log('You signed out!');
    },
};

export default onClickOutside(UnityBar);
