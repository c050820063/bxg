define(['jquery','text!tpls/classCreat.html',],function($,classCreatTpl) {
	return function() {
//		console.log(1);
		$('#modalClassCreat').remove();
		var classCreat =$(classCreatTpl).on('submit','form',function() {
			var formData = $(this).serialize();
			$.post('/api/course/create',formData,function(res) {
				if(res.code!=200) throw new Error(res.msg);
				$('.list-container .class-manger').trigger('click');
				$(classCreat).modal('hide');
			})
			return false;
		}).appendTo('body').modal();
	}
})