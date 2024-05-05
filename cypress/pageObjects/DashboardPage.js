import { PostPage } from './PostPage';

export class DashboardPage {
  goToPosts() {
    cy.get("[data-test-nav='posts']").contains('Posts').click();
    return new PostPage();
  }
}