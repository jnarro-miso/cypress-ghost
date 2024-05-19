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

  findPostByIdOld(id) {
    return cy.get(`.gh-post-list-title[href="#/editor/post/${id}/"]`)
  }

  findPostByText(text) {
    this.sortByRecentlyUpdated();
    return cy.get('.gh-posts-list-item-group').then($elements => {
      const filteredElements = $elements.filter((index, element) => {
        return element.textContent.includes(text);
      });
      return cy.wrap(filteredElements);
    });
  }

  getInputValue(selector) {
    return cy.get(selector).invoke('val')
  }

  checkPublishedPostExists(title) {
    this.findPostByText(title).first().then(($post) => {
      cy.wrap($post).within(() => {
        cy.get('span.published').should('exist')
      });
    });
  }

  checkDraftPostExists(text) {
    return this.findPostByText(text).first().then(($draft) => {
      cy.wrap($draft).within(() => {
        cy.get('span.draft').should('exist')
      })
    })
  }

  typeTitle(title) {
    if (title !== '') {
      cy.get('.gh-editor-title').type(title)
    } else {
      cy.get('.gh-editor-title').clear()
    }
  }

  typeContent(content) {
    if (content !== '') {
      cy.get('p[data-koenig-dnd-droppable]').type(content)
    } else {
      cy.get('p[data-koenig-dnd-droppable]').clear()
    }
  }

  clearTitle() {
    cy.get('.gh-editor-title').clear()
  }

  startNewPost(title, content) {
    cy.get("[data-test-nav='new-story']").click()
    cy.contains('New').should('be.visible')
    this.typeTitle(title)
    this.typeContent(content)
  }

  createPost(title = 'My post title', content = 'My post content') {
    this.startNewPost(title, content);
    cy.get('body').then(($body) => {
      if ($body.find('button.gh-publish-trigger:visible').length) {
        cy.get('button.gh-publish-trigger:visible').click();
        cy.get("[data-test-button='continue']").click();
        cy.get("[data-test-button='confirm-publish']").click();
        cy.contains('Boom. It’s out there.').should('be.visible');
        Cypress.env('publishButtonFound', true);
      } else {
        Cypress.env('publishButtonFound', false);
      }
    });
    return cy.url();
  }

  createPostOld(title = 'My post title', content = 'My post content') {
    cy.get(".gh-nav-new-post[href='#/editor/post/']").click()
    cy.get("[placeholder='Post Title']").type(title)
    cy.get(".gh-koenig-editor-pane").click()
    cy.get(".gh-publishmenu-trigger").click()
    cy.get("button.gh-publishmenu-button").click()
    cy.contains('Published').should('be.visible')
    return cy.url()
  }

  createDraft(title = 'My draft', content = 'My draft content') {
    this.startNewPost(title, content)
    cy.get("[data-test-link='posts']").click()
  }

  createDraftOld(title = 'My draft', content = 'My draft content') {
    cy.get(".gh-nav-new-post[href='#/editor/post/']").click()
    cy.get("[placeholder='Post Title']").type(title)
    cy.get('a[href="#/posts/"]').click()
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

  openSettingsOld() {
    cy.get("button.post-settings").click()
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

  selectTagOld(tagName) {
    cy.get("#tag-input").type(tagName).type('{enter}')
    cy.get("button.close").click()
    cy.get(".gh-publishmenu-trigger").click()
    cy.get("button.gh-publishmenu-button").click()
    cy.contains('Updated').should('be.visible')
  }

  goToPublishedPost() {
    cy.get('[data-test-editor-post-status] .view-post').click()
  }
}