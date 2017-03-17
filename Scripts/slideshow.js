var currTimerValue = 0;
var slideDuration = 1000;
var interval;
var slideshows = [];

var viewModel = {
	currSlideshow: ko.observable(),
	currArrayIndex: 0
}

$(document).ready(function () {
	viewModel.currSlideshow(slideshowDataJson[0]);
	ko.applyBindings(viewModel);	

	addSlideshowNavigationCircles();
	addClickHandlers();

	$(window).resize(function () {
		setMainSlideshowNavigation();
		setModalSlideshowNavigation();
	});

});

function addSlideshowNavigationCircles() {
	
	for (var i = 0; i < slideshowDataJson.length; i++) {
		if (slideshowDataJson[i].pageId == currItem.id) {
			slideshows = slideshowDataJson[i].slideshows;
			for (var j = 0; j < slideshowDataJson[i].slideshows.length; j++) {
				var currSlide = slideshowDataJson[i].slideshows[j];
				jQuery('<div/>', {
					id: 'circle' + currSlide.id,
					class: 'circle',
					text: ''
				}).appendTo($('#slideshowLine'));

				jQuery('<div/>', {
					id: 'circleM' + currSlide.id,
					class: 'circle',
					text: ''
				}).appendTo($('#slideFullScreenModal .slideshowLine'));


				if (j < slideshows.length - 1) {
					jQuery('<div/>', {
						class: 'line',
						text: ''
					}).appendTo($('#slideshowLine'));
				}

				if (j < slideshows.length - 1) {
					jQuery('<div/>', {
						class: 'line',
						text: ''
					}).appendTo($('#slideFullScreenModal .slideshowLine'));
				}

				$('#circle' + currSlide.id).click(setCurrentSlideshow.bind(currSlide));
				$('#circleM' + currSlide.id).click(setCurrentSlideshow.bind(currSlide));
			}
			break;
		}		
	}
	if (slideshows.length == 0) {
		alert('There is no slideshows in data-slideshow.js file for the pageID = ' + currItem.id);		
	}
	else {
		setMainSlideshowNavigation();
		setCurrentSlideshow.call(slideshows[0]);
	}
}

function addClickHandlers() {
	$('#navButtons #leftNav').click(function () {
		viewModel.currArrayIndex--;
		viewModel.currArrayIndex = Math.max(0, viewModel.currArrayIndex);
		setCurrentSlideshow.call(slideshows[viewModel.currArrayIndex]);
	});

	$('#rightNav').click(function () {
		viewModel.currArrayIndex++;
		viewModel.currArrayIndex = Math.min(viewModel.currArrayIndex, slideshows.length - 1);
		setCurrentSlideshow.call(slideshows[viewModel.currArrayIndex]);
	});

	$('#slideshowNavigation #playPauseButton').click(function (e) {
		toggleButtonsState();
		toggleTimer(goToNextSlide);
	});

	$('#slideFullScreenModal .playPauseButton').click(function (e) {
		toggleButtonsState();
		toggleTimer(goToNextSlide);
	});

	$('#showSlideFullScreen').click(function (e) {
		//alert('+');
		$('#slideFullScreenModal').modal('show');

		setTimeout(function () {
			setModalSlideshowNavigation();
		}, 400);
	});

	$('#slideFullScreenModal .closeModalButton').click(function () {
		$('#slideFullScreenModal').modal('hide');
	});
}

function setMainSlideshowNavigation() {
	var parentWidth = $('#slideshowLine').width();
	var circlesWidth = $('#slideshowNavigation .circle').length * 13;
	var lineWidth = (parentWidth - circlesWidth) / $('#slideshowNavigation .line').length;
	$('#slideshowLine .line').css('width', lineWidth);
}

function setModalSlideshowNavigation() {
	var parentWidth = $('#slideFullScreenModal .slideshowLine').width();
	var circlesWidth = $('#slideFullScreenModal .circle').length * 13;
	var lineWidth = (parentWidth - circlesWidth) / $('#slideFullScreenModal .line').length;
	$('.slideshowLine .line').css('width', lineWidth);
	$('#slideFullScreenModal .slideshowNavigation').css('opacity', 1);
	//setActiveCircle(slideshowDataJson[0].id);
}

function setCurrentSlideshow() {
	var slideId = this.id;
	for (var i = 0; i < slideshows.length; i++) {
		if (slideshows[i].id == slideId) {
			viewModel.currSlideshow(slideshows[i]);
			viewModel.currArrayIndex = Math.min(i, slideshows.length - 1);
			break;
		}
	}
	setActiveCircle(slideId);
}

function setActiveCircle(slideId) {
	$('#slideshowLine .circle').removeClass('active');
	$('#slideshowLine #circle' + slideId).addClass('active');

	$('.slideshowLine .circle').removeClass('active');
	$('.slideshowLine #circleM' + slideId).addClass('active');
}

function goToNextSlide() {
	viewModel.currArrayIndex++;
	//viewModel.currArrayIndex = Math.min(viewModel.currArrayIndex, slideshowDataJson.length - 1);
	if (viewModel.currArrayIndex > slideshows.length - 1) {
		pauseTimer();
		viewModel.currArrayIndex = 0;
		toggleButtonsState();
	}
	setCurrentSlideshow.call(slideshows[viewModel.currArrayIndex]);
}

function toggleButtonsState() {
	$('#playPauseButton').toggleClass('play');
	$('#playPauseButton').toggleClass('pause');

	$('#slideFullScreenModal .playPauseButton').toggleClass('play');
	$('#slideFullScreenModal .playPauseButton').toggleClass('pause');
}

$(window).resize(function () {
	var parentWidth = $('#slideshowLine').width();
	var circlesWidth = $('.circle').length * 13;
	var lineWidth = (parentWidth - circlesWidth) / $('.line').length;
	$('#slideshowLine .line').css('width', lineWidth);
});