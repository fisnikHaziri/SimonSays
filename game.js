const buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickPattern = [];
var gameStarted = false;
var level = 0;
var pause = 750;

function playSound(name) {
	let audio = new Audio(`sounds/${name}.mp3`);
	audio.play();
}

function nextSequence() {
	userClickPattern = [];
	level++;
	$('#level-title').text('Level ' + level);

	let randomNumber = Math.floor(Math.random() * 4);

	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	//EASY MODE ____________!!______
	let animation = true;
	while (animation) {
		$('.btn').off();
		for (let i = 0; i < level; i++) {
			setTimeout(function () {
				$(`#${gamePattern[i]}`).fadeOut().fadeIn();
				playSound(gamePattern[i]);
			}, i * 1000);
		}
		animation = false;
	}
	setTimeout(function () {
		$('.btn').click(function () {
			let userChosenColour = $(this).attr('id');
			userClickPattern.push(userChosenColour);
			playSound(userChosenColour);
			animatePress(userChosenColour);
			checkAnswer(userClickPattern.length - 1);
		});
	}, pause);
	pause += 500;
	//EASY MODE END ________________________||
}

function animatePress(currentColour) {
	$(`.${currentColour}`).addClass('pressed');

	setTimeout(function () {
		$(`.${currentColour}`).removeClass('pressed');
	}, 30);
}

$(document).keypress(function () {
	if (!gameStarted) {
		$('#level-title').text(`Level ${level}`);
		nextSequence();
		gameStarted = true;
	}
});

function checkAnswer(currentLevel) {
	if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
		if (userClickPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		$('#level-title').text('Game Over, Press Any Key To Restart');
		playSound('wrong');
		$('body').addClass('game-over');
		setTimeout(function () {
			$('body').removeClass('game-over');
		}, 100);

		startOver();
	}
}

function startOver() {
	gameStarted = false;
	level = 0;
	gamePattern = [];
	pause = 750;
}
