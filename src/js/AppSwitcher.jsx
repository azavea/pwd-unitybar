import React from 'react';
import { bool, func, string } from 'prop-types';

import {
    pwdAppConfig,
} from './constants';

import AppSummary from './AppSummary';

export default function AppSwitcher({
    currentAppName,
    appSwitcherOpen,
    openAppSwitcher,
    closeAppSwitcher,
}) {
    const pwdAppLinks = pwdAppConfig.map(({
        appCSSClass,
        appHeading,
        appName,
        appDescription,
        appUrl,
        secondAppName,
        secondAppDescription,
        secondAppUrl,
    }, i) => {
        const secondaryApp = secondAppName && secondAppDescription && secondAppUrl ? (
            <AppSummary
                name={secondAppName}
                description={secondAppDescription}
                url={secondAppUrl}
                current={secondAppName === currentAppName}
            />) : null;

        return (
            <div
                className={`app-group ${appCSSClass}`}
                key={i}
                role="button"
            >
                <h3 className="heading">
                    {appHeading}
                </h3>
                <AppSummary
                    name={appName}
                    description={appDescription}
                    url={appUrl}
                    current={appName === currentAppName}
                />
                {secondaryApp}
            </div>
        );
    });

    const appSwitcherOpenCSSClass = appSwitcherOpen ? '-on' : '';

    return (
        <div className={`app-switcher ${appSwitcherOpenCSSClass}`}>
            <h1 className="appname">
                {currentAppName}
            </h1>
            <button
                className="toggle"
                type="button"
                title="More stormwater apps"
                name="app-switcher-toggle"
                aria-label="More stormwater apps"
                onClick={appSwitcherOpen ? closeAppSwitcher : openAppSwitcher}
            >
                <svg className="icon -menu">
                    <use xlinkHref="#pwdub-icon-menu" />
                </svg>
                <svg
                    className="icon -back"
                    aria-hidden="true"
                >
                    <use xlinkHref="#pwdub-icon-back" />
                </svg>
            </button>
            <div
                className="app-switcher-menu"
                aria-hidden="true"
            >
                <header className="menu-header">
                    <h2 className="heading">
                        Stormwater Management Apps
                    </h2>
                </header>
                {pwdAppLinks}
                <div className="more-resources">
                    <a
                        className="link"
                        tabIndex="-1"
                        href=""
                    >
                        More PWD stormwater resources ➔
                    </a>
                </div>
            </div>
        </div>
    );
}

AppSwitcher.propTypes = {
    currentAppName: string.isRequired,
    appSwitcherOpen: bool.isRequired,
    openAppSwitcher: func.isRequired,
    closeAppSwitcher: func.isRequired,
};
