Feature: Posts

@user1 @web
Scenario: Go to dashboard
  Given I navigate to page "http://localhost:2368/ghost/"
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  Then I see the dashboard
