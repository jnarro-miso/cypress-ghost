Feature: Semana 5

@user1 @web
  Scenario: EP06 - Creación de suscriptores desde el portal administrativo
  Given I navigate to page "http://localhost:2368/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I click on Members
  And I click on New Members
  And I wait for 2 seconds
  And I complete the form for new member
  And I click on Save
  And I search the member that was created
  And I wait for 2 seconds
  Then I validate that the member was created succesful
  And I wait for 2 seconds