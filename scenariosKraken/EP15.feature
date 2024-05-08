Feature: Pages

@user1 @web
  Scenario: EP15 - Publicar page
  Given I navigate to page "<GHOST_ADMIN_URL>"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 1 seconds
  And I click on "Pages"
  And I click on "New page"
  And I set page title to "published-page"
  And I set page content to "to edit page"
  And I click on "Publish"
  And I wait for 1 seconds
  And I click on "Continue, final review →"
  And I click on "Publish page, right now"
  And I click on "Back to dashboard"
  And I click on "Pages"
  Then I see text "published" on the page
  And I see text "published-page" on the page
