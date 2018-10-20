

  curentPage = 1  //当前页码
pageTitalNum = {}



// 画出车厢并显示采样点
function draCar(areaId,item) {

     var myChart = echarts.init(document.getElementById(areaId));
var option = {
    title : {
        text: '',
        subtext: '华润电力（六枝）有限公司技术支持部'
    },
    grid: {
        left: '3%',
        right: '7%',
        bottom: '3%',
        containLabel: true
    },
    tooltip : {
        // trigger: 'axis',
        showDelay : 0,
        formatter : function (params) {
            if (params.value.length > 1) {
                return params.seriesName + ' :<br/>'
                + params.value[0] + 'cm '
                + params.value[1] + 'cm ';
            }
            else {
                return params.seriesName + ' :<br/>'
                + params.name + ' : '
                + params.value + 'cm ';
            }
        },
        axisPointer:{
            show: true,
            type : 'cross',
            lineStyle: {
                type : 'dashed',
                width : 1
            }
        }
    },
    toolbox: {
        feature: {
            dataZoom: {},
            brush: {
                type: ['rect', 'polygon', 'clear']
            }
        }
    },
    brush: {
    },
    legend: {
        data: ['采样点','男性'],
        left: 'center'
    },
    xAxis : [
        {
            type : 'value',
            scale:false,
            axisLabel : {
                formatter: '{value} cm'
            },
            splitLine: {
                show: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:false,
            axisLabel : {
                formatter: '{value} cm'
            },
            splitLine: {
                show: true
            }
        }
    ],
    series : [
        {
            name:'采样点',
            type:'scatter',
            data: [[item[0], item[3]], [item[1], item[4]], [item[2], item[5]], [item[6], item[7]+10],
            ],
            markArea: {
                silent: true,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 1,
                        borderType: 'dashed'
                    }
                },
                data: [[{
                    name: '车厢区域',
                    xAxis: '0',
                    yAxis: '0'
                }, {
                    xAxis: 'max',
                    yAxis: 'max'
                }]]
            },
            markLine : {
                lineStyle: {
                    normal: {
                        type: 'solid'
                    }
                }
            }
        }
    ]
};

myChart.setOption(option);
}


//按条件查找车辆
function conditionSerchCar(bgTime,endTime,machnic,modelSam) {

   var data1 = {'bgTime':bgTime,
        'endTime':endTime,
        'machnic':machnic,
        'modelSam':modelSam,
       'curentPage':curentPage,
            }

   var carHandle = $("#carNumberDis")
    var pageNumberDis = $("#pageNumberDis")

    pageNumberDis.empty()
    carHandle.empty()

     $.ajax({
        url:'serch',
        type:'POST', //GET
        async:true,    //或false,是否异步
        data:data1,
        timeout:5000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text

        success:function(dic){

            //添加车辆列表信息
            $.each(dic.data,function(index,item){
                    pageTitalNum = parseInt(item[2]);

                    carHandle.append('<tbody><tr ><td>'+item[1]+'&nbsp;&nbsp;&nbsp;<span  class="glyphicon glyphicon-hand-right " aria-hidden="true">\n' +
                        '                 </span><input class="btn btn-default" type="button" value="详细" data-pk="'+item[0]+'"></td></tr></tbody>')

                })

               //根据总页数添加页码
                     if(pageTitalNum<= 5){
                        for(i=1;i<=pageTitalNum;i++){

                            if(curentPage == i){
                                pageNumberDis.append('<ul class="pagination" > ' +
                                '<li data-tile="'+i+'" class="active"><a href="#">'+i+'</a></li>' +
                                '</ul>')
                            }else {
                                pageNumberDis.append('<ul class="pagination" > ' +
                                '<li data-tile="'+i+'"><a href="#">'+i+'</a></li>' +
                                '</ul>')
                            }


                        }
                     }else {

                             pageNumberDis.append('<ul class="pagination" > ' +
                                 '<li data-tile ="last" ><a href="#" aria-label="Previous"><span aria-hidden="true" >上一页</span> </a></li>'+
                                 '<li class="active"  data-tile ="passFlag"><a href="#">'+curentPage+'</a></li>' +
                                 '<li data-tile="next"><a href="#" aria-label="Next"><span aria-hidden="true" >下一页</span></a> </li>'+
                                '</ul>')


                     }


        },
        error:function(xhr,textStatus){
           console.log("请求失败")
        }
    })

    return false
}










