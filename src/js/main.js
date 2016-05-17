(function($) {
	$(document).ready(function() {
		var hello = $('#hello');
		var i = 24;

		setInterval(function() {
			i++;

			hello.css({
				'font-size': i + 'px'
			});
		}, 1000);
	});
})(jQuery);