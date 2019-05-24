import { Role, Selector } from 'testcafe'

export default function getRoles(url, config) {
  const { login, admin } = config.paths

  return {
    adminRole: Role(url + login, async t => {
      const { username, password } = config.users.admin

      const usernameField = Selector('input[name=username]')
      const passwordField = Selector('input[name=password]')
      const submitButton = Selector('button[type=submit]')
      await t
        .typeText(usernameField, username)
        .typeText(passwordField, password)
        .click(submitButton)

      // We must be sure the process completed here, else testcafe might save wrong cookies
      const adminButton = Selector(
        '[data-testid="main-toolbar__links-container"] a'
      ).withAttribute('href', admin)

      // Makes testcafe wait until tested-for element exists, preventing saving cookies too early
      await t.expect(adminButton.exists).ok({ timeout: 10000 })

      // There is some flakiness around admin section's first load
      // See https://github.com/nearform/raw-salmon/issues/208
      // TODO: remove this when admin page loads on first attempt after log in
      await t.click(adminButton)
    }),
  }
}
