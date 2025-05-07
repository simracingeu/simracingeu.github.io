from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('about/', TemplateView.as_view(template_name='about.html'), name='about'),
    path('rules/', TemplateView.as_view(template_name='rules.html'), name='rules'),
    path('calendar/', TemplateView.as_view(template_name='calendar.html'), name='calendar'),
    path('contact/', TemplateView.as_view(template_name='contact.html'), name='contact'),
]