function generateWinningNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function shuffle(arr) {
	var i = arr.length,
		j,
		temp;
	while (--i > 0) {
		j = Math.floor(Math.random() * (i + 1)); // Get random number ranging between 0 and i
		//why?
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.winningNumber - this.playersGuess);
};

Game.prototype.isLower = function() {
	if (this.playersGuess < this.winningNumber) {
		return true;
	}
	return false;
};

Game.prototype.playersGuessSubmission = function(num) {
	if (num < 1 || num > 100 || typeof num !== 'number') {
		throw 'That is an invalid guess.';
	}
	this.playersGuess = num;
	return this.checkGuess(num);
};

Game.prototype.checkGuess = function(num) {

	if (this.pastGuesses.includes(num)) {
		return 'You have already guessed that number.';
	}

	if (num === this.winningNumber) {
		return 'You Win!';
	}
	if (this.pastGuesses.indexOf(num) === -1) {
		this.pastGuesses.push(num);
	}

	if (this.pastGuesses.length === 5) {
		return 'You Lose.';

	}
   if (this.difference() < 10) {
		return "You're burning up!";
	}
	if (this.difference() < 25) {
		return "You're lukewarm.";
	}
	if(this.difference() < 50){
		return "You\'re a bit chilly."
	}

    if(this.difference() < 100){
    	return "You\'re ice cold!";
    }


};

function newGame(){
	return new Game();
}


Game.prototype.provideHint = function(){
	return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}
