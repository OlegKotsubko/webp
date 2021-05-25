const gulp = require("gulp");
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const del = require('del');
const clean = require('gulp-clean');

const config = {
    src: './src',
    dest: './build'
}

gulp.task('copy:img', () => gulp
  .src([`${config.src}/**/*.{jpg,png,jpeg}`])
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 70, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
  ]))
  .pipe(gulp.dest(config.dest))
);

gulp.task('copy:webp', () => gulp
  .src([`${config.src}/**/*.{jpg,png,jpeg}`])
  .pipe(
    webp({
      quality: 70
    })
  )
  .pipe(gulp.dest(config.dest))
)

gulp.task('clean:assets', () => {
    return gulp.src(`${config.dest}/**/*.{jpg,png,jpeg}`, {read: false})
      .pipe(clean());
})

gulp.task('clean', function () {
    return del(config.dest);
});

gulp.task(
    'default',
    gulp.series(
        'clean',
        'copy:webp',
        'copy:img',
        'clean:assets'
    )
);
