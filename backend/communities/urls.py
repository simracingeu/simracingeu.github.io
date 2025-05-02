from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommunityViewSet, PilotoViewSet

router = DefaultRouter()
router.register(r'communities', CommunityViewSet)
router.register(r'pilotos', PilotoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]