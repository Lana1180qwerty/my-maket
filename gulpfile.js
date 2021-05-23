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
  gulp.src('./*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
  cb();
}

function images(cb) {
  gulp.src('./images/*.png')
  .pipe(gulp.dest('./build/images'));
  cb();
}

function frameworkCss(cb) {
  gulp.src('./framework/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/framework'));
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

const build = gulp.parallel(html, css, images, frameworkCss)

const init = gulp.series(build, serve)

function defaultTask() {
  init();

  gulp.watch('./*.html', gulp.series(html, reload));

  gulp.watch('./*.css', gulp.series(css, reload));

  gulp.watch('./images/*.png', gulp.series(images, reload));

  gulp.watch('./framework/*.css', gulp.series(frameworkCss, reload));
}

exports.default = defaultTask;
