from rest_framework import serializers
from .models import Guest_data

class GuestDataSerializers(serializers.ModelSerializer):
    class Meta:
        model = Guest_data
        fields = ('id', 'Name', 'Lastname', 'Adults', 'Children', 'Room', 'Breakfast', 'Check_in', 'Check_out', 'Registered')

class UpdateDataSerializer(serializers.ModelSerializer):
    id = serializers.CharField(validators=[])
    class Meta:
        model = Guest_data
        fields = ('id', 'Registered', 'Breakfast')