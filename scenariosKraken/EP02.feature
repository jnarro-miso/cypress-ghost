Feature: Posts

@user1 @web
Scenario: EP02: Creating a post, creating a tag, and adding the tag to the post
  Given I navigate to page "<GHOST_ADMIN_URL>"
  And I wait for 2 seconds
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 2 seconds
  And I click on Tags
  And I wait for 2 seconds
  And I click on New Tag
  And I enter tag name "$name_1"
  And I click on Save button
  And I wait for 2 seconds
  And I click on New Post
  And I enter post title "$name_2"
  And I click outside
  And I click on Publish
  And I wait for 2 seconds
  And I go to Editor
  And I wait for 2 seconds
  And I open Post settings
  And I add the tag "$$name_1" to the post
  And I wait for 2 seconds
  And I open published post
  Then I should see the tag "$$name_1" in the post "$$name_2"