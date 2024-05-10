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

  // Scenario EP01: Creating a post and a draft
  it('should create a post, and a draft', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const newDraft = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    
    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    cy.screenshot('goToPosts-1')
    postPage.createPost(newPost.title, newPost.content)
    cy.screenshot('createPost')
    // And creates a draft
    postPage = dashboardPage.goToPosts()
    cy.screenshot('goToPosts-2')
    postPage.createDraft(newDraft.title, newDraft.content)
    cy.screenshot('createDraft')
    
    // Then the post should be visible on the posts page as published
    postPage = dashboardPage.goToPosts()
    cy.screenshot('goToPosts-3')
    postPage.checkPublishedPostExists(newPost.title)
    cy.screenshot('checkPublishedPostExists')
    // And the draft should be visible on the posts page as a draft
    postPage.checkDraftPostExists(newDraft.title)
    cy.screenshot('checkDraftPostExists')
  })

  // Scenario EP02: Creating a post, creating a tag, and adding the tag to the post
  it.skip('should create a post, create a tag, and add the tag to the post', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const newTag = faker.lorem.word()
    
    // When the user creates a tag
    let tagsPage = dashboardPage.goToTags()
    cy.screenshot('goToTags')
    tagsPage.createTag(newTag)
    cy.screenshot('createTag')
    // And creates a post
    const postPage = dashboardPage.goToPosts()
    cy.screenshot('goToPosts')
    postPage.createPost(newPost.title, newPost.content)
    cy.screenshot('createPost')
    // And adds the tag to the post
    postPage.goToEditor()
    cy.screenshot('goToEditor')
    postPage.toggleSettings()
    cy.screenshot('toggleSettings')
    postPage.selectTag(newTag)
    cy.screenshot('selectTag')
    
    // Then the tag should have one post
    tagsPage = dashboardPage.goToTags()
    cy.screenshot('goToTags-2')
    cy.visit(Cypress.env('GHOST_SITE_URL') + '/tag/' + newTag)
    cy.screenshot('visitTag')
    cy.contains(newPost.title).should('exist')
    cy.screenshot('checkPostExists')
  })

  // Scenario EP03: Creating two posts with the same title
  it.skip('should allow creating two posts with the same title', () => {
    const newPostTitle = faker.lorem.words()
  
    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    cy.screenshot('goToPosts-1')
    postPage.createPost(newPostTitle, faker.lorem.paragraph()).then(post1EditorUrl => {
      cy.screenshot('createPost-1')
      // And creates another post with the same title
      postPage = dashboardPage.goToPosts()
      cy.screenshot('goToPosts-2')
      postPage.createPost(newPostTitle, faker.lorem.paragraph()).then(post2EditorUrl => {
        cy.screenshot('createPost-2')
        const post1Id = post1EditorUrl.split('/').pop()
        const post2Id = post2EditorUrl.split('/').pop()
  
        // Then both posts should be visible on the posts page
        postPage = dashboardPage.goToPosts()
        cy.screenshot('goToPosts-3')
        postPage.findPostById(post1Id).should('exist')
        cy.screenshot('findPostById-1')
        postPage.findPostById(post2Id).should('exist')
        cy.screenshot('findPostById-2')
        // And their URLs should be different
        cy.visit(post1EditorUrl)
        cy.screenshot('visitPost1EditorUrl')
        postPage.toggleSettings()
        cy.screenshot('toggleSettings-1')
        postPage.getInputValue('#url').then(post1Url => {
          cy.screenshot('getInputValue-1')
          cy.visit(post2EditorUrl)
          cy.screenshot('visitPost2EditorUrl')
          postPage.toggleSettings()
          cy.screenshot('toggleSettings-2')
          postPage.getInputValue('#url').then(post2Url => {
            cy.screenshot('getInputValue-2')
            expect(post1Url).not.to.equal(post2Url)
          })
        })
      })
    })
  })

  // Scenario EP04: Creating a post, verify it is published, delete it, and verify it is deleted
  it.skip('should create a post, verify it is published, delete it, and verify it is deleted', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    
    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    cy.screenshot('goToPosts')
    postPage.createPost(newPost.title, newPost.content).then(postEditorUrl => {
      cy.screenshot('createPost')
      // And verifies the post is published
      postPage = dashboardPage.goToPosts()
      cy.screenshot('goToPosts-2')
      postPage.checkPublishedPostExists(newPost.title)
      cy.screenshot('checkPublishedPostExists')
      // But deletes the post
      cy.visit(postEditorUrl)
      cy.screenshot('visitPostEditorUrl')
      postPage.toggleSettings()
      cy.screenshot('toggleSettings')
      postPage.deletePost()
      cy.screenshot('deletePost')
      
      // Then the post should not exist anymore
      cy.visit(postEditorUrl)
      cy.screenshot('visitPostEditorUrl-2')
      cy.contains('Page not found').should('exist')
      cy.screenshot('checkPageNotFound')
    })
  })

  // Scenario EP05: Creating a post, verify it is published, and update it
  it.skip('should create a post, verify it is published, and update it', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const updatedPost = { title: faker.lorem.word(), content: faker.lorem.paragraph() }
    
    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    cy.screenshot('goToPosts')
    postPage.createPost(newPost.title, newPost.content).then(postEditorUrl => {
      cy.screenshot('createPost')
      // And verifies the post is published
      postPage = dashboardPage.goToPosts()
      cy.screenshot('goToPosts-2')
      postPage.checkPublishedPostExists(newPost.title)
      cy.screenshot('checkPublishedPostExists')
      // And updates the post
      cy.visit(postEditorUrl)
      cy.screenshot('visitPostEditorUrl')
      postPage.clearTitle()
      cy.screenshot('clearTitle')
      postPage.typeTitle(updatedPost.title)
      cy.screenshot('typeTitle')
      postPage.publishPost()
      cy.screenshot('publishPost')
      
      // Then the post should be updated
      // postPage.goToPublishedPost()
      postPage = dashboardPage.goToPosts()
      cy.screenshot('goToPosts-3')
      postPage.findPostByText(updatedPost.title).should('exist')
      cy.screenshot('findPostByText')
    })
  })

})
