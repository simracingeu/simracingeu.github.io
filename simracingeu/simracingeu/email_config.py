# Configuración para el envío de emails
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'simracingeurope@gmail.com'
# Nota: La contraseña debe configurarse como variable de entorno
# EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASSWORD')