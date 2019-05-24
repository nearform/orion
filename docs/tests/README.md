# Tests

## End-to-end tests

End-to-end tests are provided in [./packages/e2e-tests](./packages/e2e-tests) and run using
TestCafe. The package requires environment variables in its .env file, see
[the Quick Start Guide](/docs/quick-start#2-configure) for details.

The following scripts are available from the project root directory:

- `npm run dev:e2e-test` - runs e2e tests on localhost:8000 using headless chrome, saving screenshots
on any failures

- `npm run hosted:e2e-test` - runs e2e tests as above, but on the remote URL and basic credentials
[in e2e-tests's .env](/docs/quick-start#2-configure)

- `npm run ci:e2e-test` - used in CircleCI. Starts Gatsby on localhost:8000 then runs e2e tests
in headless chrome, without screenshots

Scripts for running user-observable tests in non-headless browsers are provided in the [package's
own package.json](./packages/e2e-tests/package.json). `cd packages/e2e-tests` then:

- `npm run chrome-local`
- `npm run chrome-hosted`
- `npm run firefox-local`
- `npm run firefox-hosted`
