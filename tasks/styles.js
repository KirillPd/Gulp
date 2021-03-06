'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

module.exports = function(options) {

	return function() {
		return gulp.src(options.src)
			.pipe(plumber({
				errorHandler: notify.onError(err => ({
					title: 'Styles',
					message: err.message
				}))
			}))
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'expanded'}))
			.pipe(autoprefixer({
				browsers: ['last 3 versions'],
				cascade: false
			}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(options.dest));
	};
};