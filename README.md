# PWD Unity Bar

[![Build Status](https://travis-ci.org/azavea/pwd-unitybar.svg?branch=develop)](https://travis-ci.org/azavea/pwd-unitybar)

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

### Testing

`./scripts/test`

### Linting

Run ESLint by running:

```sh
./scripts/lint
```

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
`CHANGELOG.md` and `package.json` files to match that version:

```sh
git flow release start 1.2.3
vim CHANGELOG.md
git add CHANGELOG.md package.json
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

