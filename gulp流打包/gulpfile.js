/*
* @Author: Administrator
* @Date:   2017-02-08 09:31:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-08 12:46:10
*/

'use strict';
/*
*1,less编译，压缩，合并
*2，js混淆，压缩，合并
*3，img复制
*4，html压缩
* 
 */
//在gulpfile中先载入gulp包。这些包提供API

var gulp=require('gulp');
var less=require('gulp-less');



//1，less编译，压缩，没必要合并，可以导包
var cssnano=require('gulp-cssnano');
gulp.task('style',function () {
	//执行style任务时自动执行的
	//找到less文件编译后放到要发布的dist文件夹中
	gulp.src(['src/styles/*.less','!src/styles/_*.less']).pipe(less()).pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({
		stream:true
	}));
})
//2,js文件合并，压缩，混淆
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
		stream:true
	}));
})
//3,图片复制
gulp.task('img',function () {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream:true
	}));
})
//4,html处理
var htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
	 	stream:true
	 }));//通知自动刷新
})
//5,启动web服务器
var browserSync=require('browser-sync');
gulp.task('serve',function () {
	browserSync({server: {
		baseDir:['dist']
	}},
	function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['img']);
	gulp.watch('src/*.html',['html']);
})