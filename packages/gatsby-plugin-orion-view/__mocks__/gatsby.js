const gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  // Link is recommended to be mocked in https://www.gatsbyjs.org/docs/unit-testing/#3-useful-mocks-to-complete-your-testing-environment
  // However it causes Forwardref warnings in the console. Mocking it isn't needed yet so it is commented out for now. Uncomment with caution!
  // Link: jest.fn().mockImplementation(
  //   // these props are invalid for an `a` tag
  //   ({
  //     activeClassName,
  //     activeStyle,
  //     getProps,
  //     innerRef,
  //     ref,
  //     replace,
  //     to,
  //     forward_ref,
  //     ...rest
  //   }) =>
  //     React.createElement('a', {
  //       ...rest,
  //       href: to,
  //     })
  // ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
  navigate: jest.fn(),
}
