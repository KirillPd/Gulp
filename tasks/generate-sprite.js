'use strict';

const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');

module.exports = function(options) {

	return function() {
		let spriteData = gulp.src(options.src)
			.pipe(spritesmith({
				imgName: '../' + options.imgPathForScss + options.imgName,
				cssName: options.fileName
			})
		);

		let imgStream = spriteData.img
			.pipe(gulp.dest(options.destImg));

		let cssStream = spriteData.css
			.pipe(gulp.dest(options.destScss));

		return merge(imgStream, cssStream);
	};

};