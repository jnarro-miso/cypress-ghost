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
    const pages = await pagePage.getPages();
    expect(pages).to.include(newPageInfo.title)
  });

  it('Eliminación de nueva página', async () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // When
    pagePage.deletePage(newPageInfo.title);

    //Then
    const pages = await pagePage.getPages();
    expect(pages).to.not.include(newPageInfo.title)
  });


  it('Guardar Draft', async () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // When
    const pageContent = await pagePage.getPageContent(newPageInfo.title);

    // //Then
    expect(pageContent?.title).to.equal(newPageInfo.title)
    expect(pageContent?.content).to.equal(newPageInfo.content)
 
  })

  it('Editar página', async () => {
    // Given
    const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
    const pagePage = dashboardPage.goToPages();
    pagePage.createPage(newPageInfo.title, newPageInfo.content)
    
    // When
    pagePage.editPage(newPageInfo.title, 'new-title', 'new-content');
    const pages = await pagePage.getPages();
    
    // //Then
    expect(pages).to.include('new-title')
  })

  it('Publicar página', async () => {
        // Given
        const newPageInfo = { title: faker.lorem.word(), content: faker.lorem.word() }
        const pagePage = dashboardPage.goToPages();
        pagePage.createPage(newPageInfo.title, newPageInfo.content)

        // When
        pagePage.publishPage(newPageInfo.title)

        // Then
        const status = await pagePage.getPageStatus(newPageInfo.title);
        expect(status).to.equal('Published')
        

  });

});