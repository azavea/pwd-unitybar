/* eslint-disable jsx-a11y/aria-props */

import React from 'react';
import { bool, string } from 'prop-types';

export default function AppSummary({
    current,
    name,
    description,
    url,
    appSwitcherOpen,
}) {
    const currentLinkCSSClass = current ? '-on' : '';

    const tabIndex = appSwitcherOpen ? '0' : '-1';

    return (
        <div className="app-summary">
            <h4
                className="app-name"
                aria-current={current}
            >
                <a
                    className={`link ${currentLinkCSSClass}`}
                    tabIndex={tabIndex}
                    href={url}
                >
                    {name}
                </a>
            </h4>
            <p className="desc">
                {description}
            </p>
        </div>
    );
}

AppSummary.propTypes = {
    current: bool.isRequired,
    name: string.isRequired,
    description: string.isRequired,
    url: string.isRequired,
    appSwitcherOpen: bool.isRequired,
};
