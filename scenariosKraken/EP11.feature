Feature: Pages

@user1 @web
  Scenario: EP11 - Creación de nueva página
  Given I navigate to page "<GHOST_ADMIN_URL>"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 1 seconds
  And I click on "Pages"
  And I click on "New page"
  And I set page title to "new-page"
  And I set page content to "page-content"
  And I click on "Pages"
  Then I see page "new-page"
  