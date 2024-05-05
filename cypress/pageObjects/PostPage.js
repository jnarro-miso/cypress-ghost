export class PostPage {
  goToPosts() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/posts')
  }

  sortByRecentlyUpdated() {
    cy.get("[data-test-order-select]").click()
    cy.get("[data-option-index='2']").click()
  }

  findPostByText(text) {
    this.sortByRecentlyUpdated()
    return cy.get('.gh-posts-list-item-group').filter(`:contains('${text}')`)
  }

  checkPublishedPostExists(text) {
    return this.findPostByText(text).then(($post) => {
      cy.wrap($post).within(() => {
        cy.get('span.published').should('exist')
      })
    })
  }

  checkDraftPostExists(text) {
    return this.findPostByText(text).then(($draft) => {
      cy.wrap($draft).within(() => {
        cy.get('span.draft').should('exist')
      })
    })
  }

  navigateAndType(title, content) {
    cy.get("[data-test-nav='new-story']").click()
    cy.contains('New').should('be.visible')
    cy.get('.gh-editor-title').should('be.visible').type(title)
    cy.get('p[data-koenig-dnd-droppable]').type(content)
  }

  createPost(title = 'My post title', content = 'My post content') {
    this.navigateAndType(title, content)
    cy.get('button.gh-publish-trigger:visible').click()
    cy.get("[data-test-button='continue']").click()
    cy.get("[data-test-button='confirm-publish']").click()
  }

  createDraft(title = 'My draft', content = 'My draft content') {
    this.navigateAndType(title, content)
    cy.get("[data-test-link='posts']").click()
  }
}