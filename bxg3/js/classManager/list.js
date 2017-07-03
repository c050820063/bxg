define(['jquery','text!tpls/classManagerList.html','arttemplate'],function($,managerListTpl,art) {
	return function() {
		$.get('/api/course',{},function(res) {
			var $managerList = $(art.render(managerListTpl,res));
			$managerList.on('click','.btn-time-edit',function() {
				var cs_id = $(this).parent().attr('cs_id');
//				console.log(cs_id);
				$('.list-container .time-manage').attr('cs_id',cs_id).trigger('click');
			});
			$('.meau-content-container').html($managerList);
		})
	}
})