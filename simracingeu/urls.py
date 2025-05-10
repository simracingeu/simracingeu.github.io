from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls.i18n import i18n_patterns

from .views import contact # Asegúrate de que la vista de contacto esté definida en simracingeu/views.py
# Asegúrate de importar otras vistas necesarias si no usas TemplateView para todas

urlpatterns = [
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n')),
    # Ejemplo: path('api/', include('communities.urls')), # Descomenta y ajusta si tienes URLs de API de otras apps
]

urlpatterns += i18n_patterns(
    path('', TemplateView.as_view(template_name='index.html'), name='home'),

)