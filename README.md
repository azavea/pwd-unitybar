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
