define(['jquery','text!tpls/classSort.html','arttemplate','classSort/classAdd','classSort/classEdit'],function($,classSortTpl,art,classAdd,classEdit) {
	return function() {
		$.get('/api/category',{},function(res) {
//			console.log(res);
			var classSort = art.render(classSortTpl,res);
			var $classSort = $(classSort);
			$classSort.on('click','.course-add',function() {
//				$('#modalClassAdd').remove();
//				$(classSortTpl).appendTo('body').modal();
				classAdd();
			}).on('click','.course-edit',function() {
				var cg_id = $(this).parent().attr('cg_id');
//				console.log(11);
				classEdit(cg_id);
			}).on('click','.course-modify',function() {
				$.get('/api/category',{},function(res) {
//					console.log(res.result);
					var arr = [];
					var arr2 = [];
					var obj = {};
					for(var i=0;i<res.result.length;i++) {
						for(var key in res.result[i]) {
							if(key=='cg_id'||key=='cg_name'||key=='cg_pid') {
								obj = {
									key:res.result[i][key]
								}

							}
//							console.log(res.result[1][key]);

//							console.log(key);
//							arr[i]['cg_id'] = res.result[i][cg_id]
						}
					}
					console.log(obj);
				})
			})
			$('.meau-content-container').html($classSort);
		})

	}
})