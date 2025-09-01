Feature: Enter an incorrect login

  Scenario: User see login form
    Given I open url to DLink page
    Then I see the text "Please Select Your Account:"
    And I see the radio button
    And I see the text "System Administrator(admin)"
    And I see the text "Password:"
    And I see the password field
    And I see the button "Login"

  Scenario: Check login with Other username ("Nadiya") and incorrect password
    Given I open url to DLink page
    When I check Other radio button
    And I see the text "Others :"
    And I see the username field
    And I enter a username "Nadiya"
    And I see the username "Nadiya" in the field
    And I enter incorrect password 
    And I click on "Login" button
    Then I see the message "You entered an incorrect login name or password.Please try again."

  Scenario: Check login with System Administrator(admin) username and a wrong password
    Given I open url to DLink page
    When I check System Administrator(admin) radio button
    And I enter a username "admin"
    And I see the username "admin" in the field
    And I enter incorrect password
    And I click on "Login" button
    Then I see the message "You entered an incorrect login name or password.Please try again."



#Scenario: Check login for admin with the correct password
#  Given I open url to DLink page
#  When I click on radio button "System Administrator(admin)"
#  And I enter the password
#  And I click on "Login" button
#  Then I see the text "My folder"

#Scenario: I enter wrong password
#  Given I open url "http://192.168.7.15/"
#  When I enter login "user"
#  And I enter password "wrongpwd"
#  And I click "Login"
#  Then I see message "Wrong password"