import React from 'react';
import { func, node, string } from 'prop-types';

export default function AppAction({ cssClass, title, onClickHandler, icon, customIconNode }) {
    const iconNode = customIconNode || (
        <svg className="icon">
            <use xlinkHref={icon} />
        </svg>
    );

    return (
        <button
            className={`link ${cssClass} toggle`}
            title={title}
            href=""
            aria-label={title}
            onClick={onClickHandler}
            type="button"
        >
            {iconNode}
        </button>
    );
}

AppAction.defaultProps = {
    customIconNode: null,
};

AppAction.propTypes = {
    cssClass: string.isRequired,
    title: string.isRequired,
    icon: string.isRequired,
    onClickHandler: func.isRequired,
    customIconNode: node,
};
