var gulp = require('gulp'),
	webpack = require('gulp-webpack'),
	babel = require('gulp-babel');

gulp.task('babel', function() {
	return gulp.src('./public/js/app.js')
		.pipe(babel())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('webpack', ['babel'], function() {
	return gulp.src('./public/js/app.js')
		.pipe(webpack())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('scripts', ['babel', 'webpack']);

/*

gulp.task('scripts', function(callback) {
	webpack(require('../../webpack.config.js'), function() {
		callback();
	})
	return gulp.src('./app/assets/scripts/app.js')
	.pipe(babel())
	.pipe(gulp.dest('./app/temp/scripts'))
});

*/