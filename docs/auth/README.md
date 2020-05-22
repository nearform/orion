# Authentication and Authorization

This README describes the current authorization/authentication setup used by the project and some background on the different design and implementation decisions made.

## Authentication

The project uses [AWS Amplify's authentication module](https://aws-amplify.github.io/docs/js/authentication) for system signup and signin. The module provides a complete solution, managing all server interaction and providing a UI with the different form components (signin, signup, signup confirmation, password reset etc.) needed. Amplify provides a basic mechanism for customizing the UI components, but it is limited in what it allows and in particular doesn't provide any way to control how authentication errors are presented within the UI.

This project's `components` package provides a customized authorization UI based on Amplify in [packages/components/src/components/auth](https://github.com/nearform/orion/tree/master/packages/components/src/components/auth). The UI is structured as a macro-component named `CustomAuthenticator` which displays and manages the entire authentication lifecycle. The component can be included in a page as follows:


```
    import { CustomAuthenticator } from 'components'

    ...

    <CustomAuthenticator />
```
### Bypassing AWS Amplify's authentication module in local development environment

For local development purposes you might not want to configure the AWS authentication module. For that purpose the project supports both **Authenticacion mode** and **Bypass authentication mode**.

You can switch between modes by setting up the desired environments variables in `packages/gatsby-plugin-orion-view/.env.development` file.
If `BYPASS_AWS_COGNITO` environment variable is set to `false` the Authentication mode is enabled. In this scenario, Amplify's authentication module must be configured.
If `BYPASS_AWS_COGNITO` is set to false the Bypass authentication mode is enabled, then `DEVELOPMENT_USERNAME` and `DEVELOPMENT_PASSWORD` environment variables must be filled up in order to create credentials for signing in.
Please refer to `packages/gatsby-plugin-orion-view/.env.sample` to get an example of the environments variables needed.

**Note-1: If you are switching from the `Authentication mode` to  `Bypass authentication mode` you might need to clear up the cookies from your browser to avoid conflicts between modes**

**Note-2: In Bypass authentication mode create account feature is disabled**

### Authentication errors

The custom authorization components contain a workaround for Amplify's limited error handling and display capabilities. Most of this workaround is implemented in the [authEventMixin](https://github.com/nearform/orion/blob/master/packages/components/src/components/auth/AuthEventMixin.js), which is a mixin class which adds additional functionality to the extended authorization components. The mixin hooks into the Amplify auth component's internal lifecycle methods to intercept error state calls and then modify them. It modifies the calls by adding more information about the error type (e.g. by associating the error with a particular form field), and/or by rewriting the error message displayed to the user.

The file [AuthErrors.js](https://github.com/nearform/orion/blob/master/packages/components/src/components/auth/AuthErrors.js) provides a number of tests for detecting different error types and rewriting or modifying them. The different tests are first grouped by authentication step, and then by the name of the field within the form associated with that step. When an error occurs, all fields tests for the current authentication step are evaluated, and the resulting error is associated with any field whose test returns a match. Once an error is associated with a field it is displayed in the UI as a message directly below that field. Any errors which aren't associated with a specific form field are displayed as general errors at the top of the form.

### Auto-signin after signup

The Amplify authentication module doesn't provide any mechanism for performing an automatic signin immediately after a new user has confirmed their signup. To get around this restriction, the custom authorization components include code to capture a new user's username and password when the signup form is submitted, and to then use these to perform an automatic signin once the signup is confirmed. See [CustomSignUp.js](https://github.com/nearform/orion/blob/master/packages/components/src/components/auth/CustomSignUp.js#L74), `authData` handling in the [CustomAuthenticator component](https://github.com/nearform/orion/blob/master/packages/components/src/components/auth/index.js#L18) and the [CustomSignIn.js] component.

## Dependency managemnt

When the common authentication components are used within a client project (e.g. `knowledge-base`) it's important that component module and its client share the same instances of the `aws-amplify-*` module dependencies otherwise runtime errors occur and the authentication forms will fail to work properly. In order to achieve this, the project repo uses `lerna` with `yarn` to hoist all common project dependencies to the repo root.

### Gatsby config

Gatsby has an odd bug that occurs when building in a monorepo environment with hoisted `react` and `material-ui` dependencies, and which causes the build process to go into an infinite loop. To avoid this problem, Gatsby's webpack configuration has to be modified to force loading of these dependencies from the project's root `node_modules` folder.
See the `onCreateWebpackConfig` function in `gatsby-node.js` in [knowledge-base](https://github.com/nearform/orion/blob/master/packages/knowledge-base/gatsby-node.js) or [knowledge-base](https://github.com/nearform/orion/blob/master/packages/knowledge-base/gatsby-node.js).

# Authorization

The `components` package provides functions for performing authorization and permissions checks via the [AuthWrapper](https://github.com/nearform/orion/blob/master/packages/components/src/components/AuthWrapper.js) component. The UI is wrapped in an instance of `AuthWrapper` when rendered by Gatsby (see `wrapRootElement()` in `gatsby-browser.js` or `gatsby-ssr.js`). The different functions made available by the wrapper can then be accessed in any UI component using the `AuthContext` defined in `AuthWrapper`, e.g.:

```
  import { AuthContext } from 'components'

  function Dolally() {
    const { isAuthInitialized } = useContext(AuthContext)
    ...
  }
```

## User group loading

The authorization functions defined in `AuthWrapper` need a list of available user groups in order to work correctly. This user group list is loaded _at build time_, using a Gatsby static graphql query. Because of limitations within Gatsby, the static query has to be defined in the Gatsby project's source code, and the query result then passed to the `AuthWrapper` component. In addition, static queries don't work if called from Gatsby's `wrapRootElement()` function. To get around these restrictions, `knowledge-base` includes a small amount of boilerplate code to bootstrap the authentication system. Both projects have a hook called [useUserGroups](https://github.com/nearform/orion/blob/master/packages/gatsby-plugin-orion-core/hooks/useUserGroups.js) which executes the user group query and passes the result to the in-scope `AuthWrapper` component. This hook is then called from the `wrapPageElement()` function in both `gatsby-browser.js` and `gatsby-ssr.js`.


# Administration

The `components` package also includes a standard set of components for performing user and group administration tasks, see the [packages/components/src/components/admin](https://github.com/nearform/orion/blob/master/packages/gatsby-plugin-orion-core/hooks/useUserGroups.js) sub-module.

