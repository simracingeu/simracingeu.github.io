from django.shortcuts import render
from communities.models import Championship

from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib import messages

def calendar_view(request):
    game_filter = request.GET.get('game', None)
    championships = Championship.objects.all().prefetch_related('event_set')
    
    if game_filter:
        championships = championships.filter(juego=game_filter)
    
    championships_data = []
    for championship in championships:
        championship_data = {
            'name': championship.nombre,
            'events': list(championship.event_set.values('nombre', 'fecha', 'formato'))
        }
        championships_data.append(championship_data)
    
    if request.GET.get('modal') == 'true':
        return render(request, '_calendar_content.html', {'championships': championships})
    return render(request, 'calendar.html', {'championships': championships})




def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        subject = f'Mensaje de contacto de {name}'
        message_body = f"""
        Nombre: {name}
        Email: {email}
        
        Mensaje:
        {message}
        """
        
        try:
            send_mail(
                subject,
                message_body,
                email,
                ['simracingeurope@gmail.com'],
                fail_silently=False,
            )
            messages.success(request, '¡Tu mensaje ha sido enviado con éxito!')
            return redirect('contact')
        except Exception as e:
            messages.error(request, f'Error al enviar el mensaje: {e}')
    
    return render(request, 'contact.html')