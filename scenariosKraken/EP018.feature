Feature: Semana 5

@user1 @web
Scenario: EP08 - Filtrar suscriptores
  Given I navigate to page "https://ghost-rpq7.onrender.com/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  Then I filter the subscriptors
  And I wait for 2 seconds