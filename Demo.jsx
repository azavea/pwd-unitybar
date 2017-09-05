import React from 'react';
import { render } from 'react-dom';

import UnityBar from './src/js/UnityBar';

render(
    <UnityBar
        currentAppName="PWD UnityBar"
        authenticated
        hasMapAction
        mapActionHandler={() => { window.console.log('map action clicked'); }}
        hasHelpAction
        helpActionHandler={() => { window.console.log('help action clicked'); }}
        hasSettings
        settingsHandler={() => { window.console.log('settings action clicked'); }}
    />,
    document.getElementById('root'),
);
