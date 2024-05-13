import { faker } from "@faker-js/faker";
import { LoginPage } from "../pageObjects/LoginPage";

describe('Pages feature (Ghost older version)', () => {
  const loginPage = new LoginPage()
  let dashboardPage

  // Given a user is logged in to the Ghost admin
  beforeEach(() => {
    loginPage.visitOld()
    dashboardPage = loginPage.loginOld(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
  })

  it('Creación de nueva página (versión 3.4.2)', () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPagesOld();
    cy.screenshot('Ghost-3.42-EP11-1')
 
    // When
    pagePage.gotoCreateNewPageOld();
    cy.screenshot('Ghost-3.42-EP11-2')

    pagePage.setPageContentOld(newPageInfo.title, newPageInfo.content);
    cy.screenshot('Ghost-3.42-EP11-3')

    pagePage.goBackToPagesOld()
    cy.wait(1000)
    cy.screenshot('Ghost-3.42-EP11-4')

    // Then
    pagePage.checkPageExists(newPageInfo.title);
  });

  it('Eliminación de nueva página (versión 3.4.2)', () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPagesOld();
    pagePage.createPageOld(newPageInfo.title, newPageInfo.content)
    cy.wait(1000);
    cy.screenshot('Ghost-3.42-EP13-1');
    
    // When
    pagePage.selectPageOld(newPageInfo.title);
    cy.screenshot('Ghost-3.42-EP13-2');

    pagePage.deployPageOptionsOld();
    cy.screenshot('Ghost-3.42-EP13-3');

    pagePage.clickOnDeletePageOld();
    cy.screenshot('Ghost-3.42-EP13-4');

    pagePage.confirmPageDeletionOld();
    cy.screenshot('Ghost-3.42-EP13-5');
    
    cy.wait(1000)
    cy.screenshot('Ghost-3.42-EP13-6');

    //Then
    pagePage.checkPageDontExist(newPageInfo.title)
  });


});