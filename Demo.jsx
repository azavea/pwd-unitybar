import React, { Component } from 'react';
import { render } from 'react-dom';

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
        this.setState({ searchValue });
    }

    handleSearchSubmit(selectedValue) {
        this.setState({ selectedValue });
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
                />
                <div id="output-region">
                    <div>
                        <p>
                            Search term: {searchValue}
                        </p>
                    </div>
                    <div>
                        <p>
                            Search selection: {selectedValue}
                        </p>
                    </div>
                    <button onClick={this.clearSearchBoxValue}>
                        Clear search box
                    </button>
                </div>
            </div>
        );
    }
}

render(
    <Demo />,
    document.getElementById('root'),
);
