from communities.models import Championship

from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
from django.utils.translation import gettext as _
import logging

logger = logging.getLogger(__name__)

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
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        message = request.POST.get('message', '').strip()

        if not all([name, email, message]):
            messages.error(request, _('Please complete all required fields.'))
            return redirect('contact')

        subject = f'Mensaje de contacto de {name}'
        message_body = (
            f"Nombre: {name}\n"
            f"Email: {email}\n\n"
            f"Mensaje:\n{message}"
        )

        try:
            send_mail(
                subject,
                message_body,
                settings.EMAIL_HOST_USER,
                ['simracingeurope@gmail.com'],
                fail_silently=False,
            )
            messages.success(request, _('Your message has been sent successfully!'))
        except Exception as e:
            logger.error(f'Error al enviar email de contacto: {e}')
            messages.error(request, _('There was an error sending your message. Please try again later.'))

        return redirect('contact')

    return render(request, 'contact.html')