import { LoginPage } from '../pageObjects/LoginPage'
import { faker } from '@faker-js/faker';

// Feature: Posts

// With random data (5)
describe.skip('Posts feature with random data', () => {
  const loginPage = new LoginPage()
  let dashboardPage

  // Given a user is logged in to the Ghost admin
  beforeEach(() => {
    loginPage.visit()
    dashboardPage = loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))

    Cypress.on('uncaught:exception', (err, runnable) => {
      // Returning false here prevents Cypress from failing the test
      return false
    })
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
  it('should create a post, create a tag, and add the tag to the post', () => {
    const newPost = { title: faker.lorem.words(), content: faker.lorem.paragraph() }
    const newTag = faker.lorem.word()
    
    // When the user creates a tag
    let tagsPage = dashboardPage.goToTags()
    cy.screenshot('Ghost-5.82-EP02-1')
    tagsPage.createTag(newTag)
    cy.screenshot('Ghost-5.82-EP02-2')
    // And creates a post
    const postPage = dashboardPage.goToPosts()
    cy.screenshot('Ghost-5.82-EP02-3')
    postPage.createPost(newPost.title, newPost.content)
    cy.screenshot('Ghost-5.82-EP02-4')
    // And adds the tag to the post
    postPage.goToEditor()
    postPage.toggleSettings()
    cy.screenshot('Ghost-5.82-EP02-5')
    postPage.selectTag(newTag)
    cy.screenshot('Ghost-5.82-EP02-6')
    
    // Then the tag should have one post
    tagsPage = dashboardPage.goToTags()
    cy.screenshot('Ghost-5.82-EP02-7')
    cy.visit(Cypress.env('GHOST_SITE_URL') + '/tag/' + newTag)
    cy.screenshot('Ghost-5.82-EP02-8')
    cy.contains(newPost.title).should('exist')
    cy.screenshot('Ghost-5.82-EP02-9')
  })

  // Scenario EP03: Creating two posts with the same title
  it('should allow creating two posts with the same title', () => {
    const newPostTitle = faker.lorem.words()
  
    // When the user creates a post
    let postPage = dashboardPage.goToPosts()
    cy.screenshot('Ghost-5.82-EP03-1')
    postPage.createPost(newPostTitle, faker.lorem.paragraph()).then(post1EditorUrl => {
      cy.screenshot('Ghost-5.82-EP03-2')
      // And creates another post with the same title
      postPage = dashboardPage.goToPosts()
      cy.screenshot('Ghost-5.82-EP03-3')
      postPage.createPost(newPostTitle, faker.lorem.paragraph()).then(post2EditorUrl => {
        cy.screenshot('Ghost-5.82-EP03-4')
        const post1Id = post1EditorUrl.split('/').pop()
        const post2Id = post2EditorUrl.split('/').pop()
  
        // Then both posts should be visible on the posts page
        postPage = dashboardPage.goToPosts()
        cy.screenshot('Ghost-5.82-EP03-5')
        postPage.findPostById(post1Id).should('exist')
        cy.screenshot('Ghost-5.82-EP03-6')
        postPage.findPostById(post2Id).should('exist')
        cy.screenshot('Ghost-5.82-EP03-7')
        // And their URLs should be different
        cy.visit(post1EditorUrl)
        cy.screenshot('Ghost-5.82-EP03-8')
        postPage.toggleSettings()
        cy.screenshot('Ghost-5.82-EP03-9')
        postPage.getInputValue('#url').then(post1Url => {
          cy.screenshot('Ghost-5.82-EP03-10')
          cy.visit(post2EditorUrl)
          cy.screenshot('Ghost-5.82-EP03-11')
          postPage.toggleSettings()
          cy.screenshot('Ghost-5.82-EP03-12')
          postPage.getInputValue('#url').then(post2Url => {
            cy.screenshot('Ghost-5.82-EP03-13')
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
  it('should create a post, verify it is published, and update it', () => {
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

// A priori data (15)
describe('Posts feature with static data', () => {
  const loginPage = new LoginPage()
  let dashboardPage

  // Given a user is logged in to the Ghost admin
  beforeEach(() => {
    loginPage.visit()
    dashboardPage = loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Returning false here prevents Cypress from failing the test
      return false
    })
  })

  it('should not create an empty post', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ empty }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(empty.title, empty.content)
      if (!Cypress.env('publishButtonFound')) {
        expect(Cypress.env('publishButtonFound')).to.be.false;
      }
    })
  })

  it('should create a post with only title', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ onlyTitle }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(onlyTitle.title, onlyTitle.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(onlyTitle.title)
    })
  })

  it('should create a post with only content', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ onlyContent }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(onlyContent.title, onlyContent.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(onlyContent.title)
    })
  })

  it('should create a post with title and content', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ titleAndContent }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(titleAndContent.title, titleAndContent.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(titleAndContent.title)
    })
  })

  it('should create a post with a long title', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ longTitle }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(longTitle.title, longTitle.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(longTitle.title)
    })
  })

  it('should create a post with a long content', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ longContent }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(longContent.title, longContent.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(longContent.title)
    })
  })

  it('should create a post with numbers', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ withNumbers }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(withNumbers.title, withNumbers.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(withNumbers.title)
    })
  })

  it('should create a post with special characters', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ specialCharacters }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(specialCharacters.title, specialCharacters.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(specialCharacters.title)
    })
  })

  it('should create a post with html injection as just text', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ htmlInjection }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(htmlInjection.title, htmlInjection.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(htmlInjection.title)
    })
  })

  it('should create a post with sql injection as just text', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ sqlInjection }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(sqlInjection.title, sqlInjection.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(sqlInjection.title)
    })
  })

  it('should create a post with multiple paragraphs', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ multipleParagraphs }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(multipleParagraphs.title, multipleParagraphs.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(multipleParagraphs.title)
    })
  })

  it('should create a post with markdown', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ markdown }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(markdown.title, markdown.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(markdown.title)
    })
  })

  it('should create a post with emojis in title', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ emojisInTitle }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(emojisInTitle.title, emojisInTitle.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(emojisInTitle.title)
    })
  })

  it('should create a post with emojis in content', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ emojisInContent }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(emojisInContent.title, emojisInContent.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(emojisInContent.title)
    })
  })

  it('should create a post with emojis in title and content', () => {
    // Given
    cy.fixture('posts-a-priori.json').then(({ emojisInTitleAndContent }) => {
      // When the user creates a post
      let postPage = dashboardPage.goToPosts()
      postPage.createPost(emojisInTitleAndContent.title, emojisInTitleAndContent.content)
      
      // Then the post should be visible on the posts page as published
      postPage = dashboardPage.goToPosts()
      postPage.checkPublishedPostExists(emojisInTitleAndContent.title)
    })
  })

})
