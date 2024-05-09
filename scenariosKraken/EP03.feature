Feature: Posts

@user1 @web
Scenario: EP03: Creating two posts with the same title
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
  And I go back to Dashboard
  And I click on New Post
  And I enter post title "$$name_1"
  And I click outside
  And I click on Publish
  And I wait for 2 seconds
  And I go back to Dashboard
  And I wait for 2 seconds
  And I go to Published posts
  Then I should see the 2 posts with title "$$name_1"