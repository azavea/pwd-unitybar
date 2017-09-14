import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';

import {
    customActionPropType,
    customMenuOptionPropType,
} from './constants';

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
    hasMapAction,
    mapActionHandler,
    hasHelpAction,
    helpActionHandler,
    customActions,
    hasSettings,
    settingsUrl,
    settingsHandler,
    customMenuOptions,
    searchBoxExpanded,
    expandSearchBox,
    contractSearchBox,
    closeAllElements,
    searchBoxValue,
    handleSearchBoxChange,
}) {
    const customActionElements = (() => {
        if (searchBoxExpanded) {
            return null;
        }
        if (customActions) {
            if (customActions.length > 1 && (hasMapAction || hasHelpAction)) {
                throw new Error(`Invalid UnityBar props: cannot supply two custom
                    actions along with 'hasMapAction' or 'hasHelpAction'.`);
            } else if (customActions.length === 1 && hasMapAction && hasHelpAction) {
                throw new Error(`Invalid UnityBar props: cannot supply a custom
                    action along with both 'hasMapAction' and 'hasHelpAction'.`);
            }
            return customActions.map(({ cssClass, icon, title, onClickHandler }) => (
                <AppAction
                    key={title}
                    cssClass={cssClass}
                    icon={icon}
                    title={title}
                    onClickHandler={onClickHandler}
                />));
        }
        return null;
    })();

    // The `(!searchBoxValue)` check is here to remove the action elements from
    // the DOM if the search box is expanded and users shouldn't be able to tab
    // into them & otherwise ensure that they exist and can be tabbed into.
    const mapIconElement = hasMapAction && mapActionHandler && (!searchBoxValue) ? (
        <AppAction
            cssClass={defaultAppActions.map.cssClass}
            title={defaultAppActions.map.title}
            icon={defaultAppActions.map.icon}
            onClickHandler={mapActionHandler}
        />) : null;

    const helpIconElement = hasHelpAction && helpActionHandler && (!searchBoxValue) ? (
        <AppAction
            cssClass={defaultAppActions.help.cssClass}
            title={defaultAppActions.help.title}
            icon={defaultAppActions.help.icon}
            onClickHandler={helpActionHandler}
            closeAllElements={closeAllElements}
        />) : null;

    const searchBox = hasSearch ? (
        <SearchBox
            searchPlaceholder={searchPlaceholder}
            expandSearchBox={expandSearchBox}
            contractSearchBox={contractSearchBox}
            searchBoxValue={searchBoxValue}
            handleSearchBoxChange={handleSearchBoxChange}
        />) : null;

    const authenticatedActions = authenticated && (!searchBoxValue) ? (
        <AuthenticatedActionsMenu
            authenticatedActionsOpen={authenticatedActionsOpen}
            openAuthenticatedActions={openAuthenticatedActions}
            closeAuthenticatedActions={closeAuthenticatedActions}
            hasSettings={hasSettings}
            settingsHandler={settingsHandler}
            settingsUrl={settingsUrl}
            customMenuOptions={customMenuOptions}
            closeAllElements={closeAllElements}
        />) : null;

    const searchBoxExpandedCSS = hasSearch && searchBoxExpanded ? '-search' : '';

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

AppActions.propTypes = {
    authenticated: bool,
    authenticatedActionsOpen: bool,
    openAuthenticatedActions: func,
    closeAuthenticatedActions: func,
    hasSearch: bool,
    searchPlaceholder: string,
    hasMapAction: bool,
    mapActionHandler: func,
    hasHelpAction: bool,
    helpActionHandler: func,
    customActions: arrayOf(customActionPropType),
    hasSettings: bool,
    settingsUrl: string,
    settingsHandler: func,
    customMenuOptions: arrayOf(customMenuOptionPropType),
    searchBoxExpanded: bool,
    expandSearchBox: func,
    contractSearchBox: func,
    closeAllElements: func,
    searchBoxValue: string.isRequired,
    handleSearchBoxChange: func.isRequired,
};
