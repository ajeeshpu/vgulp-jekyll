$(function() {
	$(document).ready(function () { moveSlideShowIfNeeded(); });
	$(window).resize(function () { moveSlideShowIfNeeded(); });


	// Move the slideshow to the left side in sync with other flexible elements
	// on the page
	var moveSlideShowIfNeeded = function () {
		var width = $(window).width();

		// Gap before starting to shift the slideshow to the left
		var gap = 20.0;

		// This 2 values should be in sync within the max width values at the
		// end of c/v3/home.css
		var maxWidthFlexibel = 1240;
		var minWidthFlexibel = 980;

		if (width < (maxWidthFlexibel - gap) && width > minWidthFlexibel) {
			var margin = -1 * (maxWidthFlexibel - width - 1);
			$("#slideshow").css("margin-left", margin);
		}
		else if (width < minWidthFlexibel) {
			var minDiff = maxWidthFlexibel - minWidthFlexibel - 1;
			var marginLeft = $("#slideshow").css("margin-left");
			if (marginLeft !== minDiff) {
				$("#slideshow").css("margin-left", -minDiff);
			}
		}
		else {
			$("#slideshow").css("margin-left", 0);
		}
	};
});
