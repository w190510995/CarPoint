#coding=utf-8
#Version: V 1.0
author: 'WangSheng'
date: '2018/10/22 11:45'

from django.db.models import Q
from django.http import JsonResponse,HttpResponseRedirect
from django.core.paginator import Paginator
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from .models import *


def producer(request):
    content = {}
    # return HttpResponseRedirect("index")
    return render(request, 'pointInfo/producer.html', content)


def test1(req):
    content = {}
    # return HttpResponseRedirect("index")
    return render(req, 'pointInfo/test3.html', content)


#根据供应商查询采样点信息
def producerPoint(request):

    suppiler = request.POST['suppiler']

    suppilerList = CarInfo.objects.filter(producer=suppiler)

    list2 = []
    for a in suppilerList:

        list2.append([
            a.carNuber,
            a.carLength,
            a.carWidth,
            a.producer,

            a.x1,#4
            a.y1,

            a.x2,
            a.y2,

            a.x3,
            a.y3,#9

        ])


    return JsonResponse({'data': list2})


#返回时间段内所有供应商
def febakProds(request):
    endTime = request.POST['endTime']
    bgTime = request.POST['bgTime']
    curentPage = request.POST['curentPage']
    carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) )
    # carList = CarInfo.objects.values(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) )
    list1 = []
    list3 = []

    for a in carList:
        if a.supplier not in list1:
            list1.append(a.producer)
            list3.append(a)


    pageCarList = Paginator(list3, 12)#获得数据集，按12条分页
    carPage = pageCarList.page(curentPage)#获取对应页码的数据，拿出对应页码的数据
    allTitalNumb = pageCarList.num_pages


    list2 = []
    for a in carPage:
        list2.append([
            a.producer,
            a.id,
            allTitalNumb,
        ])

    return JsonResponse({'data': list2})








def samMac(request):
    content = {}
    # return HttpResponseRedirect("index")
    return render(request, 'pointInfo/samplingMachine.html', content)




#根据采样机查询采样点信息
def samMacPoint(request):

    suppiler = request.POST['suppiler']

    suppilerList = CarInfo.objects.filter(machine=suppiler)

    list2 = []
    for a in suppilerList:

        list2.append([
            a.carNuber,
            a.carLength,
            a.carWidth,
            a.machine,

            a.x1,#4
            a.y1,

            a.x2,
            a.y2,

            a.x3,
            a.y3,#9

        ])


    return JsonResponse({'data': list2})


#返回时间段内所有采样机
def febakSamMac(request):
    endTime = request.POST['endTime']
    bgTime = request.POST['bgTime']
    curentPage = request.POST['curentPage']
    carList = CarInfo.objects.filter(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) )
    # carList = CarInfo.objects.values(Q(endTime__gte=bgTime) & Q(endTime__lte=endTime) )
    list1 = []
    list3 = []

    for a in carList:
        if a.supplier not in list1:
            list1.append(a.machine)
            list3.append(a)


    pageCarList = Paginator(list3, 12)#获得数据集，按12条分页
    carPage = pageCarList.page(curentPage)#获取对应页码的数据，拿出对应页码的数据
    allTitalNumb = pageCarList.num_pages


    list2 = []
    for a in carPage:
        list2.append([
            a.machine,
            a.id,
            allTitalNumb,
        ])

    return JsonResponse({'data': list2})







