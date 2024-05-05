import { PostPage } from './PostPage';

export class DashboardPage {
  visit() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL'));
  }

  goToPosts() {
    cy.get('#ember19').contains('Posts').click();
    return new PostPage();
  }
}