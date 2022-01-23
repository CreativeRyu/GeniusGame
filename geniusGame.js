
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

listenToButtonClicks();

function startSequence() {
    animatePress("play");
    setTimeout(() => {
        nextSequence();
    }, 1000);
}

async function nextSequence() {
    // Spielerpattern muss vor jeder neuen Runde geleert werden
    userClickedPattern = [];

    // Get Button
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    level++
    $("#level-title").text("Level " + level);

    for (index = 0; index < gamePattern.length; index++) {
        var gameIndex = gamePattern[index];

        animatePress(gameIndex);
        playSound(gameIndex);
        await sleep(800);
    }
}

// Animation for Play Button
function animatePress(currentColour) {
    setTimeout(() => {
        $("#" + currentColour).addClass(currentColour + "-pressed");
    }, 300);
    
    setTimeout(function () {
        $("#" + currentColour).removeClass(currentColour + "-pressed")
    }, 500);
}

function gameOver() {
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200);

    $("#level-title").text("GAME OVER, Press Start Button to restart.");
    gamePattern = [];
    level = 0;
}

// Button Handler which generates UserPattern
// User clicks Buttons
function listenToButtonClicks() {
    $(".btn").click(function () {
        var userChosenColour = this.id;
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        checkInput(userClickedPattern.length - 1);
    });
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function checkInput(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        gameOver();
    }
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}