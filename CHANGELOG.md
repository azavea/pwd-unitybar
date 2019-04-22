## 1.0.6

- Fix a bug whereby the map and help icons wouldn't display if any text had
been entered into the search input.
- Fix a quirk whereby the WebpackBundleAnalyzer plugin would automatically
open a browser tab with its report on completing a dist build.

## 1.0.5

- Enable host application to set map and help button titles via
`mapActionTitle` and `helpActionTitle` props, respectively.

## 1.0.4

- Enable host application to pass in a `appNameClickHandler` function which will
be make the app name into a clickable button, defaulting back to an `h1` header
when no `appNameClickHandler` is passed in

## 1.0.3

- Add `isSearching` and `searchingIndicator` props to enable applications to set
the state of the search box during fetches programmatically

## 1.0.2

- Adjust search input Enter key press handling to ensure search submit handler
gets called on Enter key presses
- Add default `color` property to the search input style rules

## 1.0.1

- Configure imports to work with AMD or CommonJS

## 1.0.0

- Update React, Webpack, and Babel
- Add Prettier
- Upgrade ESLint rules
- Fix accessibilty issues identified by the eslint-jsx-a11y linter

## 0.1.10

- Declare React & React-DOM as peer dependencies
- Add Webpack-Bundle-Analyzer to display bundle composition

## 0.1.9

- Upgrade dependencies reported as vulnerable by `npm audit`

## 0.1.8

- Open app switcher links in new tabs

## 0.1.7

- Update descriptions in app switcher

## 0.1.6

- Text changes for renamed Stormwater Connect apps

## 0.1.5

- Left-align settings menu action items

## 0.1.4

- Update custom menu action style

## 0.1.3

- Add postcss-loader and autoprefixer

## 0.1.2

- Include cross-browser UI fixes

## 0.1.1

- Add babel-runtime for IE11 ES6 support

## 0.1.0

- Initial release

