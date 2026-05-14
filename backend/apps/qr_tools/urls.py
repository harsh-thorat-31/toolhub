from django.urls import path
from .views import test_api, generate_qr_code

urlpatterns = [
    path('test/', test_api, name='test_api'),
    path('generate-qr/', generate_qr_code, name='generate_qr_code'),
]
