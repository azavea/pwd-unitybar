import React from 'react';
import { arrayOf, bool, func, node, string } from 'prop-types';

import { customActionPropType, customMenuOptionPropType } from './constants';

import AppAction from './AppAction';
import AuthenticatedActionsMenu from './AuthenticatedActionsMenu';
import SearchBox from './SearchBox';

const defaultAppActions = {
    map: {
        cssClass: '-map',
        title: 'Map',
        icon: '#pwdub-icon-map',
    },
    help: {
        cssClass: '-help',
        title: 'Help',
        icon: '#pwdub-icon-help',
    },
};

export default function AppActions({
    authenticated,
    authenticatedActionsOpen,
    openAuthenticatedActions,
    closeAuthenticatedActions,
    hasSearch,
    searchPlaceholder,
    searchSubmitHandler,
    isSearching,
    searchingIndicator,
    hasMapAction,
    mapActionHandler,
    mapActionTitle,
    hasHelpAction,
    helpActionHandler,
    helpActionTitle,
    customActions,
    hasSettings,
    settingsUrl,
    settingsHandler,
    signOutHandler,
    customMenuOptions,
    searchBoxExpanded,
    expandSearchBox,
    contractSearchBox,
    closeAllElements,
    searchBoxValue,
    handleSearchBoxChange,
    currentPath,
}) {
    const customActionElements = (() => {
        if (searchBoxExpanded) {
            return null;
        }
        if (customActions) {
            if (customActions.length > 1 && (hasMapAction || hasHelpAction)) {
                throw new Error(`Invalid UnityBar props: cannot supply two custom
                    actions along with 'hasMapAction' or 'hasHelpAction'.`);
            } else if (
                customActions.length === 1 &&
                hasMapAction &&
                hasHelpAction
            ) {
                throw new Error(`Invalid UnityBar props: cannot supply a custom
                    action along with both 'hasMapAction' and 'hasHelpAction'.`);
            }
            return customActions.map(
                ({ cssClass, icon, title, onClickHandler, customIconNode }) => (
                    <AppAction
                        key={title}
                        cssClass={cssClass}
                        icon={icon}
                        title={title}
                        onClickHandler={onClickHandler}
                        customIconNode={customIconNode}
                    />
                ),
            );
        }
        return null;
    })();

    // The `(!searchBoxValue)` check is here to remove the action elements from
    // the DOM if the search box is expanded and users shouldn't be able to tab
    // into them & otherwise ensure that they exist and can be tabbed into.
    const mapIconElement =
        hasMapAction && mapActionHandler && !searchBoxExpanded ? (
            <AppAction
                cssClass={defaultAppActions.map.cssClass}
                title={mapActionTitle}
                icon={defaultAppActions.map.icon}
                onClickHandler={mapActionHandler}
            />
        ) : null;

    const helpIconElement =
        hasHelpAction && helpActionHandler && !searchBoxExpanded ? (
            <AppAction
                cssClass={defaultAppActions.help.cssClass}
                title={helpActionTitle}
                icon={defaultAppActions.help.icon}
                onClickHandler={helpActionHandler}
                closeAllElements={closeAllElements}
            />
        ) : null;

    const searchBox = hasSearch ? (
        <SearchBox
            searchPlaceholder={searchPlaceholder}
            searchSubmitHandler={searchSubmitHandler}
            expandSearchBox={expandSearchBox}
            contractSearchBox={contractSearchBox}
            searchBoxValue={searchBoxValue}
            handleSearchBoxChange={handleSearchBoxChange}
            isSearching={isSearching}
            searchingIndicator={searchingIndicator}
            currentPath={currentPath}
        />
    ) : null;

    const authenticatedActions =
        authenticated && !searchBoxExpanded ? (
            <AuthenticatedActionsMenu
                authenticatedActionsOpen={authenticatedActionsOpen}
                openAuthenticatedActions={openAuthenticatedActions}
                closeAuthenticatedActions={closeAuthenticatedActions}
                hasSettings={hasSettings}
                settingsHandler={settingsHandler}
                signOutHandler={signOutHandler}
                settingsUrl={settingsUrl}
                customMenuOptions={customMenuOptions}
                closeAllElements={closeAllElements}
            />
        ) : null;

    const searchBoxExpandedCSS =
        hasSearch && searchBoxExpanded ? '-search' : '';

    return (
        <nav className={`app-actions ${searchBoxExpandedCSS}`}>
            {searchBox}
            {customActionElements}
            {mapIconElement}
            {helpIconElement}
            {authenticatedActions}
        </nav>
    );
}

AppActions.defaultProps = {
    authenticated: false,
    authenticatedActionsOpen: false,
    openAuthenticatedActions: () => null,
    closeAuthenticatedActions: () => null,
    hasSearch: false,
    searchPlaceholder: '',
    isSearching: false,
    searchingIndicator: null,
    hasMapAction: false,
    mapActionHandler: () => null,
    mapActionTitle: 'Map',
    hasHelpAction: false,
    helpActionHandler: () => null,
    helpActionTitle: 'Help',
    customActions: null,
    hasSettings: false,
    settingsUrl: '',
    settingsHandler: () => null,
    signOutHandler: () => null,
    customMenuOptions: [],
    searchBoxExpanded: false,
    expandSearchBox: () => null,
    contractSearchBox: () => null,
    closeAllElements: () => null,
};

AppActions.propTypes = {
    authenticated: bool,
    authenticatedActionsOpen: bool,
    openAuthenticatedActions: func,
    closeAuthenticatedActions: func,
    hasSearch: bool,
    searchPlaceholder: string,
    searchSubmitHandler: func.isRequired,
    isSearching: bool,
    searchingIndicator: node,
    hasMapAction: bool,
    mapActionHandler: func,
    mapActionTitle: string,
    hasHelpAction: bool,
    helpActionHandler: func,
    helpActionTitle: string,
    customActions: arrayOf(customActionPropType),
    hasSettings: bool,
    settingsUrl: string,
    settingsHandler: func,
    signOutHandler: func,
    customMenuOptions: arrayOf(customMenuOptionPropType),
    searchBoxExpanded: bool,
    expandSearchBox: func,
    contractSearchBox: func,
    closeAllElements: func,
    searchBoxValue: string.isRequired,
    handleSearchBoxChange: func.isRequired,
    currentPath: string.isRequired,
};
