import React from 'react';
import { func, string } from 'prop-types';

export default function AppAction({ cssClass, title, onClickHandler, icon }) {
    return (
        <button
            className={`link ${cssClass} toggle`}
            title={title}
            href=""
            aria-label={title}
            onClick={onClickHandler}
            type="button"
        >
            <svg className="icon">
                <use xlinkHref={icon} />
            </svg>
        </button>
    );
}

AppAction.propTypes = {
    cssClass: string.isRequired,
    title: string.isRequired,
    icon: string.isRequired,
    onClickHandler: func.isRequired,
};
