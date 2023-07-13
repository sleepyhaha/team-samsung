# team-samsung

# PictoHang

## Description

Our application is a "fun" cross between Pictionary and Hangman. Words are randomly pulled from an API, and then used in an image search API to pull a photo with that word. The user then has to guess the word based on the picture.

The user starts with 1 hint, and gains another for ever 5 correct up to a maximum of 3. The user also starts with 10 health. Every incorrect answer decrements their health total by 1.

The game is over once the users health reaches 0.

## User Story

As a player,
I want to play a word guessing game using a web interface,
So that I can have fun and challenge my vocabulary skills.

## Acceptance Criteria

### Scenario 1: Starting the game

Given that I am on the game page,  
When the game starts,  
Then a request should be made to the Random Word API,  
And a random word should be received as the target word.  
And the target word should be displayed as blank spaces or underscores.

### Scenario 2: Displaying the image

Given that the target word is received,  
When the game starts,  
Then a request should be made to the Image API using the target word,  
And an image related to the target word should be fetched,  
And the image should be displayed in the game interface.

### Scenario 3: Making a guess

Given that the game is in progress,  
When I input a letter into the guess input field,  
Then the guess should be validated against the target word.

### Scenario 4: Correct guess

Given that I have made a correct guess,  
When I submit my guess,  
Then the correctly guessed letter(s) should be displayed in their corresponding positions in the target word.

### Scenario 5: Incorrect guess

Given that I have made an incorrect guess,  
When I submit my guess,  
Then I should receive feedback indicating that my guess was wrong.

### Scenario 6: Repeating steps 4 and 5

Given that the game is in progress,  
When I make another guess,  
Then the steps for making a guess and validating it should be repeated.

### Scenario 7: Winning the game

Given that I have successfully guessed the entire target word,  
When I submit my guess,  
Then a success message should be displayed,  
And another set of image and target word will be generated.

### Scenario 8: Losing the game

Given that I have reached the maximum number of incorrect guesses,  
When I submit my guess,  
Then a failure message should be displayed,

### Scenario 9: Highscore

When I lose the game ,  
Then I can save my name and score,  
Then I can see my name and score in a highscore page.

### Scenario 10: Starting a new game

Given that I have finished a game,  
When I choose to play again,  
Then the game should reset,  
And the steps from Scenario 1 to Scenario 9 should be repeated with a new target word and image.
