from rest_framework import serializers
from .models import Community, Piloto

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'


class PilotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Piloto
        fields = '__all__'
        extra_kwargs = {
            'imagen': {'required': False, 'allow_null': True}
        }