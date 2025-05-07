from django.urls import reverse

def menu_items(request):
    current_path = request.path
    
    items = [
        {'title': 'Inicio', 'url_name': 'home', 'active': current_path == reverse('home')},
        {'title': 'Sobre Nosotros', 'url_name': 'about', 'active': current_path == reverse('about')},
        {'title': 'Reglas', 'url_name': 'rules', 'active': current_path == reverse('rules')},
        {'title': 'Calendario', 'url_name': 'calendar', 'active': current_path == reverse('calendar')},
        {'title': 'Contacto', 'url_name': 'contact', 'active': current_path == reverse('contact')},
    ]
    
    return {'menu_items': items}