'use strict';

const gulp = require('gulp');
const processhtml = require('gulp-processhtml');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src)
			.pipe(processhtml())
			.pipe(gulp.dest(options.dest));
	};

};