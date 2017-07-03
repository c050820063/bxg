define(['jquery','text!tpls/teacherList.html','arttemplate','teacher/teacherAdd','teacher/teacherCheck','teacher/teacherEdit'],function($,teacherListTpl,art,teacherAdd,teacherCheck,teacherEdit) {
	return function() {
		$.get('/api/teacher',{},function(res) {
			if(res.code!=200) throw new Error(res.msg);
			var teacherList = art.render(teacherListTpl,res);
			var $teacherList = $(teacherList)
			$teacherList.on('click','.btn-status',function() {
				//点击注册/启用按钮获取父元素保存的id及status
				var data = {
					tc_id:$(this).parent().attr('tc_id'),
					tc_status:$(this).parent().attr('tc_status')
				}
//				console.log(data);
//				console.log($(this));
				var $this = $(this);
				$.ajax({
					type:"post",
					url:"/api/teacher/handle",
					data:data,
					success: function(res) {
						if(res.code!=200) throw new Error(res.msg);
						//根据服务器内容更改页面数据
//						console.log(res);
						var status = res.result.tc_status;
						$this.text(status==1?'启用':'注销');
						$this.parent().attr('tc_status',status);
						$this.parent().siblings('.td-status').text(status==0?'启用':'注销')
					}
				});
			}).on('click','.btn-check',function() {
				//注册查看按钮的功能
				var tc_id = $(this).parent().attr('tc_id');
				teacherCheck(tc_id);
			}).on('click','.btn-add',function() {
				//添加讲师按钮的功能
				teacherAdd();
			}).on('click','.btn-edit',function() {
				var tc_id = $(this).parent().attr('tc_id');
				teacherEdit(tc_id);
			})
			$('.meau-content-container').html($teacherList);
		})
	}
})