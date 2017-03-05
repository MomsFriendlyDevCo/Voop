var babel = require('gulp-babel');
var cache = require('gulp-cache');
var colors = require('chalk');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', ['build']);
gulp.task('build', ['vendors-main', 'scripts']);

gulp.task('vendors-main', function() {
	return gulp.src([
		'./node_modules/vue/dist/vue.js',
		'./node_modules/vuex/dist/vuex.js',
	])
		.pipe(concat('vendors-main.min.js'))
		.pipe(gulp.dest('./build'))
});

gulp.task('scripts', function() {
	return gulp.src([
		'**/*.ctrl.js',
	])
		.pipe(cache(babel({ // Cache output and pipe though Babel
			presets: ['es2015'],
		}), {
			key: function(file) {
				return [file.contents.toString('utf8'), file.stat.mtime, file.stat.size].join('');
			},
			success: function(file) {
				gutil.log(gutil.colors.blue('[Babel]'), 'compile', colors.cyan(file.relative));
				return true;
			},
		}))
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('./build'))
});

gulp.task('server', ['build'], function(cb) {
	require('./units/counter/counter.path.js');
});
