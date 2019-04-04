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

function PropsRow({ label, value, inputType, changeHandler, switchCondition }) {
    return (
        <TableRow>
            <TableCell>
                <code>{label}</code>
            </TableCell>
            <TableCell>
                <code>{value.toString()}</code>
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
    hasHelpAction,
    toggleHasHelpAction,
    currentAppName,
    changeAppName,
    access,
    toggleAccess,
    authenticated,
    toggleAuthenticated,
    searchValue,
    changeSearchValue,
    hasSearch,
    toggleHasSearch,
}) {
    const propsData = [
        {
            label: 'currentAppName',
            value: currentAppName,
            inputType: TEXT_INPUT,
            changeHandler: changeAppName,
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
            label: 'hasHelpAction',
            value: hasHelpAction,
            inputType: SWITCH_INPUT,
            changeHandler: toggleHasHelpAction,
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
    hasLogo: bool.isRequired,
    toggleHasLogo: func.isRequired,
    theme: oneOf(['blue', 'white']).isRequired,
    toggleTheme: func.isRequired,
    hasSettings: bool.isRequired,
    toggleHasSettings: func.isRequired,
    hasMapAction: bool.isRequired,
    toggleHasMapAction: func.isRequired,
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
};
