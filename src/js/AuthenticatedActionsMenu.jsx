import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';

import { customMenuOptionPropType } from './constants';

export default function AuthenticatedActionsMenu({
    hasSettings,
    settingsUrl,
    settingsHandler,
    signOutHandler,
    customMenuOptions,
    authenticatedActionsOpen,
    openAuthenticatedActions,
    closeAuthenticatedActions,
}) {
    const tabIndex = authenticatedActionsOpen ? '0' : '-1';

    const settingsMenuItem = (() => {
        if (!hasSettings) {
            return null;
        }

        const settingsElement = (
            <button
                className="link"
                tabIndex={tabIndex}
                href={settingsHandler ? null : settingsUrl}
                onClick={settingsHandler || null}
                type="button"
            >
                Settings
            </button>
        );

        return (
            <li className="listitem" role="menuitem">
                {settingsElement}
            </li>
        );
    })();

    const customMenuItems = customMenuOptions
        ? customMenuOptions.map(({ name, onClickHandler }) => (
              <li
                  className="listitem"
                  role="menuitem"
                  key={name + onClickHandler.toString()}
              >
                  <button
                      className="link"
                      tabIndex={tabIndex}
                      onClick={onClickHandler}
                      type="button"
                  >
                      {name}
                  </button>
              </li>
          ))
        : null;

    const authenticatedActionsOpenCSSClass = authenticatedActionsOpen
        ? '-on'
        : '';

    return (
        <div
            className={`additional-actions ${authenticatedActionsOpenCSSClass}`}
        >
            <button
                className="toggle"
                type="button"
                title="More actions"
                name="actions-menu-toggle"
                aria-label="More actions"
                onClick={
                    authenticatedActionsOpen
                        ? closeAuthenticatedActions
                        : openAuthenticatedActions
                }
            >
                <svg className="icon">
                    <use xlinkHref="#pwdub-icon-caret-down" />
                </svg>
            </button>
            <ul className="actions-menu" role="menu" aria-hidden="true">
                {customMenuItems}
                {settingsMenuItem}
                <li className="listitem" role="menuitem">
                    <button
                        className="link"
                        tabIndex={tabIndex}
                        onClick={signOutHandler || null}
                        type="button"
                    >
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    );
}

AuthenticatedActionsMenu.defaultProps = {
    hasSettings: false,
    settingsHandler: () => null,
    signOutHandler: () => null,
    settingsUrl: '',
    customMenuOptions: [],
};

AuthenticatedActionsMenu.propTypes = {
    hasSettings: bool,
    settingsHandler: func,
    signOutHandler: func,
    settingsUrl: string,
    customMenuOptions: arrayOf(customMenuOptionPropType),
    authenticatedActionsOpen: bool.isRequired,
    openAuthenticatedActions: func.isRequired,
    closeAuthenticatedActions: func.isRequired,
};
