$(function () {

    $("#login_request").click(function () {
        var user = $("#page5_jEdit1").val()
        var pwd = $("#page5_jEdit2").val()

         $.ajax({
        url:'loginCheck',
        type:'POST', //GET
        async:true,    //或false,是否异步
        data:{'user':user,
            'pwd':pwd,
            },
        timeout:5000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text

        success:function(dic){
            $.each(dic.data,function(index,item){


                if(parseInt(item) == 1){

                    window.location.href = "index"+"?user"+"="+user

                }else {

                }

                })


        },
        error:function(xhr,textStatus){
           console.log("请求失败")
        }
    })
        return false
    })


})