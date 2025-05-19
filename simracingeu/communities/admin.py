from django.contrib import admin
from .models import Community, Event, Driver, Championship, Game, Subscription

admin.site.register(Community)
class EventAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'fecha', 'campeonato')
    ordering = ('campeonato__nombre', 'fecha', 'nombre')

admin.site.register(Event, EventAdmin)
admin.site.register(Driver)
admin.site.register(Championship)
admin.site.register(Game)
admin.site.register(Subscription)