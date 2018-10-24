
$(function () {
  var flag1  = 0//分类查询打开状态  0：关闭  1:打开
  var flag2 = 0  //分类查询列表子项状态     0：关闭  1:打开




    $('.classificationQuery').click(function () {
        //分类查询状态控制
        if(flag1 == 0){
            flag1 = 1
            $(this).attr("class","active  classificationQuery")
        }else {
            flag1 = 0
            $(this).attr("class","disactive  classificationQuery")
        }

        //分类查询 列表 状态控制
         if(flag2 == 0){
            flag2 = 1
            $(this).find("ul").attr('class','active submenu')   //打开分类查询列表
        }else {
            flag2 = 0
           $(this).find("ul").attr('class','disactive submenu')
        }

    })













})

