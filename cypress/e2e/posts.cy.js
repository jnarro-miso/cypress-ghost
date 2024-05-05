import { LoginPage } from '../pageObjects/LoginPage'

// Feature: Posts
describe('Posts feature', () => {
  const loginPage = new LoginPage()
  let dashboardPage

  // Given a user is logged in to the Ghost admin
  beforeEach(() => {
    loginPage.visit()
    dashboardPage = loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false
  })

  // Scenario: Creating a post and adding a tag
  it('should create a post and be visible', () => {
    const postPage = dashboardPage.goToPosts()
    postPage.createPost('First post', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')

    // When the user creates a post
    // cy.createPost()

    // And adds a tag to the post
    // cy.addTagToPost()
    
    // Then the post should be visible on the home page
    // ...
    
    // And the published post should have the assigned tag
    // ...
  })

})
