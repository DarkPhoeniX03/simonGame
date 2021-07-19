var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var userPosition = "";


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


/**************************USER PRESSED BUTTON******************************/

$(".btn").click(function() {
  var clickedButton = this;
  $(clickedButton).addClass("pressed");
  setTimeout(function() {
    $(clickedButton).removeClass("pressed");
  }, 50);
  userClickedPattern.push($(this).attr("id"));
  soundOfColor($(this).attr("id"));
  checkAnswer(userClickedPattern.length-1);
});



/****************************START OVER********************************/
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}


/****************************CHECK ANSWER********************************/

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {nextSequence()}, 1000)
    }
  } else {

    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
}


/****************************NEXT SEQUENCE********************************/

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function() {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 50);
  soundOfColor(randomChosenColour);
}


/************************SOUND SECTION******************************/

function soundOfColor(color) {
  switch (color) {
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    default:
      alert("doesn't worked :/");

  }
}
