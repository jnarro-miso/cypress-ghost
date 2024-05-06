import { PostPage } from './PostPage';
import { TagsPage } from './TagsPage';
import { PagePage } from './PagePage';

export class DashboardPage {
  goToPosts() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/posts')
    return new PostPage();
  }

  goToTags() {
    cy.visit(Cypress.env('GHOST_ADMIN_URL') + '#/tags')
    return new TagsPage();
  }
  
  goToPages() {
    cy.get("[data-test-nav='pages']").contains("Pages").click();
    return new PagePage();
  }
}
