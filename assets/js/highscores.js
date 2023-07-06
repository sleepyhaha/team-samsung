// let getHighScoreList = JSON.parse(localStorage.getItem("highScoreSave"));
// let highScoreboard = document.querySelector(".highscore-list");
const backBtn = document.getElementById("back-btn");

// let scoreItem = document.createElement("li");

// scoreItem.append(getHighScoreList);
// highScoreboard.append(scoreItem);

backBtn.addEventListener("click", function () {
  window.location.href = "index.html";
});
