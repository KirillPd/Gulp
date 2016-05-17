'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const notifyLinterReporter = require('gulp-notify-linter-reporters');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src)
			.pipe(jshint())
			.pipe(notifyLinterReporter('jshint'));
	};

};