//按主键查找车辆
function pkSerchCar(pk) {


     $.ajax({
        url:'pkCar',
        type:'POST', //GET
        async:true,    //或false,是否异步
        data:{"pk":pk},
        timeout:5000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text

        success:function(dic){
             $.each(dic.data,function(index,item){



                    $("#carNuberQ").html(item[0])
                 $("#carLenthQ").html(item[1]+" m")
                 $("#carWidthQ").html(item[2]+" m")
                 $("#persenalQ").html(item[3])
                 $("#carModelQ").html(item[4])
                 $("#endTimeQ").html(item[5].replace('T',' ').replace('Z',''))
                 $("#machineQ").html(item[12])
                 var coordina = [
                     parseFloat(item[6])/10,
                     parseFloat(item[7])/10,
                     parseFloat(item[8])/10,
                     parseFloat(item[9])/10,
                     parseFloat(item[10])/10,
                     parseFloat(item[11])/10,
                     parseFloat(item[1])*100,
                     parseFloat(item[2])*100,

                 ]
                   draCar("drawCarArea",coordina)

                })
        }
    })

    return false
}



//根据页码获取数据
function curenPageSerch(index) {




    if(index == 'last'){
        if(curentPage == 1){
             return
        }else {
             curentPage = curentPage -1
             return
        }


    }else if(index == 'next'){

        if(curentPage == pageTitalNum){
             return
        }else {
             curentPage = curentPage +1
             return
        }

    }else  if( index =='passFlag'){

        return
    }

   curentPage = parseInt(index)




}








 //AJAX请求
function ajaxDiy(url,data) {

    var result;
     $.ajax({
        url:url,
        type:'POST', //GET
        async:false,    //或false,是否异步
        data:data,
        timeout:5000,    //超时时间
        dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text

        success:function(dic){
            result = {'data1':dic.data,"flag":1}
        },
        error:function (dic) {
            result = {'data1':dic.data,"flag":0}
        }

    })

      return result
}
 //AJAX请求 END



  //分页 many
  //curentPageDisplay 当前页展示
  //carListContain 内容展示
  //curentPage当前页
function pageMode(url,data,carListContain,curentPageDisplay,curentPage,flag) {
    console.log(flag+"    flag")
    var manyPageTitalNum=1
     var result = ajaxDiy(url,data)
            if(result.flag == 1){

                carListContain.empty()
                curentPageDisplay.empty()
                curentPageDisplay.html(curentPage)

                $.each(result.data1,function(index,item){
                    manyPageTitalNum = item[2]
                    if(flag == 0 ){
                         carListContain.append(
                        ' <input class="btn btn-default btn-small" type="button" value="'+item[0]+'" data-carNum="'+item[0]+'">'
                      )
                    }else if( flag ==1 ){
                          carListContain.append(
                        ' <input   data-toggle="tooltip" data-placement="right" title="'+item[0]+'" ' +
                        'class="btn btn-default btn-small" type="button" value="'+item[0]+'" data-carNum="'+item[0]+'">'
                     )
                    }



                })
            }else if (result.data== null || result.flag == 0){
               // alert("该时段内未查询到车辆")
            }


        return manyPageTitalNum;
}


  //分页 many  end


///scatter车辆坐标集中展示
function scatterCar(id,info) {

       // 使用
        require(
            [
                'echarts',
                'echarts/chart/scatter' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById(id));  //,'macarons'


                var option = {
                        title : {
                            text: info.leftTitle,
                             subtext: info.leftSubTtitle
                        },
                        tooltip : {
                            trigger: 'axis',
                            showDelay : 0,
                            formatter : function (params) {
                                if (params.value.length > 1) {
                                    return params.seriesName + ' :<br/>'
                                       + params.value[0] + 'cm '
                                       + params.value[1] + 'cm ';
                                }
                                else {
                                    return params.seriesName + ' :<br/>'
                                       + params.name + ' : '
                                       + params.value + 'cm ';
                                }
                            },
                            axisPointer:{
                                show: true,
                                type : 'cross',
                                lineStyle: {
                                    type : 'dashed',
                                    width : 1
                                }
                            }
                        },
                        legend: {
                            data:[info.centTitle]
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                // mark : {show: true},
                                dataZoom : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        xAxis : [
                            {
                                type : 'value',
                                scale:true,
                                axisLabel : {
                                    formatter: '{value} cm'
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                scale:true,
                                axisLabel : {
                                    formatter: '{value} cm'
                                }
                            }
                        ],
                        series : [
                         {
                                name:info.centTitle,
                                type:'scatter',
                                 symbolSize:10,
                                 itemStyle:{
                                        normal: {
                                                    label: {
                                                        show: false
                                                    },
                                                    labelLine: {
                                                        show: true,
                                                         lineStyle: {
                                                                        color: 'red'
                                                                    }
                                                    },
                                                }
                                },
                                data: info.data,
                                markLine : {
                                    data : [
                                        {type : 'max', name: '边缘', valueIndex:0},    // 最大值水平线或垂直线
                                        {type : 'max', name: '边缘'},
                                    ],


                                },

                            }
                        ]
                    };
   // 为echarts对象加载数据
                myChart.setOption(option);
            }
        );
}



///scatter车辆坐标集中展示  END
