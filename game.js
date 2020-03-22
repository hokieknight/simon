
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameLevel = 0;
var userLevel = 0;

$(document).on("keypress", function() {
  if (gameLevel === 0)
    nextSequence();
});

$(".start").click(function() {
  if (gameLevel === 0)
    nextSequence();
});


$(".btn").click(function() {
  if (gameLevel === 0)
    return;

  var userColor = this.id;
  userPattern.push(userColor);
  animatePress(userColor);
  playSound(userColor);

  checkAnswer(userLevel);
});

function nextSequence() {
  gameLevel++;
  $("#level-title").text("Level "+gameLevel);

  var randomNumber = Math.floor(Math.random()*4);
  var gameColor = buttonColors[randomNumber];
  gamePattern.push(gameColor);

  for(var i = 0; i < gamePattern.length; i++)
  {
    let thisColor = gamePattern[i];
    setTimeout(function() {
      flashButton(thisColor);
      playSound(thisColor);
    }, i*500);
  }
}

function checkAnswer(level)
{
  if (userPattern[level] === gamePattern[level])
  {
    userLevel++;
    if (userLevel === gameLevel)
    {
      resetUser();
      setTimeout(nextSequence, 1000);
    }
  }
  else
  {
    playSound("wrong");
    resetGame();
  }
}

function resetGame() {
  userLevel = gameLevel = 0;
  gamePattern = [];
  userPattern = [];
  $("body").addClass("game-over");
  setTimeout(function () {
    $("#level-title").text("Simon - Press Start");
    $("body").removeClass("game-over");
  }, 1000);

}

function resetUser() {
  userLevel = 0;
  userPattern = [];
}

function playSound(color) {
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}
function flashButton(color) {
  $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
}
function animatePress(color) {
  //$("#"+color).addClass("pressed").delay(1000).removeClass("pressed");
  $("#"+color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}
