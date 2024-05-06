Feature: Semana 5

@user1 @web
Scenario: EP16- Verificar que la creación de tags sea exitosa
  Given I navigate to page "https://ghost-rpq7.onrender.com/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in