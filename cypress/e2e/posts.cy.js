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
    postPage.createPost(newPost.title, newPost.content)
    // And creates a draft
    postPage = dashboardPage.goToPosts()
    postPage.createDraft(newDraft.title, newDraft.content)
    
    // Then the post should be visible on the posts page as published
    postPage = dashboardPage.goToPosts()
    postPage.checkPublishedPostExists(newPost.title)
    // And the draft should be visible on the posts page as a draft
    postPage.checkDraftPostExists(newDraft.title)
  })

  // Scenario EP02: Creating a post, creating a tag, and adding the tag to the post
  it('should create a post, create a tag, and add the tag to the post', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const newTag = faker.lorem.word()
    
    // When the user creates a tag
    let tagsPage = dashboardPage.goToTags()
    tagsPage.createTag(newTag)
    // And creates a post
    const postPage = dashboardPage.goToPosts()
    postPage.createPost(newPost.title, newPost.content)
    // And adds the tag to the post
    postPage.goToEditor()
    postPage.toggleSettings()
    postPage.selectTag(newTag)
    
    // Then the tag should have one post
    tagsPage = dashboardPage.goToTags()
    cy.visit(Cypress.env('GHOST_SITE_URL') + '/tag/' + newTag)
    cy.contains(newPost.title).should('exist')
  })

  // Scenario EP03: Creating two posts with the same title
  it('should allow creating two posts with the same title', () => {
    const newPostTitle = faker.lorem.words()

    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    postPage.createPost(newPostTitle, faker.lorem.paragraph()).then(post1EditorUrl => {
      // And creates another post with the same title
      postPage = dashboardPage.goToPosts()
      postPage.createPost(newPostTitle, faker.lorem.paragraph()).then(post2EditorUrl => {
        const post1Id = post1EditorUrl.split('/').pop()
        const post2Id = post2EditorUrl.split('/').pop()

        // Then both posts should be visible on the posts page
        postPage = dashboardPage.goToPosts()
        postPage.findPostById(post1Id).should('exist')
        postPage.findPostById(post2Id).should('exist')
        // And their URLs should be different
        cy.visit(post1EditorUrl)
        postPage.toggleSettings()
        postPage.getInputValue('#url').then(post1Url => {
          cy.visit(post2EditorUrl)
          postPage.toggleSettings()
          postPage.getInputValue('#url').then(post2Url => {
            expect(post1Url).not.to.equal(post2Url)
          })
        })
      })
    })
  })

  // Scenario EP04: Creating a post, verify it is published, delete it, and verify it is deleted
  it('should create a post, verify it is published, delete it, and verify it is deleted', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    
    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    postPage.createPost(newPost.title, newPost.content).then(postEditorUrl => {
      // And verifies the post is published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(newPost.title)
      // But deletes the post
      cy.visit(postEditorUrl)
      postPage.toggleSettings()
      postPage.deletePost()
      
      // Then the post should not exist anymore
      cy.visit(postEditorUrl)
      cy.contains('Page not found').should('exist')
    })
  })

  // Scenario EP05: Creating a post, verify it is published, and update it
  it('should create a post, verify it is published, and update it', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const updatedPost = { title: faker.lorem.word(), content: faker.lorem.paragraph() }
    
    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    postPage.createPost(newPost.title, newPost.content).then(postEditorUrl => {
      // And verifies the post is published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(newPost.title)
      // And updates the post
      cy.visit(postEditorUrl)
      postPage.clearTitle()
      postPage.typeTitle(updatedPost.title)
      postPage.publishPost()
      
      // Then the post should be updated
      // postPage.goToPublishedPost()
      postPage = dashboardPage.goToPosts()
      postPage.findPostByText(updatedPost.title).should('exist')
    })
  })



})
