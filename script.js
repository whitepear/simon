// VARIABLES
var power = false; // game on/off switch	
var strict = false; // strict mode off/on
var choices = ["green", "red", "yellow", "blue"];
var pattern = []; // storage var for generated pattern
var user = []; // storage var for user inputs
var j = 0; // counter var for comparing user with pattern
var patternTimer; // setInterval variable, globally declared to allow multiple functions access
// END VARIABLES

// AUDIO
var soundGreen = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var soundRed = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var soundYellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var soundBlue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var wrong = new Audio("http://soundbible.com/grab.php?id=1495&type=mp3");
var win = new Audio("http://soundbible.com/grab.php?id=2103&type=mp3");
var click = new Audio("http://soundbible.com/grab.php?id=772&type=mp3");
// END AUDIO

function randomChoice() {
	var random = Math.random();
	random *= choices.length;
	return choices[Math.floor(random)];
} // return random array selection

function playPattern() {
	var i = 0; // counter variable	
	patternTimer = setInterval(function() {			
		lightUp(pattern[i]);
		if (i === pattern.length-1) {
			$('.segment').css('pointer-events', 'auto');
			clearInterval(patternTimer);
		} // if end of pattern is reached, allow segments to be clicked, clear newStep()
		i++;
	}, 600); // play each button in pattern every 600ms
} // playPattern within pattern

function newStep() {
	if (power === true) {
		pattern.push(randomChoice());
		if (pattern.length > 20) {
			win.play();
			$('.countDisplay').text('WIN');
			pattern = [];
			setTimeout(newStep, 5000);
		} else {
			$('.countDisplay').text(pattern.length);		
			playPattern();
		}
	} // boolean check in case user turns off power during setTimeout call in win state above		
} // add a new step to the pattern, play the pattern; if sequence 20 was finished, play win.mp3

function lightUp(segment) {
	if (segment === 'green') {
		soundGreen.play();
		$('.' + segment).addClass('greenBright');			
	} else if (segment === 'red') {
		soundRed.play();
		$('.' + segment).addClass('redBright');
	} else if (segment === 'yellow') {
		soundYellow.play();
		$('.' + segment).addClass('yellowBright');
	} else if (segment === 'blue') {
		soundBlue.play();
		$('.' + segment).addClass('blueBright');
	} // play sound, add class that brightens segment color

	setTimeout(function() {
		$('.' + segment).removeClass('greenBright redBright yellowBright blueBright');
	}, 300); // remove brighten class from segment after 300ms
} // light up button and play sound

function wrongInput(segment) {
	user = [];
	j = 0;
	wrong.play();
	if (segment === 'green') {			
		$('.' + segment).addClass('greenBright');			
	} else if (segment === 'red') {			
		$('.' + segment).addClass('redBright');
	} else if (segment === 'yellow') {			
		$('.' + segment).addClass('yellowBright');
	} else if (segment === 'blue') {			
		$('.' + segment).addClass('blueBright');
	} // add class that brightens segment color

	setTimeout(function() {
		$('.' + segment).removeClass('greenBright redBright yellowBright blueBright');
	}, 300); // remove brighten class from segment after 300ms
} // light up button and play 'error' sound

$('#powerSwitchWrap').click(function() {
	if (power === false) {
		power = true;
		click.play();
		$('#powerSwitch').css('float', 'right');
		$('.countDisplay').css('color', '#ff3030');
	} else {
		clearInterval(patternTimer);
		power = false;
		click.play();
		$('#powerSwitch').css('float', 'left');
		$('.countDisplay').css('color', '#801515').text("--");
		strict = false;
		$('#strictLED').css('background-color', '#000').css('box-shadow', 'none');
		$('.segment').css('pointer-events', 'none');
	}
}); // end power.click

$('.startBtn').click(function() {
	if (power === true) {
		clearInterval(patternTimer);
		$('segment').css('pointer-events', 'auto');
		pattern = [];
		user = []; // reset arrays	
		newStep();		
	}
}); // end startBtn.click	

$('.segment').click(function() {
	if (power === true) {
		if ($(this).hasClass('green')) {
			user.push('green');
			if (user[j] === pattern[j]) {
				lightUp('green');
				if(j === pattern.length - 1) {
					user = [];
					j = 0;
					$('.segment').css('pointer-events', 'none');
					newStep();
				} else {
					j++;
				}					
			} else {
				if (strict === true) {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('green');	
					pattern = [];											
					newStep();
				} else {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('green');												
					playPattern();
				}
			}				
		} else if ($(this).hasClass('red')) {
			user.push('red');
			if (user[j] === pattern[j]) {
				lightUp('red');
				if(j === pattern.length - 1) {
					user = [];
					j = 0;
					$('.segment').css('pointer-events', 'none');
					newStep();
				} else {
					j++;
				}					
			} else {
				if (strict === true) {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('red');	
					pattern = [];											
					newStep();
				} else {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('red');												
					playPattern();
				}
			}			
		} else if ($(this).hasClass('yellow')) {
			user.push('yellow');
			if (user[j] === pattern[j]) {
				lightUp('yellow');
				if(j === pattern.length - 1) {
					user = [];
					j = 0;
					$('.segment').css('pointer-events', 'none');
					newStep();
				} else {
					j++;
				}					
			} else {
				if (strict === true) {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('yellow');	
					pattern = [];											
					newStep();
				} else {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('yellow');												
					playPattern();
				}
			}			

		} else if ($(this).hasClass('blue')) {
			user.push('blue');
			if (user[j] === pattern[j]) {
				lightUp('blue');
				if(j === pattern.length - 1) {
					user = [];
					j = 0;
					$('.segment').css('pointer-events', 'none');
					newStep();
				} else {
					j++;
				}					
			} else {
				if (strict === true) {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('blue');	
					pattern = [];											
					newStep();
				} else {
					$('.segment').css('pointer-events', 'none');	
					wrongInput('blue');												
					playPattern();
				}
			}			
		}
	}		
}); // light up button, play sound when clicked; check if click matches current point in pattern
	// if it does: progress until pattern completes, then add additional step to pattern, repeat
	// if it doesn't: reset user inputs, repeat pattern; if in strict mode: reset pattern entirely

$('.strictBtn').click(function() {
	if (strict === false && power === true) {
		strict = true;
		$('#strictLED').css('background-color', 'red');
		$('#strictLED').css('box-shadow', '0px 0px 10px 1px rgba(255,0,0,1)');
	} else if (strict === true && power === true) {
		strict = false;
		$('#strictLED').css('background-color', '#000');
		$('#strictLED').css('box-shadow', 'none');
	}
}); // end strictBtn.click