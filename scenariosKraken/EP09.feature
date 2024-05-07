Feature: Semana 5

@user1 @web
Scenario: EP09 - Edición de suscriptores
  Given I navigate to page "<GHOST_ADMIN_URL>"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I click on Members
  And I select member
  And I complete the form for edit member
  And I save the changes
  And I search a edited member
  Then I validate that the member was edited succesful