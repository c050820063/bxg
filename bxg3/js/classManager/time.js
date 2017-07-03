define(['jquery','text!tpls/classTimeEdit.html','arttemplate'],function($,classTimeEditTpl,art) {
	return function(cs_id) {
		console.log(123);
//		$('#modalTimeEdit').remove();
		$.get('/api/course/lesson',{cs_id:cs_id},function(res) {
			console.log(res);
			var $classTimeEdit = $(art.render(classTimeEditTpl,res.result));
//			console.log($classTimeEdit);
			$('.meau-content-container').html($classTimeEdit);
		})


	}
})