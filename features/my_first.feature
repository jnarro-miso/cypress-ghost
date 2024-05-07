Feature: Posts

@user1 @web
Scenario: Go to dashboard
  Given I navigate to page "<GHOST_ADMIN_URL>"
  And I wait for 2 seconds
  When I enter username "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I click Sign in
  And I wait for 2 seconds
  Then I see the dashboard "<GHOST_ADMIN_URL>"
