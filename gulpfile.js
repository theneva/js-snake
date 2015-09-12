var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('default', function() {
    livereload.listen();

    var files = ['./index.html', './game.js'];

    gulp.watch(files, function(file) {
        gulp.src(file.path)
            .pipe(livereload());
    });
});
