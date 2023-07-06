const highscoresList = document.getElementById("scoreboard");
const backBtn = document.getElementById("back-btn");
const clearBtn = document.getElementById("clear-btn");

let scores = JSON.parse(localStorage.getItem("scores")) || [];

// Display the scores in the list
function displayScores() {
  highscoresList.innerHTML = "";

  // Sort the scores in descending order based on score
  scores.sort((a, b) => b.score - a.score);

  // Truncate the scores array to contain only the top 10 scores
  const topScores = scores.slice(0, 10);

  topScores.forEach((score, index) => {
    const li = document.createElement("li");
    li.classList.add("flex", "justify-between");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = score.initials;

    const scoreSpan = document.createElement("span");
    scoreSpan.textContent = score.score;

    li.appendChild(nameSpan);
    li.appendChild(scoreSpan);

    highscoresList.appendChild(li);
  });
}

displayScores();

backBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
  scores = [];
  localStorage.setItem("scores", JSON.stringify(scores));
  displayScores();
});
