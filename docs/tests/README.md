# Tests

## Unit and integration testing

Unit testing with Jest is used to test some setup and helper functionality

Integration testing is performed with Jest and [React Testing Library](https://testing-library.com/docs/intro)
to test page functionality such as events and links.

[Extend expect](https://github.com/testing-library/jest-dom) is installed and made available in
`test-utils`. This provides many additional matchers

- `yarn run test` in the root will run all jest tests. Alternatively if run from a package directory

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
