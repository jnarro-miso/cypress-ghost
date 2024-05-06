import { PostPage } from './PostPage';
import { PagePage } from './PagePage';

export class DashboardPage {
  goToPosts() {
    cy.get("[data-test-nav='posts']").contains('Posts').click();
    return new PostPage();
  }

  goToPages() {
    cy.get("[data-test-nav='pages']").contains("Pages").click();
    return new PagePage();
  }
}
