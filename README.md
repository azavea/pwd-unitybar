# PWD Unity Bar

[![Build Status](https://travis-ci.org/azavea/pwd-unitybar.svg?branch=develop)](https://travis-ci.org/azavea/pwd-unitybar)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e08902a4-b905-46f4-92be-32149aea344d/deploy-status)](https://app.netlify.com/sites/staging-pwd-unitybar/deploys)

Unified header React component for PWD Stormwater web apps.

### Requirements

 * Node 6.x or greater

### Getting Started

Install required dependencies by running:

```sh
./scripts/setup
```

#### Development

Run a demo version via webpack-dev-server using:

```sh
./scripts/server
```

This will build and server the app on port 7777.

### Ports

| Service           | Port                            |
| ----------------- | ------------------------------- |
| PWD UnityBar demo | [`7777`](http://localhost:7777) |
| Webpack Bundle Analyzer | [`7778`](http://localhost:7778)      |

### Testing

`./scripts/test`

### Linting

Run ESLint by running:

```sh
./scripts/lint
```

### Prettier

This project runs Prettier automatically via Webpack and prettier-loader.

[prettier.io](https://prettier.io/docs/en/editors.html) has some instructions
for setting up Prettier with a number of editors including Emacs and Vim.

### Scripts

| Name | Description |
| --- | --- |
| `cibuild` | Build project and run linter and tests on TravisCI |
| `lint` | Run ESLint |
| `server` | Start webpack-dev-server on port 7777 |
| `setup` | Set up project for development |
| `test` | Run tests |

### Creating a Release with Git Flow

This project uses git flow for releases. You can [find the latest version of
`git-flow` to install here](https://github.com/petervanderdoes/gitflow-avh).

Once it's installed, you'll need to enable `git flow` in your local version of
the repo by typing:

```sh
git flow init
```

Use the default values provided; `master` for the current release, `develop` for
the next release. Since the release process entails pulling changes from
`develop` into a release, then merging that into `master`, you should ensure
that `develop` builds successfully on Travis before commencing a release.

After you've enabled `git flow`, you can use the following commands to make a
release, replacing "1.2.3" with the version you're releasing and updating the
`CHANGELOG.md`, `package.json`, and `package-lock.json` files to match that
version. You should also update the distribution bundle files:
`pwd.unitybar.js` & `pwd.unitybar.min.js`.

```sh
git flow release start 1.2.3
vim CHANGELOG.md
vim package.json
vim package-lock.json
./scripts/cibuild
git add CHANGELOG.md package.json package-lock.json dist/pwd.unitybar.js dist/pwd.unitybar.min.js
git commit -m "1.2.3"
git flow release publish 1.2.3
git flow release finish 1.2.3
```

After you've completed the `git flow` steps, you'll need to push the changes
from your local `master` and `develop` branches back to the main repository and
push the release tags to finalize the release:

```sh
git push origin master:master
git push origin develop:develop
git push --tags
```

Once you've pushed the tags, the new release will appear in the project's
["Releases" tab in GitHub](https://github.com/azavea/pwd-unitybar/releases).
There you can edit the tagged release to add release notes.

### API

The UnityBar's main interface is a React component configurable by supplying the
following props:

| name | type | description | default |
| --- | --- | --- | --- |
| currentAppName | string | The name of the current app | `null` (required) |
| appNameClickHandler | function | An optional function to call on clicking the app name. Makes the app name into a button | `null` |
| theme | string | UnityBar theme (`"blue"`, `"white"`, or `"custom"`) | `"blue"` |
| access | string | Access level (`"public"` or `"internal"`) | `"public"` |
| hasLogo | bool | Display the PWD logo | `true` |
| hasSearch | bool | Display the search bar | `true` |
| searchPlaceholder | string | Search bar placeholder text | `"Search"` |
| searchChangeHandler | function | Function to handle changes to the search bar input | `console.log` |
| searchSubmitHandler | function | Function to handle search bar input submission | `console.log` |
| searchBoxValue | string | Current [controlled input](https://reactjs.org/docs/forms.html#controlled-components) value | `""` |
| isSearching | bool | Disable the search input field and button while fetching | `false` |
| searchingIndicator | node | React component to use as a loading indicator while isSearching is true | `null` |
| hasMapAction | bool | Display the map action button | `true` |
| mapActionHandler | func | Function to handle clicks on the map action button | `null` |
| mapActionTitle | string | String to use for the title of the map action button | `"Map"` |
| hasHelpAction | bool | Display the help action button | `true` |
| helpActionHandler | function | Function to handle clicks on the help action button | `null` |
| helpActionTitle | string | String to use for the title of the help action button | `"Help"` |
| customActions | array | An array of [custom actions](https://github.com/azavea/pwd-unitybar/blob/develop/src/js/constants.js#L19) | `null` |
| authenticated | bool | Display the authenticated actions menu | `false` |
| hasSettings | bool | Display the settings action | `false` |
| settingsUrl | string | Link to settings page | `null` |
| settingsHandler | function | Function to handle clicking the settings action | `null` |
| signOutHandler | function | Function to handle clicking sign out | `console.log` |
| customMenuOptions | array | An array of [custom menu options](https://github.com/azavea/pwd-unitybar/blob/develop/src/js/constants.js#L26) | `null` |
| parcelViewerUrl | string | Link to the Stormwater Parcel Viewer website | `""` |
| creditsExplorerUrl | string | Link to the Stormwater Credits Explorer website | `""` |
| retrofitMapUrl | string | Link to the Stormwater Connect Map website. | `""` |
| retrofitCampaignUrl | string | Link to the Stormwater Connect website. | `""` |
