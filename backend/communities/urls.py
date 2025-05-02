from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommunityViewSet, DriverViewSet, EventDateViewSet

router = DefaultRouter()
router.register(r'communities', CommunityViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'eventDate', EventDateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]