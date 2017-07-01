require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery-2.1.4',
		cookie:'lib/jquery.cookie',
		bootstrap:'../assets/bootstrap/js/bootstrap',
		arttemplate:'lib/template-web',
		text:"lib/text",
		tpls:'../tpls'
	},
	shim: {
		bootstrap: {
			deps:['jquery']
		}
	}
});
require(['jquery','teacher/list','cookie'],function($,teacherList) {
	var userInfoStr = $.cookie('userInfo');
	if(!userInfoStr) {
		location.href = 'login.html';
	};
	var userInfo = JSON.parse(userInfoStr);
//	console.log(userInfo);
	//1.动态获取头像
	$('.aside .img-content img').attr('src',userInfo.tc_avatar);
	//动态获取用户名
	$(".profile-content h4").text(userInfo.tc_name);
	//2.给list注册事件
	$('.aside .list-group').on('click','button',function() {
			$(this).addClass('active').siblings().removeClass('active');
		
		//a、讲师管理
        if($(this).hasClass("btn-teacher")){

            teacherList();

        }else if($(this).hasClass("btn-course")){
            //b、课程管理
            $(".menu-content-container").html("课程管理");

        }else if($(this).hasClass("btn-course-category")){
            //b、课程分类
            $(".menu-content-container").html("课程分类");

        }else if($(this).hasClass("btn-chart")){
            //b、图表统计
            $(".menu-content-container").html("图表统计");

        }
        
	})
	//默认加载讲师管理
        $('.aside button.btn-teacher').trigger('click');
})
