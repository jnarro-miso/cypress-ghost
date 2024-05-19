export class TagsPage {
  createTag(tagName) {
    cy.get("[data-test-nav='tags']").click()
    cy.contains('a', 'New tag').click()
    cy.get("[data-test-input='tag-name']").type(tagName)
    cy.get('.gh-canvas-title').click()
    if (tagName.length > 191) {
      cy.contains("Tag names cannot be longer than 191 characters.").should('exist')
      Cypress.env('ABLE_TO_SAVE', false);
    } else {
      cy.get("[data-test-button='save']").click()
      cy.get("[data-test-task-button-state='success']").should('exist')
      Cypress.env('ABLE_TO_SAVE', true);
    }
  }

  createTagOld(tagName) {
    cy.get("[href='#/tags/new/']").click()
    cy.contains('h2', 'New tag')
    cy.get("#tag-name").type(tagName)
    cy.get("button.gh-btn-blue").click()
    cy.contains('span', 'Saved').should('exist')
  }
}