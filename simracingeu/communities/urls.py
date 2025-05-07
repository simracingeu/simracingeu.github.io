from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommunityViewSet, DriverViewSet, EventViewSet

router = DefaultRouter()
router.register(r'communities', CommunityViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]