const gulp = require('gulp'), // Load Gulp!
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
browserSync = require('browser-sync').create(),
eslint = require('gulp-eslint'),
sass = require("gulp-sass"),
autoprefixer = require("gulp-autoprefixer"),
cssnano = require("gulp-cssnano"),
prettyError = require("gulp-prettyerror"),
babel = require("gulp-babel");

gulp.task('scripts', ['lint'], function() {
  return gulp
    .src('./js/*.js') // What files do we want gulp to consume?
    .pipe(babel())
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
});

gulp.task('watch', function() {
    gulp.watch(['js/*.js', '**/*.scss', '*.html'] , ['reload']);
 });

 gulp.task('reload', ['scripts', 'sass',], function() {
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


gulp.task("sass", function() {
  return gulp
    .src("./sass/style.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});

gulp.task('default', ['scripts', 'sass', 'browser-sync', 'watch']);