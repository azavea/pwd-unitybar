/* eslint-disable */
import React, { Component } from 'react';
import { bool, node, string, func } from 'prop-types';

const mobileSearchBoxStyles = Object.freeze({
    buttonStyles: Object.freeze({
        height: '56px',
        width: '40px',
        backgroundColor: 'inherit',
        margin: '0',
        border: '0',
        padding: '0',
        borderRadius: '0',
        lineHeight: '1',
        appearance: 'none',
        color: 'inherit',
        fontFamily: 'inherit',
        cursor: 'pointer',
    }),
    searchIconStyles: Object.freeze({
        height: '25px',
        width: '30px',
    }),
    inputSectionStyles: Object.freeze({
        height: '56px',
        position: 'absolute',
        alignItems: 'center',
        right: '3px',
        top: '0',
        zIndex: '1000',
    }),
    submitButtonStyles: Object.freeze({
        display: 'block',
    }),
});

export default class MobileSearchBox extends Component {
    state = {
        searchBoxIsVisible: false,
    };

    componentDidUpdate({
        searchBoxValue: prevSearchBoxValue,
        isSearching: wasSearching,
    }) {
        const { searchBoxValue, isSearching } = this.props;
        const { searchBoxIsVisible } = this.state;

        if (isSearching || !wasSearching) {
            return null;
        }

        if (searchBoxValue || !prevSearchBoxValue) {
            return null;
        }

        return searchBoxIsVisible ? this.handleCloseSearchBox() : null;
    }

    handleOpenSearchBox = () =>
        this.setState(state =>
            Object.assign({}, state, {
                searchBoxIsVisible: true,
            }),
        );

    handleCloseSearchBox = () =>
        this.setState(state =>
            Object.assign({}, state, {
                searchBoxIsVisible: false,
            }),
        );

    handleSubmitActionOnEnterKeyPress = ({ key }) => {
        const { searchSubmitHandler } = this.props;
        if (key === 'Enter') {
            return searchSubmitHandler();
        }

        return null;
    };

    render() {
        const { searchBoxIsVisible } = this.state;

        const {
            searchPlaceholder,
            searchSubmitHandler,
            expandSearchBox,
            contractSearchBox,
            searchBoxValue,
            handleSearchBoxChange,
            isSearching,
            searchingIndicator,
        } = this.props;

        const searchIcon = (() => {
            const searchSVG = (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#pwdub-icon-search" />
                </svg>
            );

            if (!isSearching) {
                return searchSVG;
            }

            if (!searchingIndicator) {
                return searchSVG;
            }

            return searchingIndicator;
        })();

        if (searchBoxIsVisible || searchBoxValue) {
            const submitButtonTabIndex = searchBoxValue ? '0' : '-1';

            return (
                <div
                    className="search-form"
                    role="search"
                    onBlur={this.handleCloseSearchBox}
                    style={mobileSearchBoxStyles.inputSectionStyles}
                >
                    {searchIcon}
                    <input
                        autoFocus
                        tabIndex={0}
                        className="field"
                        type="search"
                        name="query"
                        value={searchBoxValue}
                        role="searchbox"
                        aria-label="Search text"
                        placeholder={`${searchPlaceholder}`}
                        onChange={handleSearchBoxChange}
                        onKeyPress={this.handleSubmitActionOnEnterKeyPress}
                        disabled={isSearching}
                    />
                    <button
                        className="action"
                        tabIndex={submitButtonTabIndex}
                        onClick={searchSubmitHandler}
                        type="button"
                        name="search-btn"
                        disabled={isSearching}
                        style={mobileSearchBoxStyles.submitButtonStyles}
                    >
                        Search
                    </button>
                </div>
            );
        }

        return (
            <button
                type="button"
                style={mobileSearchBoxStyles.buttonStyles}
                onClick={this.handleOpenSearchBox}
            >
                <svg
                    className="icon"
                    aria-hidden="true"
                    style={mobileSearchBoxStyles.searchIconStyles}
                >
                    <use xlinkHref="#pwdub-icon-search" />
                </svg>
            </button>
        );
    }
}

MobileSearchBox.defaultProps = {
    searchingIndicator: null,
};

MobileSearchBox.propTypes = {
    searchPlaceholder: string.isRequired,
    searchSubmitHandler: func.isRequired,
    expandSearchBox: func.isRequired,
    contractSearchBox: func.isRequired,
    searchBoxValue: string.isRequired,
    handleSearchBoxChange: func.isRequired,
    isSearching: bool.isRequired,
    searchingIndicator: node,
};
