require.config({
	baseUrl:'js',
	paths: {
		jquery:'lib/jquery-2.1.4',
		cookie:'lib/jquery.cookie',
		text:'lib/text',
		tpls:'../tpls',
		arttemplate:'lib/template-web',
		bootstrap:'../assets/bootstrap/js/bootstrap'
	},
	shim: {
		bootstrap: {
			deps:['jquery']
		}
	}
});
require(['jquery','teacher/teacherList','classSort/classSort','classManager/list','classManager/creat','classManager/time','cookie'],function($,teacherList,classSort,classManagerList,creatClass,timeManage) {
	var cookieStr = $.cookie('userInfo');
//	console.log(cookie);
	if(!cookieStr) {
		location.href = '/login.html';
	}
	var cookieData = JSON.parse(cookieStr);
//	console.log(cookieData);
	$('.profile-container img').attr('src',cookieData.tc_avatar);
	$('.profile-container h3').html(cookieData.tc_name);
	$('.list-group').on('click','button',function() {
		$(this).addClass('active').siblings().removeClass('active');
		if($(this).hasClass('teacher-manger')) {
			teacherList();
		}
		if($(this).hasClass('class-manger')) {
			classManagerList();
		}
		if($(this).hasClass('class-sort')) {
			classSort();
		}
		if($(this).hasClass('creat-class')) {
			creatClass();
		}
		if($(this).hasClass('chart-statis')) {
			console.log(4);
		}
		if($(this).hasClass('time-manage')) {
			var cs_id = $(this).attr('cs_id');
			timeManage(cs_id);
		}
	})
	$('.list-container .teacher-manger').trigger('click');
})
