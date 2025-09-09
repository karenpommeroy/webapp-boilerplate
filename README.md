<figure>
    <img src="./assets/images/logo.png" alt="boilerplate-webapp">
    <figcaption align="center">
		<em>Web Aapplication boilerplate</em>
	</figcaption>
</figure>

**Boilerplate WebApp** is a web application boilerplate using:

- **webpack**
- **yarn** (pnp)
- **react**
- **typescript**
- **material-ui**
- **i18next** (localization)
- **jest** (unit testing)
- **playwright** (e2e testing)
- **stylus**
- **eslint**
- **prettier**

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Building](#building)
- [Running](#running)
- [Tests](#tests)
- [License](#license)

## Building

To build **boilerplate-webapp** execute:

```bash
# install all the required dependencies
yarn install

# generate vs code sdk integrations (recommended for PnP)
yarn dlx @yarnpkg/sdks vscode
```

## Running

To run the application execute:

```bash
yarn start
```

This runs `webpack-dev-server` and opens app the app in a new browser window.

## Tests

To perform complete run of unit tests execute:

```bash
yarn test
```

If you only want to run a specific test suite you can specify it with `-f` argument like:

```bash
yarn test -f 'src/App.test.tsx'
```

To perform complete run of end2end tests using Playwright execute:

```bash
yarn playwright:test
```

If you only want to run a specific test suite you can specify it with `-f` argument like:

```bash
yarn playwright:test 'tests/application.spec.ts'
```

## License

This project is licensed under the [MIT License](LICENSE).
