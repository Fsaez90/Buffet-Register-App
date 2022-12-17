from .views import BuffetView, UpdateRoom
from django.urls import path 
from . import views

urlpatterns = [
    path('', BuffetView.as_view()),
    path('room/<str:pk>', views.getRoom, name="queryset"),
    path('update-room', UpdateRoom.as_view()) 
] 