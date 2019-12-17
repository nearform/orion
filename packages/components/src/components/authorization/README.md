# Authorization components

This folder contains components useful for user authorization tasks.

## AuthContext

This is a React context through which permissions and other authorization information can be accessed.

The authorization context includes the following properties:

* `isAuthInitialized`: A flag indicating whether the context is initialized.
* `getUserTokenData`: A function for accessing user information.
* `getUserRole`: A function for reading the user's role.
* `hasPermissions`: A function for testing whether the current user has specified permissions.

## AuthWrapper

This is a component that should be inserted at the root of a page's component hierarchy, in order to make the authorization context available to all components within the page.

### Initialization process

The authorization context needs to read user group information from the server before it can fully initialize. This requires a graphql query to be executed and can result in a small delay between a page being loaded and the authorization context being fully initialized. The completion of this process can be detected using the `isAuthInitialized` flag.

## useAuthorizedQuery

This is a React hook that can be used to execute graphql queries that require a fully initialized authorization context in order to complete.

Many Hasura based graphql queries within the codebase include permission restricted fields in their result, and these queries will fail unless they are executed within a fully initialized authentication context. The `useAuthorizedQuery` hook allows a graphql query to be scheduled for execution as soon as the authorization context is initialized.

The hook API is based on the `useQuery` hook API from [graphql-hooks](https://github.com/nearform/graphql-hooks#useQuery), but with a few key differences.

### Usage
```
const state = useAuthorizedQuery(query, variables, options)
```

### Example
```
const { data, loading, error } = useAuthorizedQuery(query, { id })

if (loading) {
    return 'Loading...'
}
if (error) {
    return 'Error'
}
return <div>{data}</div>
```

The hook's first argument is a string containing the graphql to be executed. The hook will wait for the authorization context to become initialized before executing the query and returning the result. The hook follows the same cache semantics as described for `useQuery`.

The hook's second argument is the set of variables (parameters) for the query. Note that this differs from `useQuery`, which accepts a set of _query options_ in this position.

The hook's third argument is a set of query options, which can be any of the following:

* `onPreFetch`: A function called before executing the query. The function is passed the set of query variables, and can prevent the query from executing by returning `false`.
* `onFetch`: A function called after executing the query. The function is passed the data returned by the query and can be used to rewrite the result returned to the hook client. Note that the function will only ever be called with a non-null argument.
* `onNoFetch`: A function called by the hook when the query isn't executed. The function is passed three arguments: (1) the current query variables; (2) the current loading state (see below); and (3) the current error, if any. The function can be used to return data to be used in default of a query result.
* `noCache`: A flag corresponding to the `useQuery` option of the same name.

The hook returns a state object with the following properties:

* `data`: The result of executing the query. Will be `null` if the query hasn't executed yet. If an `onFetch` and/or `onNoFetch` option is specified, then this will be the result returned from either of these functions, depending on the query state.
* `loading`: A flag indicating whether data is pending or not. The flag is true if (1) the query is currently executing or (2) the hook is waiting for the authorization context to initialize before executing the query.
* `isPreFetch`: A flag indicating if the currently executing query is the initial query (use in conjunction with `loading`)
* `error`: An object containing error information after a query execution failed; see `useQuery`.
* `refetch`: A function which can be used to re-fetch data by re-executing the query. Query variables can be passed to the function when calling. If an `onPreFetch` option was specified then this will be called before re-running the query.

