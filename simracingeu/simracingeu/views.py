from django.shortcuts import render
from communities.models import Championship

from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib import messages

def calendar_view(request):
    championships = Championship.objects.all()
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