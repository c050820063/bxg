
define(['jquery','text!tpls/teacherCheck.html',"arttemplate",'bootstrap'],function($,teacherCheckTpl,art) {
	return function(tc_id) {
		$.post('/api/teacher/view',{tc_id:tc_id},function(res) {
			
			if(res.code != 200) throw new Error(res.msg)
			//加载模态框前去除上一个模态框
			$('#teacherCheckTpl').remove();
			var teacherCheck = art.render(teacherCheckTpl,res.result);
			$(teacherCheck).appendTo('body').modal();
		})
	}
})