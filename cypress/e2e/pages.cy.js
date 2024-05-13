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

  it('Creación de nueva página', () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    cy.wait(1000)
    cy.screenshot('Ghost-5.82-EP11-1')

    // When
    pagePage.gotoCreateNewPage();
    cy.screenshot('Ghost-5.82-EP11-2')

    pagePage.setPageContent(newPageInfo.title, newPageInfo.content);
    cy.screenshot('Ghost-5.82-EP11-3')

    pagePage.goBackToPages()
    cy.wait(1000)
    cy.screenshot('Ghost-5.82-EP11-4')

    // Then
    pagePage.checkPageExists(newPageInfo.title);
  });

  it('Eliminación de nueva página', () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() };
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content);
    cy.wait(1000);
    cy.screenshot('Ghost-5.82-EP13-1');
    
    // When
    pagePage.selectPage(newPageInfo.title);
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
    pagePage.checkPageDontExist(newPageInfo.title)
  });


  it('Guardar Draft', () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    
    // When
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // //Then
    pagePage.checkContentExist(newPageInfo.title, newPageInfo.content);
  })

  it('Editar página', () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // When
    pagePage.editPage(newPageInfo.title, 'new-title', 'new-content');
    
    // //Then
    pagePage.checkPageExists('new-title');
  })

  it('Publicar página', () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    // When
    pagePage.publishPage(newPageInfo.title)
    pagePage.scrollUntilNoMoreRequests()
    // Then
    pagePage.checkPageStatus(newPageInfo.title, 'Published');
  });

});