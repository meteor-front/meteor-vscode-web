const gulp = require('gulp')
const replace = require('gulp-replace')
const { src, dest } = require('gulp')

function replaceTemplate() {
  return src(['./dist/css/chunk-vendors.css'])
    .pipe(replace('../fonts/element-icons', 'https://www.80fight.cn/vscodeFonts/element-icons'))
    .pipe(dest('./dist/css'))
}

gulp.task('default', replaceTemplate)
