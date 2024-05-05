export class PostPage {
  getPosts() {
    cy.log('Posts!')
  }

  createPost(title = 'My post title', content = 'My post content') {
    cy.log('Creating post!')
    cy.get("[data-test-nav='new-story']").click()
    cy.contains('New').should('be.visible')
    cy.get('.gh-editor-title').should('be.visible').type(title)
    cy.get('p[data-koenig-dnd-droppable]').type(content)
    cy.get('button.gh-publish-trigger:visible').click()
  }
}