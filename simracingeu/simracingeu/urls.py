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
from django.conf.urls.i18n import i18n_patterns # Import for internationalization
from simracingeu.views import calendar_view, contact

# Non-internationalized urlpatterns
# These URLs will not have language prefixes
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('communities.urls')), # Assuming API endpoints don't need i18n
    path('i18n/', include('django.conf.urls.i18n')), # Django's i18n URLs for language switching
]

# Internationalized urlpatterns
# These URLs will be prefixed with the active language code (e.g., /en/about/, /es/about/)
urlpatterns += i18n_patterns(
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('about/', TemplateView.as_view(template_name='about.html'), name='about'),
    path('rules/', TemplateView.as_view(template_name='rules.html'), name='rules'),
    path('calendar/', calendar_view, name='calendar'),
    path('communities/', TemplateView.as_view(template_name='communities.html'), name='communities'),
    path('faq/', TemplateView.as_view(template_name='faq.html'), name='faq'),
    path('legal/', TemplateView.as_view(template_name='legal.html'), name='legal'),
    path('contact/', contact, name='contact'),
    path('registration/', TemplateView.as_view(template_name='registration.html'), name='registration'),
    # prefix_default_language=False # Uncomment if you don't want a prefix for the default language (e.g. /about/ instead of /es/about/ if es is default)
)

# Note: The path for 'index.html' was removed as it was duplicated with 'home.html' for the root path ''.
# If 'index.html' and 'home.html' are meant to be different pages at the root, adjust accordingly.
