
from django.db.models import Q
from django.http import JsonResponse,HttpResponseRedirect
from django.core.paginator import Paginator
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import auth


from .models import *

# Create your views here.





    # return HttpResponseRedirect("index")




@login_required(login_url='/car/signin')
def index(request):
    content = {}
    return render(request, 'pointInfo/index.html', content)




def login(request):
    content = {}
    # return HttpResponseRedirect("index")
    return render(request, 'pointInfo/login.html', content)






# 按照条件查询车辆
def conditionSerch(request):

    bgTime = request.POST['bgTime']
    endTime = request.POST['endTime']
    machnic = request.POST['machnic']
    modelSam = request.POST['modelSam']
    curentPage = int(request.POST['curentPage'])
    carList = {}
    pageCarList = {}


    if((machnic == '请选择') & (modelSam =="请选择")):
        carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime))
        pageCarList = Paginator(carList,12)


    if ((machnic == '请选择') & (modelSam != "请选择")):
         carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) & Q(carModel__exact= modelSam))
         pageCarList = Paginator(carList, 12)


    if ((machnic != '请选择') & (modelSam == "请选择")):
        carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) & Q(machine__exact= machnic))
        pageCarList = Paginator(carList, 12)

    if ((machnic != '请选择') & (modelSam != "请选择")):
        carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) &  Q(endTime__lte=endTime) & Q(machine__exact= machnic) & Q(carModel__exact= modelSam))
        pageCarList = Paginator(carList, 12)

    carPage = pageCarList.page(curentPage)#获取对应页码的数据
    carTitalNumb = pageCarList.num_pages


    list2 = []
    for a in carPage:

        list2.append([
            a.id,
            a.carNuber,
            carTitalNumb,
        ])

    return JsonResponse({'data': list2})



#根据主键查询车辆详细信息
def pkCar(request):

    pk = request.POST['pk']
    carList = CarInfo.objects.filter(id = int(pk))
    list2 = []
    for a in carList:

        list2.append([
            a.carNuber,
            a.carLength,
            a.carWidth,
            a.persenal,
            a.carModel,
            a.endTime,
            a.x1,
            a.x2,
            a.x3,
            a.y1,
            a.y2,
            a.y3,
            a.machine,
        ])

    return JsonResponse({'data': list2})



@login_required(login_url='/car/signin')
def anlysit(request):
    content = {}
    # return HttpResponseRedirect("index")
    return render(request, 'pointInfo/suppiler.html', content)

# 单车单次页面
@login_required(login_url='/car/signin')
def anlysit2(request):
    content = {}
    # return HttpResponseRedirect("index")
    return render(request, 'pointInfo/oneTimes.html', content)



# 单车多次次页面

@login_required(login_url='/car/signin')
def anlysit3(request):

    content = {}
    # return HttpResponseRedirect("index")
    return render(request, 'pointInfo/manyTimesPoint.html', content)

#>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>2018年7月添加

#返回该车时间段内所有车辆
def febakCarPoints(request):
    endTime = request.POST['endTime']
    bgTime = request.POST['bgTime']
    curentPage = request.POST['curentPage']
    carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) )

    # list1 = []
    # list4 = []
    # list3 = []
    #
    # for a in carList:
    #     if (a.supplier not in list1) & (a.carNuber not in list1):
    #         list1.append(a.carNuber)
    #         list3.append(a)

    pageCarList = Paginator(carList, 12)#获得数据集，按12条分页
    carPage = pageCarList.page(curentPage)#获取对应页码的数据，拿出对应页码的数据
    carTitalNumb = pageCarList.num_pages


    list2 = []
    for a in carPage:
        list2.append([
            a.carNuber,
            a.id,
            carTitalNumb,
        ])
    return JsonResponse({'data': list2})




#根据车牌号查询车辆详细信息
def carNumber(request):

    carNum = request.POST['carNum']

    carList = CarInfo.objects.filter(carNuber = carNum )
    list2 = []
    for a in carList:

        list2.append([
            a.carNuber,
            a.carLength,
            a.carWidth,
            a.supplier,

            a.x1,#4
            a.y1,

            a.x2,
            a.y2,

            a.x3,
            a.y3,#9

        ])

    return JsonResponse({'data': list2})



#返回该时间段内所有供应商
def febakSupplies(request):
    endTime = request.POST['endTime']
    bgTime = request.POST['bgTime']
    curentPage = request.POST['curentPage']
    carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) )
    # carList = CarInfo.objects.values(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) )
    list1 = []
    list3 = []

    for a in carList:
        if a.supplier not in list1:
            list1.append(a.supplier)
            list3.append(a)


    pageCarList = Paginator(list3, 12)#获得数据集，按12条分页
    carPage = pageCarList.page(curentPage)#获取对应页码的数据，拿出对应页码的数据
    allTitalNumb = pageCarList.num_pages


    list2 = []
    for a in carPage:
        list2.append([
            a.supplier,
            a.id,
            allTitalNumb,
        ])

    return JsonResponse({'data': list2})


#根据供应商查询采样点信息
def supPointsTest(request):

    suppiler = request.POST['suppiler']

    suppilerList = CarInfo.objects.filter(supplier=suppiler)

    list2 = []
    for a in suppilerList:

        list2.append([
            a.carNuber,
            a.carLength,
            a.carWidth,
            a.supplier,

            a.x1,#4
            a.y1,

            a.x2,
            a.y2,

            a.x3,
            a.y3,#9

        ])


    return JsonResponse({'data': list2})



def signin(request):
        content = {}
        return render(request, 'pointInfo/signin.html', content)

def  checkSingin(request):
    # if request.method == 'GET':
    #     return render(request, 'pointInfo/signin.html')

    list2=[]
    user = request.POST['user']
    pwd = request.POST['pwd']

    dataUserInfo = auth.authenticate(username = user,password = pwd)

    if dataUserInfo is not None:
        auth.login(request,dataUserInfo)
        request.session["user"] = user
        list2.append(1)
    else:
        list2.append(0)

    return JsonResponse({'data': list2})




