define(['jquery','text!tpls/classEdit.html','arttemplate'],function($,classEditTpl,art) {
	return function(cg_id) {
//		console.log(1);
		$('#modalClassEdit').remove();
		console.log(cg_id);
		$.get('/api/category/edit',{cg_id:cg_id},function(res) {
			if(res.code != 200) throw new Error(res.msg);
			console.log(res);
			res.result.top.unshift({
				cg_id:0,
				cg_name:'顶级分类'
			})
			var classEdit = art.render(classEditTpl,res.result);
			var courseEdit = $(classEdit).on('submit','form',function() {
				var formData = $(this).serialize();
//				console.log(formData);
				$.post('/api/category/modify',formData,function(res) {
					if(res.code != 200) throw new Error(res.msg);
					$(courseEdit).modal('hide');
					$('.list-container .class-sort').trigger('click');
				})
				return false;
			}).appendTo('body').modal();
		})
	}
})