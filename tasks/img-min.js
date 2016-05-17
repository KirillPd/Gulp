'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src)
			.pipe(imagemin({
					progressive: true,
				})
			)
			.pipe(gulp.dest(options.dest));
	};

};
