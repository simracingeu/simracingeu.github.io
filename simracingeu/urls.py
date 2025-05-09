from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.contrib import admin
from django.conf.urls.i18n import i18n_patterns

from .views import contact

urlpatterns = [
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n')),
]

urlpatterns += i18n_patterns(
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
)