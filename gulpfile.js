var gulp=require('gulp');
var webserver=require('gulp-webserver');
var img=require('gulp-imagemin');
var uglify=require('gulp-uglify');
var css=require('gulp-clean-css');
var concat=require('gulp-concat');
var scss=require("gulp-sass");
//编译scss
gulp.task('scss',function(){
	return gulp.src('./src/scss/*.scss')
	.pipe(scss())
	.pipe(gulp.dest('./src/css/'))
})
//合并压缩js
gulp.task('js',function(){
	return gulp.src('./src/js/*.js')
	.pipe(concat("all.js"))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'))
})
//合并压缩css
gulp.task('css',function(){
	return gulp.src('./src/css/*.css')
	.pipe(concat('all.css'))
	.pipe(css())
	.pipe(gulp.dest('./dist/css'))
	
})
//图片压缩
gulp.task('img',function(){
	return gulp.src('./src/images/*.{jpg}')
	.pipe(img())
	.pipe(gulp.dest('./images/'))
})
//启服务
gulp.task('webserver',function(){
	return gulp.src('./src/')
	.pipe(webserver({
		open:true,
		port:8080,
		livereload:true
	}))
})
//自动刷新
gulp.task('watch',function(){
	gulp.watch('./src/scss/*.scss',gulp.series('scss'))
})
//dev
gulp.task('dev',gulp.series("scss","webserver",'watch'))
