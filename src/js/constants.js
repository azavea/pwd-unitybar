import { func, oneOf, shape, string } from 'prop-types';

export const isDevelopment = process && process.env &&
    process.env.NODE_ENV === 'development';

export const UnityBarAccess = {
    Public: 'public',
    Internal: 'internal',
};

export const UnityBarThemes = {
    Blue: '-pwdub-theme-blue',
    White: '-pwdub-theme-white',
    Internal: '-pwdub-theme-internal',
};

export const accessPropType = oneOf(Object.values(UnityBarAccess));

export const customActionPropType = shape({
    cssClass: string,
    icon: string.isRequired,
    title: string.isRequired,
    onClickHandler: func.isRequired,
});

export const customMenuOptionPropType = shape({
    name: string.isRequired,
    onClickHandler: func.isRequired,
});

export const PARCEL_VIEWER = 'Parcel Viewer';
export const RETROFIT_MAP = 'Stormwater Connect';
export const CREDITS_EXPLORER = 'Credits Explorer';
export const RETROFIT_CAMPAIGN = 'Stormwater Connect';

export const pwdAppConfig = [
    {
        appCSSClass: '-all-properties',
        appHeading: 'For all properties',
        appName: PARCEL_VIEWER,
        appDescription: `Information about your property and the stormwater
            charge on your bill.`,
        appUrl: '',
    },
    {
        appCSSClass: '-retrofit-developers',
        appHeading: 'For stormwater management vendors',
        appName: RETROFIT_MAP,
        appDescription: `Find commercial, industrial, and multifamily
            properties interested in a stormwater retrofit project.`,
        appUrl: '',
    },
    {
        appCSSClass: '-retrofit-properties',
        appHeading: 'For commercial, industrial, and multifamily properties',
        appName: CREDITS_EXPLORER,
        appDescription: `See how much you can save by installing a stormwater
            retrofit project.`,
        appUrl: '',
        secondAppName: RETROFIT_CAMPAIGN,
        secondAppDescription: `Learn how a grant from the Philadelphia Water
            Department can pay for your stormwater retrofit project.`,
        secondAppUrl: '',
    },
];
