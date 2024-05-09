export class PagePage {

  createPage(title, content) {
    cy.get("[data-test-new-page-button]").click();
    cy.get("[data-test-editor-title-input]").focus().type(title,  { delay: 50 });
    cy.get(".kg-prose").focus().type(content,  { delay: 50 });
    cy.get("[data-test-link='pages']").click()
    cy.get("[data-test-nav='pages']").contains("Pages").click();
  }

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
    cy.get("[data-test-editor-title-input]").focus().clear().type(title,  { delay: 50 });
    cy.get(".kg-prose").focus().clear().type(content,  { delay: 50 });
    cy.get("[data-test-link='pages']").click();
  }

  checkPageExists(pageTitle) {
    this.getElementByText(pageTitle).should('exist');
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

  deletePage(page) {
    cy.get('.gh-posts-list-item-group li')
      .contains('h3', page)
      .parent('a')
      .scrollIntoView()
      .click();
    cy.get('[data-test-psm-trigger]').click()
    cy.get('[data-test-button="delete-post"]')
      .scrollIntoView()
      .click()
    cy.get('[data-test-button="delete-post-confirm"]').click()
  }

  deletePages(pages = []) {
    for (const page of pages) {
      this.deletePage(page)
    }
  }

  async getPageContent(page) {
  }

  checkContentExist(page, content) {
    this.goToPage(page);
    cy.get('.gh-editor-title-container textarea')
    .invoke('val')
    .then(title => {
      cy.get('.kg-prose')
        .invoke('text')
        .then(paragraph => {
          wrap(title).should('equal', title);
          wrap(paragraph).should('equal', content);
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
    cy.wait(2000);
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

        cy.wait(2000);

        if (this.moreRequestsExist()) {
            this.scrollUntilNoMoreRequests();
        }
    });
  };


}


 