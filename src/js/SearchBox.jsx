import React from 'react';
import { string, func } from 'prop-types';

const searchBoxRole = 'searchbox';

export default function SearchBox({
    searchPlaceholder,
    searchSelectHandler,
    expandSearchBox,
    contractSearchBox,
    searchBoxValue,
    handleSearchBoxChange,
}) {
    const tabIndex = searchBoxValue ? '0' : '-1';

    const checkReturnKeyPress = ({ keyCode }) => {
        if (keyCode === 13) {
            searchSelectHandler();
        }
    };

    return (
        <div
            className="search-form"
            role="search"
        >
            <svg
                className="icon"
                aria-hidden="true"
            >
                <use xlinkHref="#pwdub-icon-search" />
            </svg>
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
                onKeyDown={checkReturnKeyPress}
            />
            <button
                onClick={searchSelectHandler}
                className="action"
                type="button"
                name="search-btn"
                tabIndex={tabIndex}
            >
                Search
            </button>
        </div>
    );
}

SearchBox.propTypes = {
    searchPlaceholder: string.isRequired,
    searchSelectHandler: func.isRequired,
    expandSearchBox: func.isRequired,
    contractSearchBox: func.isRequired,
    searchBoxValue: string.isRequired,
    handleSearchBoxChange: func.isRequired,
};
