from rest_framework import viewsets
from .models import Community, Driver, EventDate
from .serializers import CommunitySerializer, DriverSerializer, EventDateSerializer

class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

class EventDateViewSet(viewsets.ModelViewSet):
    queryset = EventDate.objects.all()
    serializer_class = EventDateSerializer