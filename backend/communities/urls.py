from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommunityViewSet, DriverViewSet

router = DefaultRouter()
router.register(r'communities', CommunityViewSet)
router.register(r'drivers', DriverViewSet)

urlpatterns = [
    path('', include(router.urls)),
]