Feature: Semana 5

@user1 @web
Scenario: EP08 - Filtrar suscriptores
  Given I navigate to page "http://localhost:2368/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I click on Members
  And I wait for 1 seconds
  And I complete the filter
  Then I filter the subscriptors
  And I wait for 2 seconds