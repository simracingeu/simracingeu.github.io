from django.db import models
import uuid

class Community(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    email = models.EmailField(blank=True)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    discord_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    logo = models.ImageField(upload_to='community_logos/', blank=True)
    
    def __str__(self):
        return self.name


class Piloto(models.Model):
    nombre = models.CharField(max_length=100)
    guid = models.UUIDField(default=uuid.uuid4, editable=False)
    imagen = models.ImageField(upload_to='pilotos/', blank=True)
    comunidad = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='pilotos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nombre

class Juego(models.Model):
    nombre = models.CharField(max_length=50, choices=[
        ('AC', 'Assetto Corsa'),
        ('ACC', 'Assetto Corsa Competizione'),
        ('LMU', 'Le Mans Ultimate')
    ])
    
    def __str__(self):
        return self.get_nombre_display()

class Campeonato(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE)

    
    class Meta:
        app_label = 'communities'
    
    def __str__(self):
        return self.nombre

class Evento(models.Model):
    nombre = models.CharField(max_length=100)
    campeonato = models.ForeignKey(Campeonato, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    
    def __str__(self):
        return self.nombre


class FechaEvento(models.Model):
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE, related_name='fechas')
    fecha = models.DateField()
    hora = models.TimeField()
    
    def __str__(self):
        return f"{self.evento.nombre} - {self.fecha} {self.hora}"