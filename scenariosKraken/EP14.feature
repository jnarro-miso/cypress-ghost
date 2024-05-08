Feature: Pages

@user1 @web
  Scenario: EP14 - Editar página
  Given I navigate to page "<GHOST_ADMIN_URL>"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 1 seconds
  And I click on "Pages"
  And I click on "New page"
  And I set page title to "edit-page"
  And I set page content to "to edit page"
  And I click on "Pages"
  And I click on "edit-page"
  And I set page title to "edited-page"
  And I click on "Pages"
  Then I see text "edited-page" on the page
