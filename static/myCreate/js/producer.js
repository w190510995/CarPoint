
$(function () {

    // $("[data-toggle='tooltip']").tooltip(); //提示工具
   var   supCurentPage = 1;
   var   supPageTitalNum={};
    var carListContain = $('#supListContain') //展示车牌号容器
   var curentPageDisplay = $('#supCurentPageDisplay')//当前页码展示

        $("#pageOne").attr("class","disactive")//修改左侧按钮状态
     $("#pageSup").attr("class","active")//修改左侧按钮状态
     $("#pageMany").attr("class","disactive")//修改左侧按钮状态


     // echarts路径配置
        require.config({
            paths: {
                echarts: '/static/echart2/build/dist'
            }
        });




    //查询按钮  展示列表
    $('#supSearch').click(function () {

       var  bgTime = $('#bgTimeSup').val().replace('T',' ')
      var  endTime = $('#endTimeSup').val().replace('T',' ')
        var data = {"bgTime":bgTime,"endTime":endTime, 'curentPage':supCurentPage,}

        supCurentPage = 1;
        supPageTitalNum = pageMode("febakProds",data,carListContain,curentPageDisplay,supCurentPage,1)

        return false

    })
//查询按钮  END


//上一页
    $('#supPrePage').click(function () {



          var  bgTime = $('#bgTimeSup').val().replace('T',' ')
        var  endTime = $('#endTimeSup').val().replace('T',' ')
        var data = {"bgTime":bgTime,"endTime":endTime, 'curentPage':supCurentPage,}

        if(supCurentPage == 1){
            return false
        }else {
             supCurentPage -= 1;
             pageMode("febakProds",data,carListContain,curentPageDisplay,supCurentPage,1)
        }


        return false

    })

//上一页    end



//下一页
    $('#supNextPage').click(function () {
       var  bgTime = $('#bgTimeSup').val().replace('T',' ')
      var  endTime = $('#endTimeSup').val().replace('T',' ')
        var data = {"bgTime":bgTime,"endTime":endTime, 'curentPage':supCurentPage,}

        if(supCurentPage >= supPageTitalNum){
            return false
        }else {
             supCurentPage += 1;
            pageMode("febakProds",data,carListContain,curentPageDisplay,supCurentPage,1)
        }

        return false

    })

//下一页    end

//根据供应商查找具体信息
    $("#supListContain").on('click','input',function () {


        var suppiler = $(this).val()

        var data = {"suppiler":suppiler,}
        var coordina = []
        var displayInfo = {}
         var result = ajaxDiy("pointProd",data)


        if(result.flag == 0){
            alert("未查询到该矿点车辆的采样点数据。")
            return false
        }else {

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
             // coordina.push([
             //                parseFloat(result.data1[0][1])*100+10,
             //                parseFloat(result.data1[0][2])*100+10
             //    ])
            displayInfo={"data":coordina,
                "centTitle":suppiler,
                // "leftTitle":"华润电力（六枝）有限公司",
                "leftSubTtitle":"华润电力（六枝）有限公司 技术支持部",
            }
            scatterCar("main",displayInfo)

        }






        return false

    })


  //根据车牌号查找具体信息   END



























})

