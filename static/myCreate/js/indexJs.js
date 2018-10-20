$(function () {

   // draCar("drawCarArea")




    //搜索车辆
    $('#serchCar').click(function () {
         curentPage = 1
       var  bgTime = $('#bgTime').val().replace('T',' ')
      var  endTime = $('#endTime').val().replace('T',' ')
      var  machnic = $('#machnic').val()
      var  modelSam = $('#modelSam').val()
      conditionSerchCar(bgTime,endTime,machnic,modelSam)
        return false

    })







    //根据主键查找具体信息
    $("#carNumberDis").on('click','tbody tr td input',function () {

        var carPk = $(this).data("pk")
        pkSerchCar(carPk)
        return false

    })












    //根据页码获取数据

    $("#pageNumberDis").on('click','ul li',function () {

      var index = $(this).data('tile')
          var  bgTime = $('#bgTime').val().replace('T',' ')
      var  endTime = $('#endTime').val().replace('T',' ')
      var  machnic = $('#machnic').val()
      var  modelSam = $('#modelSam').val()


        if(index == 'last'){
        if(curentPage == 1){
             return
        }else {
             curentPage = curentPage -1
             conditionSerchCar(bgTime,endTime,machnic,modelSam)
             return
        }


    }else if(index == 'next'){

        if(curentPage == pageTitalNum){
             return
        }else {
             curentPage = curentPage +1
             conditionSerchCar(bgTime,endTime,machnic,modelSam)
             return
        }

    }else  if( index =='passFlag'){

        return
    }

   curentPage = parseInt(index)

    conditionSerchCar(bgTime,endTime,machnic,modelSam)




        return false

    })











})