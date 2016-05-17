'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src)
			.pipe(uglify())
			// .pipe(concat('all.js'))
			.pipe(gulp.dest(options.dest));
	};

};