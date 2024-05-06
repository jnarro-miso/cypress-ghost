Feature: Semana 5

@user1 @web
Scenario: EP09 - Edición de suscriptores
  Given I navigate to page "http://localhost:2368/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
 
  Then I validate that the member was edited succesful