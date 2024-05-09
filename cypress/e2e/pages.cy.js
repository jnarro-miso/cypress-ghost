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

  it('Creación de nueva página', async () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();

    // When
    pagePage.createPage(newPageInfo.title, newPageInfo.content)

    // Then
    pagePage.checkPageExists(newPageInfo.title);
  });

  it('Eliminación de nueva página', async () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // When
    pagePage.deletePage(newPageInfo.title);

    //Then
    pagePage.checkPageExists(newPageInfo.title)
  });


  it('Guardar Draft', async () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    
    // When
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // //Then
    pagePage.checkContentExist(newPageInfo.title, newPageInfo.content);
  })

  it('Editar página', async () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // When
    pagePage.editPage(newPageInfo.title, 'new-title', 'new-content');
    
    // //Then
    pagePage.checkPageExists(newPageInfo.title);
  })

  it('Publicar página', async () => {
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