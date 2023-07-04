
var wordBlank = document.querySelector(".word-blanks");
var wordImage = document.querySelector(".word-image");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;

var ranWord = [];
var lettersInChosenWord = [];
var blanksLetters = [];

resetButton.setAttribute("class", "hidden");
startButton.classList.remove("hidden");

const apiKey = 'TPdUCeG3WR59NfeXrgX3haDvC3OdEfVfp01tMl6bLaG8Fzp6YxWlk5Eh';
const loseTotal = 10;

function game() {
    startButton.setAttribute("class", "hidden");
    ranWord = [];
    var apiUrl1 = 'https://random-word-api.vercel.app/api?words=1';

    fetch(apiUrl1)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            ranWord = data[0];
            console.log(ranWord);
            renderBlanks(ranWord);

            var apiUrl2 = 'https://api.pexels.com/v1/search?query=' + ranWord + '&per_page=1';

            fetch(apiUrl2, {
              headers: {
                Authorization: apiKey
              }
            })
            .then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                    wordImage.src = data.photos.src.landscape;
                    console.log(wordImage);
                    document.addEventListener("keydown", function(event) {
                      var key = event.key.toLowerCase();
                      var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
                      if (alphabetNumericCharacters.includes(key)) {
                        var letterGuessed = event.key;
                        checkLetters(letterGuessed);
                        checkWin();
                        if (isWin) {
                          winCounter ++;
                          setWins;
                          game();
                        } else if (loseCounter == loseTotal) {
                          wordBlank.textContent = "GAME OVER";
                          resetButton.classList.remove("hidden");
                        }
                      }
                    });        
                })
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
                .catch(function (error) {
                alert('Unable to connect');
            });

        })
        } else {
            alert('Error: ' + response.statusText);
        }
    })
        .catch(function (error) {
        alert('Unable to connect');
    });
};

function renderBlanks(word) {
    chosenWord = word[Math.floor(Math.random() * word.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blanksLetters = [];
    for (var i = 0; i < numBlanks; i++) {
      blanksLetters.push("_");
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
  
  function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
      if (chosenWord[i] === letter) {
        letterInWord = true;
      } else if (chosenWord[i] != letter){
        loseCounter ++;
        lose.textContent = loseCounter;
      }
    }
    if (letterInWord) {
      for (var j = 0; j < numBlanks; j++) {
        if (chosenWord[j] === letter) {
          blanksLetters[j] = letter;
        }
      }
      wordBlank.textContent = blanksLetters.join(" ");
    }
  }

  function checkWin() {
    if (chosenWord === blanksLetters.join("")) {
      isWin = true;
    }
  }

  function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
  }

  startButton.addEventListener("click", game);

  function resetGame() {
    window.location.reload();
  }

  resetButton.addEventListener("click", resetGame);
  

let submitButton = document.querySelector("#submit-btn");
let playerName = document.querySelector("#initials");
let playerHighScore = document.querySelector("#score");

function saveHighScores() {
  let highScoreSave = {
    playerNameSave: playerName.value,
    playerHighScoreSave: playerHighScore.value,
  };

  localStorage.setItem("nameScore", json.stringify(highScoreSave));
}

submitButton.addEventListener("submit", saveHighScores);

