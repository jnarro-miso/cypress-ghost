import { LoginPage } from '../pageObjects/LoginPage'
import { faker } from '@faker-js/faker';

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

  // Scenario: Creating a post and a draft
  it('should create a post, and a draft', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const newDraft = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    
    // When the user creates a post
    const postPage = dashboardPage.goToPosts()
    postPage.createPost(newPost.title, newPost.content)
    postPage.goToPosts()
    // And creates a draft
    postPage.createDraft(newDraft.title, newDraft.content)
    
    // Then the post should be visible on the posts page as published
    postPage.goToPosts()
    postPage.checkPublishedPostExists(newPost.title)
    // And the draft should be visible on the posts page as a draft
    postPage.checkDraftPostExists(newDraft.title)
  })

  // it('should create a post, add it a tag, and be visible', () => {
    // And adds a tag to the post
    // cy.addTagToPost()
    
    // Then the post should be visible on the home page
    // ...
    
    // And the published post should have the assigned tag
    // ...
  // })

})
