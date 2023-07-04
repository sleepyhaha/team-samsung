
var wordBlank = document.querySelector(".word");
var wordImage = document.querySelector(".image");
var win = document.querySelector(".score");
var hIcon = document.querySelector(".life");
var loseWord = document.querySelector(".feedback");
var startButton = document.querySelector(".start-btn");
var startText = document.querySelector(".start-text");

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
startText.classList.remove("hidden");

const apiKey1 = '08SiQc4/9b0z0C2DlECDGQ==3n1XmkHtwwn8vdYQ';
const apiKey2 = 'TPdUCeG3WR59NfeXrgX3haDvC3OdEfVfp01tMl6bLaG8Fzp6YxWlk5Eh';
const loseTotal = 10;

function game() {
  renderHearts();  
  startButton.setAttribute("class", "hidden");
  startText.setAttribute("class", "hidden");
    ranWord = [];
    var apiUrl1 = 'https://api.api-ninjas.com/v1/randomword';

    $.ajax({
      method: 'GET',
      url: apiUrl1,
      headers: { 'X-Api-Key': apiKey1},
      contentType: 'application/json',
      success: function(result) {
            ranWord = data[0];
            console.log(ranWord);
            renderBlanks(ranWord);

            var apiUrl2 = 'https://api.pexels.com/v1/search?query=' + ranWord + '&per_page=1';

            fetch(apiUrl2, {
              headers: {
                Authorization: apiKey2
              }
            })
            .then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                    wordImage.src = data.photos.src.landscape;
                    console.log(wordImage);
                    document.addEventListener("keydown", function(event) {
                      loseWord.innerHTML = '';
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

  },
  error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
  }
  });
}

function renderHearts() {
  for (var i=0; i < 10; i++) {
    let hearts = document.createElement("i");
    hearts.setAttribute("id", "hearts");
    hearts.setAttribute("class", "fa-solid fa-heart");
    hearts.style.color = "#FF0000";
    hIcon.appendChild(hearts);
  }
}

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
      let j = 9-i;
      let hearts = document.querySelectorAll("#hearts");
      hearts[j].setAttribute("class", "fa-solid fa-heart-broken");
      loseWord.textContent = 'Incorrect, Try again!';
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
  playerHighScore.value = winCounter;
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

