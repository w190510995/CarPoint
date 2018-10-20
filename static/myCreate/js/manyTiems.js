
$(function () {
   var   manyCurentPage = 1;
   var   manyPageTitalNum={};
    var carListContain = $('#carListContain') //展示车牌号容器
   var curentPageDisplay = $('#curentPageDisplay')//当前页码展示
     // echarts路径配置
        require.config({
            paths: {
                echarts: '/static/echart2/build/dist'
            }
        });

    $("#pageOne").attr("class","disactive")//修改左侧按钮状态
     $("#pageSup").attr("class","disactive")//修改左侧按钮状态
     $("#pageMany").attr("class","active")//修改左侧按钮状态



    //查询按钮  展示车辆车辆列表
    $('#manySearch').click(function () {

       var  bgTime = $('#bgTimeMany').val().replace('T',' ')
      var  endTime = $('#endTimeMany').val().replace('T',' ')
        var data = {"bgTime":bgTime,"endTime":endTime, 'curentPage':manyCurentPage,}
        manyCurentPage = 1;
        manyPageTitalNum = pageMode("febakCarPoints",data,carListContain,curentPageDisplay,manyCurentPage,0)

        return false

    })
//查询按钮  END


//上一页
    $('#manyPrePage').click(function () {



          var  bgTime = $('#bgTimeMany').val().replace('T',' ')
        var  endTime = $('#endTimeMany').val().replace('T',' ')
        var data = {"bgTime":bgTime,"endTime":endTime, 'curentPage':manyCurentPage,}

        if(manyCurentPage == 1){
            return false
        }else {
             manyCurentPage -= 1;
             pageMode("febakCarPoints",data,carListContain,curentPageDisplay,manyCurentPage,0)
        }


        return false

    })

//上一页    end



//下一页
    $('#manyNextPage').click(function () {
        var  bgTime = $('#bgTimeMany').val().replace('T',' ')
        var  endTime = $('#endTimeMany').val().replace('T',' ')
        var data = {"bgTime":bgTime,"endTime":endTime, 'curentPage':manyCurentPage,}

        if(manyCurentPage >= manyPageTitalNum){
            return false
        }else {
             manyCurentPage += 1;
            pageMode("febakCarPoints",data,carListContain,curentPageDisplay,manyCurentPage,0)
        }

        return false

    })

//下一页    end

//根据车牌号查找具体信息
    $("#carListContain").on('click','input',function () {


        var carNum = $(this).val()

        var data = {"carNum":carNum}
        console.log(data)
         var result = ajaxDiy("carNum",data)
        var coordina = []
        var displayInfo = {}
        for(var i=0;i<result.data1.length;i++){
            var tempData = result.data1[i]
            coordina.push([
                        parseFloat(tempData[4])/10,
                        parseFloat(tempData[5])/10
            ])
            coordina.push([
                        parseFloat(tempData[6])/10,
                        parseFloat(tempData[7])/10
            ])
            coordina.push([
                        parseFloat(tempData[8])/10,
                        parseFloat(tempData[9])/10
            ])

        }
         coordina.push([
                        parseFloat(result.data1[0][1])*100+10,
                        parseFloat(result.data1[0][2])*100+10
            ])
        displayInfo={"data":coordina,
            "centTitle":carNum,
            "leftTitle":result.data1[0][3],
            // "leftSubTtitle":carNum,
        }
        scatterCar("main",displayInfo)

        return false

    })


  //根据车牌号查找具体信息   END



























})

