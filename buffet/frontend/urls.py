
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('summary', index),
    path('room/<str:search>', index)
]
