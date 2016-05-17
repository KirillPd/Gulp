'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();

module.exports = function(options) {

	return function() {
		browserSync.init({
			server: {
				baseDir: options.baseDir
			}
		});

		// browserSync.init({
		// 	proxy: "http://test.it-hive.net/GulpExample/src/"
		// })

		browserSync.watch(options.watchDir).on('change', browserSync.reload);
	};

};