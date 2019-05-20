/* eslint-disable */
import React from 'react';
import { bool, node, number, string, func } from 'prop-types';
import Media from 'react-media';

import MobileSearchBox from './MobileSearchBox';

const searchBoxRole = 'searchbox';

const mediaQueryMatchCondition = `(min-width: 900px)`;

export default function SearchBox({
    searchPlaceholder,
    searchSubmitHandler,
    expandSearchBox,
    contractSearchBox,
    searchBoxValue,
    handleSearchBoxChange,
    isSearching,
    searchingIndicator,
}) {
    const tabIndex = searchBoxValue ? '0' : '-1';

    const callSubmitActionOnEnterKeyPress = ({ key }) => {
        if (key === 'Enter') {
            return searchSubmitHandler();
        }

        return null;
    };

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

    const mediaQueryMatchFunction = matches => {
        if (!matches) {
            return (
                <MobileSearchBox
                    searchPlaceholder={searchPlaceholder}
                    searchSubmitHandler={searchSubmitHandler}
                    expandSearchBox={expandSearchBox}
                    contractSearchBox={contractSearchBox}
                    searchBoxValue={searchBoxValue}
                    handleSearchBoxChange={handleSearchBoxChange}
                    isSearching={isSearching}
                    searchingIndicator={searchingIndicator}
                />
            );
        }

        return (
            <div className="search-form" role="search">
                {searchIcon}
                <input
                    className="field"
                    type="search"
                    name="query"
                    value={searchBoxValue}
                    role={searchBoxRole}
                    aria-label="Search text"
                    placeholder={`${searchPlaceholder}`}
                    onFocus={expandSearchBox}
                    onBlur={contractSearchBox}
                    onChange={handleSearchBoxChange}
                    onKeyPress={callSubmitActionOnEnterKeyPress}
                    disabled={isSearching}
                />
                <button
                    onClick={searchSubmitHandler}
                    className="action"
                    type="button"
                    name="search-btn"
                    tabIndex={tabIndex}
                    disabled={isSearching}
                >
                    Search
                </button>
            </div>
        );
    };

    return (
        <Media query={mediaQueryMatchCondition}>
            {mediaQueryMatchFunction}
        </Media>
    );
}

SearchBox.defaultProps = {
    searchingIndicator: null,
};

SearchBox.propTypes = {
    searchPlaceholder: string.isRequired,
    searchSubmitHandler: func.isRequired,
    expandSearchBox: func.isRequired,
    contractSearchBox: func.isRequired,
    searchBoxValue: string.isRequired,
    handleSearchBoxChange: func.isRequired,
    isSearching: bool.isRequired,
    searchingIndicator: node,
};
