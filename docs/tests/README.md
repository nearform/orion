# Tests

## Unit and integration testing

Unit testing with Jest is used to test some setup and helper functionality

Integration testing is performed with Jest and [React Testing Library](https://testing-library.com/docs/intro)
to test page functionality such as events and links.

[Extend expect](https://github.com/testing-library/jest-dom) is installed and made available in
`test-utils`. This provides many additional matchers

- `yarn run test` in the root will run all jest tests. Alternatively if run from a package directory

### GraphQL

To mock graphql-hooks (including ) firstly mock the query files with the filenames.

    jest.mock('../queries', () => ({
        fooQuery: 'fooQuery',
        ...
    }))

Then mock the query results based on the filename and options

For example To mock useQuery:

    jest.mock('components', () => ({
      ...jest.requireActual('components'),
      useQuery: (queryName, options) => {
        const selectOption = optionsString =>
        ({
          'fooQuery-{"id":null}': 'getShallowAssessmentData-null',
          ...
        }[optionsString])
        const mockUrl = selectOption(`${queryName}-${JSON.stringify(options)}`)

        return {
          data: require(`./__mocks__/foo-${mockUrl}.mock`).default,
          loading: false,
          refetch: false,
        }
      },
    }))

### Material-UI

Testing material-ui elements can provide challenges:

- Check boxes - It is neccessary to test the getter on the DOM and not the checked attribute.
  expect(inputElement.checked).toBe(true) and not expect(inputElement).toHaveAttribute('checked', true)

See https://stackoverflow.com/questions/53271663/how-to-test-material-ui-checkbox-is-checked-with-react-testing-library

- Modals and select lists must be mocked as they are rendered outside of the container.

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
