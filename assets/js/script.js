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
