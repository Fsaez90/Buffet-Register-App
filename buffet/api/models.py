from django.db import models

# Create your models here.
class Guest_data(models.Model):
    Name = models.CharField(max_length=20, unique=False)
    Lastname = models.CharField(max_length=20, unique=False)
    Adults = models.IntegerField(default=1)
    Children = models.IntegerField(default=0)
    Room = models.IntegerField(default=0)
    Breakfast = models.BooleanField(default=False)
    Check_in = models.DateField(auto_now_add=False)
    Check_out = models.DateField(auto_now_add=False)  
    Registered = models.BooleanField(default=False)
    