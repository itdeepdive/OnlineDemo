var startTime = 0;
var interval;
var slideDuration = 1000;
var callbackFunc;
var first = true;

function toggleTimer(callback) {
	if (!interval) {
		first ? startTimer(callback) : resumeTimer();
	}
	else {
		pauseTimer();
	}
}

function startTimer(callback) {
	if (!interval) {
		first = false;
		startTime = (new Date()).getTime();
		callbackFunc = callback;
		interval = setInterval(callback, slideDuration);
	}
	else {
		resumeTimer();
	}
}

function pauseTimer() {
	clearInterval(interval);
	interval = null;
	var tempTime = (new Date()).getTime();
	var passedTime = tempTime - startTime;
	var index = (passedTime / slideDuration) - Math.floor(passedTime / slideDuration);
	var remaining = index * slideDuration;
	startTime = remaining;
}

function resumeTimer() {
	//setTimeout(callbackFunc, startTime);
	setTimeout(function () {
		startTimer(callbackFunc);
	}, startTime);
}