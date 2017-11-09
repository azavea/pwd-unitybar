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

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
    }

    handleSearchChange(searchValue) {
        this.setState({ searchValue });
    }

    handleSearchSelect(selectedValue) {
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
                    searchSelectHandler={this.handleSearchSelect}
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
                    <button>
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
