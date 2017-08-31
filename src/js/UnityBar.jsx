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
    }

    handleClickOutside() {
        this.closeAllElements();
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
        this.setState({ searchBoxExpanded: false });
    }

    render() {
        const {
            currentAppName,
            theme,
            access,
            hasLogo,
            hasSearch,
            searchPlaceholder,
            hasMapAction,
            mapActionHandler,
            hasHelpAction,
            helpActionHandler,
            customActions,
            authenticated,
            hasSettings,
            settingsUrl,
            settingsHandler,
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
                    hasMapAction={hasMapAction}
                    mapActionHandler={wrappedMapActionHandler}
                    hasHelpAction={hasHelpAction}
                    helpActionHandler={wrappedHelpActionHandler}
                    customActions={customActions}
                    hasSettings={hasSettings}
                    settingsUrl={settingsUrl}
                    settingsHandler={wrappedSettingsHandler}
                    customMenuOptions={customMenuOptions}
                    searchBoxExpanded={searchBoxExpanded}
                    expandSearchBox={this.expandSearchBox}
                    contractSearchBox={this.contractSearchBox}
                    closeAllElements={this.closeAllElements}
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
    hasMapAction: bool,
    mapActionHandler: func,
    hasHelpAction: bool,
    helpActionHandler: func,
    customActions: arrayOf(customActionPropType),
    authenticated: bool,
    hasSettings: bool,
    settingsUrl: string,
    settingsHandler: func,
    customMenuOptions: arrayOf(customMenuOptionPropType),
};

UnityBar.defaultProps = {
    theme: 'blue',
    access: 'public',
    hasLogo: true,
    hasSearch: true,
    searchPlaceholder: 'Search',
    hasMapAction: true,
    hasHelpAction: true,
    authenticated: false,
    hasSettings: false,
};

export default onClickOutside(UnityBar);
