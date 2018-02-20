var gulp     = require('gulp'),
browserSync  = require('browser-sync'),
sass         = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
concatCSS    = require('gulp-concat-css'),
ftp          = require('gulp-ftp'),
del          = require('del');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	  browserSync.init({
        server: "src/" //изменить путь к папке
    });
    //Следим за изменениями файлов
    gulp.watch("src/sass/*.sass", ['sass']);//изменить путь с расширением 
    gulp.watch("src/*.html").on('change', browserSync.reload);//изменить путь с расширением
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")//Изменить путь ко всем файлам
        .pipe(sass().on('error', sass.logError))//лог ошибок
        .pipe(autoprefixer({
	      	browsers: ['last 2 versions'],
	        cascade: false
         }))
        .pipe(concatCSS('style.css'))
        .pipe(gulp.dest("src/css"))//изменить папку
        .pipe(browserSync.stream());
});

gulp.task('clean', function() {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('ftp', function(){
		return gulp.src('src/**')
		.pipe(ftp({
	  	host: 'uni',
      user: 'st',
      pass: 'n',
      remotePath: '/tiny2/stream'// изменить путь папки
     }))
		.pipe(gutil.noop());
	});

gulp.task('default', ['serve']);
