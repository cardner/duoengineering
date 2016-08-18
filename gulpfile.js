const browserSync = require('browser-sync').create()
const cssnano = require('cssnano')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')



gulp.task('pages', () => (
    gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
        }))
        .pipe(gulp.dest('dist'))
))


gulp.task('styles', () => (
    gulp.src('styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([
            cssnano()
        ]))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream())
))


gulp.task('images', () => (
    gulp.src('images/*.*')
        .pipe(gulp.dest('dist/images'))
))

gulp.task('fonts', () => (
    gulp.src('fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
))


gulp.task('build', ['pages', 'styles', 'images', 'fonts',])

gulp.task('refresh', ['pages', 'styles', 'images'])


gulp.task('watch', ['refresh'], () => {
    gulp.watch([
        '*.html',
    ], ['pages']).on('change', browserSync.reload)

    gulp.watch('styles/**/*.scss', ['styles'])

    browserSync.init({
        server: {
            baseDir: 'dist',
        },
        open: false,
    })
})
