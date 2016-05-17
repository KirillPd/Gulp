'use strict';

const	gulp = require('gulp'),
		config = require('./config.js');

function requireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);

		return task(callback);
	});
}

requireTask(config.tasks.name.imgMin, config.paths.tasks.imgMin, {
	src: [
		config.paths.project + config.paths.images.all,
		"!" + config.paths.project + config.paths.images.spriteFolder
	],
	dest: config.paths.build + config.paths.images.dest
});

requireTask(config.tasks.name.styles, config.paths.tasks.styles, {
	src: config.paths.project + config.paths.sass.all,
	dest: config.paths.project + config.paths.css.dest
});

requireTask(config.tasks.name.jsHint, config.paths.tasks.jsHint, {
	src: config.paths.project + config.paths.js.entry,
});

requireTask(config.tasks.name.htmlHint, config.paths.tasks.htmlHint, {
	src: config.paths.project + config.paths.html.all,
});

requireTask(config.tasks.name.serve, config.paths.tasks.serve, {
	baseDir: config.paths.project,
	watchDir: [
		config.paths.project + config.paths.css.all,
		config.paths.project + config.paths.html.all
	]
});

requireTask(config.tasks.name.clean, config.paths.tasks.clean, {
	src: config.paths.build
});

requireTask(config.tasks.name.copy, config.paths.tasks.copy, {
	src: [
		config.paths.project,
		"!" + config.paths.project + config.paths.sass.dest,
		"!" + config.paths.project + config.paths.js.dest,
		"!" + config.paths.project + config.paths.css.dest,
		"!" + config.paths.project + config.paths.images.dest,
		"!" + config.paths.project + config.paths.html.all,
	],
	dest: config.paths.build
});

requireTask(config.tasks.name.jsCompress, config.paths.tasks.jsCompress, {
	src: config.paths.project + config.paths.js.all,
	dest: config.paths.build + config.paths.js.dest
});

requireTask(config.tasks.name.cssMin, config.paths.tasks.cssMin, {
	src: config.paths.project + config.paths.css.entry,
	dest: config.paths.build + config.paths.css.dest
});

requireTask(config.tasks.name.processHtml, config.paths.tasks.processHtml, {
	src: config.paths.project + config.paths.html.all,
	dest: config.paths.build
});

requireTask(config.tasks.name.generateSprite, config.paths.tasks.generateSprite, {
	src: config.paths.project + config.paths.images.sprite,
	destImg: config.paths.project + config.paths.images.dest,
	imgPathForScss: config.paths.images.dest,
	destScss: config.paths.project + config.paths.sass.dest,
	imgName: 'sprite.png',
	fileName: '_sprite.scss'
});

gulp.task('watch', function() {
	gulp.watch(
		config.paths.project + config.paths.html.all,
		gulp.series(config.tasks.name.htmlHint)
	);
	gulp.watch(
		config.paths.project + config.paths.sass.all,
		gulp.series(config.tasks.name.styles)
	);
	gulp.watch(
		config.paths.project + config.paths.js.entry,
		gulp.series(config.tasks.name.jsHint)
	);
	gulp.watch(
		config.paths.project + config.paths.images.spriteFolder,
		gulp.series(config.tasks.name.generateSprite)
	);
});

gulp.task('default',
	gulp.parallel('watch', config.tasks.name.serve)
);

gulp.task('build',
	gulp.series(
		config.tasks.name.clean,
		config.tasks.name.copy,
		gulp.parallel(
			config.tasks.name.jsCompress,
			config.tasks.name.imgMin,
			config.tasks.name.cssMin,
			config.tasks.name.processHtml
		)
	)
);