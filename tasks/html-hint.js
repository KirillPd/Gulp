'use strict';

const gulp = require('gulp');
const htmlhint = require('gulp-htmlhint');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src)
			.pipe(htmlhint())
			.pipe(htmlhint.reporter());
	};

};