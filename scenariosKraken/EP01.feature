Feature: Posts

@user1 @web
Scenario: EP01 Creating a post and a draft
  Given I navigate to page "<GHOST_ADMIN_URL>"
  And I wait for 2 seconds
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 2 seconds
  And I click on New Post
  And I enter post title "$name_1"
  And I click outside
  And I go back to Posts
  And I wait for 2 seconds
  And I click on New Post
  And I enter post title "$name_2"
  And I click outside
  And I click on Publish
  And I wait for 2 seconds
  Then I should see "$$name_2"