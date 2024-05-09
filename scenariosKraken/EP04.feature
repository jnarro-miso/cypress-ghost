Feature: Posts

@user1 @web
Scenario: EP04: Creating a post, verify it is published, delete it, and verify it is deleted
  Given I navigate to page "<GHOST_ADMIN_URL>"
  And I wait for 2 seconds
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 2 seconds
  And I click on New Post
  And I enter post title "$name_1"
  And I click outside
  And I click on Publish
  And I wait for 2 seconds
  Then I should see "$$name_1"
  And I go back to Dashboard
  And I wait for 2 seconds
  And I go to Published posts
  And I click on the post with title "$$name_1"
  And I open Post settings
  And I delete the post
  Then I should see no posts with title "$$name_1"