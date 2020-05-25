let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var level = 0;

$(document).keypress(function() {
    if (isGameRunning() === false) {
        nextSequence();
    }
})

//save user input
$(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    comparePattern(userClickedPattern.length - 1);
});

//sequece of buttons for user to repeat
function nextSequence() {
    nextLevel();
    var randomNumber = Math.floor(Math.random() * Math.floor(4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//check if game is running
function isGameRunning() {
    if (level > 0) {
        return true;
    } else if (level == 0) {
        return false;
    } else {
        console.log("Level<0");
        level = 0;
        return false;
    }
}

//after level is passed, show next level number
function nextLevel() {
    level++;
    $("#level-title").text("Level " + level);
}

//check if user input is equal to game
function comparePattern(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 500);
        }
    } else {
        gamePattern = [];
        userClickedPattern = [];
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
        level = 0;
    }
}