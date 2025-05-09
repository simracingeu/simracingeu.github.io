"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from simracingeu.views import calendar_view, contact

urlpatterns = [
    path('adminForoAssetto/', admin.site.urls),
    path('api/', include('communities.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    
    path('about/', TemplateView.as_view(template_name='about.html'), name='about'),
    path('rules/', TemplateView.as_view(template_name='rules.html'), name='rules'),
    path('calendar/', calendar_view, name='calendar'),

    path('communities/', TemplateView.as_view(template_name='communities.html'), name='communities'),
    path('faq/', TemplateView.as_view(template_name='faq.html'), name='faq'),
    path('legal/', TemplateView.as_view(template_name='legal.html'), name='legal'),
    path('contact/', contact, name='contact'),
    path('registration/', TemplateView.as_view(template_name='registration.html'), name='registration'),
]
