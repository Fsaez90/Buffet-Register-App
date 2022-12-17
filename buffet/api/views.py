from django.shortcuts import render
from rest_framework import generics, status
from .models import Guest_data
from .serializers import GuestDataSerializers, UpdateDataSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404
from rest_framework.views import APIView
from django.http import JsonResponse

# Create your views here.

class BuffetView(generics.ListAPIView):
    queryset = Guest_data.objects.all()
    serializer_class = GuestDataSerializers
    


@api_view(['GET', 'PATCH'])
def getRoom(request, pk): 
    try:
        queryset = Guest_data.objects.get(Room=pk)
        serializer = GuestDataSerializers(queryset, many=False)
    except Guest_data.DoesNotExist:
        raise Http404("not found boy")
    return Response(serializer.data)


class UpdateRoom(APIView):
    serializer_class = UpdateDataSerializer
    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data, partial=True)
        if serializer.is_valid():
            breakfast = serializer.data.get("Breakfast")
            registered = serializer.data.get("Registered")
            id = serializer.data.get("id")
            queryset = Guest_data.objects.filter(id=id)
            if not queryset.exists():
                return Response({'msg': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)    
            room = queryset[0]
            room.Breakfast = breakfast
            room.Registered = registered
            room.save(update_fields=['Registered', 'Breakfast'])
            return Response(GuestDataSerializers(room).data, status=status.HTTP_200_OK)
        return Response({'Bad Request': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST )
    
