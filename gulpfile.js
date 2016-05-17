'use strict';

const	gulp = require('gulp'),
		cfg = require('./config.js'),
		projectPath = cfg.paths.project,
		buildPath = cfg.paths.build;

function requireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);

		return task(callback);
	});
}

requireTask(cfg.tasksNames.imgMin, cfg.paths.tasks.imgMin, {
	src: [
		projectPath + cfg.paths.images.all,
		"!" + projectPath + cfg.paths.images.spriteFolder
	],
	dest: buildPath + cfg.paths.images.dest
});

requireTask(cfg.tasksNames.styles, cfg.paths.tasks.styles, {
	src: projectPath + cfg.paths.sass.all,
	dest: projectPath + cfg.paths.css.dest
});

requireTask(cfg.tasksNames.jsHint, cfg.paths.tasks.jsHint, {
	src: projectPath + cfg.paths.js.entry,
});

requireTask(cfg.tasksNames.htmlHint, cfg.paths.tasks.htmlHint, {
	src: projectPath + cfg.paths.html.all,
});

requireTask(cfg.tasksNames.serve, cfg.paths.tasks.serve, {
	baseDir: projectPath,
	watchDir: [
		projectPath + cfg.paths.css.all,
		projectPath + cfg.paths.html.all
	]
});

requireTask(cfg.tasksNames.clean, cfg.paths.tasks.clean, {
	src: buildPath
});

requireTask(cfg.tasksNames.copy, cfg.paths.tasks.copy, {
	src: [
		projectPath,
		"!" + projectPath + cfg.paths.sass.dest,
		"!" + projectPath + cfg.paths.js.dest,
		"!" + projectPath + cfg.paths.css.dest,
		"!" + projectPath + cfg.paths.images.dest,
		"!" + projectPath + cfg.paths.html.all,
	],
	dest: buildPath
});

requireTask(cfg.tasksNames.jsCompress, cfg.paths.tasks.jsCompress, {
	src: projectPath + cfg.paths.js.all,
	dest: buildPath + cfg.paths.js.dest
});

requireTask(cfg.tasksNames.cssMin, cfg.paths.tasks.cssMin, {
	src: projectPath + cfg.paths.css.entry,
	dest: buildPath + cfg.paths.css.dest
});

requireTask(cfg.tasksNames.processHtml, cfg.paths.tasks.processHtml, {
	src: projectPath + cfg.paths.html.all,
	dest: buildPath
});

requireTask(cfg.tasksNames.generateSprite, cfg.paths.tasks.generateSprite, {
	src: projectPath + cfg.paths.images.sprite,
	destImg: projectPath + cfg.paths.images.dest,
	imgPathForScss: cfg.paths.images.dest,
	destScss: projectPath + cfg.paths.sass.dest,
	imgName: 'sprite.png',
	fileName: '_sprite.scss'
});

gulp.task('watch', function() {
	gulp.watch(
		projectPath + cfg.paths.html.all,
		gulp.series(cfg.tasksNames.htmlHint)
	);
	gulp.watch(
		projectPath + cfg.paths.sass.all,
		gulp.series(cfg.tasksNames.styles)
	);
	gulp.watch(
		projectPath + cfg.paths.js.entry,
		gulp.series(cfg.tasksNames.jsHint)
	);
	gulp.watch(
		projectPath + cfg.paths.images.spriteFolder,
		gulp.series(cfg.tasksNames.generateSprite)
	);
});

gulp.task('default',
	gulp.parallel('watch', cfg.tasksNames.serve)
);

gulp.task('build',
	gulp.series(
		cfg.tasksNames.clean,
		cfg.tasksNames.copy,
		gulp.parallel(
			cfg.tasksNames.jsCompress,
			cfg.tasksNames.imgMin,
			cfg.tasksNames.cssMin,
			cfg.tasksNames.processHtml
		)
	)
);