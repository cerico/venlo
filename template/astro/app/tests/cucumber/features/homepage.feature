Feature: Testing the static HTML page

  Scenario: Visiting the homepage
    Given I am on the homepage
    Then I should see a page title of "AppName"
