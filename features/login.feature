Feature: Enter an incorrect login

  Scenario: User see login form
    Given I open url to DLink page
    Then I see the text "Please Select Your Account:"
    And I see the radio buttons for choosing user
    And I see the text "System Administrator(admin)"
    And I see the text "Others :"
    And I see the text "Password:"
    And I see the username field
    And I see the password field
    And I see the button "Login"

  Scenario: Check the focus after clicking on System Administrator(admin) radio button
    Given I open url to DLink page
    When I click System Administrator(admin) radio button
    Then I see the focus on Password

  Scenario: Check the focus after clicking on Others (users) radio button
    Given I open url to DLink page
    When I check Other radio button
    Then I see the focus on Others users

  Scenario: Check login with Other username and incorrect password
    Given I open url to DLink page
    When I check Other radio button
    And I enter a username "sbook3"
    And I see the username "sbook3" in the field
    And I enter incorrect password
    And I click on "Login" button
    Then I see the message "You entered an incorrect login name or password.Please try again."

  Scenario: Check login with System Administrator(admin) username and a wrong password
    Given I open url to DLink page
    When I login as admin with the wrong password
    Then I see the message "You entered an incorrect login name or password.Please try again."

  Scenario: Check login for System Administrator(admin) with the correct password
    Given I open url to DLink page
    When I login as System Administrator(admin)
    Then I successfully logged in

  Scenario: Check login for user "sbook3" with the correct password
    Given I open url to DLink page
    When I login as "sbook3"
    Then I successfully logged in

  Scenario: Check login for user Others (admin) with the correct password
    Given I open url to DLink page
    When I login as Others user "admin"
    Then I successfully logged in

  #@only
  Scenario: Someone already logged in
    Given someone already logged in as admin
    And I open url to DLink page
    When I click System Administrator(admin) radio button
    And I enter correct password
    And I click on "Login" button
    Then I see the message for user "This user account is currently in use by somebody else"
