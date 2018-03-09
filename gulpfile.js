var gulp = require('gulp'); // Load Gulp!
var uglify = require('gulp-uglify'),
  rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');

gulp.task('scripts', function() {
  return gulp
    .src('./js/*.js') // What files do we want gulp to consume?
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
});

// gulp.task('scripts', gulp.series('lint', function() {
//     return gulp
//       .src('./js/*.js') // What files do we want gulp to consume?
//       .pipe(uglify()) // Call the uglify function on these files
//       .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
//       .pipe(gulp.dest('./build/js')); // Where do we put the result?
//     })
// );

gulp.task('watch', function() {
    gulp.watch(['js/*.js', 'css/*.css', '*.html'] , ['lint', 'reload']);
 });

 gulp.task('reload', ['lint'], function() {
    browserSync.reload();
 });
 
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('lint', function() {
    return gulp.src(['js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['scripts', 'browser-sync', 'watch', 'lint']);