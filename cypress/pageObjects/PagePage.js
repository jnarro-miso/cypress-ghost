export class PagePage {

  /**
   * New pages section
   */
  goBackToPagesOld() {
    cy.get('[class="blue link fw4 flex items-center ember-view"]').click();
  }

  goBackToPages() {
    cy.get('[class="ember-view gh-btn-editor gh-editor-back-button"]').contains("Pages").click();
  }

  createPage(title, content) {
    cy.get("[data-test-new-page-button]").click();
    cy.get("[data-test-editor-title-input]").focus().type(title,  { delay: 20 });
    cy.get(".kg-prose").focus().type(content,  { delay: 20 });
    cy.get("[data-test-link='pages']").click()
    cy.get("[data-test-nav='pages']").contains("Pages").click();
  }


  setPageContent(title, content) {
    cy.get("[data-test-editor-title-input]").type(title,  { delay: 20 });
    cy.get(".kg-prose").type(content,  { delay: 20 });
  }

  setPageContentOld(title, content) {
    cy.get("[class='gh-editor-title ember-text-area gh-input ember-view']").type(title,  { delay: 25 });
    cy.get('[class="koenig-editor__editor __mobiledoc-editor __has-no-content"]').type(content,  { delay: 25 });
  }

  gotoCreateNewPageOld() {
    cy.visit(Cypress.env('OLD_GHOST_ADMIN_URL') + '#/editor/page/');
  }

  gotoCreateNewPage() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/editor/page/');
  }

  createPageOld(title, content) {
    cy.visit(Cypress.env('OLD_GHOST_ADMIN_URL') + '#/editor/page/');
    cy.get("[class='gh-editor-title ember-text-area gh-input ember-view']").focus().type(title,  { delay: 20 });
    cy.get('[class="koenig-editor__editor __mobiledoc-editor __has-no-content"]').focus().type(content,  { delay: 20 });
    cy.get('[class="blue link fw4 flex items-center ember-view"]').click();
  }

  /*****/



  publishPage(page) {
    this.goToPage(page)
    cy.get("[data-test-button='publish-flow']").contains('Publish').click()
    cy.get("[data-test-button='continue']").click()
    cy.get("[data-test-button='confirm-publish']").click()
    cy.get("[href='#/dashboard/']").contains("Back to dashboard").click()
    cy.get("[data-test-nav='pages']").contains("Pages").click();
  }

  
  goToPage(page) {
    cy.get('.gh-posts-list-item-group li')
      .contains('h3', page)
      .parent('a')
      .scrollIntoView()
      .click();
  }

  editPage(page, title, content) {
    this.goToPage(page);
    cy.get("[data-test-editor-title-input]").focus().clear().type(title,  { delay: 20 });
    cy.get(".kg-prose").focus().clear().type(content,  { delay: 20 });
    cy.get("[data-test-link='pages']").click();
  }

  checkElementDontExist(elementText) {
    cy.contains(elementText).should('not.exist')
  }
  checkElementExists(elementText) {
    cy.contains(elementText).should('exist')
  }

  getElementContainingText(text) {
    return cy.get(`//*/*/*[contains(text(), '${text}')]`)
  }

  getElementByText(text) {
    return cy.get(`//*/*/*[text() = '${text}']`)
  }

  getPages() {
    try {
      return cy.get("[role='menuitem']").then((pageItems) => {
        const texts = [];
        pageItems.each((index, pageItem) => {
          const text = Cypress.$(pageItem).find('h3').text().trim();
          texts.push(text);
        });
        return texts;
      });
    } catch {
      return []
    }
  }

  /**
   * New Page options
   */
  deployPageOptions() {
    cy.get('[data-test-psm-trigger]').click()
  }

  deployPageOptionsOld() {
    cy.get('[title="Settings"]').click()
  }

  addUri(uri) {
    cy.get('#url').type(uri);
  }

  addTag(tag) {
    cy.get('#tag-input').type(tag);
    cy.get('#tag-input').trigger('keydown', { keyCode: 13 });
  }

  clickOnDeletePage() {
    cy.get('[data-test-button="delete-post"]')
    .scrollIntoView()
    .click()
  }

  clickOnDeletePageOld() {
    cy.get('[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]')
    .scrollIntoView()
    .click()
  }

  confirmPageDeletion() {
    cy.get('[data-test-button="delete-post-confirm"]').click()
  }

  confirmPageDeletionOld() {
    cy.get('div[class="modal-footer"] button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]').then((elements) => {
      elements[0].click()
    })    
  }

  /****/


  selectPage(page) {
    cy.get('.gh-posts-list-item-group li')
    .contains('h3', page)
    .parent('a')
    .scrollIntoView()
    .click();
  }

  selectPageOld(page) {
    cy.contains('h3', page)
    .parent('a')
    .scrollIntoView()
    .click();
  }

  deletePage(page) {
    this.selectPage(page);
    this.deployPageOptions();
    this.clickOnDeletePage()
    this.confirmPageDeletion()
  }

  deletePageOld(page) {
    this.selectPageOld(page);
    this.deployPageOptionsOld();
    this.clickOnDeletePageOld()
    this.confirmPageDeletionOld()
  }

  deletePages(pages = []) {
    for (const page of pages) {
      this.deletePage(page)
    }
  }

  checkContentExist(page, content) {
    this.goToPage(page);
    cy.get('.gh-editor-title-container textarea')
    .invoke('val')
    .then(title => {
      cy.get('.kg-prose')
        .invoke('text')
        .then(paragraph => {
          cy.wrap(title).should('equal', title);
          cy.wrap(paragraph).should('equal', content);
        });
    });
  }

  

  checkPageStatus(page, status) {

    cy.get('.gh-posts-list-item-group li')
    .contains('h3', page)
    .parent('a')
    .then(a => {
      cy.wrap(a[0].lastElementChild.innerText).should('equal', status);
    })
  }

  moreRequestsExist = () => {
    let currentScrollPosition = 0;
    cy.window().then(win => {
        currentScrollPosition = win.scrollY;
    });
    this.scrollToBottom();
    cy.wait(5000);
    let newScrollPosition = 0;
    cy.window().then(win => {
        newScrollPosition = win.scrollY;
    });
    if (newScrollPosition > currentScrollPosition) {
        return true;
    } else {
        return false;
    }
};
  
  scrollToBottom = () => {
    cy.window().then(win => {
        win.scrollTo(0, win.document.body.scrollHeight);
    });
  };

  scrollUntilNoMoreRequests = () => {
    cy.wrap().then(() => {
        this.scrollToBottom();

        cy.wait(5000);

        if (this.moreRequestsExist()) {
            this.scrollUntilNoMoreRequests();
        }
    });
  };

  orderPagesByRecentUpdates() {
    // Click on the dropdown to open it
    cy.get('[data-test-order-select="true"]').within(() => {
      cy.get('.gh-contentfilter-menu-trigger').click();
    });

    // Select the "Recently updated" option
    cy.get('.ember-power-select-options')
      .contains('Recently updated')
      .click();
  }

}


 