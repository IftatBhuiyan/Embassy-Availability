Feature: EMbassy Appointment

    I want to get information form Bangladesh US Embassy

    @embassy
    Scenario: Embassy appointment reschedual
    Given I go to Bangaladesh Embassy
    When I log into the website
    Then I click reschedual
    Then I get the dates available