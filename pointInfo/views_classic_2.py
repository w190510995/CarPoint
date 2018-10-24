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


#根据矿点查询采样点信息
def producerPoint(request):

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


