from django.contrib import admin
from .models import Community, Event, EventDate, Driver, Championship, Game

admin.site.register(Community)
admin.site.register(Event)
admin.site.register(EventDate)
admin.site.register(Driver)
admin.site.register(Championship)
admin.site.register(Game)