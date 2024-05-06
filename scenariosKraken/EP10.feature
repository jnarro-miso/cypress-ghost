Feature: Semana 5

@user1 @web
Scenario: EP10- Editar descripción de portal principal
  Given I navigate to page "https://ghost-rpq7.onrender.com/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I see the profile of the user
  And I wait for 1 seconds
  And I save the change
  And I wait for 1 seconds
  Then I access to the view site