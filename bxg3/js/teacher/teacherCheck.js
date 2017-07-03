define(['jquery','text!tpls/teacherCheck.html','arttemplate','bootstrap'],function($,teacherCheckTpl,art) {
	return function(tc_id) {
//		console.log(tc_id);
		$.ajax({
			type:"get",
			url:"/api/teacher/view",
			data:{
				tc_id:tc_id
			},
			success:function(res) {
//				console.log(res.result);
				if(res.code !=200) throw new Error(res.msg);
				var teacherCheck = art.render(teacherCheckTpl,res.result);
//				console.log(teacherCheck)
				$(teacherCheck).appendTo('body').modal();
			}
		});
	}
})