import { LoginPage } from '../pageObjects/LoginPage'
import { faker } from '@faker-js/faker';

// Feature: Posts (for older version of Ghost)
describe('Posts feature (Ghost older version)', () => {
  const loginPage = new LoginPage()
  let dashboardPage

  // Given a user is logged in to the Ghost admin
  beforeEach(() => {
    loginPage.visitOld()
    dashboardPage = loginPage.loginOld(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false
  })

  // Scenario EP02: Creating a post, creating a tag, and adding the tag to the post
  it('should create a post, create a tag, and add the tag to the post', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const newTag = faker.lorem.word()
    
    // When the user creates a tag
    let tagsPage = dashboardPage.goToTagsOld()
    cy.screenshot('goToTags')
    tagsPage.createTagOld(newTag)
    cy.screenshot('createTag')
    // And creates a post
    const postPage = dashboardPage.goToPostsOld()
    cy.screenshot('goToPosts')
    postPage.createPostOld(newPost.title, newPost.content)
    cy.screenshot('createPost')
    // And adds the tag to the post
    postPage.openSettingsOld()
    cy.screenshot('openSettings')
    postPage.selectTagOld(newTag)
    cy.screenshot('selectTag')
    
    // Then the tag should have one post
    tagsPage = dashboardPage.goToTagsOld()
    cy.screenshot('goToTags-2')
    cy.visit(Cypress.env('OLD_GHOST_SITE_URL') + '/tag/' + newTag)
    cy.screenshot('visitTag')
    cy.contains(newPost.title).should('exist')
    cy.screenshot('checkPostExists')
  })

})
