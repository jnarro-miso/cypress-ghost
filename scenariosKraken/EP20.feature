Feature: Semana 5

@user1 @web
Scenario: EP10- Editar descripción de portal principal
  Given I navigate to page "http://localhost:2368/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  Then I access to the view site