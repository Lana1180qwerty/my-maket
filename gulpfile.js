const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function html(cb) {
  gulp.src('./*.html')
    .pipe(gulp.dest('./build'));
  cb();
}

function css(cb) {
  gulp.src('./style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
  cb();
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './build/',
    },
  });
}

function reload(cb) {
  browserSync.reload()
  cb();
}

const build = gulp.parallel(html, css)

const init = gulp.series(build, serve)

function defaultTask() {
  init();

  gulp.watch('./*.html', gulp.series(html, reload));

  gulp.watch('./*.css', gulp.series(css, reload));
}

exports.default = defaultTask;
