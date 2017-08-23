//申明变量
var gulp = require('gulp'),
	less = require('gulp-less'),//less编译
	minifyCSS = require('gulp-minify-css'),//css压缩
	fileinclude = require('gulp-file-include'),//文件合并
	autoprefixer = require('gulp-autoprefixer'),//处理浏览器前缀
	uglify = require('gulp-uglify'),//js压缩
	spritesmith = require('gulp.spritesmith'),//雪碧图
	connect = require('gulp-connect');//实时刷新
	



//定义less任务
gulp.task('less', function() {
	gulp.src('less/*.less')   //获取流
	.pipe(less())
	.pipe(minifyCSS())        //css压缩
	.pipe(autoprefixer({ browsers: ['> 1%','IE 7'], cascade: false }))
	.pipe(connect.reload()) //监视less文件是否被改变
	.pipe(gulp.dest('css'));//指定处理完后文件输出的路径；
	
});


//定义名为js的任务
gulp.task('js', function () {
     gulp.src("js/index.js")
         .pipe(uglify())  			//js压缩
         .pipe(connect.reload())
         .pipe(gulp.dest('dist/js'));  //监视less文件是否被改变
});


//雪碧图
gulp.task('sprite', function () {
  var spriteData = gulp.src('img/**/*.png').pipe(spritesmith({
    imgName: 'sprite.png',//保存合并后图片的地址
    cssName: 'sprite.css',//保存合并后对于css样式的地址
    padding:5,			  //合并时两个图片的间距
    algorithm:'left-right' // 图标的排序方式 图标的排序方式   left-right   diagonal（从左上至右下)
  }));
  return spriteData.pipe(gulp.dest('./css'));//保存合并后图片的地址
});


//定义livereload任务
gulp.task('connect', function () {
     connect.server({
        livereload: true
    });
});

//监视器
gulp.task('watch', function() { 
	gulp.watch('less/**/*.less', ['less']);
	gulp.watch('js/*.js', ['js']);
	gulp.watch('img/**/*.png', ['sprite']);
});

//入口
gulp.task('default',['watch','connect'], function() {
});

 