const graphqlHooks = jest.requireActual('graphql-hooks')

module.exports = {
  ...graphqlHooks,
  useMutation: jest.fn().mockReturnValue([jest.fn()]),
}
