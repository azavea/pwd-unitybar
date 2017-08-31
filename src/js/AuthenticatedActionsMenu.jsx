import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';

import {
    customMenuOptionPropType,
} from './constants';

export default function AuthenticatedActionsMenu({
    hasSettings,
    settingsUrl,
    settingsHandler,
    customMenuOptions,
    authenticatedActionsOpen,
    openAuthenticatedActions,
    closeAuthenticatedActions,
}) {
    const settingsMenuItem = (() => {
        if (!hasSettings) {
            return null;
        }
        const settingsElement = settingsHandler ? (
            <a
                className="link"
                tabIndex="-1"
                onClick={settingsHandler}
            >
                Settings
            </a>) : (
                <a
                    className="link"
                    tabIndex="-1"
                    href={settingsUrl}
                >
                    Settings
                </a>);

        return (
            <li
                className="listitem"
                role="menuitem"
            >
                {settingsElement}
            </li>
        );
    })();

    const customMenuItems = customMenuOptions ?
        customMenuOptions.map(({ name, onClickHandler }, i) => (
            <li
                className="listitem"
                role="menuitem"
                key={i}
            >
                <button
                    className="link"
                    tabIndex="-1"
                    onClick={onClickHandler}
                >
                    {name}
                </button>
            </li>)) : null;

    const authenticatedActionsOpenCSSClass = authenticatedActionsOpen ? '-on' : '';

    return (
        <div className={`additional-actions ${authenticatedActionsOpenCSSClass}`}>
            <button
                className="toggle"
                type="button"
                title="More actions"
                name="actions-menu-toggle"
                aria-label="More actions"
                onClick={authenticatedActionsOpen ?
                    closeAuthenticatedActions : openAuthenticatedActions}
            >
                <svg className="icon">
                    <use xlinkHref="#pwdub-icon-caret-down" />
                </svg>
            </button>
            <ul
                className="actions-menu"
                role="menu"
                aria-hidden="true"
            >
                {customMenuItems}
                {settingsMenuItem}
                <li
                    className="listitem"
                    role="menuitem"
                >
                    <a
                        className="link"
                        tabIndex="-1"
                        href=""
                    >
                        Sign out
                    </a>
                </li>
            </ul>
        </div>
    );
}

AuthenticatedActionsMenu.propTypes = {
    hasSettings: bool,
    settingsHandler: func,
    settingsUrl: string,
    customMenuOptions: arrayOf(customMenuOptionPropType),
    authenticatedActionsOpen: bool.isRequired,
    openAuthenticatedActions: func.isRequired,
    closeAuthenticatedActions: func.isRequired,
};
