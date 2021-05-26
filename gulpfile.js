const gulp = require("gulp");
const webp = require('gulp-webp');
const del = require('del');

const config = {
    src: './src',
    dest: './build'
}

gulp.task('webp', () => gulp
  .src([`${config.src}/**/*.{jpg,png,jpeg}`])
  .pipe(
    webp({
      quality: 70
    })
  )
  .pipe(gulp.dest(config.dest))
)

gulp.task('clean', function () {
    return del(config.dest);
});

gulp.task(
    'default',
    gulp.series(
        'clean',
        'webp',
    )
);
