var gulp = require('gulp');
var rev = require('gulp-rev');//给每个文件添加版本号(hash码)
var revReplace = require('gulp-rev-replace');//修改引用
var useref = require('gulp-useref');//通过注释合并文件
var filter = require('gulp-filter');//过滤器，筛选和恢复
var uglify = require('gulp-uglify');//压缩js
var csso = require('gulp-csso');//压缩css

gulp.task('default', function () {
    var jsFilter = filter('**/*.js', {restore: true});
    var cssFilter = filter('**/*.css', {restore: true});
    var indexHtmlFilter = filter(['**/*', '!index.html'], {restore: true});//！排除首页，不给首页加版本号

    return gulp.src('index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));

});