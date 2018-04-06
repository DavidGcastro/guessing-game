function makeAGuess(game) {
    var guess = $('#myInput').val();
    parseInt(guess, 10);
    var output = game.playersGuessSubmission(parseInt(guess, 10));
    $('#myInput').val('');
    $('.title').text(output);
    if (output !== 'You have already guessed that number.' && output !== "You Win!" && output !== "You Lose.") {
        $('.guessList').append(
            '<li><span>' +
            game.pastGuesses[game.pastGuesses.length - 1] +
            '</span> </li>'
        );
    }


    if (game.pastGuesses.length >= 5 || output === "You Win!" || output === "You Lose.") {
        $('#myInput').prop('disabled', true);
        $(".leftSide--random").addClass("disabled")
        $('#subtitle').text('Reset the Game!');
    }
}

$(document).ready(function () {
    var game = new Game();
    //overwrite enter Behavior on input
    $('#myInput').bind('keydown', function (event) {
        if (
            event.keyCode == 46 ||
            event.keyCode == 8 ||
            event.keyCode == 9 ||
            event.keyCode == 27 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)
        ) {
            // let it happen, don't do anything
            return;
        } else {
            if (event.keyCode == 13) {
                // enter key was pressed
                // run own code
                makeAGuess(game);
                return false; // prevent execution of rest of the script + event propagation / event bubbling + prevent default behaviour
            }
            // Ensure that it is a number and stop the keypress
            if (
                event.shiftKey ||
                ((event.keyCode < 48 || event.keyCode > 57) &&
                    (event.keyCode < 96 || event.keyCode > 105))
            ) {
                event.preventDefault();
            }
        }
    });

    $('.leftSide--random').on('click', function (e) {
        if ($('.leftSide--random').hasClass('disabled')){
               return;
        }
        makeAGuess(game);
    });

    $('#hint').click(function () {
        var hints = game.provideHint();

        $('#hintViewer').empty().append("<p class= 'hintDisplay'>" + 'The winning number is ' + hints[0] + ', ' + hints[1] + ', or ' + hints[2] + " </p>");

    });

    $('#reset').click(function () {
        game = newGame();
        $('.title').text('The Guessing Game');
        $('#subtitle').text('Pick a number 1 - 100')
        $(".guessList").empty();
        $("#hintViewer").empty();
        $('#myInput, #submit').prop("disabled", false);
        $('.leftSide--random').removeClass('disabled')
    
    })

});
