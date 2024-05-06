Feature: Semana 5

@user1 @web
Scenario: EP07 - Eliminar suscriptor desde el portal administrativo 
  Given I navigate to page "https://ghost-rpq7.onrender.com/ghost"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I click on Members
  And I select member
  And I delete a member
  And I confirm delete a member
  And I search to delete member
  Then I validate that the member was deleted succesful
  And I wait for 2 seconds