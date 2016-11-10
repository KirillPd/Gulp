'use strict';

const gulp = require('gulp');
const cssnano = require('gulp-cssnano');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src)
			.pipe(cssnano({
				reduceIdents: {
					keyframes: false
				},
				discardUnused: {
					keyframes: false
				}
			}))
			.pipe(gulp.dest(options.dest));
	};

};