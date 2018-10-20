$(function () {

    $('#singinCheck1').click(function () {


        var  user = $('#singinUser').val()
        var  pwd = $('#singinPwd').val()

        var result = ajaxDiy("xcheckSingn",{"user":user,"pwd":pwd})
        var returnFlag = parseInt(result.data1)
        if(returnFlag == 1){
            $(location).attr('href', 'many');
        }else {
            alert("账户或密码错误")
        }


    })


})