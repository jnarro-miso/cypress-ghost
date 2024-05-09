Feature: Posts

@user1 @web
Scenario: EP05: Creating a post, verify it is published, and update it
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
  And I go to Editor
  And I enter post title "$name_2"
  And I click outside
  And I click on Update
  And I open published post
  Then I should see the title "$$name_2" in the post