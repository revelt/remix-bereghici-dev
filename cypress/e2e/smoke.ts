describe('smoke', () => {
  it('should allow a typical user flow', () => {
    cy.visit('/')

    cy.findByRole('navigation').within(() => {
      cy.findByRole('link', {name: /📰 blog/i}).click()
    })

    cy.findByRole('heading', {
      name: /headings & accessibility/i,
    }).click()

    cy.get('html').should('have.class', 'light')

    cy.findByRole('button', {
      name: /toggle theme/i,
    }).click()

    cy.get('html').should('have.class', 'dark')
  })
})