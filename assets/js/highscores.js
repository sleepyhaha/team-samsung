let getHighScoreList = JSON.parse(localStorage.getItem("highScoreSave"));
let highScoreboard = document.querySelector(".highscore-list");

let scoreItem = document.createElement("li");

scoreItem.append(getHighScoreList);
highScoreboard.append(scoreItem);
