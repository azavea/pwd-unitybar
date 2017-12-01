import React from 'react';
import { func, string } from 'prop-types';

export default function AppAction({
    cssClass,
    title,
    onClickHandler,
    icon,
}) {
    return (
        <a
            className={`link ${cssClass}`}
            title={title}
            href=""
            aria-label={title}
            onClick={onClickHandler}
        >
            <svg className="icon">
                <use xlinkHref={icon} />
            </svg>
        </a>
    );
}

AppAction.propTypes = {
    cssClass: string.isRequired,
    title: string.isRequired,
    icon: string.isRequired,
    onClickHandler: func.isRequired,
};
