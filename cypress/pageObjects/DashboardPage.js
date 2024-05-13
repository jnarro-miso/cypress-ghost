import { PostPage } from './PostPage';
import { TagsPage } from './TagsPage';
import { PagePage } from './PagePage';

export class DashboardPage {
  goToPosts() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/posts')
    cy.wait(1000);
    return new PostPage();
  }

  goToPostsOld() {
    cy.visit(Cypress.env('OLD_GHOST_ADMIN_URL') + '#/posts')
    cy.wait(1000);
    return new PostPage();
  }

  goToTags() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/tags')
    cy.wait(1000);
    return new TagsPage();
  }

  goToTagsOld() {
    cy.visit(Cypress.env('OLD_GHOST_ADMIN_URL') + '#/tags')
    cy.wait(1000);
    return new TagsPage();
  }
  
  goToPages() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/pages');
    return new PagePage();
  }

  goToPagesOld() {
    cy.visit(Cypress.env('OLD_GHOST_ADMIN_URL') + '#/pages');
    return new PagePage();
  }

}