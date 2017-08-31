import React from 'react';
import { string, func } from 'prop-types';

const searchBoxRole = 'searchbox';

export default function SearchBox({
    searchPlaceholder,
    expandSearchBox,
    contractSearchBox,
}) {
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
                value=""
                role={searchBoxRole}
                aria-label="Search text"
                placeholder={`${searchPlaceholder}`}
                onFocus={expandSearchBox}
                onBlur={contractSearchBox}
            />
            <button
                className="action"
                type="button"
                name="search-btn"
            >
                Search
            </button>
        </div>
    );
}

SearchBox.propTypes = {
    searchPlaceholder: string.isRequired,
    expandSearchBox: func.isRequired,
    contractSearchBox: func.isRequired,
};
