from django.db import models
import uuid

class Community(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    discord_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    logo = models.ImageField(upload_to='static/community_logos/', blank=True)
    
    def __str__(self):
        return self.name


class Driver(models.Model):
    nombre = models.CharField(max_length=100)
    guid = models.UUIDField(default=uuid.uuid4, editable=False)
    imagen = models.ImageField(upload_to='driver/', blank=True, null=True)
    comunidad = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='drivers')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    steam_id = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return self.nombre

class Game(models.Model):
    nombre = models.CharField(max_length=50, choices=[
        ('AC', 'Assetto Corsa'),
        ('ACC', 'Assetto Corsa Competizione'),
        ('LMU', 'Le Mans Ultimate')
    ])
    
    def __str__(self):
        return self.get_nombre_display()

class Championship(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    juego = models.ForeignKey(Game, on_delete=models.CASCADE)

    
    class Meta:
        app_label = 'communities'
    
    def __str__(self):
        return self.nombre

class Event(models.Model):
    nombre = models.CharField(max_length=100)
    campeonato = models.ForeignKey(Championship, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    download_url = models.URLField(blank=True)
    
    def __str__(self):
        return self.nombre


class EventDate(models.Model):
    evento = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='dates')
    fecha = models.DateField()
    hora = models.TimeField()
    
    def __str__(self):
        return f"{self.event.nombre} - {self.fecha} {self.hora}"