export class TagsPage {
  createTag(tagName) {
    cy.get("[data-test-nav='tags']").click()
    cy.contains('a', 'New tag').click()
    cy.get("[data-test-input='tag-name']").type(tagName)
    cy.get("[data-test-button='save']").click()
    cy.get("[data-test-task-button-state='success']").should('exist')
  }
}