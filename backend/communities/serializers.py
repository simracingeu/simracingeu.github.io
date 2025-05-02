from rest_framework import serializers
from .models import Community, Driver, EventDate

class CommunitySerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    drivers_count = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = '__all__'
        extra_kwargs = {
            'logo': {'required': False, 'allow_null': True}
        }
    
    def get_logo_url(self, obj):
        if obj.logo:
            return self.context['request'].build_absolute_uri(obj.logo.url)
        return None
        
    def get_drivers_count(self, obj):
        return obj.drivers.count()


class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'
        extra_kwargs = {
            'imagen': {'required': False, 'allow_null': True},
            'steam_id': {'required': False, 'allow_null': True}
        }

class EventDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventDate
        fields = '__all__'
        extra_kwargs = {
            'imagen': {'required': False, 'allow_null': True},
            'steam_id': {'required': False, 'allow_null': True}
        }