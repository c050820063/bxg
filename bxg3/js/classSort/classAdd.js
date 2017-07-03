define(['jquery','text!tpls/classAdd.html','arttemplate','bootstrap'],function($,classAddTpl,art) {
	return function() {
		$('#modalClassAdd').remove();
		$.get('/api/category/top',{},function(res) {
			
				if(res.code!=200) throw new Error(res.msg);
				var classAdd = art.render(classAddTpl,res);
				var classAddModal = $(classAdd).on('submit','form',function() {
						var formData = $(this).serialize();
						console.log(formData);
					$.post('/api/category/add',formData,function(res) {
						if(res.code!=200) throw new Error(res.msg);
						classAddModal.modal('hide');
						$('.list-container .class-sort').trigger('click');
					})
					return false;
				}).appendTo('body').modal();
		})

	}
})