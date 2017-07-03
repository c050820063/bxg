define(['jquery','text!tpls/teacherEdit.html','arttemplate','bootstrap'],function($,teacherEditTpl,art) {
	return function(tc_id) {
		$.ajax({
			type:"get",
			url:"/api/teacher/edit",
			data: {
				tc_id:tc_id
			},
			success:function(res) {
				$('#modalTeacherEdit').remove();
				var teacherEdit = art.render(teacherEditTpl,res.result);
				var teacherEdit = $(teacherEdit).on('submit','form',function() {
					var data = $(this).serialize();
					$.ajax({
						type:"post",
						url:"/api/teacher/update",
						data:data,
						success:function(res) {
							if(res.code!=200) throw new Error(res.msg);
//							console.log(res);
							teacherEdit.modal('hide');
							$('.list-container .teacher-manger').trigger('click');
//							$('#teacher-manger').trigger('click');
						}
					});
					
					return false;
				}).appendTo('body').modal();
			}
		});
	}
})