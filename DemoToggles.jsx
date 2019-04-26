import React from 'react';
import { bool, func, oneOf, oneOfType, string } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

const demoTogglesStyles = Object.freeze({
    containerStyles: Object.freeze({
        padding: '0.5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
    }),
    tableStyles: Object.freeze({
        width: '80%',
    }),
    cellStyles: Object.freeze({
        width: '30%',
        minWidth: '30%',
        maxWidth: '30%',
    }),
});

const SWITCH_INPUT = 'SWITCH_INPUT';
const TEXT_INPUT = 'TEXT_INPUT';
const APP_NAME_CLICK_HANDLER = 'appNameClickHandler';

function PropsRow({ label, value, inputType, changeHandler, switchCondition }) {
    return (
        <TableRow key={label}>
            <TableCell>
                <code>{label}</code>
            </TableCell>
            <TableCell>
                <code>
                    {label !== APP_NAME_CLICK_HANDLER
                        ? value.toString()
                        : (value && 'Function') || 'null'}
                </code>
            </TableCell>
            <TableCell>
                {inputType === SWITCH_INPUT ? (
                    <Switch
                        checked={
                            switchCondition ? value === switchCondition : value
                        }
                        onChange={changeHandler}
                    />
                ) : (
                    <Input
                        value={value}
                        onChange={({ target: { value: v } }) =>
                            changeHandler(v)
                        }
                    />
                )}
            </TableCell>
        </TableRow>
    );
}

PropsRow.defaultProps = {
    switchCondition: null,
};

PropsRow.propTypes = {
    label: string.isRequired,
    value: oneOfType([bool, string]).isRequired,
    inputType: oneOf([SWITCH_INPUT, TEXT_INPUT]).isRequired,
    changeHandler: func.isRequired,
    switchCondition: string,
};

