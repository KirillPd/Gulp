module.exports = {
	paths: {
		project: 'src/',
		build: 'build/',
		css: {
			dest: 'css/',
			all: 'css/**',
			entry: 'css/all.css'
		},
		html: {
			all: '*.html'
		},
		sass: {
			dest: 'sass/',
			entry: 'sass/all.scss',
			all: 'sass/**.scss',
			folder: 'sass'
		},
		js: {
			dest: 'js/',
			entry: 'js/main.js',
			all: 'js/**.js'
		},
		images: {
			dest: 'images/',
			all: 'images/*.*',
			sprite: 'images/sprite/*.png',
			spriteFolder: 'images/sprite/'
		},
		tasks: {
			imgMin: './tasks/img-min.js',
			styles: './tasks/styles.js',
			jsHint: './tasks/js-hint.js',
			htmlHint: './tasks/html-hint.js',
			serve: './tasks/serve.js',
			clean: './tasks/clean.js',
			copy: './tasks/copy.js',
			jsCompress: './tasks/js-compress.js',
			cssMin: './tasks/css-min.js',
			processHtml: './tasks/processhtml.js',
			generateSprite: './tasks/generate-sprite.js'
		}
	},
	tasksNames: {
		imgMin: 'img-min',
		styles: 'styles',
		jsHint: 'js-hint',
		htmlHint: 'html-hint',
		serve: 'serve',
		clean: 'clean',
		copy: 'copy',
		jsCompress: 'js-compress',
		cssMin: 'css-min',
		processHtml: 'process-html',
		generateSprite: 'generate-sprite'
	}
};