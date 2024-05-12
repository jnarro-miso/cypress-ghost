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
    cy.screenshot('Ghost-3.42-EP02-1')
    tagsPage.createTagOld(newTag)
    cy.screenshot('Ghost-3.42-EP02-2')
    // And creates a post
    const postPage = dashboardPage.goToPostsOld()
    cy.screenshot('Ghost-3.42-EP02-3')
    postPage.createPostOld(newPost.title, newPost.content)
    cy.screenshot('Ghost-3.42-EP02-4')
    // And adds the tag to the post
    postPage.openSettingsOld()
    cy.screenshot('Ghost-3.42-EP02-5')
    postPage.selectTagOld(newTag)
    cy.screenshot('Ghost-3.42-EP02-6')
    
    // Then the tag should have one post
    tagsPage = dashboardPage.goToTagsOld()
    cy.screenshot('Ghost-3.42-EP02-7')
    cy.visit(Cypress.env('OLD_GHOST_SITE_URL') + '/tag/' + newTag)
    cy.screenshot('Ghost-3.42-EP02-8')
    cy.contains(newPost.title).should('exist')
    cy.screenshot('Ghost-3.42-EP02-9')
  })

  // Scenario EP03: Creating two posts with the same title
  it('should allow creating two posts with the same title', () => {
    const newPostTitle = faker.lorem.words()
  
    // When the user creates a post
    let postPage = dashboardPage.goToPostsOld()
    cy.screenshot('Ghost-3.42-EP03-1')
    postPage.createPostOld(newPostTitle, faker.lorem.paragraph()).then(post1EditorUrl => {
      cy.screenshot('Ghost-3.42-EP03-2')
      // And creates another post with the same title
      postPage = dashboardPage.goToPostsOld()
      cy.screenshot('Ghost-3.42-EP03-3')
      postPage.createPostOld(newPostTitle, faker.lorem.paragraph()).then(post2EditorUrl => {
        cy.screenshot('Ghost-3.42-EP03-4')
        const post1Id = post1EditorUrl.split('/').pop()
        const post2Id = post2EditorUrl.split('/').pop()
  
        // Then both posts should be visible on the posts page
        postPage = dashboardPage.goToPostsOld()
        cy.screenshot('Ghost-3.42-EP03-5')
        postPage.findPostByIdOld(post1Id).should('exist')
        cy.screenshot('Ghost-3.42-EP03-6')
        postPage.findPostByIdOld(post2Id).should('exist')
        cy.screenshot('Ghost-3.42-EP03-7')
        // And their URLs should be different
        cy.visit(post1EditorUrl)
        cy.screenshot('Ghost-3.42-EP03-8')
        postPage.openSettingsOld()
        cy.screenshot('Ghost-3.42-EP03-9')
        postPage.getInputValue('#url').then(post1Url => {
          cy.screenshot('Ghost-3.42-EP03-10')
          cy.visit(post2EditorUrl)
          cy.screenshot('Ghost-3.42-EP03-11')
          postPage.openSettingsOld()
          cy.screenshot('Ghost-3.42-EP03-12')
          postPage.getInputValue('#url').then(post2Url => {
            cy.screenshot('Ghost-3.42-EP03-13')
            expect(post1Url).not.to.equal(post2Url)
          })
        })
      })
    })
  })

})
