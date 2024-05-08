Feature: Pages

@user1 @web
  Scenario: EP13 - Eliminación de nueva página
  Given I navigate to page "<GHOST_ADMIN_URL>"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 1 seconds
  And I click on "Pages"
  And I click on "New page"
  And I set page title to "removed-page"
  And I set page content to "to remove page"
  And I delete page
  Then I dont see "removed-page" on the page
