/**
 * 讲师主模块-->讲师列表
 * Author:Wilbert
 *   Date:2017/6/30
 */
define(["jquery","text!tpls/teacherList.html","arttemplate","teacher/teacherCheck"],function ($,teacherListTpl,art,teacherCheck) {
    //art接受了arttemplate模板引擎的返回值-->全局函数：template


    return function () {
        //3个参数：url/参数/success方法的回调函数
        $.get("/api/teacher",{},function(res){
            if(res.code!=200) throw new Error(res.msg);

            //----->代码能够执行到这里，数据一定成功返回
            var teacherList=art.render(teacherListTpl,res);

            var $teacherList = $(teacherList)
            $teacherList.on('click','.btn-status',function() {
            var $this = $(this);
            var data = {
            	tc_id: $(this).parent().attr('tc_id'),
            	tc_status: $(this).parent().attr('tc_status'),
            };
            $.post('/api/teacher/handle',data,function (res) {
            	if (res.code != 200) throw new Error(res.msg);
                    //获取到更新后的状态值
                    var tc_status=res.result.tc_status;
                    //修改页面中的文本
                    //1、修改按钮的文本
                    $this.text(tc_status==0?"注销":"启用");
                    //2、修改属性
                    $this.parent().attr("tc_status",tc_status);
                    //3、修改指定"用户状态列"的文本
                    $this.parent().siblings(".td-status").text(tc_status==0?"启用":"注销");
            	})
            }).on('click','.btn-check',function() {
            	var tc_id = $(this).parent().attr('tc_id');
            	teacherCheck(tc_id);
            })
            
//          $(".menu-content-container").html(teacherList);
			$(".menu-content-container").empty().append($teacherList);
        })
    };
});