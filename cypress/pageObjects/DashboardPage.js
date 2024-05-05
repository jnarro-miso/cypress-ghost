import { PostPage } from './PostPage';

export class DashboardPage {
  visit() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL'));
  }

  goToPosts() {
    cy.get("[data-test-nav='posts']").contains('Posts').click();
    return new PostPage();
  }
}