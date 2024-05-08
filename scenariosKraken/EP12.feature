Feature: Pages

@user1 @web
  Scenario: EP12 - Guardar Draft
  Given I navigate to page "<GHOST_ADMIN_URL>"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 1 seconds
  And I click on "Pages"
  And I click on "New page"
  And I set page title to "new-page-draft"
  And I set page content to "page-content-draft"
  And I click on "Pages"
  And I click on "new-page-draft"
  Then I see text "new-page-draft" on the page
  And I see text "page-content-draft" on the page
  