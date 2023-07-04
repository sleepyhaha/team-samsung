let submitButton = document.querySelector("#submit-btn");
let playerName = document.querySelector("#initials");
let playerHighScore = document.querySelector("#score");

function saveHighScores(event) {
  event.preventDefault();
  let highScoreSave = {
    playerNameSave: playerName.value,
    playerHighScoreSave: playerHighScore.value,
  };

  localStorage.setItem("nameScore", json.stringify(highScoreSave));
}

submitButton.addEventListener("submit", saveHighScores);
