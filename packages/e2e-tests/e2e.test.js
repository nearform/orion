import {} from 'dotenv/config'
import { Selector, ClientFunction } from 'testcafe'

const getWindowLocation = ClientFunction(() => window.location)

export default function e2eTest(url, config, roles) {
  fixture`e2e-anonymous`.page(url).httpAuth(config.httpAuth)

  test('Navigate anonymous user through templates "assessment", "criterion", towards "criterion-part"', async t => {
    // No assessments table until logged in
    const assessmentsTable = Selector('[data-testid="assessments-table"]')
    await t.expect(assessmentsTable.exists).notOk()

    // Confirm that there is a link to the expected assessment type
    const assessmentLinks = Selector(
      '[data-testid="assessment-tool"] a[role="button"]'
    )
      .withText(/enter/i)
      .withAttribute('href', /assessment\/.+/)

    await t.expect(assessmentLinks.count).gt(1)

    // Confirm that clicking on it navigates as expected
    await t.click(assessmentLinks.nth(1))

    const { pathname: assessmentPath } = await getWindowLocation()
    await t.expect(assessmentPath).match(/assessment\/.+/)

    const assessmentTemplate = Selector('[data-testid="assessment"]')
    await t.expect(assessmentTemplate.exists).ok()

    const nameInput = assessmentTemplate.find('form input[name="name"]')
    await t.expect(nameInput.exists).ok()

    // Test that tooltip is present and working
    const titleWithTooltip = assessmentTemplate
      .find('[data-testid="contextual-help"]')
      .withAttribute('title')
      .nth(0)
    const tooltipText = await titleWithTooltip.getAttribute('title')

    await t.hover(titleWithTooltip)

    const tooltipId = await assessmentTemplate
      .find('[data-testid="contextual-help"]')
      .withAttribute('aria-describedby')
      .getAttribute('aria-describedby')

    const tooltip = Selector(`#${tooltipId}`)

    await t.expect(tooltip.visible).ok()

    await t.expect(tooltip.textContent).contains(tooltipText)

    // Stop here as other behaviours for anonymous user are likely to change soon
  })

  test('Admin section and subpaths are inaccessible to anonymous user', async t => {
    const { admin, allUsers, pendingUsers, groups, login } = config.paths

    const adminPages = [admin, allUsers, pendingUsers, groups]

    // Confirm that no admin pages are accessible to an anonymous user
    adminPages.forEach(async path => {
      await t.navigateTo(path)

      const { pathname: adminPagePath } = await getWindowLocation()
      await t.expect(adminPagePath).eql(login)
    })
  })

  test('Correct display of homepage, MainToolbar', async t => {
    const { home, admin, login } = config.paths

    // Confirm home tab is in correct position and is highlighted
    const linkContainer = Selector(
      '[data-testid="main-toolbar__links-container"]'
    )
    const homeTab = linkContainer.find('a[role="button"]').nth(0)

    await t.expect(await homeTab.getAttribute('aria-current')).eql('page')

    // Confirm correct tabs are present for unauthenticated user
    const loginTab = linkContainer
      .find('a[role="button"]')
      .withAttribute('href', login)
    await t.expect(loginTab.exists).ok()

    const adminTab = linkContainer
      .find('a[role="button"]')
      .withAttribute('href', admin)
    await t.expect(adminTab.exists).notOk()

    // Confirm logo exists and links to home
    const logo = Selector('[data-testid="main-toolbar__logo"]')
    await t.expect(logo.exists).ok()

    await t.click(logo)
    const { pathname: logoPath } = await getWindowLocation()
    await t.expect(logoPath).eql(home)
  })

  fixture`e2e-administrator`
    .page(url)
    .httpAuth(config.httpAuth)
    .beforeEach(async t => {
      await t.useRole(roles.adminRole)
    })

  test('Admin sections show expected content for admins', async t => {
    const { allUsers, pendingUsers, groups } = config.paths

    // TODO: Test admin page loads after fixing a bug uncovered by this test where
    // a user's first naviation to admin leads to never-ending loading screen
    await t.navigateTo(pendingUsers)
    // Ensure that we're still on this page, no redirects
    const { pathname: pendingUsersPath } = await getWindowLocation()
    await t.expect(pendingUsersPath).eql(pendingUsers)
    await t.expect(Selector('[data-testid="pending-users"]').exists).ok()

    await t.navigateTo(allUsers)
    const { pathname: allUsersPath } = await getWindowLocation()
    await t.expect(allUsersPath).eql(allUsers)
    await t.expect(Selector('[data-testid="all-users"]').exists).ok()

    await t.navigateTo(groups)
    const { pathname: groupsPath } = await getWindowLocation()
    await t.expect(groupsPath).eql(groups)
    await t.expect(Selector('[data-testid="user-groups"]').exists).ok()
  })

  test('Access existing assessment', async t => {
    const { login } = config.paths

    // Confirm there's no login tab while giving assessments table time to load
    const loginTab = Selector(
      '[data-testid="main-toolbar__links-container"] a[role="button"]'
    ).withAttribute('href', login)
    await t.expect(loginTab.exists).notOk()

    const assessmentsTable = Selector('[data-testid="assessments-table"]')
    await t.expect(assessmentsTable.exists).ok()

    const assessmentButton = await assessmentsTable
      .find('td:last-child a[role="button"]')
      .withAttribute('href', /assessment\/.+#\d+/)

    await t.expect(assessmentButton.exists).ok()
    await t.click(assessmentButton)

    const keyInformation = Selector(
      '[data-testid="assessment__key-information"]'
    )
    await t.expect(keyInformation.exists).ok()

    const modelAreas = Selector('[data-testid="assessment__model-areas"]')
    await t.expect(modelAreas.exists).ok()

    const criterionLink = modelAreas
      .find('a')
      .withAttribute('href', /assessment\/.+\/.+\/.+#\d+/)

    await t.click(criterionLink.nth(0))

    const criterion = Selector('[data-testid="criterion"]')
    await t.expect(criterion.exists).ok()

    const criterionPartLink = criterion
      .find('a[role="button"]')
      .withAttribute('href', /assessment\/.+\/.+\/.+\/\d+#\d+/)

    await t.click(criterionPartLink)

    const criterionPart = Selector('[data-testid="criterion-part"]')
    await t.expect(criterionPart.exists).ok()
  })
}
