import { LoginPage } from "../pageObjects/LoginPage";
import { faker } from '@faker-js/faker';


describe('Pages feature', () => {
  const loginPage = new LoginPage();
  let dashboardPage;

  // Given a user is logged in to the Ghost admin
  beforeEach(() => {
    loginPage.visit()
    dashboardPage = loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
  });

  // Pool de datos (pseudo) aleatorio 
  it('Creación de nueva página', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      cy.wait(1000)
      cy.screenshot('Ghost-5.82-EP11-1')

      // When
      pagePage.gotoCreateNewPage();
      cy.screenshot('Ghost-5.82-EP11-2')

      pagePage.setPageContent(page.title, page.content);
      cy.screenshot('Ghost-5.82-EP11-3')

      pagePage.goBackToPages()
      cy.wait(1000)
      cy.screenshot('Ghost-5.82-EP11-4')

      // Then
      pagePage.checkElementExists(page.title);
    });
  });

  // Pool de datos (pseudo) aleatorio 
  it('Eliminación de nueva página', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      pagePage.createPage(page.title, page.content);
      cy.wait(1000);
      cy.screenshot('Ghost-5.82-EP13-1');
      
      // When
      pagePage.selectPage(page.title);
      cy.screenshot('Ghost-5.82-EP13-2');

      pagePage.deployPageOptions();
      cy.screenshot('Ghost-5.82-EP13-3');

      pagePage.clickOnDeletePage();
      cy.screenshot('Ghost-5.82-EP13-4');

      pagePage.confirmPageDeletion();
      cy.screenshot('Ghost-5.82-EP13-5');
      
      cy.wait(1000)
      cy.screenshot('Ghost-5.82-EP13-6');

      //Then
      pagePage.checkElementDontExist(page.title)
    });
  });


  // Pool de datos (pseudo) aleatorio 
  it('Guardar Draft', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      
      // When
      pagePage.createPage(page.title, page.content)
      
      // //Then
      pagePage.checkContentExist(page.title, page.content);
    });
  });

  // Pool de datos (pseudo) aleatorio 
  it('Editar página', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      pagePage.createPage(page.title, page.content)
      
      // When
      pagePage.editPage(page.title, 'new-title', 'new-content');
      
      // //Then
      pagePage.checkElementExists('new-title');
    });
  });

  // Pool de datos (pseudo) aleatorio 
  it('Publicar página', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      pagePage.createPage(page.title, page.content)
      // When
      pagePage.publishPage(page.title)
      pagePage.orderPagesByRecentUpdates()
      // Then
      pagePage.checkPageStatus(page.title, 'Published');
    });
  });

  // Pool de datos (pseudo) aleatorio 
  it('Add tag to page', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addTag(page.tags[0]);
      
      pagePage.checkElementExists(page.tags[0]);
    });
  });

  // Pool de datos (pseudo) aleatorio 
  it('Add more than one tag to page', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addTag(page.tags[0]);
      pagePage.addTag(page.tags[1]);
      
      pagePage.checkElementExists(page.tags[0]);
      pagePage.checkElementExists(page.tags[1]);
    });
  });

  // Pool de datos (pseudo) aleatorio 
  it('change default URI to page', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.deployPageOptions();
      pagePage.addUri(page.uri);
      
      pagePage.checkElementExists(page.uri + '/');
    });
  });

  // Pool de datos (pseudo) aleatorio 
  it('Words counter works correctly', () => {
    // Given
    cy.generatePage().then((page) => {
      const pagePage = dashboardPage.goToPages();
      // When
      pagePage.gotoCreateNewPage();
      pagePage.setPageContent(page.title, page.content);
      
      pagePage.checkElementExists(`${page.content.trim().split(/\s+/).length} words`);
    });
  });


});