export default function DemoToggles({
    hasLogo,
    toggleHasLogo,
    theme,
    toggleTheme,
    hasSettings,
    toggleHasSettings,
    hasMapAction,
    toggleHasMapAction,
    mapActionTitle,
    changeMapActionTitle,
    hasHelpAction,
    toggleHasHelpAction,
    helpActionTitle,
    changeHelpActionTitle,
    currentAppName,
    changeAppName,
    hasAppNameClickHandler,
    toggleHasAppNameClickHandler,
    access,
    toggleAccess,
    authenticated,
    toggleAuthenticated,
    searchValue,
    changeSearchValue,
    hasSearch,
    toggleHasSearch,
    isSearching,
    toggleIsSearching,
    showParcelViewerLink,
    toggleShowParcelViewerLink,
    showCreditsExplorerLink,
    toggleShowCreditsExplorerLink,
    showRetrofitMapLink,
    toggleShowRetrofitMapLink,
    showRetrofitCampaignLink,
    toggleShowRetrofitCampaignLink,
}) {
    const propsData = [
        {
            label: 'currentAppName',
            value: currentAppName,
            inputType: TEXT_INPUT,
            changeHandler: changeAppName,
        },
        {
            label: APP_NAME_CLICK_HANDLER,
            value: hasAppNameClickHandler,
            inputType: SWITCH_INPUT,
            changeHandler: toggleHasAppNameClickHandler,
        },
        {
            label: 'hasLogo',
            value: hasLogo,
            inputType: SWITCH_INPUT,
            changeHandler: toggleHasLogo,
        },
        {
            label: 'hasSettings',
            value: hasSettings,
            inputType: SWITCH_INPUT,
            changeHandler: toggleHasSettings,
        },
        {
            label: 'theme',
            value: theme,
            inputType: SWITCH_INPUT,
            changeHandler: toggleTheme,
            switchCondition: 'blue',
        },
        {
            label: 'hasMapAction',
            value: hasMapAction,
            inputType: SWITCH_INPUT,
            changeHandler: toggleHasMapAction,
        },
        {
            label: 'mapActionTitle',
            value: mapActionTitle,
            inputType: TEXT_INPUT,
            changeHandler: changeMapActionTitle,
        },
        {
            label: 'hasHelpAction',
            value: hasHelpAction,
            inputType: SWITCH_INPUT,
            changeHandler: toggleHasHelpAction,
        },
        {
            label: 'helpActionTitle',
            value: helpActionTitle,
            inputType: TEXT_INPUT,
            changeHandler: changeHelpActionTitle,
        },
        {
            label: 'access',
            value: access,
            inputType: SWITCH_INPUT,
            switchCondition: 'internal',
            changeHandler: toggleAccess,
        },
        {
            label: 'authenticated',
            value: authenticated,
            inputType: SWITCH_INPUT,
            changeHandler: toggleAuthenticated,
        },
        {
            label: 'hasSearch',
            value: hasSearch,
            inputType: SWITCH_INPUT,
            changeHandler: toggleHasSearch,
        },
        {
            label: 'searchValue',
            value: searchValue,
            inputType: TEXT_INPUT,
            changeHandler: changeSearchValue,
        },
        {
            label: 'isSearching',
            value: isSearching,
            inputType: SWITCH_INPUT,
            changeHandler: toggleIsSearching,
        },
        {
            label: 'showParcelViewerLink',
            value: showParcelViewerLink,
            inputType: SWITCH_INPUT,
            changeHandler: toggleShowParcelViewerLink,
        },
        {
            label: 'showCreditsExplorerLink',
            value: showCreditsExplorerLink,
            inputType: SWITCH_INPUT,
            changeHandler: toggleShowCreditsExplorerLink,
        },
        {
            label: 'showRetrofitMapLink',
            value: showRetrofitMapLink,
            inputType: SWITCH_INPUT,
            changeHandler: toggleShowRetrofitMapLink,
        },
        {
            label: 'showRetrofitCampaignLink',
            value: showRetrofitCampaignLink,
            inputType: SWITCH_INPUT,
            changeHandler: toggleShowRetrofitCampaignLink,
        },
    ];

    return (
        <Grid container style={demoTogglesStyles.containerStyles}>
            <Table style={demoTogglesStyles.tableStyles}>
                <TableHead>
                    <TableRow>
                        <TableCell style={demoTogglesStyles.cellStyles}>
                            <Typography variant="h5">prop</Typography>
                        </TableCell>
                        <TableCell style={demoTogglesStyles.cellStyles}>
                            <Typography variant="h5">value</Typography>
                        </TableCell>
                        <TableCell style={demoTogglesStyles.cellStyles}>
                            <Typography variant="h5">change</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{propsData.map(PropsRow)}</TableBody>
            </Table>
        </Grid>
    );
}

DemoToggles.propTypes = {
    currentAppName: string.isRequired,
    changeAppName: func.isRequired,
    hasAppNameClickHandler: bool.isRequired,
    toggleHasAppNameClickHandler: func.isRequired,
    hasLogo: bool.isRequired,
    toggleHasLogo: func.isRequired,
    theme: oneOf(['blue', 'white']).isRequired,
    toggleTheme: func.isRequired,
    hasSettings: bool.isRequired,
    toggleHasSettings: func.isRequired,
    hasMapAction: bool.isRequired,
    mapActionTitle: string.isRequired,
    changeMapActionTitle: func.isRequired,
    toggleHasMapAction: func.isRequired,
    helpActionTitle: string.isRequired,
    changeHelpActionTitle: func.isRequired,
    hasHelpAction: bool.isRequired,
    toggleHasHelpAction: func.isRequired,
    access: oneOf(['public', 'internal']).isRequired,
    toggleAccess: func.isRequired,
    authenticated: bool.isRequired,
    toggleAuthenticated: func.isRequired,
    searchValue: string.isRequired,
    changeSearchValue: func.isRequired,
    hasSearch: bool.isRequired,
    toggleHasSearch: func.isRequired,
    isSearching: bool.isRequired,
    toggleIsSearching: func.isRequired,
    showParcelViewerLink: bool.isRequired,
    toggleShowParcelViewerLink: func.isRequired,
    showCreditsExplorerLink: bool.isRequired,
    toggleShowCreditsExplorerLink: func.isRequired,
    showRetrofitMapLink: bool.isRequired,
    toggleShowRetrofitMapLink: func.isRequired,
    showRetrofitCampaignLink: bool.isRequired,
    toggleShowRetrofitCampaignLink: func.isRequired,
};
