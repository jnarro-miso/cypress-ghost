export class PostPage {
  sortByRecentlyUpdated() {
    cy.get('.gh-list-loadingcell').should('not.exist')
    cy.get("[data-test-order-select]").click()
    cy.get("[data-option-index='2']").should('be.visible').click()
  }

  findPostById(id) {
    this.sortByRecentlyUpdated()
    return cy.get(`[data-test-post-id='${id}']`)
  }

  findPostByText(text) {
    this.sortByRecentlyUpdated()
    return cy.get('.gh-posts-list-item-group').filter(`:contains('${text}')`)
  }

  getInputValue(selector) {
    return cy.get(selector).invoke('val')
  }

  checkPublishedPostExists(title) {
    this.findPostByText(title).then(($post) => {
      cy.wrap($post).within(() => {
        cy.get('span.published').should('exist')
      });
    });
  }

  checkDraftPostExists(text) {
    return this.findPostByText(text).then(($draft) => {
      cy.wrap($draft).within(() => {
        cy.get('span.draft').should('exist')
      })
    })
  }

  typeTitle(title) {
    cy.get('.gh-editor-title').type(title)
  }

  clearTitle() {
    cy.get('.gh-editor-title').clear()
  }

  startNewPost(title, content) {
    cy.get("[data-test-nav='new-story']").click()
    cy.contains('New').should('be.visible')
    this.typeTitle(title)
    cy.get('p[data-koenig-dnd-droppable]').type(content)
  }

  createPost(title = 'My post title', content = 'My post content') {
    this.startNewPost(title, content)
    cy.get('button.gh-publish-trigger:visible').click()
    cy.get("[data-test-button='continue']").click()
    cy.get("[data-test-button='confirm-publish']").click()
    cy.contains('Boom. It’s out there.').should('be.visible')
    return cy.url()
  }

  createDraft(title = 'My draft', content = 'My draft content') {
    this.startNewPost(title, content)
    cy.get("[data-test-link='posts']").click()
  }

  deletePost() {
    cy.get("[data-test-button='delete-post']").click()
    cy.get('.epm-modal').should('be.visible')
    cy.get("[data-test-button='delete-post-confirm']").click()
    cy.contains('All posts').should('be.visible')
  }

  goToEditor() {
    cy.get("[data-test-button='close-publish-flow']").click()
  }

  toggleSettings() {
    cy.get("button.settings-menu-toggle").click()
  }

  publishPost() {
    cy.get("[data-test-button='publish-save']:visible").click()
    cy.contains('Updated').should('be.visible')
  }

  selectTag(tagName) {
    cy.get("#tag-input").type(tagName).type('{enter}')
    this.toggleSettings()
    cy.get("[data-test-button='publish-save']:visible").click()
    cy.contains('Updated').should('be.visible')
  }

  goToPublishedPost() {
    cy.get('[data-test-editor-post-status] .view-post').click()
  }
}