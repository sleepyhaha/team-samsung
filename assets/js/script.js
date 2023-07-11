let wordBlank = document.querySelector("#word");
let wordImage = document.querySelector("#image");
let hIcon = document.querySelector("#life");

let hintBtn1 = document.querySelector("#hint1");
let hintBtn2 = document.querySelector("#hint2");
let hintBtn3 = document.querySelector("#hint3");

let loseWord = document.querySelector("#feedback");
let startButton = document.querySelector("#start-btn");
let startContainer = document.querySelector("#startText");
let gameContainer = document.querySelector("#game");
let endContainer = document.querySelector("#endGame");
let submitButton = document.querySelector("#submit-btn");
let playerName = document.querySelector("#name");
let playerHighScore = document.querySelector("#score");
let scoreForm = document.querySelector("#score-form");
let loadingIcon = document.querySelector("#loading-icon");
const loadingScreen = document.querySelector("#loading-screen");

let winCounter = 0;
let loseHeart = 0;
let blanksLetters = [];
let wordChosen = "";
let hintNum = 1;
let hintCount = 0;

const apiUrl1 =
  "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=adjective&excludePartOfSpeech=given-name&minCorpusCount=110000&maxCorpusCount=-1&minDictionaryCount=2&maxDictionaryCount=-1&minLength=4&maxLength=12&api_key=x99v4shgrkxxd91g6q006nr6g774vt6rnwqwggt7ftc3dzq9n";
const apiKey2 = "9bfc82b8092b4463a134c8f64e93c91a";
const loseTotal = 10;
const errorMsg = "Incorrect! Please try again.";

function init() {
  startContainer.setAttribute("class", "hidden");
  gameContainer.classList.remove("hidden");
  renderHearts();
  renderHints(hintNum);
  game();
}

function game() {
  fetchWord();
}

function winGame() {
  if (wordChosen === blanksLetters.join("")) {
    key = "";
    document.removeEventListener("keyup", gameRules);
    winCounter++;
    hintCount++;
    blanksLetters = [];
    wordChosen = "";
    if (hintCount == 5 && hintNum < 3) {
      hintNum++;
      hintCount = 0;
      renderHints(hintNum);
    }
    setTimeout(game, 1000);
  }
}

function endGame() {
  gameContainer.setAttribute("class", "hidden");
  endContainer.classList.remove("hidden");
  scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!submitButtonClicked) {
      saveHighScores();
    }
  });
  // Update the score value in the <p> tag
  const scoreDisplay = document.querySelector("#score-display");
  scoreDisplay.textContent = winCounter;
}

function gameRules(event) {
  loseWord.innerHTML = "";
  let key = event.key;
  let alphabetNumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ".split(
    ""
  );
  if (alphabetNumericCharacters.includes(key) && wordChosen != null) {
    console.log(key);
    let lettersArray = wordChosen.split("");
    if (lettersArray.includes(key)) {
      for (var j = 0; j < lettersArray.length; j++) {
        if (lettersArray[j] === key) {
          blanksLetters[j] = key;
        }
      }
      key = "";
      wordBlank.textContent = blanksLetters.join(" ");
      key = "";
    } else if (!lettersArray.includes(key)) {
      key = "";
      loseHeart++;
      let k = loseTotal - loseHeart;
      let hearts = document.querySelectorAll("#hearts");
      hearts[k].setAttribute("class", "fa-solid fa-heart-broken");
      loseWord.textContent = errorMsg;
      key = "";
    }
    console.log(blanksLetters);
    console.log(winCounter);
    console.log(loseHeart);
    winGame();
    if (loseHeart === loseTotal) {
      key = "";
      document.removeEventListener("keyup", gameRules);
      endGame();
    }
  }
}

function hint() {
  let lettersArray = wordChosen.split("");
  let randNum = 0;
  do {
    randNum = Math.floor(Math.random() * lettersArray.length);
  } while (blanksLetters[randNum] != "_")
  let randLetter = lettersArray[randNum];
  for (var i = 0; i < lettersArray.length; i++) {
    if (lettersArray[i] === randLetter) {
      blanksLetters[i] = randLetter;
    }
  }
  wordBlank.textContent = blanksLetters.join(" ");
  hintNum = hintNum - 1;
  hintCount = 0;
  renderHints(hintNum);
  winGame();
}

async function fetchWord() {
  try {
    gameContainer.classList.add("hidden"); // Hide the game container
    loadingScreen.classList.remove("hidden"); // Show the loading screen

    const response = await fetch(apiUrl1);
    const data = await response.json();
    const word = data.word.toLowerCase(); // Convert the word to lowercase
    fetchImage(word);
  } catch (error) {
    alert("Unable to connect");
  }
}

async function fetchImage(word) {
  try {
    const searchTerm = word; // Use the randomly generated word as the search term
    const response = await fetch(
      `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(
        searchTerm
      )}`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey2,
        },
      }
    );
    const data = await response.json();
    const imageUrl = data.value[0].contentUrl;

    // Preload the image
    const preloadedImage = new Image();
    preloadedImage.src = imageUrl;

    loadingScreen.classList.remove("hidden"); // Show the loading screen

    // Delay for 3 seconds before loading the image and word
    await new Promise((resolve) => setTimeout(resolve, 3000));

    wordImage.setAttribute("src", imageUrl);
    wordChosen = word;
    renderBlanks(wordChosen);
    loadingScreen.classList.add("hidden"); // Hide the loading screen
    gameContainer.classList.remove("hidden"); // Show the game container
    document.addEventListener("keyup", gameRules);
    hintBtn1.addEventListener("click", hint);
    hintBtn2.addEventListener("click", hint);
    hintBtn3.addEventListener("click", hint);
    console.log(wordChosen);
    console.log(wordImage);
  } catch (error) {
    alert("Unable to connect");
    loadingScreen.classList.add("hidden"); // Hide the loading screen in case of an error
    gameContainer.classList.remove("hidden"); // Show the game container to allow further interaction
  }
}

function renderHearts() {
  hIcon.innerHTML = "";
  for (var i = 0; i < loseTotal; i++) {
    let hearts = document.createElement("i");
    hearts.setAttribute("id", "hearts");
    hearts.setAttribute("class", "fa-solid fa-heart");
    hearts.style.color = "#FF0000";
    hIcon.appendChild(hearts);
  }
}

function renderHints(total) {
  let hints = document.querySelectorAll(".hint");
  for (var i = 0; i < total; i++) {
    hints[i].setAttribute("class", "fa-solid fa-circle hint");
    hints[i].disabled = false;
  }
  for (var i = total; i < 3; i++) {
    hints[i].setAttribute("class", "fa-regular fa-circle hint");
    hints[i].disabled = true;
  }
}

function renderBlanks(word) {
  let lettersInChosenWord = word.split("");
  let numBlanks = lettersInChosenWord.length;
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
  wordBlank.textContent = blanksLetters.join(" ");
}

let submitButtonClicked = false;

function saveHighScores() {
  const scoreData = {
    initials: playerName.value,
    score: winCounter,
  };

  submitButtonClicked = true;

  // Retrieve existing scores from local storage or initialize an empty array
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Add the new score data to the array
  scores.push(scoreData);

  // Store the updated scores array in local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  // Redirect to the high scores page
  window.location.href = "highscores.html";
}

const hardModeCheckbox = document.getElementById("hardmode");
const image = document.getElementById("image");

hardModeCheckbox.addEventListener("change", function () {
  if (hardModeCheckbox.checked) {
    image.classList.add("blur");
  } else {
    image.classList.remove("blur");
  }
});

startButton.addEventListener("click", init);
