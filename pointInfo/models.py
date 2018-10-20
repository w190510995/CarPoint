from django.db import models

# Create your models here.


class CarInfo(models.Model):
    carNuber = models.CharField(max_length=20)#车牌号
    carLength = models.CharField(max_length=20)#车厂
    carWidth = models.CharField(max_length=20)#车宽
    persenal = models.CharField(max_length=20)#采样人员
    carModel = models.CharField(max_length=20)#采样方式
    endTime = models.DateTimeField()#采样时间
    x1 = models.CharField(max_length=20)
    x2 = models.CharField(max_length=20)
    x3 = models.CharField(max_length=20)
    y1 = models.CharField(max_length=20)
    y2 = models.CharField(max_length=20)
    y3 = models.CharField(max_length=20)
    machine = models.CharField(max_length=20)#采样机编号
    supplier = models.CharField(max_length=200)#供应商


class userInfo(models.Model):
    user = models.CharField(max_length=20)
    pwd = models.CharField(max_length=20)
