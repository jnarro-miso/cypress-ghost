Feature: Verificar que la eliminación de tags sea exitosa

@user1 @web
Scenario: Verificar que la eliminación de tags sea exitosa
  Given I navigate to page "http://localhost:2368/ghost/"
  And I wait for 5 seconds
  When I enter email "<USERNAME1>"
  And I enter password "<PASSWORD1>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  And I click tags
  And I wait for 5 seconds
  And I click newTag
  And I wait for 5 seconds
  And I enter tagName "<tagName>"
  And I enter tagColor "<tagColor>"
  And I enter tagSlug "<tagSlug>"
  And I enter tagDescription "<tagDescription>"
  And I wait for 2 seconds
  And I click save
  And I wait for 3 seconds
  And I click tags
  And I wait for 3 seconds
  Then I should see the tag "<tagName>"
  And I wait for 3 seconds