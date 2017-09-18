import { func, oneOf, shape, string } from 'prop-types';

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

export const pwdAppConfig = [
    {
        appCSSClass: '-all-properties',
        appHeading: 'For all properties',
        appName: 'Parcel Viewer',
        appDescription: `Information about your property, water account,
            and stormwater billing charges.`,
        appUrl: 'http://d11ialel8p79id.cloudfront.net/',
    },
    {
        appCSSClass: '-retrofit-developers',
        appHeading: 'For stormwater infrastructure developers',
        appName: 'Stormwater Retrofit Map',
        appDescription: `Find commercial, industrial, and multifamily
            properties interested in a stormwater retrofit.`,
        appUrl: 'http://developer.epa-star.azavea.com/',
    },
    {
        appCSSClass: '-retrofit-properties',
        appHeading: 'For commercial, industrial, and multifamily properties',
        appName: 'Stormwater Credits Explorer',
        appDescription: `See how much you can save by retrofitting stormwater
            management infrastructure into your property.`,
        appUrl: 'http://d2bccmsq9bkrud.cloudfront.net/',
        secondAppName: 'Stormwater Retrofit Campaign',
        secondAppDescription: `Learn how a grant from the Philadelphia Water
            Department can pay for your stormwater retrofit.`,
        secondAppUrl: 'http://marketing.epa-star.azavea.com/',
    },
];
