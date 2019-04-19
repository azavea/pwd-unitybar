import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import UnityBar from './src/js/UnityBar';
import DemoToggles from './DemoToggles';

const accessEnum = Object.freeze({
    public: 'public',
    internal: 'internal',
});

const themeEnum = Object.freeze({
    blue: 'blue',
    white: 'white',
});

class Demo extends Component {
    state = {
        currentAppName: 'PWD UnityBar',
        searchValue: '',
        isSearching: false,
        selectedValue: '',
        theme: 'blue',
        access: 'public',
        hasLogo: true,
        authenticated: false,
        hasSearch: true,
        hasMapAction: false,
        mapActionTitle: 'Map',
        hasHelpAction: false,
        helpActionTitle: 'Help',
        hasSettings: false,
        parcelViewerUrl: 'http://www.phila.gov/water/swmap/',
        creditsExplorerUrl: 'http://water.phila.gov/swexp/',
        retrofitMapUrl: 'https://www.azavea.com',
        retrofitCampaignUrl: 'https://www.azavea.com',
        hasAppNameClickHandler: false,
    };

    clearSearchBoxValue = () =>
        this.setState({
            searchValue: '',
            selectedValue: '',
        });

    handleToggleHasSearch = () =>
        this.setState(state =>
            Object.assign({}, state, {
                hasSearch: !state.hasSearch,
            }),
        );

    handleSearchChange = searchValue =>
        this.setState(state =>
            Object.assign({}, state, {
                searchValue,
            }),
        );

    handleSearchSubmit = selectedValue =>
        this.setState(
            state =>
                Object.assign({}, state, {
                    selectedValue,
                }),
            () => window.console.log(`${selectedValue} was submitted`),
        );

    handleToggleIsSearching = () =>
        this.setState(state =>
            Object.assign({}, state, {
                isSearching: !state.isSearching,
            }),
        );

    handleChangeAppName = currentAppName =>
        this.setState(state =>
            Object.assign({}, state, {
                currentAppName,
            }),
        );

    handleToggleHasLogo = () =>
        this.setState(state =>
            Object.assign({}, state, {
                hasLogo: !state.hasLogo,
            }),
        );

    handleToggleAccess = () =>
        this.setState(state =>
            Object.assign({}, state, {
                access:
                    state.access === accessEnum.public
                        ? accessEnum.internal
                        : accessEnum.public,
            }),
        );

    handleToggleTheme = () =>
        this.setState(state =>
            Object.assign({}, state, {
                theme:
                    state.theme === themeEnum.blue
                        ? themeEnum.white
                        : themeEnum.blue,
            }),
        );

    handleToggleHasMapAction = () =>
        this.setState(state =>
            Object.assign({}, state, {
                hasMapAction: !state.hasMapAction,
            }),
        );

    handleChangeMapActionTitle = mapActionTitle =>
        this.setState(state =>
            Object.assign({}, state, {
                mapActionTitle,
            }),
        );

    handleToggleHasHelpAction = () =>
        this.setState(state =>
            Object.assign({}, state, {
                hasHelpAction: !state.hasHelpAction,
            }),
        );

    handleChangeHelpActionTitle = helpActionTitle =>
        this.setState(state =>
            Object.assign({}, state, {
                helpActionTitle,
            }),
        );

    handleToggleHasSettings = () =>
        this.setState(state =>
            Object.assign({}, state, {
                hasSettings: !state.hasSettings,
            }),
        );

    handleToggleAuthenticated = () =>
        this.setState(state =>
            Object.assign({}, state, {
                authenticated: !state.authenticated,
            }),
        );

    handleAppNameClick = () => window.console.log('App name was clicked!');

    handleToggleHasAppNameClickHandler = () =>
        this.setState(state =>
            Object.assign({}, state, {
                hasAppNameClickHandler: !state.hasAppNameClickHandler,
            }),
        );

    render() {
        const {
            currentAppName,
            hasAppNameClickHandler,
            hasLogo,
            theme,
            access,
            hasSearch,
            searchValue,
            selectedValue,
            authenticated,
            hasMapAction,
            mapActionTitle,
            hasHelpAction,
            helpActionTitle,
            hasSettings,
            parcelViewerUrl,
            creditsExplorerUrl,
            retrofitMapUrl,
            retrofitCampaignUrl,
            isSearching,
        } = this.state;

        const searchingElement = (
            <span
                role="img"
                className="icon"
                aria-label="hourglass image for loading indicator"
            >
                ⌛
            </span>
        );

        return (
            <div>
                <UnityBar
                    currentAppName={currentAppName}
                    appNameClickHandler={
                        hasAppNameClickHandler ? this.handleAppNameClick : null
                    }
                    hasLogo={hasLogo}
                    theme={theme}
                    authenticated={authenticated}
                    access={access}
                    hasMapAction={hasMapAction}
                    mapActionTitle={mapActionTitle}
                    mapActionHandler={() => {
                        window.console.log('map action clicked');
                    }}
                    hasHelpAction={hasHelpAction}
                    helpActionTitle={helpActionTitle}
                    helpActionHandler={() => {
                        window.console.log('help action clicked');
                    }}
                    hasSettings={hasSettings}
                    settingsHandler={() => {
                        window.console.log('settings action clicked');
                    }}
                    searchChangeHandler={this.handleSearchChange}
                    searchSubmitHandler={this.handleSearchSubmit}
                    hasSearch={hasSearch}
                    searchBoxValue={searchValue}
                    parcelViewerUrl={parcelViewerUrl}
                    creditsExplorerUrl={creditsExplorerUrl}
                    retrofitMapUrl={retrofitMapUrl}
                    retrofitCampaignUrl={retrofitCampaignUrl}
                    isSearching={isSearching}
                    searchingIndicator={searchingElement}
                />
                <DemoToggles
                    hasSearch={hasSearch}
                    searchValue={searchValue}
                    selectedValue={selectedValue}
                    clearSearchBoxValue={this.clearSearchBoxValue}
                    currentAppName={currentAppName}
                    hasAppNameClickHandler={hasAppNameClickHandler}
                    toggleHasAppNameClickHandler={
                        this.handleToggleHasAppNameClickHandler
                    }
                    hasLogo={hasLogo}
                    theme={theme}
                    access={access}
                    authenticated={authenticated}
                    hasMapAction={hasMapAction}
                    mapActionTitle={mapActionTitle}
                    changeMapActionTitle={this.handleChangeMapActionTitle}
                    hasHelpAction={hasHelpAction}
                    helpActionTitle={helpActionTitle}
                    changeHelpActionTitle={this.handleChangeHelpActionTitle}
                    hasSettings={hasSettings}
                    changeAppName={this.handleChangeAppName}
                    toggleHasLogo={this.handleToggleHasLogo}
                    toggleAccess={this.handleToggleAccess}
                    toggleTheme={this.handleToggleTheme}
                    toggleHasMapAction={this.handleToggleHasMapAction}
                    toggleHasHelpAction={this.handleToggleHasHelpAction}
                    toggleHasSettings={this.handleToggleHasSettings}
                    toggleAuthenticated={this.handleToggleAuthenticated}
                    changeSearchValue={this.handleSearchChange}
                    toggleHasSearch={this.handleToggleHasSearch}
                    isSearching={isSearching}
                    toggleIsSearching={this.handleToggleIsSearching}
                />
            </div>
        );
    }
}

export default hot(Demo);
