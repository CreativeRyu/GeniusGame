
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
nextSequence();

function nextSequence() {
    // Get Button
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animate Button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play Sounds of Buttons
    var sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();
}