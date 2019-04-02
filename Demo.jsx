import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

import UnityBar from './src/js/UnityBar';

class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            selectedValue: '',
        };

        this.clearSearchBoxValue = this.clearSearchBoxValue.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    clearSearchBoxValue() {
        this.setState({
            searchValue: '',
            selectedValue: '',
        });
    }

    handleSearchChange(searchValue) {
        this.setState(state => Object.assign({}, state, {
            searchValue,
        }));
    }

    handleSearchSubmit(selectedValue) {
        this.setState(state => Object.assign({}, state, {
            selectedValue,
        }));
    }

    render() {
        const {
            searchValue,
            selectedValue,
        } = this.state;

        return (
            <div>
                <UnityBar
                    currentAppName="PWD UnityBar"
                    authenticated
                    hasMapAction
                    mapActionHandler={() => { window.console.log('map action clicked'); }}
                    hasHelpAction
                    helpActionHandler={() => { window.console.log('help action clicked'); }}
                    hasSettings
                    settingsHandler={() => { window.console.log('settings action clicked'); }}
                    searchChangeHandler={this.handleSearchChange}
                    searchSubmitHandler={this.handleSearchSubmit}
                    searchBoxValue={searchValue}
                    parcelViewerUrl="http://www.phila.gov/water/swmap/"
                    creditsExplorerUrl="http://water.phila.gov/swexp/"
                    retrofitMapUrl="https://www.azavea.com"
                    retrofitCampaignUrl="https://www.azavea.com"
                />
                <div id="output-region">
                    <div>
                        <p>
                            Search term:
                            {' '}
                            {searchValue}
                        </p>
                    </div>
                    <div>
                        <p>
                            Search selection:
                            {' '}
                            {selectedValue}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={this.clearSearchBoxValue}
                    >
                        Clear search box
                    </button>
                </div>
            </div>
        );
    }
}

export default hot(Demo);
