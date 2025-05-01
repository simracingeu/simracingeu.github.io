from django.contrib import admin
from .models import Community, Evento, FechaEvento, Piloto, Campeonato, Juego

admin.site.register(Community)
admin.site.register(Evento)
admin.site.register(FechaEvento)
admin.site.register(Piloto)
admin.site.register(Campeonato)
admin.site.register(Juego)