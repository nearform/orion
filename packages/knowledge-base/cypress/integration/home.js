describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8001/')
  })

  it('login', () => {
    cy.get('[data-testid="login-button"]').click()

    cy.get('[data-testid="login-username"] input').type(
      'toni.sharpe@nearform.com'
    )

    cy.get('[data-testid="login-password"] input').type('Password!1')

    cy.get('[data-testid="login-submit"]').click()
  })
})
