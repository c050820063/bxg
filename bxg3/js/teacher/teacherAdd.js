define(['jquery','text!tpls/teacherAdd.html','bootstrap'],function($,teacherAddTpl) {
	return function() {
		$('#modalTeacherAdd').remove();
//		console.log(teacherAddTpl);
		var teacherAdd = $(teacherAddTpl).on('submit','form',function() {
			var data = $(this).serialize();
			console.log(data)
			$.ajax({
				type:"post",
				url:"/api/teacher/add",
				data:data,
				success:function(res) {
					if(res.code != 200) throw new Error(res.msg);
					$(teacherAdd).modal('hide');
					$('.list-container .teacher-manger').trigger('click');
				}
			});
			
			return false
		}).appendTo('body').modal();
		
	}
})